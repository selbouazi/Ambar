import { photoSpecs, getPhoto } from '../data/photos'
import { StarPattern, StarMotif } from './Ornament'

const RATIOS = {
  '16/9': 'aspect-[16/9]',
  '4/5': 'aspect-[4/5]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
}

/** Panel de marca si todavía falta una foto: nunca una caja vacía. */
function BrandPanel({ title, note = 'Fotografía del restaurante' }) {
  return (
    <div
      role="img"
      aria-label={`${title}. ${note}.`}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-night-800 p-6 text-center text-gold-500"
    >
      <StarPattern className="absolute inset-0 h-full w-full star-texture" tile={110} />
      <div className="relative flex flex-col items-center">
        <StarMotif className="h-9 w-9" />
        <p className="mt-5 font-display text-2xl uppercase leading-tight text-cream-50">{title}</p>
        <p className="mt-2 max-w-[16rem] text-[13px] leading-relaxed text-cream-200/70">{note}</p>
      </div>
    </div>
  )
}

/**
 * Fotografía responsive con variantes avif/webp/jpg generadas por sharp.
 * Mantiene width/height para CLS 0 y usa un fondo de baja resolución mientras
 * carga. Si la foto no existe, muestra un panel de marca.
 */
export default function Photo({
  photoKey,
  alt,
  title,
  ratio,
  className = '',
  imgClassName = '',
  eager = false,
  position,
  sizes,
  children,
}) {
  const spec = photoSpecs[photoKey]
  const asset = getPhoto(photoKey)
  const aspect = ratio === 'h-full' ? '' : RATIOS[ratio] || RATIOS[spec?.ratio || '4/3']
  const objectPosition = position || asset?.position || spec?.position || 'center'

  if (!asset) {
    return (
      <div className={`relative overflow-hidden bg-night-800 ${aspect} ${className}`}>
        <BrandPanel title={title || 'Ambar'} />
        {children}
      </div>
    )
  }

  const avif = asset.formats.avif ?? []
  const webp = asset.formats.webp ?? []
  const jpg = asset.formats.jpg ?? []
  const toSrcSet = (list) => list.map((v) => `${v.src} ${v.width}w`).join(', ')
  const fallback = jpg.at(-1) || webp.at(-1)
  const placeholder = webp[0]?.src || fallback?.src

  return (
    <div
      className={`relative overflow-hidden bg-night-800 ${aspect} ${className}`}
      style={
        placeholder
          ? {
              backgroundImage: `url(${placeholder})`,
              backgroundSize: 'cover',
              backgroundPosition: objectPosition,
            }
          : undefined
      }
    >
      <picture>
        {avif.length > 0 && (
          <source type="image/avif" srcSet={toSrcSet(avif)} sizes={sizes || spec?.sizes || '100vw'} />
        )}
        {webp.length > 0 && (
          <source type="image/webp" srcSet={toSrcSet(webp)} sizes={sizes || spec?.sizes || '100vw'} />
        )}
        <img
          src={fallback?.src}
          srcSet={jpg.length > 0 ? toSrcSet(jpg) : undefined}
          sizes={sizes || spec?.sizes || '100vw'}
          width={asset.width}
          height={asset.height}
          alt={alt || spec?.alt || ''}
          loading={eager || spec?.priority ? 'eager' : 'lazy'}
          fetchPriority={eager || spec?.priority ? 'high' : 'auto'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition }}
        />
      </picture>
      {children}
    </div>
  )
}
