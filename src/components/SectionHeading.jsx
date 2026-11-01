import Reveal from './Reveal'

/**
 * Titular de sección. Sin etiquetas pequeñas en mayúsculas encima: la
 * información va en el titular o en la frase de apoyo.
 */
export default function SectionHeading({
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className = '',
  id,
}) {
  const centered = align === 'center'
  const titleColor = tone === 'dark' ? 'text-cream-50' : 'text-ink'
  const descColor = tone === 'dark' ? 'text-cream-200/70' : 'text-ink-soft'

  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <Reveal>
        <Tag
          id={id}
          className={`font-display text-[clamp(2rem,3.6vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.02em] ${titleColor}`}
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
