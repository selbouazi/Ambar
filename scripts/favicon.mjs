import sharp from 'sharp'
import fs from 'node:fs'

function star(cx, cy, outer, inner) {
  const points = []
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (-90 + i * 22.5) * (Math.PI / 180)
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`)
  }
  return points.join(' ')
}

const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#070706"/>
    <g transform="translate(16 16)">
      <polygon points="${star(0, 0, 11, 4.6)}" fill="#f4c816"/>
      <circle r="4.2" fill="#070706"/>
      <circle r="1.9" fill="#f4c816"/>
    </g>
  </svg>`,
)

const png = await sharp(svg).resize(32, 32).png().toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
header.writeUInt8(32, 6)
header.writeUInt8(32, 7)
header.writeUInt8(0, 8)
header.writeUInt8(0, 9)
header.writeUInt16LE(1, 10)
header.writeUInt16LE(32, 12)
header.writeUInt32LE(png.length, 14)
header.writeUInt32LE(22, 18)

fs.writeFileSync('public/favicon.ico', Buffer.concat([header, png]))
console.log('favicon.ico', 22 + png.length, 'bytes')
