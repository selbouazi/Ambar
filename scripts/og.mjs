/**
 * Genera la imagen social (Open Graph) de 1200 × 630 a partir de un SVG.
 *
 *   npm run og
 *
 * Dibuja la trama de estrella octogonal y el logotipo con los colores de la
 * marca. No usa fotografías de archivo.
 */

import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const OUT = path.join(process.cwd(), 'public', 'og.png')

function star(cx, cy, outer, inner) {
  const points = []
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (-90 + i * 22.5) * (Math.PI / 180)
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`)
  }
  return points.join(' ')
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="z" width="130" height="130" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="#f4c816" stroke-width="1" opacity="0.11">
        <polygon points="${star(65, 65, 46, 19)}" />
        <polygon points="${star(0, 0, 9, 4)}" />
        <polygon points="${star(130, 0, 9, 4)}" />
        <polygon points="${star(0, 130, 9, 4)}" />
        <polygon points="${star(130, 130, 9, 4)}" />
      </g>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#070706" />
  <rect width="1200" height="630" fill="url(#z)" />

  <g transform="translate(104 108)">
    <polygon points="${star(0, 0, 44, 18)}" fill="#f4c816" />
    <circle r="16" fill="#070706" />
    <circle r="7" fill="#f4c816" />
  </g>

  <text x="72" y="330" font-family="'Arial Black', Arial, Helvetica, sans-serif" font-weight="900" font-size="190" fill="#fbf6e7" letter-spacing="-4">AMBAR</text>

  <rect x="74" y="368" width="140" height="6" fill="#f4c816" />

  <text x="74" y="428" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#fbf6e7">Cocina marroquí halal · El Vendrell</text>
  <text x="74" y="474" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#ded2b6" opacity="0.8">Tajín · Cuscús los viernes · Marisco fresco · Parrilla</text>

  <text x="74" y="566" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#f4c816">4,9 sobre 5 · 154 reseñas en Google</text>
  <text x="1126" y="566" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#ded2b6" opacity="0.65">Ctra. de Valls, 70</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile(OUT, png)
console.log(`✓ public/og.png (${Math.round(png.length / 1024)} KB)`)

/* Icono para iOS (180 × 180), mismo motivo que el favicon. */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#070706" />
  <g transform="translate(90 90)">
    <polygon points="${star(0, 0, 62, 26)}" fill="#f4c816" />
    <circle r="23" fill="#070706" />
    <circle r="10" fill="#f4c816" />
  </g>
</svg>`

const icon = await sharp(Buffer.from(iconSvg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile(path.join(process.cwd(), 'public', 'apple-touch-icon.png'), icon)
console.log(`✓ public/apple-touch-icon.png (${Math.round(icon.length / 1024)} KB)`)
