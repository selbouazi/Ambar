/**
 * Genera los recursos de marca a partir del logotipo original del titular.
 *
 *   npm run brand
 *
 * - `public/brand/ambar-logo.png`: logotipo recortado y optimizado.
 * - `public/brand/ambar-logo-160.png` y `-320.png`: variantes para el nav.
 * - `public/favicon.png`, `favicon.ico` y `apple-touch-icon.png`.
 * - `public/icon-192.png` y `icon-512.png` para el manifest.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src', 'assets', 'photos', 'raw', 'propietario-2026-11', 'favicoin.png')
const BRAND_DIR = path.join(ROOT, 'public', 'brand')

await mkdir(BRAND_DIR, { recursive: true })

const trimmed = await sharp(SRC).rotate().trim({ threshold: 10 }).png().toBuffer()
const meta = await sharp(trimmed).metadata()
console.log(`· Logotipo: ${meta.width} × ${meta.height}`)

const logo = await sharp(trimmed).png({ compressionLevel: 9 }).toBuffer()
await writeFile(path.join(BRAND_DIR, 'ambar-logo.png'), logo)

for (const width of [160, 320]) {
  const variant = await sharp(trimmed)
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer()
  await writeFile(path.join(BRAND_DIR, `ambar-logo-${width}.png`), variant)
  console.log(`✓ public/brand/ambar-logo-${width}.png (${Math.round(variant.length / 1024)} KB)`)
}

/** Coloca el logotipo centrado dentro de un cuadrado. */
async function squareIcon(size, ratio, background) {
  const logoWidth = Math.round(size * ratio)
  const resized = await sharp(trimmed)
    .resize({ width: logoWidth, withoutEnlargement: true })
    .png()
    .toBuffer()
  const resizedMeta = await sharp(resized).metadata()
  const left = Math.round((size - resizedMeta.width) / 2)
  const top = Math.round((size - resizedMeta.height) / 2)

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: background === 'transparent' ? { r: 0, g: 0, b: 0, alpha: 0 } : background,
    },
  })
    .composite([{ input: resized, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/* Favicon: fondo transparente para que funcione en pestañas claras y oscuras. */
const favicon = await squareIcon(192, 0.9, 'transparent')
await writeFile(path.join(ROOT, 'public', 'favicon.png'), favicon)
console.log(`✓ public/favicon.png (${Math.round(favicon.length / 1024)} KB)`)

/* ICO con PNG incrustados: compatible con navegadores modernos y Windows. */
const icoSizes = [16, 32, 48]
const icoImages = []
for (const size of icoSizes) {
  icoImages.push(await squareIcon(size, 0.92, 'transparent'))
}

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(icoImages.length, 4)

const directory = Buffer.alloc(icoImages.length * 16)
let offset = 6 + directory.length
icoImages.forEach((image, i) => {
  const entry = directory.subarray(i * 16, (i + 1) * 16)
  const size = icoSizes[i]
  entry.writeUInt8(size >= 256 ? 0 : size, 0)
  entry.writeUInt8(size >= 256 ? 0 : size, 1)
  entry.writeUInt8(0, 2)
  entry.writeUInt8(0, 3)
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(image.length, 8)
  entry.writeUInt32LE(offset, 12)
  offset += image.length
})
await writeFile(path.join(ROOT, 'public', 'favicon.ico'), Buffer.concat([header, directory, ...icoImages]))
console.log('✓ public/favicon.ico')

/* Iconos de iOS y PWA: fondo oscuro y margen de seguridad. */
const apple = await squareIcon(180, 0.8, { r: 7, g: 7, b: 6, alpha: 1 })
await writeFile(path.join(ROOT, 'public', 'apple-touch-icon.png'), apple)
console.log(`✓ public/apple-touch-icon.png (${Math.round(apple.length / 1024)} KB)`)

for (const size of [192, 512]) {
  const icon = await squareIcon(size, 0.72, { r: 7, g: 7, b: 6, alpha: 1 })
  await writeFile(path.join(ROOT, 'public', `icon-${size}.png`), icon)
  console.log(`✓ public/icon-${size}.png (${Math.round(icon.length / 1024)} KB)`)
}
