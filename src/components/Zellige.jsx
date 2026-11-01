import { useId } from 'react'

/** Estrella de ocho puntas (khatam) centrada en (cx, cy). */
function starPoints(cx, cy, outer, inner) {
  const points = []
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (-90 + i * 22.5) * (Math.PI / 180)
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`)
  }
  return points.join(' ')
}

/**
 * Retícula de zellige: estrellas de ocho puntas y rombos en las esquinas.
 * Es la textura y la retícula de la marca; se usa a tres escalas.
 */
export function ZelligePattern({
  className = '',
  tile = 120,
  strokeWidth = 1,
  inner = true,
}) {
  const rawId = useId()
  const id = `zellige-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`
  const half = tile / 2
  const outer = tile * 0.36
  const innerR = tile * 0.15
  const diamond = tile * 0.075

  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
            <polygon points={starPoints(half, half, outer, innerR)} />
            {inner && <polygon points={starPoints(half, half, outer * 0.56, innerR * 0.56)} opacity="0.7" />}
            {[
              [0, 0],
              [tile, 0],
              [0, tile],
              [tile, tile],
            ].map(([x, y]) => (
              <polygon
                key={`${x}-${y}`}
                points={`${x},${y - diamond} ${x + diamond},${y} ${x},${y + diamond} ${x - diamond},${y}`}
              />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Una sola estrella de ocho puntas, para sellos y divisores. */
export function StarMotif({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <polygon points={starPoints(24, 24, 21, 9)} />
      <polygon points={starPoints(24, 24, 12, 5)} opacity="0.55" />
    </svg>
  )
}

/** Filete divisor con estrella central. */
export function ZelligeRule({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-25" />
      <StarMotif className="h-4 w-4 shrink-0" />
      <span className="h-px flex-1 bg-current opacity-25" />
    </div>
  )
}

/**
 * Sello halal: círculo fino con texto curvo y estrella central.
 * No es una certificación oficial: describe la cocina del restaurante.
 */
export function HalalSeal({ className = 'h-16 w-16' }) {
  const rawId = useId()
  const pathId = `seal-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="40" cy="40" r="31.5" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
      <path id={pathId} d="M40 9.5a30.5 30.5 0 0 1 30.5 30.5" fill="none" stroke="none" />
      <text fontSize="6.4" letterSpacing="1.9" fill="currentColor" fontWeight="500">
        <textPath href={`#${pathId}`} startOffset="0">
          HALAL FOOD · REST. AMBAR ·
        </textPath>
      </text>
      <polygon points={starPoints(40, 40, 15, 6.4)} fill="currentColor" stroke="none" />
    </svg>
  )
}
