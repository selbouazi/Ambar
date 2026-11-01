import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icons'
import PrototypeBadge from './PrototypeBadge'
import { business, telHref } from '../data/business'
import { copy } from '../data/copy'

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/carta', label: 'Carta' },
  { to: '/informacion', label: 'El local' },
  { to: '/resenas', label: 'Reseñas' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú al cambiar de ruta.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Bloqueo de scroll, foco inicial y cierre con Escape.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstLink = panelRef.current?.querySelector('a, button')
    firstLink?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled])',
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-cream-100/10 bg-maroc-950'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[75rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px] lg:px-12">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={`${business.name} — inicio`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/50 text-gold-400">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M15.5 3.5a7 7 0 1 0 5 5 5.5 5.5 0 0 1-5-5Z" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[26px] font-semibold italic tracking-[-0.02em] text-cream-50">
                Ambar
              </span>
              <span className="mt-1 hidden text-[10px] uppercase tracking-[0.22em] text-gold-400 sm:block">
                {copy.nav.subtitle}
              </span>
            </span>
          </Link>

          <PrototypeBadge />
        </div>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-2 text-[14px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-gold-400' : 'text-cream-100/85 hover:text-cream-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold-400 transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-gold-500 px-5 text-[14px] font-semibold text-maroc-950 transition-colors duration-200 hover:bg-gold-400 sm:inline-flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            Llamar
          </a>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="grid h-11 w-11 place-items-center rounded-full border border-cream-100/25 text-cream-100 transition-colors hover:border-gold-400 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-movil"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-maroc-950 lg:hidden"
        >
          <nav aria-label="Navegación móvil" className="mx-auto max-w-[75rem] px-5 py-8 sm:px-8">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex min-h-14 items-center justify-between border-b border-cream-100/10 py-3 font-display text-3xl italic transition-colors ${
                        isActive ? 'text-gold-400' : 'text-cream-50 hover:text-gold-300'
                      }`
                    }
                  >
                    {item.label}
                    <Icon name="arrow" className="h-5 w-5 opacity-40" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <a
              href={telHref}
              className="mt-8 flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 text-[15px] font-semibold text-maroc-950"
            >
              <Icon name="phone" className="h-4 w-4" />
              Llamar · {business.phone.display.replace('+34 ', '')}
            </a>

            <p className="mt-6 text-sm text-cream-200/70">
              {business.addressLines.length > 1
                ? `${business.addressLines[0]} · ${business.addressLines[1]}`
                : business.addressLines[0]}
            </p>
          </nav>
        </div>
      )}
    </header>
  )
}
