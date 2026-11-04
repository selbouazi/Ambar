import Reveal from './Reveal'

/**
 * Titular de sección en Anton. Sin mayúsculas forzadas, sin etiqueta encima:
 * el peso lo lleva el titular y el texto describe sin competir.
 */
export default function SectionHeading({
  title,
  description,
  align = 'left',
  tone = 'dark',
  as: Tag = 'h2',
  className = '',
  id,
}) {
  const centered = align === 'center'
  const titleColor = tone === 'light' ? 'text-ink' : 'text-cream-50'
  const descColor = tone === 'light' ? 'text-ink-soft' : 'text-cream-200'

  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <Reveal>
        <Tag
          id={id}
          className={`font-display text-[clamp(2.15rem,4.6vw,3.75rem)] leading-[1.02] tracking-[-0.012em] ${titleColor}`}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={60}>
          <p className={`mt-5 text-[17px] leading-relaxed sm:text-[18px] ${descColor}`}>{description}</p>
        </Reveal>
      )}
    </div>
  )
}
