import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icons'
import Photo from './Photo'
import { PROTOTIPO } from '../config'
import { galleryPhotos, photoSpecs, PROTOTYPE_GALLERY } from '../data/photos'

/** Cuatro huecos etiquetados: así se ve dónde irán las fotos reales. */
function GalleryPlaceholders({ className = '' }) {
  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {PROTOTYPE_GALLERY.map((key) => (
          <li key={key}>
            <Photo photoKey={key} ratio="4/3" tone="light" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Galería de fotos reales del restaurante. Se alimenta sola de las claves
 * `galeria-*.jpg` del manifiesto y solo se renderiza si hay 4 o más.
 */
function RealGallery({ className = '' }) {
  const photos = galleryPhotos()
  const [index, setIndex] = useState(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)
  const touchStart = useRef(null)

  const open = (i) => {
    lastFocused.current = document.activeElement
    setIndex(i)
  }

  const close = useCallback(() => {
    setIndex(null)
    lastFocused.current?.focus?.()
  }, [])

  const step = useCallback(
    (delta) => {
      setIndex((current) => {
        if (current === null) return current
        return (current + delta + photos.length) % photos.length
      })
    },
    [photos.length],
  )

  useEffect(() => {
    if (index === null) return

    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [index, close, step])

  if (photos.length < 4) return null

  const current = index !== null ? photos[index] : null

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {photos.map((key, i) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group block w-full text-left"
              aria-label={`Ampliar foto: ${photoSpecs[key].alt}`}
            >
              <Photo
                photoKey={key}
                ratio="4/3"
                tone="light"
                className="transition-opacity duration-300 group-hover:opacity-85"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
              />
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos del restaurante"
          className="fixed inset-0 z-[60] flex flex-col bg-maroc-950/97"
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return
            const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current
            if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1)
            touchStart.current = null
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 text-cream-100 sm:px-8">
            <p className="text-sm text-cream-200/70">
              {index + 1} / {photos.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="grid h-11 w-11 place-items-center rounded-full border border-cream-100/30 hover:border-gold-400"
              aria-label="Cerrar galería"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-4 px-4 pb-6 sm:px-8">
            <button
              type="button"
              onClick={() => step(-1)}
              className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-cream-100/30 text-cream-100 hover:border-gold-400 sm:grid"
              aria-label="Foto anterior"
            >
              <Icon name="arrow" className="h-5 w-5 rotate-180" />
            </button>

            <figure className="max-h-full min-w-0 flex-1">
              <Photo
                photoKey={current}
                ratio="4/3"
                className="mx-auto max-h-[75vh] max-w-5xl"
                sizes="90vw"
                eager
              />
              <figcaption className="mx-auto mt-4 max-w-3xl text-center text-sm text-cream-200/65">
                {photoSpecs[current].alt}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-cream-100/30 text-cream-100 hover:border-gold-400 sm:grid"
              aria-label="Foto siguiente"
            >
              <Icon name="arrow" className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Gallery({ className = '' }) {
  if (PROTOTIPO) return <GalleryPlaceholders className={className} />
  return <RealGallery className={className} />
}
