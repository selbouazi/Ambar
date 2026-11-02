import Icon from './Icons'
import { telHref, directionsHref } from '../data/site'

/** Barra inferior fija solo en móvil: llamar y cómo llegar. */
export default function MobileBar() {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/30 bg-night-950 pb-[env(safe-area-inset-bottom,0px)] md:hidden"
    >
      <ul className="grid grid-cols-2">
        <li>
          <a
            href={telHref}
            className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-cream-100"
          >
            <Icon name="phone" className="h-5 w-5 text-gold-400" />
            Llamar
          </a>
        </li>
        <li className="border-l border-cream-100/10">
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-cream-100"
          >
            <Icon name="pin" className="h-5 w-5 text-gold-400" />
            Cómo llegar
          </a>
        </li>
      </ul>
    </nav>
  )
}
