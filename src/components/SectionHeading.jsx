import Reveal from './Reveal'

/**
 * Titular de sección en Anton, mayúsculas y compacto. Sin serif y sin
 * etiquetas pequeñas encima: el peso lo lleva el titular.
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
  const descColor = tone === 'light' ? 'text-ink-soft' : 'text-cream-200/75'

  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <Reveal>
        <Tag
          id={id}
          className={`font-display text-[clamp(2.4rem,5.2vw,4.25rem)] uppercase leading-[0.92] tracking-[0.005em] ${titleColor}`}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={80}>
          <p className={`mt-5 text-[17px] leading-relaxed sm:text-lg ${descColor}`}>{description}</p>
        </Reveal>
      )}
    </div>
  )
}
