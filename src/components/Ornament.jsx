import { useId } from 'react'

/**
 * Ornamentos de la carta física: estrella octogonal halal, hojas de palma y
 * filetes punteados. Se usan con cuentagotas: la foto y la tipografía mandan.
 */

function octagramPoints(cx, cy, outer, inner) {
  const points = []
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (-90 + i * 22.5) * (Math.PI / 180)
    points.push(
      `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`,
    )
  }
  return points.join(' ')
}

/** Trama de estrellas octogonales, la textura de la carta. */
export function StarPattern({ className = '', tile = 150, strokeWidth = 1 }) {
  const rawId = useId()
  const id = `stars-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const half = tile / 2

  return (
    <svg className={className} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
            <polygon points={octagramPoints(half, half, tile * 0.34, tile * 0.145)} />
            <polygon
              points={octagramPoints(half, half, tile * 0.17, tile * 0.073)}
              opacity="0.65"
            />
            {[
              [0, 0],
              [tile, 0],
              [0, tile],
              [tile, tile],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={tile * 0.035} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Una estrella octogonal suelta, para viñetas y divisores. */
export function StarMotif({ className = 'h-6 w-6', filled = false }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <polygon points={octagramPoints(24, 24, 21, 9)} />
      <polygon points={octagramPoints(24, 24, 12.5, 5.2)} opacity="0.55" />
    </svg>
  )
}

/** Filete punteado con estrella central, como los separadores de la carta. */
export function DottedRule({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 border-t border-dotted border-gold-500/45" />
      <StarMotif className="h-4 w-4 shrink-0 text-gold-500" />
      <span className="h-px flex-1 border-t border-dotted border-gold-500/45" />
    </div>
  )
}

/** Sello halal de la carta: estrella de ocho puntas y texto curvo. */
export function HalalSeal({ className = 'h-16 w-16' }) {
  const rawId = useId()
  const pathId = `seal-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="37" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="40" r="32.5" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
      <path id={pathId} d="M40 9.5a30.5 30.5 0 0 1 30.5 30.5" fill="none" stroke="none" />
      <text fontSize="6.2" letterSpacing="1.7" fill="currentColor" fontWeight="600">
        <textPath href={`#${pathId}`} startOffset="0">
          HALAL FOOD · REST. AMBAR ·
        </textPath>
      </text>
      <polygon points={octagramPoints(40, 40, 15, 6.4)} fill="currentColor" stroke="none" />
      <polygon points={octagramPoints(40, 40, 7.5, 3.2)} fill="none" stroke="#100f0c" strokeWidth="1" />
    </svg>
  )
}

/**
 * Hoja de palma/menta, decorativa. Solo aparece dos o tres veces en toda la
 * web y siempre a baja opacidad.
 */
export function Leaf({ className = '' }) {
  return (
    <svg viewBox="0 0 120 160" className={className} fill="none" aria-hidden="true">
      <path
        d="M58 154C55 120 52 78 70 36c10-24 26-28 40-30-2 22-8 43-22 60-12 15-26 24-30 44-4 18 0 30 0 44Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path d="M58 154C55 120 52 78 70 36c10-24 26-28 40-30" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M60 150C50 126 34 110 14 104c6 20 20 34 40 40M62 128C55 108 42 94 24 88c5 16 18 30 34 36M66 104c-5-17-14-29-28-38 3 15 13 28 26 36M72 80c-2-15-8-27-18-36 1 13 8 25 18 33M80 58c1-13-3-24-10-33-1 12 3 23 10 31"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />
    </svg>
  )
}
