import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icons'
import Photo from './Photo'
import { galleryPhotos, photoSpecs } from '../data/photos'

/**
 * Galería de fotos reales del restaurante, con el marco amarillo de la carta.
 * Se alimenta de las claves `galeria-*` del manifiesto y solo aparece si hay
 * al menos cuatro fotos.
 */
export default function Gallery({ className = '' }) {
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
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {photos.map((key, i) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full border border-gold-500/80 p-1.5 text-left transition-colors hover:border-gold-400"
              aria-label={`Ampliar foto: ${photoSpecs[key].alt}`}
            >
              <Photo
                photoKey={key}
                ratio="4/3"
                className="transition-opacity duration-300 group-hover:opacity-85"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <span className="pointer-events-none absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-night-950/80 text-gold-400 opacity-0 transition-opacity group-hover:opacity-100">
                <Icon name="plus" className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos del restaurante"
          className="fixed inset-0 z-[60] flex flex-col bg-night-950/97"
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
              className="grid h-11 w-11 place-items-center rounded-sm border border-cream-100/30 hover:border-gold-400"
              aria-label="Cerrar galería"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-4 px-4 pb-6 sm:px-8">
            <button
              type="button"
              onClick={() => step(-1)}
              className="hidden h-12 w-12 shrink-0 place-items-center rounded-sm border border-cream-100/30 text-cream-100 hover:border-gold-400 sm:grid"
              aria-label="Foto anterior"
            >
              <Icon name="arrow" className="h-5 w-5 rotate-180" />
            </button>

            <figure className="max-h-full min-w-0 flex-1">
              <Photo
                photoKey={current}
                ratio="4/3"
                className="mx-auto max-h-[75vh] max-w-5xl border border-gold-500/70 p-1.5"
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
              className="hidden h-12 w-12 shrink-0 place-items-center rounded-sm border border-cream-100/30 text-cream-100 hover:border-gold-400 sm:grid"
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
