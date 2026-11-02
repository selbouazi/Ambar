import { Link } from 'react-router-dom'
import Icon from './Icons'

const base =
  'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-6 py-3 text-[14px] font-semibold uppercase leading-none tracking-[0.08em] transition-colors duration-200'

const variants = {
  /* Acción principal: amarillo de la carta con texto negro. */
  primary: `${base} bg-gold-500 text-night-950 hover:bg-gold-400 active:translate-y-px`,
  /* Secundario sobre fondo oscuro. */
  onDark: `${base} border border-cream-100/45 text-cream-50 hover:border-gold-400 hover:text-gold-300 active:translate-y-px`,
  /* Secundario sobre fondo claro (legales). */
  onCream: `${base} border border-ink/30 text-ink hover:border-gold-700 hover:text-gold-700 active:translate-y-px`,
  /* Enlace discreto. */
  quiet: `${base} px-0 text-cream-100 underline-offset-4 hover:text-gold-300`,
}

export default function CTAButton({
  href,
  to,
  variant = 'primary',
  children,
  icon,
  external = false,
  className = '',
  ...rest
}) {
  const cls = `${variants[variant] || variants.primary} ${className}`

  const inner = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={cls}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {inner}
    </a>
  )
}
