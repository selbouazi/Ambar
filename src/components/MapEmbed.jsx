import { useState } from 'react'
import Icon from './Icons'
import Photo from './Photo'
import { site, mapsHref, directionsHref } from '../data/site'

/**
 * Mapa de Google con carga diferida por interacción.
 * No se incrusta nada de Google hasta que el visitante pulsa «Cargar mapa»:
 * así no se instalan cookies de terceros en la primera visita.
 */
export default function MapEmbed({ className = '' }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden border border-gold-500/60 bg-night-800 ${className}`}>
      {loaded ? (
        <iframe
          src={site.links.mapsEmbed}
          title={`Mapa para llegar a ${site.name}, ${site.address.full}`}
          className="h-full min-h-[340px] w-full border-0 lg:min-h-[400px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="relative flex h-full min-h-[340px] flex-col justify-between p-6 lg:min-h-[400px] lg:p-8">
          <Photo
            photoKey="galeria04"
            ratio="h-full"
            className="absolute inset-0 h-full"
            imgClassName="opacity-25"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute inset-0 bg-night-950/65" aria-hidden="true" />

          <div className="relative flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-500 text-night-950">
              <Icon name="pin" className="h-5 w-5" />
            </span>
            <address className="not-italic">
              <p className="font-display text-[22px] uppercase leading-tight text-cream-50">
                Restaurante Halal Ambar
              </p>
              {site.addressLines.map((line) => (
                <span key={line} className="block text-[14px] leading-relaxed text-cream-200/80">
                  {line}
                </span>
              ))}
              <span className="mt-1 block text-[12px] text-cream-200/65">
                Plus Code {site.address.plusCode}
              </span>
            </address>
          </div>

          <div className="relative mt-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="min-h-11 rounded-sm bg-gold-500 px-5 text-[13px] font-bold uppercase tracking-[0.08em] text-night-950 transition-colors hover:bg-gold-400"
              >
                Cargar mapa
              </button>
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-cream-100/45 px-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <Icon name="arrow" className="h-4 w-4" />
                Cómo llegar
              </a>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-underline inline-flex min-h-11 items-center text-[13px] text-cream-200/80 hover:text-gold-300"
              >
                Abrir en Google Maps
              </a>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-cream-200/65">
              Al cargarlo, Google puede usar cookies. Si no quieres, abre el mapa en una pestaña nueva.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function MapsLink({ children, className = '' }) {
  return (
    <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}
