/**
 * Procesa las fotografías reales del restaurante.
 *
 *   npm run photos
 *
 * - Lee los originales de `public/photos/` (jpg, jpeg, png, webp, avif).
 * - Genera variantes 640 / 960 / 1440 / 1920 en avif, webp y jpg dentro de
 *   `public/photos/gen/`.
 * - Reescribe `src/data/photo-manifest.json`, que es lo que consume <Photo>.
 * - Genera `docs/FOTOS-PENDIENTES.md` con el estado de las fotos.
 *
 * No descarga nada de internet: las fotos las coloca el propietario.
 */

import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PHOTOS_DIR = path.join(ROOT, 'public', 'photos')
const OUT_DIR = path.join(PHOTOS_DIR, 'gen')
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'photo-manifest.json')
const SPECS_PATH = path.join(ROOT, 'src', 'data', 'photo-specs.json')
const DOC_PATH = path.join(ROOT, 'docs', 'FOTOS-PENDIENTES.md')

const WIDTHS = [640, 960, 1440, 1920]
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

const specs = JSON.parse(await readFile(SPECS_PATH, 'utf8'))
const specByFile = new Map(Object.entries(specs).map(([key, spec]) => [spec.file, { key, ...spec }]))

await mkdir(PHOTOS_DIR, { recursive: true })
await mkdir(OUT_DIR, { recursive: true })

let entries = []
try {
  entries = await readdir(PHOTOS_DIR)
} catch {
  entries = []
}

const manifest = {}
const found = new Set()

for (const entry of entries.sort()) {
  const ext = path.extname(entry).toLowerCase()
  if (!EXTENSIONS.has(ext)) continue

  const base = path.basename(entry, ext)
  const spec = specByFile.get(base)
  const input = path.join(PHOTOS_DIR, entry)

  const meta = await sharp(input).metadata()
  if (!meta.width || !meta.height) {
    console.warn(`· ${entry}: no se pudo leer el tamaño, se omite.`)
    continue
  }

  const widths = WIDTHS.filter((width) => width <= meta.width)
  // Añade el ancho nativo cuando cae entre dos tamaños estándar: así no se
  // pierde resolución en originales de 1.000–1.900 px.
  const native = Math.min(meta.width, WIDTHS[WIDTHS.length - 1])
  if (native > 0 && !widths.includes(native)) widths.push(native)
  if (widths.length === 0) widths.push(meta.width)

  const formats = { avif: [], webp: [], jpg: [] }

  for (const width of widths) {
    const resize = () => sharp(input).rotate().resize({ width, withoutEnlargement: true })

    const avif = await resize().avif({ quality: 55, effort: 4 }).toBuffer({ resolveWithObject: true })
    await writeFile(path.join(OUT_DIR, `${base}-${width}.avif`), avif.data)
    formats.avif.push({
      width: avif.info.width,
      height: avif.info.height,
      src: `/photos/gen/${base}-${width}.avif`,
    })

    const webp = await resize().webp({ quality: 74 }).toBuffer({ resolveWithObject: true })
    await writeFile(path.join(OUT_DIR, `${base}-${width}.webp`), webp.data)
    formats.webp.push({
      width: webp.info.width,
      height: webp.info.height,
      src: `/photos/gen/${base}-${width}.webp`,
    })

    const jpg = await resize().jpeg({ quality: 80, mozjpeg: true }).toBuffer({ resolveWithObject: true })
    await writeFile(path.join(OUT_DIR, `${base}-${width}.jpg`), jpg.data)
    formats.jpg.push({
      width: jpg.info.width,
      height: jpg.info.height,
      src: `/photos/gen/${base}-${width}.jpg`,
    })
  }

  const largest = formats.webp[formats.webp.length - 1]
  manifest[base] = {
    width: largest.width,
    height: largest.height,
    position: spec?.position || 'center',
    formats,
  }
  found.add(base)
  console.log(`✓ ${entry} → ${widths.length * 3} variantes`)
}

await writeFile(
  MANIFEST_PATH,
  `${JSON.stringify({ _comment: 'Generado por npm run photos. No editar a mano.', ...manifest }, null, 2)}\n`,
)

/* ── Informe de huecos ──────────────────────────────────────────────────── */

const missing = Object.entries(specs).filter(([, spec]) => !found.has(spec.file))
const present = Object.entries(specs).filter(([, spec]) => found.has(spec.file))

const rows = missing
  .map(
    ([, spec]) =>
      `| \`public/photos/${spec.file}.jpg\` | ${spec.ratio} | ${spec.etiqueta || spec.alt || '—'} | ${spec.section} |`,
  )
  .join('\n')

const presentRows = present.length
  ? present
      .map(([, spec]) => `- \`${spec.file}\` — ${spec.section}`)
      .join('\n')
  : '_Ninguna todavía._'

const doc = `# Fotos pendientes de Ambar

Generado automáticamente por \`npm run photos\`. No editar a mano.

## Cómo funciona

1. Coloca los originales en \`public/photos/\` con **exactamente** estos nombres
   (la extensión puede ser \`.jpg\`, \`.jpeg\`, \`.png\`, \`.webp\` o \`.avif\`).
2. Ejecuta \`npm run photos\`.
3. El script genera las variantes optimizadas en \`public/photos/gen/\` y
   actualiza \`src/data/photo-manifest.json\`. La web las usa sola: no hay que
   tocar ningún componente.
4. Vuelve a ejecutar \`npm run photos\` cada vez que cambies una foto.

Mientras una foto no exista, la web muestra un panel de marca con el nombre del
plato y la proporción exacta de la foto final: la maquetación nunca deja una
caja vacía.

**Derechos:** las fotos son del propietario del restaurante y se usan con su
permiso. No se enlazan ni se descargan imágenes de Google Maps desde el código.

## Huecos por rellenar (${missing.length})

| Archivo | Proporción ideal | Etiqueta | Dónde va |
|---|---|---|---|
${rows || '| — | — | — | — |'}

## Fotos ya colocadas (${present.length})

${presentRows}

## Recomendaciones de captura

- Luz natural o la luz cálida del local; evitar el flash directo.
- Horizontal 16:9 para el hero y las bandas; vertical 4:5 para el retrato del local.
- Que el plato ocupe el centro del encuadre y dejar aire alrededor.
- Mínimo 1600 px en el lado largo. El script se encarga del resto.
- Para la galería, mezclar sala, platos y detalle de la decoración.
`

await writeFile(DOC_PATH, doc)

console.log('')
console.log(`Manifiesto: ${Object.keys(manifest).length} fotos procesadas.`)
console.log(`Pendientes: ${missing.length}. Informe en docs/FOTOS-PENDIENTES.md.`)
