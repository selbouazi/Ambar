/**
 * Marca Ambar: emblema circular con cubiertos y cinta amarilla, como el
 * cartel de la carta. Se dibuja en SVG para que escale sin perder nitidez.
 * Sustituir por el original vectorial del titular cuando lo facilite.
 */
export function LogoMark({ className = 'h-11 w-11', showRibbon = true }) {
  return (
    <svg viewBox="0 0 96 96" className={className} role="img" aria-label="Ambar · restaurante halal">
      <defs>
        <linearGradient id="ambar-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe48a" />
          <stop offset="0.55" stopColor="#f4c816" />
          <stop offset="1" stopColor="#d0a70a" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="44" r="33" fill="#070706" stroke="url(#ambar-ring)" strokeWidth="3" />
      <circle cx="48" cy="44" r="28" fill="none" stroke="#f4c816" strokeWidth="1" opacity="0.5" />
      {/* Tenedor */}
      <g stroke="#f4c816" strokeWidth="2.1" strokeLinecap="round" fill="none">
        <path d="M37 24v15M33 24v8M41 24v8M37 39v20" />
        <path d="M33 32c0 3 1.8 5 4 5s4-2 4-5" />
        {/* Cuchillo */}
        <path d="M57 24c4 5 5 12 2 17-1 2-2 3-2 5v13" />
        <path d="M57 24v16" />
        {/* Cuchara */}
        <path d="M48 54c-4 0-6 3-6 6 0 3 2 5 6 5s6-2 6-5c0-3-2-6-6-6Z" />
        <path d="M48 65v6" />
      </g>
      {showRibbon && (
        <g>
          <path d="M9 70h78l-6 14H15L9 70Z" fill="#f4c816" />
          <path d="M9 70h78l-1.5 3.5H10.5L9 70Z" fill="#070706" opacity="0.16" />
          <text
            x="48"
            y="80.4"
            textAnchor="middle"
            fill="#070706"
            fontSize="7.4"
            fontWeight="700"
            letterSpacing="0.9"
            fontFamily="Inter, Arial, sans-serif"
          >
            REST. AMBAR · HALAL
          </text>
        </g>
      )}
    </svg>
  )
}

/** Logotipo textual: mayúsculas condensadas con degradado amarillo. */
export function Wordmark({ className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 bg-clip-text font-display uppercase leading-none tracking-[0.02em] text-transparent ${className}`}
    >
      Ambar
    </Tag>
  )
}
