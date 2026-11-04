import Icon from './Icons'
import { mapsHref } from '../data/site'

/**
 * Reseña de Google. Texto fiel, sin mayúsculas forzadas y con comillas
 * tipográficas. No se pintan estrellas por reseña: no se verificó la
 * puntuación individual en Maps.
 */
export default function ReviewCard({ review, featured = false, tone = 'dark', className = '' }) {
  const light = tone === 'light'
  const border = light
    ? featured
      ? 'border-gold-700/55 bg-cream-100'
      : 'border-ink/15'
    : featured
      ? 'border-gold-500/55 bg-night-800'
      : 'border-cream-100/15 bg-night-900'

  return (
    <figure className={`flex h-full flex-col justify-between border p-6 sm:p-8 ${border} ${className}`}>
      <div>
        <Icon name="quote" className={`h-5 w-5 ${light ? 'text-gold-700' : 'text-gold-500'}`} />
        <blockquote
          className={`mt-4 ${light ? 'text-ink' : 'text-cream-100'} ${
            featured
              ? 'text-[21px] leading-[1.45] sm:text-[24px]'
              : 'text-[16px] leading-[1.6] sm:text-[17px]'
          }`}
        >
          «{review.text}»
        </blockquote>
      </div>

      <figcaption className={`mt-7 flex items-center gap-3 border-t pt-4 ${light ? 'border-ink/12' : 'border-cream-100/12'}`}>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border font-display text-sm ${
            light ? 'border-gold-700/50 text-gold-700' : 'border-gold-500/50 text-gold-400'
          }`}
          aria-hidden="true"
        >
          {review.author ? review.author.charAt(0) : 'G'}
        </span>
        <span className="min-w-0">
          <span className={`block truncate text-[14px] font-medium ${light ? 'text-ink' : 'text-cream-50'}`}>
            {review.author || 'Reseña de Google'}
          </span>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`gold-underline inline-block py-1 text-[13px] ${light ? 'text-ink-mute' : 'text-cream-200'}`}
          >
            {review.sourceLabel}
          </a>
        </span>
      </figcaption>
    </figure>
  )
}

/** Frase del resumen de Google, sin nombre. */
export function HighlightCard({ text, tone = 'dark', className = '' }) {
  const light = tone === 'light'
  return (
    <figure className={`border-l-2 px-5 py-4 ${light ? 'border-gold-700' : 'border-gold-500'} ${className}`}>
      <blockquote className={`text-[17px] leading-[1.6] ${light ? 'text-ink' : 'text-cream-100'}`}>
        «{text}»
      </blockquote>
      <figcaption className={`mt-2 text-[13px] ${light ? 'text-ink-mute' : 'text-cream-200'}`}>
        Resumen de Google
      </figcaption>
    </figure>
  )
}
