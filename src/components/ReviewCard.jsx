import Icon from './Icons'
import { mapsHref } from '../data/business'

function Stars({ className = '' }) {
  return (
    <span className={`flex items-center gap-0.5 ${className}`} role="img" aria-label="5 de 5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
        </svg>
      ))}
    </span>
  )
}

/**
 * Reseña de Google. Se atribuye a «Reseña en Google» y enlaza a la ficha.
 * No se inventan nombres ni textos.
 *
 * En el prototipo (`mapsHref === '#'`) no hay enlace: el texto se muestra
 * como una etiqueta más, sin apuntar a Google.
 */
export default function ReviewCard({ review, featured = false, className = '' }) {
  const hasAuthor = Boolean(review.author)
  const linked = mapsHref && mapsHref !== '#'
  const metaTone = featured ? 'text-cream-200/70' : 'text-ink-mute'

  const meta = linked ? (
    <a
      href={mapsHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`gold-underline text-[12px] ${metaTone}`}
    >
      {review.sourceLabel}
    </a>
  ) : (
    <span className={`text-[12px] ${metaTone}`}>{review.sourceLabel}</span>
  )

  return (
    <figure
      className={`flex h-full flex-col justify-between p-7 sm:p-8 ${
        featured ? 'bg-maroc-900 text-cream-50' : 'bg-cream-100 text-ink'
      } ${className}`}
    >
      <div>
        <Icon
          name="quote"
          className={`h-6 w-6 ${featured ? 'text-gold-400' : 'text-gold-600'}`}
        />
        <blockquote
          className={`mt-5 font-display leading-[1.45] ${
            featured ? 'text-[23px] text-cream-50 sm:text-[27px]' : 'text-[19px] text-ink'
          }`}
        >
          {review.text}
        </blockquote>

        {review.ownerReply && (
          <p
            className={`mt-5 border-l-2 border-gold-500/40 pl-4 text-[14px] leading-relaxed ${
              featured ? 'text-cream-200/65' : 'text-ink-soft'
            }`}
          >
            <span className="font-medium">Respuesta del restaurante:</span> {review.ownerReply}
          </p>
        )}
      </div>

      <figcaption className="mt-7 flex items-center gap-3">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border font-display text-sm ${
            featured ? 'border-gold-400/40 text-gold-300' : 'border-gold-600/35 text-gold-700'
          }`}
          aria-hidden="true"
        >
          {hasAuthor ? review.author.charAt(0) : 'A'}
        </span>
        <span className="min-w-0">
          {hasAuthor ? (
            <>
              <span className={`block truncate text-[14px] font-medium ${featured ? 'text-cream-100' : 'text-ink'}`}>
                {review.author}
              </span>
              {meta}
            </>
          ) : (
            <span className={`block truncate text-[14px] font-medium ${featured ? 'text-cream-100' : 'text-ink'}`}>
              {meta}
            </span>
          )}
        </span>
        <Stars className={`ml-auto ${featured ? 'text-gold-400' : 'text-gold-600'}`} />
      </figcaption>
    </figure>
  )
}
