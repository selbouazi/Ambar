import { useState } from 'react'
import Icon from './Icons'
import { business, mapsHref } from '../data/business'

/**
 * Mapa de Google con carga diferida por interacción.
 *
 * No se incrusta nada de Google hasta que el visitante pulsa «Ver el mapa»:
 * así no se instalan cookies de terceros en la primera visita y la página
 * carga mucho más rápido. También hay un enlace directo a Google Maps.
 *
 * En el prototipo no hay mapa ni enlaces: se muestra un hueco etiquetado.
 */
export default function MapEmbed({ className = '' }) {
  const [loaded, setLoaded] = useState(false)

  if (!business.links.mapsEmbed) {
    return (
      <div
        className={`flex h-full min-h-[320px] flex-col items-center justify-center gap-3 border border-dashed border-ink/25 bg-cream-100 p-8 text-center text-ink ${className}`}
      >
        <Icon name="pin" className="h-7 w-7 text-gold-700" />
        <p className="text-[15px] font-medium">Aquí irá el mapa de Google</p>
        <p className="max-w-xs text-[13px] leading-relaxed text-ink-mute">
          {business.address.full}
        </p>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-maroc-800 ${className}`}>
      {loaded ? (
        <iframe
          src={business.links.mapsEmbed}
          title={`Mapa para llegar a ${business.name}, ${business.address.full}`}
          className="h-full min-h-[320px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center gap-5 p-8 text-center">
          <Icon name="pin" className="relative h-8 w-8 text-gold-400" />
          <p className="relative max-w-xs text-[15px] leading-relaxed text-cream-200/70">
            {business.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="relative min-h-11 rounded-full bg-gold-500 px-5 text-[14px] font-semibold text-maroc-950 transition-colors hover:bg-gold-400"
          >
            Ver el mapa
          </button>
          <p className="relative text-[12px] leading-relaxed text-cream-200/70">
            Al cargarlo, Google puede usar cookies. También puedes{' '}
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-underline text-gold-300"
            >
              abrirlo en Google Maps
            </a>
            .
          </p>
        </div>
      )}
    </div>
  )
}

/** Enlace directo a Google Maps, para quien prefiere abrirlo en su app. */
export function MapsLink({ children, className = '' }) {
  return (
    <a
      href={mapsHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
