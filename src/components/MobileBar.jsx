import { Link } from 'react-router-dom'
import Icon from './Icons'
import { telHref, mapsHref } from '../data/business'

/**
 * Barra inferior fija solo en móvil. Tres acciones, objetivos de 44 px y
 * hueco para el safe-area del iPhone.
 */
export default function MobileBar() {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-cream-100/10 bg-maroc-950 pb-[env(safe-area-inset-bottom,0px)] md:hidden"
    >
      <ul className="grid grid-cols-3">
        <li>
          <a
            href={telHref}
            className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-cream-100"
          >
            <Icon name="phone" className="h-5 w-5 text-gold-400" />
            Llamar
          </a>
        </li>
        <li className="border-x border-cream-100/10">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-cream-100"
          >
            <Icon name="pin" className="h-5 w-5 text-gold-400" />
            Cómo llegar
          </a>
        </li>
        <li>
          <Link
            to="/carta"
            className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-cream-100"
          >
            <Icon name="menu" className="h-5 w-5 text-gold-400" />
            Carta
          </Link>
        </li>      </ul>
    </nav>
  )
}
