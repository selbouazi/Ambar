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
        <StarMotif className="h-12 w-12" />
        <p className="mt-6 max-w-[18rem] font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[0.95] text-cream-50">
          {title}
        </p>
        <p className="mt-3 max-w-[17rem] text-[14px] leading-relaxed text-cream-200">{note}</p>
      </div>
    </div>
  )
}

/**
 * Fotografía responsive con variantes avif/webp/jpg generadas por sharp.
 * Mantiene width/height para CLS 0. No usa fondo de baja resolución: esa
 * segunda descarga competía con el JavaScript y con la foto grande, y solo se
 * veía un instante. Mientras carga queda el fondo `night-800` de la caja.
 * Si la foto no existe, muestra un panel de marca.
 */
export default function Photo({
  photoKey,
  mobilePhotoKey,
  alt,
  title,
  note,
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
  const mobileAsset = mobilePhotoKey ? getPhoto(mobilePhotoKey) : undefined
  const aspect = ratio === 'h-full' ? '' : RATIOS[ratio] || RATIOS[spec?.ratio || '4/3']
  const objectPosition = position || asset?.position || spec?.position || 'center'

  if (!asset) {
    return (
      <div className={`relative overflow-hidden bg-night-800 ${aspect} ${className}`}>
        <BrandPanel title={title || 'Ambar'} note={note} />
        {children}
      </div>
    )
  }

  const avif = asset.formats.avif ?? []
  const webp = asset.formats.webp ?? []
  const jpg = asset.formats.jpg ?? []
  const toSrcSet = (list) => list.map((v) => `${v.src} ${v.width}w`).join(', ')
  const fallback = jpg.at(-1) || webp.at(-1)

  return (
    <div className={`relative overflow-hidden bg-night-800 ${aspect} ${className}`}>
      <picture>
        {mobileAsset?.formats.avif?.length ? (
          <source
            media="(max-width: 1023px)"
            type="image/avif"
            srcSet={toSrcSet(mobileAsset.formats.avif)}
            sizes={sizes || '100vw'}
          />
        ) : null}
        {mobileAsset?.formats.webp?.length ? (
          <source
            media="(max-width: 1023px)"
            type="image/webp"
            srcSet={toSrcSet(mobileAsset.formats.webp)}
            sizes={sizes || '100vw'}
          />
        ) : null}
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
          fetchpriority={eager || spec?.priority ? 'high' : 'auto'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition }}
        />
      </picture>
      {children}
    </div>
  )
}
