import sharp from 'sharp'
import fs from 'node:fs'

const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#171a11"/>
    <g fill="#c9973b">
      <rect x="9" y="9" width="14" height="14"/>
      <rect x="9" y="9" width="14" height="14" transform="rotate(45 16 16)"/>
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
