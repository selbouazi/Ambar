import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icons'
import { LogoMark, Wordmark } from './Brand'
import { site, telHref } from '../data/site'
import { copy } from '../data/copy'

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/carta', label: 'Carta' },
  { to: '/el-local', label: 'El local' },
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

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

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

      const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
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
      className={`fixed inset-x-0 top-0 z-50 border-b ${
        scrolled || open
          ? 'border-cream-100/10 bg-night-950/97'
          : 'border-transparent bg-night-950/35'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[86rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[76px] lg:px-12">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} — inicio`}>
          <LogoMark className="h-11 shrink-0 sm:h-12" alt="" />
          <span className="leading-none">
            <Wordmark className="block text-[28px] sm:text-[31px]">Ambar</Wordmark>
            <span className="mt-1 hidden text-[13px] font-medium text-cream-200 sm:block">
              {copy.nav.subtitle}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative inline-flex min-h-11 items-center py-2 text-[14px] font-medium ${
                  isActive ? 'text-gold-300' : 'text-cream-100 hover:text-cream-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-gold-400 transition-opacity duration-200 ${
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
            className="hidden min-h-11 items-center gap-2 rounded-[2px] border border-cream-50/40 px-5 text-[13px] font-semibold text-cream-50 hover:border-gold-400 hover:text-gold-300 sm:inline-flex"
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
            className="grid h-11 w-11 place-items-center rounded-[2px] border border-cream-100/25 text-cream-100 hover:border-gold-400 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-movil"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-night-950 lg:hidden"
        >
          <nav aria-label="Navegación móvil" className="mx-auto max-w-[86rem] px-5 py-8 sm:px-8">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `flex min-h-14 items-center justify-between border-b border-cream-100/10 py-3 font-display text-3xl ${
                        isActive ? 'text-gold-300' : 'text-cream-50 hover:text-gold-300'
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
              className="mt-8 flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-gold-500 px-6 text-[14px] font-semibold text-night-950"
            >
              <Icon name="phone" className="h-4 w-4" />
              Llamar · {site.phone.display}
            </a>

            <p className="mt-6 text-sm text-cream-200">
              {site.addressLines[0]} · {site.addressLines[1]}
            </p>
          </nav>
        </div>
      )}
    </header>
  )
}
