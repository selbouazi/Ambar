/**
 * Saca las URL de los últimos vídeos de Instagram.
 *
 * Instagram no deja leer el perfil sin cuenta, pero su embed público
 * (`https://www.instagram.com/USUARIO/embed/`) pinta los últimos posts con su
 * `shortcode`. De ahí sale la URL de cada reel, que es lo único que necesita el
 * reproductor oficial que se ve en la portada.
 *
 * Uso:    npm run instagram
 * Salida: src/data/instagram.ts
 *
 * Se ejecuta a mano cuando haya vídeos nuevos; el resultado se versiona.
 * Necesita Playwright (está en devDependencies) porque el HTML se rellena por JS:
 *   npx playwright install chromium
 */

import fs from 'node:fs/promises'
import { chromium } from 'playwright'

const HANDLE = 'amb_ar2022'
const CUANTOS = 3
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

/** Devuelve el array JSON que empieza en `inicio`, contando corchetes. */
function recortaArray(texto, inicio) {
  let nivel = 0
  let enCadena = false
  let escape = false
  for (let i = inicio; i < texto.length; i += 1) {
    const c = texto[i]
    if (enCadena) {
      if (escape) escape = false
      else if (c === '\\') escape = true
      else if (c === '"') enCadena = false
      continue
    }
    if (c === '"') enCadena = true
    else if (c === '[') nivel += 1
    else if (c === ']') {
      nivel -= 1
      if (nivel === 0) return texto.slice(inicio, i + 1)
    }
  }
  return null
}

const navegador = await chromium.launch()
const pagina = await navegador.newPage({ userAgent: UA, viewport: { width: 420, height: 760 } })

try {
  const respuesta = await pagina.goto(`https://www.instagram.com/${HANDLE}/embed/`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  })
  if (!respuesta || !respuesta.ok()) throw new Error(`Instagram respondió ${respuesta?.status()}`)
  await pagina.waitForTimeout(6000)

  const html = await pagina.content()
  const indice = html.indexOf('graphql_media')
  if (indice === -1) throw new Error('No hay «graphql_media» en el embed: Instagram cambió el formato')

  // El HTML trae el JSON escapado (\"graphql_media\":[ ... ]). Se desescapa y se
  // recorta el array contando corchetes. No se hace JSON.parse del total porque
  // `media_preview` lleva binario escapado que lo rompe.
  const cola = html
    .slice(html.indexOf('[', indice))
    .replace(/\\\\/g, '\\')
    .replace(/\\"/g, '"')
    .replace(/\\\//g, '/')
  const crudo = recortaArray(cola, 0)
  if (!crudo) throw new Error('No se pudo recortar el array de medios')

  const campo = (trozo, patron) => trozo.match(patron)?.[1] ?? null

  const videos = crudo
    .split('"shortcode_media":{"__typename"')
    .slice(1)
    .map((trozo) => {
      const shortcode = campo(trozo, /"shortcode":"([A-Za-z0-9_-]+)"/)
      const esVideo = /"is_video":true/.test(trozo)
      const fecha = campo(trozo, /"taken_at_timestamp":(\d+)/)
      return esVideo && shortcode ? { shortcode, fecha: Number(fecha) || 0 } : null
    })
    .filter(Boolean)
    .sort((a, b) => b.fecha - a.fecha)
    .slice(0, CUANTOS)

  if (videos.length === 0) throw new Error('El embed no trajo ningún vídeo')

  const salida = videos.map((video) => ({
    id: video.shortcode,
    reelUrl: `https://www.instagram.com/reel/${video.shortcode}/`,
  }))

  const fichero = `/**
 * Los últimos vídeos de Instagram. Lo genera \`npm run instagram\`
 * (scripts/instagram.mjs); no se toca a mano. Para refrescarlo cuando haya
 * vídeos nuevos, vuelve a ejecutarlo.
 */

export interface InstagramPost {
  /** Identificador interno, estable (el shortcode del reel). */
  id: string
  /** URL pública del reel; el reproductor la usa para el embed oficial. */
  reelUrl: string
}

export const instagramHandle = '@amb_ar2022'

export const instagramPosts: InstagramPost[] = ${JSON.stringify(salida, null, 2)}
`

  await fs.writeFile('src/data/instagram.ts', fichero, 'utf8')
  console.log(`Listo: ${salida.length} reels en src/data/instagram.ts`)
  for (const video of salida) console.log(`  ${video.reelUrl}`)
} finally {
  await navegador.close()
}
