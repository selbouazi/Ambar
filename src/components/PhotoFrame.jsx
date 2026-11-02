import Photo from './Photo'

/**
 * Foto enmarcada como en la cabecera de la carta: filete fino amarillo y un
 * segundo marco desplazado. La inclinación es mínima para no marear.
 */
export default function PhotoFrame({
  photoKey,
  alt,
  caption,
  ratio = '4/3',
  tilt = 'left',
  className = '',
  sizes,
  eager = false,
}) {
  const rotation = tilt === 'right' ? 'rotate-[1.1deg]' : tilt === 'none' ? '' : '-rotate-[1.1deg]'

  return (
    <figure className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className={`absolute -bottom-2.5 -right-2.5 top-2.5 left-2.5 border border-gold-500/55 ${rotation}`}
      />
      <div className={`relative border border-gold-500 bg-night-900 p-1.5 ${rotation}`}>
        <Photo
          photoKey={photoKey}
          alt={alt}
          ratio={ratio}
          sizes={sizes}
          eager={eager}
          imgClassName="transition-transform duration-[900ms] ease-out hover:scale-[1.015]"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 font-brush text-[18px] leading-snug text-cream-200/80">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
