import { useEffect, useRef } from 'react'

/**
 * Entrada suave al hacer scroll, sin dependencias de animación.
 *
 * El contenido es visible por defecto: la clase `.js` (que añade main.jsx solo
 * si el navegador soporta IntersectionObserver) es la que activa el estado
 * oculto. Además, un temporizador de seguridad revela todo a los 3 s para que
 * ningún contenido quede invisible si el observer falla.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  priority = false,
  className = '',
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (priority) return

    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 },
    )

    observer.observe(el)

    const failsafe = window.setTimeout(() => {
      el.classList.add('is-in')
      observer.disconnect()
    }, 3000)

    return () => {
      window.clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [priority])

  return (
    <Tag
      ref={ref}
      {...(priority ? {} : { 'data-reveal': '' })}
      className={className}
      style={delay && !priority ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Grupo de elementos que entran escalonados. */
export function RevealGroup({ children, className = '', step = 70, ...rest }) {
  return (
    <div className={className} {...rest}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={child?.key ?? i} delay={i * step}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  )
}
