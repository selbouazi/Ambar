import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from './Icons'
import { EASE } from './FadeIn'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-[0.95rem] text-sm font-semibold tracking-wide transition-colors duration-300'

const variants = {
  gold: `${base} bg-gold-500 text-maroc-950 hover:bg-gold-400 shadow-[0_10px_30px_-12px_rgba(201,151,59,0.65)]`,
  outlineCream: `${base} border border-cream-100/45 text-cream-100 hover:border-gold-400 hover:text-gold-300`,
  outlineDark: `${base} border border-ink/25 text-ink hover:border-gold-500 hover:text-gold-600`,
  ghost: `${base} px-3 gold-underline`,
  dark: `${base} bg-maroc-900 text-cream-100 hover:bg-maroc-800`,
}

export default function CTAButton({
  href,
  to,
  variant = 'gold',
  children,
  icon,
  external = false,
  className = '',
  ...rest
}) {
  const motionProps = {
    whileHover: { scale: 1.03, transition: { duration: 0.25, ease: EASE } },
    whileTap: { scale: 0.97, transition: { duration: 0.15, ease: EASE } },
  }
  const inner = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className={`${variant === 'ghost' ? 'h-4 w-4' : 'h-4 w-4'} transition-transform duration-300 group-hover:translate-x-1`}
        />
      )}
    </>
  )

  const cls = `${variants[variant]} group ${className}`

  if (to) {
    return (
      <motion.span {...motionProps} className="inline-flex">
        <Link to={to} className={cls} {...rest}>
          {inner}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.span {...motionProps} className="inline-flex">
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {inner}
      </a>
    </motion.span>
  )
}