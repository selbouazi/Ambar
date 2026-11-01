/**
 * Genera la imagen social (Open Graph) de 1200 × 630 a partir de un SVG.
 *
 *   npm run og
 *
 * No usa fotografías de archivo: dibuja la retícula de zellige y el logotipo
 * con los colores de la marca. Cuando exista una foto real del local, se puede
 * sustituir este fondo por `public/photos/hero-interior.jpg`.
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
    <pattern id="z" width="120" height="120" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="#c9973b" stroke-width="1" opacity="0.13">
        <polygon points="${star(60, 60, 43, 18)}" />
        <polygon points="${star(0, 0, 9, 4)}" />
        <polygon points="${star(120, 0, 9, 4)}" />
        <polygon points="${star(0, 120, 9, 4)}" />
        <polygon points="${star(120, 120, 9, 4)}" />
      </g>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#171a11" />
  <rect width="1200" height="630" fill="url(#z)" />

  <rect x="72" y="86" width="44" height="44" fill="#c9973b" opacity="0.9" />
  <rect x="72" y="86" width="44" height="44" fill="#c9973b" opacity="0.9" transform="rotate(45 94 108)" />

  <text x="72" y="300" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="176" fill="#faf6ec" letter-spacing="-6">Ambar</text>

  <rect x="72" y="352" width="120" height="2" fill="#c9973b" />

  <text x="72" y="412" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#efe6d2">Cocina marroquí halal · El Vendrell</text>
  <text x="72" y="460" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#efe6d2" opacity="0.62">Tajín · Cuscús los viernes · Marisco fresco · Desayunos</text>

  <text x="72" y="566" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#e0b45c">4,9 sobre 5 · 153 reseñas en Google</text>
  <text x="1128" y="566" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#efe6d2" opacity="0.55">Ctra. de Valls, 70</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile(OUT, png)
console.log(`✓ public/og.png (${Math.round(png.length / 1024)} KB)`)

/* Icono para iOS (180 × 180), mismo motivo que el favicon. */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#171a11" />
  <g fill="#c9973b">
    <rect x="52" y="52" width="76" height="76" />
    <rect x="52" y="52" width="76" height="76" transform="rotate(45 90 90)" />
  </g>
</svg>`

const icon = await sharp(Buffer.from(iconSvg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile(path.join(process.cwd(), 'public', 'apple-touch-icon.png'), icon)
console.log(`✓ public/apple-touch-icon.png (${Math.round(icon.length / 1024)} KB)`)
