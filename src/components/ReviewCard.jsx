import Icon from './Icons'

export default function ReviewCard({ author, text, featured = false, className = '' }) {
  return (
    <figure
      className={`break-inside-avoid rounded-[1.75rem] border border-gold-500/20 bg-cream-100 p-7 ${
        featured
          ? 'bg-maroc-900 text-cream-50 md:p-9'
          : 'text-ink'
      } ${className}`}
    >
      <Icon name="quote" className={`h-7 w-7 ${featured ? 'text-gold-400' : 'text-gold-500'}`} />
      <blockquote
        className={`mt-4 font-display text-lg font-normal leading-snug ${
          featured ? 'italic text-cream-100' : 'text-ink'
        }`}
      >
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border font-display text-sm ${
            featured
              ? 'border-gold-400/50 text-gold-300'
              : 'border-gold-500/40 text-gold-600'
          }`}
        >
          {author.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold">{author}</span>
          <span
            className={`block text-xs ${
              featured ? 'text-cream-200/60' : 'text-ink/55'
            }`}
          >
            Reseña · Google
          </span>
        </span>
        <span
          className={`ml-auto flex items-center gap-0.5 ${
            featured ? 'text-gold-400' : 'text-gold-500'
          }`}
          aria-label="5 estrellas"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
              <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
            </svg>
          ))}
        </span>
      </figcaption>
    </figure>
  )
}