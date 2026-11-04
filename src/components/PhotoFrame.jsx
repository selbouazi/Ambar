import Photo from './Photo'

/**
 * Fotografía editorial: sin marcos, sin inclinación y sin sombra.
 * El pie es opcional y se lee como una nota de carta, no como decoración.
 */
export default function PhotoFrame({
  photoKey,
  alt,
  title,
  note,
  caption,
  ratio = '4/3',
  tone = 'dark',
  className = '',
  sizes,
  eager = false,
}) {
  return (
    <figure className={className}>
      <Photo
        photoKey={photoKey}
        alt={alt}
        title={title}
        note={note}
        ratio={ratio}
        sizes={sizes}
        eager={eager}
        imgClassName="transition-transform duration-200 ease-out hover:scale-[1.01]"
      />
      {caption && (
        <figcaption className={`mt-3 text-[13px] leading-snug ${tone === 'light' ? 'text-ink-mute' : 'text-cream-200'}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
