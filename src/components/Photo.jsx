import { PROTOTIPO } from '../config'
import { photoSpecs, getPhoto } from '../data/photos'
import Icon from './Icons'
import { ZelligePattern, StarMotif } from './Zellige'

const RATIOS = {
  '16/9': 'aspect-[16/9]',
  '4/5': 'aspect-[4/5]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
}

/**
 * Hueco del prototipo.
 *
 * Mantiene la proporción exacta que tendrá la fotografía real (sin saltos de
 * layout), con borde discontinuo fino, icono de cámara y dos líneas:
 * «FALTA FOTO» y una descripción de como máximo cinco palabras.
 *
 * `tone` adapta los colores al fondo: `dark` sobre secciones oscuras y
 * `light` sobre crema. Nunca se usa zellige como sustituto de una foto.
 */
function PrototypePlaceholder({ label, tone = 'dark' }) {
  const dark = tone === 'dark'

  return (
    <div
      role="img"
      aria-label={`Falta foto: ${label}`}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed p-3 text-center sm:gap-3 sm:p-5 ${
        dark
          ? 'border-cream-100/30 bg-maroc-900 text-cream-100'
          : 'border-ink/25 bg-cream-100 text-ink'
      }`}
    >
      <Icon
        name="camera"
        className={`h-5 w-5 shrink-0 sm:h-7 sm:w-7 ${dark ? 'text-gold-400' : 'text-gold-700'}`}
      />
      <p
        className={`text-[10px] font-semibold uppercase leading-none tracking-[0.18em] sm:text-[11px] ${
          dark ? 'text-gold-300' : 'text-gold-700'
        }`}
      >
        FALTA FOTO
      </p>
      <p className="max-w-[18rem] text-[11px] leading-snug sm:text-[13px]">{label}</p>
    </div>
  )
}

/**
 * Hueco de la web real (cuando aún no hay foto).
 * No dice «FOTO PENDIENTE»: dibuja el zellige de la marca con el nombre del
 * plato o del espacio. Cuando se coloque la foto en public/photos/, el
 * componente la sirve automáticamente.
 */
function RealPlaceholder({ title, note = 'Fotografía del restaurante' }) {
  return (
    <div
      role="img"
      aria-label={`${title}. ${note}.`}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-maroc-800 p-6 text-center text-gold-400 sm:p-8"
    >
      <ZelligePattern className="absolute inset-0 h-full w-full opacity-[0.11]" tile={96} />
      <div className="relative flex flex-col items-center">
        <StarMotif className="h-10 w-10 opacity-80" />
        <p className="mt-6 font-display text-3xl italic leading-tight text-cream-100 sm:text-4xl">
          {title}
        </p>
        <p className="mt-3 max-w-[16rem] text-[13px] leading-relaxed text-cream-200/70">{note}</p>
      </div>
    </div>
  )
}

/**
 * Hueco de foto. En el prototipo es un hueco etiquetado; en la web real
 * mantiene el panel de zellige de siempre.
 */
export function PhotoPlaceholder({ label, title, note, tone = 'dark', className = '' }) {
  if (PROTOTIPO) {
    return (
      <div className={`h-full w-full ${className}`}>
        <PrototypePlaceholder label={label || title} tone={tone} />
      </div>
    )
  }

  return <RealPlaceholder title={title || 'Ambar'} note={note} />
}

/**
 * Fotografía responsive con variantes avif/webp/jpg generadas por sharp.
 * Mantiene width/height para CLS 0 y usa un fondo de baja resolución mientras
 * carga. Si la foto no existe, muestra el hueco correspondiente.
 */
export default function Photo({
  photoKey,
  alt,
  title,
  ratio,
  tone = 'dark',
  className = '',
  imgClassName = '',
  eager = false,
  position,
  sizes,
  children,
}) {
  const spec = photoSpecs[photoKey]
  const asset = getPhoto(photoKey)
  const aspect =
    ratio === 'h-full' ? '' : RATIOS[ratio] || RATIOS[spec?.ratio || '4/3']
  const objectPosition = position || asset?.position || spec?.position || 'center'

  if (!asset) {
    const label = spec?.etiqueta || title || 'Fotografía del restaurante'
    return (
      <div className={`relative overflow-hidden ${PROTOTIPO ? '' : 'bg-maroc-800'} ${aspect} ${className}`}>
        <PhotoPlaceholder
          label={label}
          title={title || spec?.alt?.split(',')[0] || 'Ambar'}
          tone={tone}
        />
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
      className={`relative overflow-hidden bg-maroc-800 ${aspect} ${className}`}
      style={placeholder ? { backgroundImage: `url(${placeholder})`, backgroundSize: 'cover', backgroundPosition: objectPosition } : undefined}
    >
      <picture>
        {avif.length > 0 && <source type="image/avif" srcSet={toSrcSet(avif)} sizes={sizes || spec?.sizes || '100vw'} />}
        {webp.length > 0 && <source type="image/webp" srcSet={toSrcSet(webp)} sizes={sizes || spec?.sizes || '100vw'} />}
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
