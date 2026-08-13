import { useState } from 'react'
import Icon from './Icons'
import { ZelligeGrain, Diamond } from './Zellige'

export function PhotoPlaceholder({ label, className = '' }) {
  return (
    <div
      role="img"
      aria-label={`Fotografía pendiente de ${label}. El cliente debe sustituir el archivo de imagen.`}
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-gold-400/25 bg-maroc-800 text-center md:rounded-[2.5rem] ${className}`}
    >
      <ZelligeGrain className="absolute inset-0 h-full w-full text-gold-400 opacity-[0.07]" />
      <div className="relative px-6">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold-400/40 text-gold-400">
          <Icon name="camera" className="h-5 w-5" />
        </span>
        <p className="mt-4 font-display text-lg italic text-cream-200">
          Fotografía en camino
        </p>
        <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-gold-400">
          <span className="h-px w-6 bg-current opacity-60" />
          <Diamond className="h-1.5 w-1.5" />
          <span className="h-px w-6 bg-current opacity-60" />
        </div>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-300">
          [FOTO PENDIENTE: {label}]
        </p>
      </div>
    </div>
  )
}

export default function Photo({
  src,
  label,
  alt,
  ratio = 'aspect-[4/3]',
  className = '',
  rounded = 'rounded-[1.75rem] md:rounded-[2.5rem]',
  eager = false,
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-maroc-800 ${ratio} ${rounded} ${className}`}
    >
      {failed ? (
        <PhotoPlaceholder label={label} className="rounded-none" />
      ) : (
        <img
          src={src}
          alt={alt || `Fotografía del restaurante: ${label}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}