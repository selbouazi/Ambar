import { FadeIn } from './FadeIn'
import { ZelligeLine } from './Zellige'

export default function SectionHeading({
  kicker,
  title,
  description,
  align = 'center',
  tone = 'light',
  className = '',
}) {
  const isCenter = align === 'center'
  const titleColor = tone === 'dark' ? 'text-cream-50' : 'text-ink'
  const kickerColor = 'text-gold-500'
  const descColor =
    tone === 'dark' ? 'text-cream-200/75' : 'text-ink/70'

  return (
    <FadeIn
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}
    >
      <FadeIn delay={0}>
        <p
          className={
            isCenter
              ? 'flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-500'
              : 'flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-500'
          }
        >
          <span className="h-px w-8 bg-gold-500/50" />
          {kicker}
          {isCenter && <span className="h-px w-8 bg-gold-500/50" />}
        </p>
      </FadeIn>
      <h2
        className={`mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem] ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${descColor}`}>
          {description}
        </p>
      )}
      {isCenter && <ZelligeLine className="mx-auto mt-8 max-w-xs text-gold-500/70" />}
    </FadeIn>
  )
}