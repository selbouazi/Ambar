import Icon from './Icons'
import { mapsHref } from '../data/site'

/**
 * Reseña de Google. Texto fiel (con «…» si es un extracto), nombre abreviado
 * y atribución a Google. No se pintan estrellas por reseña: no se verificó la
 * puntuación individual en Maps.
 */
export default function ReviewCard({ review, featured = false, className = '' }) {
  return (
    <figure
      className={`flex h-full flex-col justify-between border p-6 sm:p-8 ${
        featured
          ? 'border-gold-500/70 bg-night-800'
          : 'border-cream-100/15 bg-night-900'
      } ${className}`}
    >
      <div>
        <Icon name="quote" className="h-6 w-6 text-gold-500" />
        <blockquote
          className={`mt-4 leading-[1.5] text-cream-100 ${
            featured ? 'font-display text-[23px] uppercase tracking-wide sm:text-[27px]' : 'text-[17px]'
          }`}
        >
          {review.text}
        </blockquote>
      </div>

      <figcaption className="mt-7 flex items-center gap-3 border-t border-cream-100/12 pt-4">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-500/50 font-display text-sm uppercase text-gold-400"
          aria-hidden="true"
        >
          {review.author ? review.author.charAt(0) : 'G'}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-medium text-cream-50">
            {review.author || 'Reseña de Google'}
          </span>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-underline text-[12px] text-cream-200/65"
          >
            {review.sourceLabel}
          </a>
        </span>
      </figcaption>
    </figure>
  )
}

/** Frase del resumen de Google, sin nombre. */
export function HighlightCard({ text, className = '' }) {
  return (
    <figure className={`border-l-2 border-gold-500 bg-night-900 px-5 py-4 ${className}`}>
      <blockquote className="font-brush text-[21px] leading-snug text-cream-100">«{text}»</blockquote>
      <figcaption className="mt-2 text-[12px] uppercase tracking-[0.14em] text-cream-200/60">
        Resumen de Google
      </figcaption>
    </figure>
  )
}
