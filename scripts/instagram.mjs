/**
 * Saca los últimos vídeos de Instagram y sus portadas.
 *
 * Instagram no deja leer el perfil sin cuenta, pero su embed público
 * (`https://www.instagram.com/USUARIO/embed/`) pinta los últimos posts con su
 * `shortcode`. De ahí salen la URL del reel y la portada, que se descarga y se
 * sirve desde el propio dominio (nada de cdninstagram en la web).
 *
 * Uso:    npm run instagram
 * Salida: src/data/instagram.ts
 *         public/photos/gen/instagram-N-{480,640}.{webp,jpg}
 *
 * Se ejecuta a mano cuando haya vídeos nuevos; el resultado se versiona.
 * Necesita Playwright (está en devDependencies) porque el HTML se rellena por JS:
 *   npx playwright install chromium
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { chromium } from 'playwright'

const HANDLE = 'amb_ar2022'
const CUANTOS = 3
const DESTINO = 'public/photos/gen'
const ANCHOS = [480, 640]
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

/** Deshace los escapes de la URL (varios niveles de JSON). */
function limpiaUrl(url) {
  return url
    .replace(/\\+\//g, '/')
    .replace(/\\+u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
}

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
      const medidas = trozo.match(/"dimensions":\{"height":(\d+),"width":(\d+)\}/)
      const portada = campo(trozo, /"display_url":"(https:[^"]+)"/)
      const recursos = [...trozo.matchAll(/"src":"(https:[^"]+)"/g)].map((m) => limpiaUrl(m[1]))
      const grande = recursos.length ? recursos[recursos.length - 1] : null
      const texto = campo(trozo, /"text":"((?:[^"\\]|\\.)*)"/)
      const fecha = campo(trozo, /"taken_at_timestamp":(\d+)/)
      if (!shortcode || !esVideo || !portada) return null
      return {
        shortcode,
        portada: limpiaUrl(portada),
        grande: grande ? limpiaUrl(grande) : null,
        texto,
        alto: Number(medidas?.[1]) || 1280,
        ancho: Number(medidas?.[2]) || 720,
        fecha: Number(fecha) || 0,
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.fecha - a.fecha)
    .slice(0, CUANTOS)

  if (videos.length === 0) throw new Error('El embed no trajo ningún vídeo')

  // Las imágenes que el embed ya pintó sirven de respaldo si el CDN firma mal
  // la URL del JSON.
  const pintadas = await pagina.evaluate(() =>
    [...document.querySelectorAll('img')]
      .map((img) => img.currentSrc || img.src)
      .filter((src) => src.includes('scontent')),
  )
  const tallo = (url) => {
    const limpia = url.split('?')[0]
    return limpia.slice(limpia.lastIndexOf('/') + 1).split('_').slice(0, 2).join('_')
  }

  await fs.mkdir(DESTINO, { recursive: true })
  const salida = []

  for (const [i, video] of videos.entries()) {
    let respuestaImagen = video.grande ? await pagina.request.get(video.grande) : null
    if (respuestaImagen && !respuestaImagen.ok()) {
      respuestaImagen = await pagina.request.get(video.portada)
    }
    if (respuestaImagen && !respuestaImagen.ok()) {
      const gemela = pintadas.find((src) => tallo(src) === tallo(video.portada))
      respuestaImagen = gemela
        ? await pagina.request.get(gemela)
        : await pagina.request.get(video.portada)
    }
    if (!respuestaImagen || !respuestaImagen.ok()) {
      throw new Error(`No se pudo descargar la portada ${video.shortcode}`)
    }

    const buffer = Buffer.from(await respuestaImagen.body())
    const meta = await sharp(buffer).metadata()
    const anchoReal = meta.width || video.ancho

    for (const anchoFinal of ANCHOS) {
      if (anchoFinal > anchoReal) continue
      const redimensionada = sharp(buffer).resize({ width: anchoFinal })
      await redimensionada
        .clone()
        .webp({ quality: 74 })
        .toFile(path.join(DESTINO, `instagram-${i + 1}-${anchoFinal}.webp`))
      await redimensionada
        .clone()
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(path.join(DESTINO, `instagram-${i + 1}-${anchoFinal}.jpg`))
    }

    const titulo = (video.texto || '')
      .replace(/\\+u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/#[\p{L}\p{N}_]+/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    salida.push({
      id: video.shortcode,
      title: titulo.slice(0, 90),
      reelUrl: `https://www.instagram.com/reel/${video.shortcode}/`,
      cover: { base: `/photos/gen/instagram-${i + 1}`, width: video.ancho, height: video.alto },
    })

    console.log(`ok ${video.shortcode} · ${titulo || '(sin texto)'} · ${anchoReal}px · ${video.ancho}x${video.alto}`)
  }

  const fichero = `/**
 * Los últimos vídeos de Instagram, con su portada servida desde el propio
 * dominio. Lo genera \`npm run instagram\` (scripts/instagram.mjs); no se toca a
 * mano. Para refrescarlo cuando haya vídeos nuevos, vuelve a ejecutarlo.
 */

export interface InstagramPost {
  /** Identificador interno, estable (el shortcode del reel). */
  id: string
  /** Pie corto que se ve sobre la portada. Puede ir vacío. */
  title: string
  /** URL pública del reel. */
  reelUrl?: string
  /** Portada local. Si falta, la tarjeta cae en \`photoKey\`. */
  cover?: { base: string; width: number; height: number }
  /** Foto de respaldo cuando todavía no hay portada descargada. */
  photoKey?: string
}

export const instagramHandle = '@amb_ar2022'

export const instagramPosts: InstagramPost[] = ${JSON.stringify(salida, null, 2)}
`

  await fs.writeFile('src/data/instagram.ts', fichero, 'utf8')
  console.log(`Listo: ${salida.length} vídeos en src/data/instagram.ts`)
} finally {
  await navegador.close()
}
