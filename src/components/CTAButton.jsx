import { Link } from 'react-router-dom'
import Icon from './Icons'

const base =
  'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[2px] px-6 py-3 text-[14px] font-semibold leading-none tracking-[0.01em] transition-transform duration-200 active:translate-y-px'

const variants = {
  /* Acción principal: el dorado del logotipo. */
  primary: `${base} bg-gold-500 text-night-950 hover:bg-gold-400`,
  /* Secundario sobre fondo oscuro. */
  onDark: `${base} border border-cream-50/55 bg-night-950/25 text-cream-50 backdrop-blur-[2px] hover:border-gold-400 hover:text-gold-300`,
  /* Secundario sobre papel. */
  onCream: `${base} border border-ink/25 text-ink hover:border-gold-700 hover:text-gold-700`,
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
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {inner}
    </a>
  )
}
