import Reveal from './Reveal'

/**
 * Titular de sección: Inter en negrita (token text-h3). Sin mayúsculas forzadas, sin etiqueta encima:
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
          className={`font-display text-h3 ${titleColor}`}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={60}>
          <p className={`mt-5 text-body leading-relaxed sm:text-lg ${descColor}`}>{description}</p>
        </Reveal>
      )}
    </div>
  )
}
