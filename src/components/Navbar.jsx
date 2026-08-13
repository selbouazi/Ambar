import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icons'
import { EASE } from './FadeIn'
import { restaurante } from '../data/restaurante'

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/carta', label: 'Carta' },
  { to: '/resenas', label: 'Reseñas' },
  { to: '/informacion', label: 'Información' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const n = restaurante.negocio

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-gold-500/15 bg-maroc-950/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:py-5">
        <Link to="/" className="group flex items-center gap-3" aria-label="Restaurante Halal Ambar — inicio">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/60 text-gold-400 transition-colors duration-300 group-hover:border-gold-400 group-hover:bg-gold-400/10">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M8 8c.5 2 1.5 1 1.5-1.5C9.5 4 9 3 8 2.5M11 8c.5 2 1.5 1 1.5-1.5C12.5 4 12 3 11 2.5M6 8h9v2.5A4.5 4.5 0 0 1 10.5 15h-1A4.5 4.5 0 0 1 5 10.5V8h1Z" />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-semibold italic tracking-tight text-cream-50">
              Ambar
            </span>
            <span className="mt-1.5 hidden text-[9px] font-medium uppercase tracking-[0.3em] text-gold-400 sm:block">
              Restaurante Halal · El Vendrell
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group relative py-1 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isActive ? 'text-gold-400' : 'text-cream-100/80 hover:text-gold-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${n.telefono_uri}`}
            className="group inline-flex items-center gap-2 rounded-full border border-gold-400/60 bg-gold-500/10 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-gold-300 backdrop-blur transition-all duration-300 hover:border-gold-400 hover:bg-gold-500"
          >
            <Icon name="phone" className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Llamar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="grid h-11 w-11 place-items-center rounded-full border border-cream-100/25 text-cream-100 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            aria-label="Navegación móvil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden bg-maroc-950 lg:hidden"
          >
            <div className="space-y-1 px-5 pb-6 pt-2">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: EASE }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-2xl px-4 py-3 font-display text-2xl italic transition-colors ${
                        isActive ? 'text-gold-400' : 'text-cream-100 hover:text-gold-300'
                      }`
                    }
                  >
                    {item.label}
                    <Icon name="arrow" className="h-4 w-4 opacity-50" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
                className="pt-4"
              >
                <a
                  href={`tel:${n.telefono_uri}`}
                  className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-maroc-950"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Llamar · {n.telefono}
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}