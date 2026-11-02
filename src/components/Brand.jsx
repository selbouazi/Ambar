/**
 * Marca Ambar. El logotipo real lo aporta el titular y se procesa con
 * `npm run brand` a partir de `src/assets/photos/raw/propietario-2026-11/`.
 * Las variantes viven en `public/brand/` para que el logo del nav no cargue el
 * original completo.
 */

const LOGO_SRC = '/brand/ambar-logo-160.png'
const LOGO_SRC_SET = '/brand/ambar-logo-160.png 160w, /brand/ambar-logo-320.png 320w'

export function LogoMark({ className = 'h-11', alt = 'Ambar · restaurante halal' }) {
  return (
    <img
      src={LOGO_SRC}
      srcSet={LOGO_SRC_SET}
      sizes="(min-width: 640px) 90px, 70px"
      width="552"
      height="407"
      alt={alt}
      decoding="async"
      className={`w-auto object-contain ${className}`}
    />
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
