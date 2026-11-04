/**
 * Marca Ambar. El logotipo real lo aporta el titular y se procesa con
 * `npm run brand` a partir de `src/assets/photos/raw/propietario-2026-11/`.
 * Las variantes viven en `public/brand/` para que el logo del nav no cargue el
 * original completo.
 */

const LOGO_SRC = '/brand/ambar-logo-160.png'
const LOGO_SRC_SET = '/brand/ambar-logo-160.png 160w, /brand/ambar-logo-320.png 320w'
const LOGO_SRC_SET_WEBP = '/brand/ambar-logo-160.webp 160w, /brand/ambar-logo-320.webp 320w'
const LOGO_SIZES = '(min-width: 640px) 90px, 70px'

export function LogoMark({ className = 'h-11', alt = 'Ambar · restaurante halal' }) {
  return (
    <picture>
      <source type="image/webp" srcSet={LOGO_SRC_SET_WEBP} sizes={LOGO_SIZES} />
      <img
        src={LOGO_SRC}
        srcSet={LOGO_SRC_SET}
        sizes={LOGO_SIZES}
        width="552"
        height="407"
        alt={alt}
        decoding="async"
        className={`w-auto object-contain ${className}`}
      />
    </picture>
  )
}

/** Logotipo textual: Anton, sin degradado ni mayúsculas forzadas. */
export function Wordmark({ className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`font-display leading-none tracking-[-0.015em] text-cream-50 ${className}`}>
      Ambar
    </Tag>
  )
}
