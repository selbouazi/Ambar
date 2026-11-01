import { Link } from 'react-router-dom'
import Icon from './Icons'
import { ZelligePattern } from './Zellige'
import { LiveStatus } from './Hours'
import { business, hoursSummary, mapsHref, telHref } from '../data/business'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-maroc-950 text-cream-200">
      <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.04]" tile={140} />

      <div className="relative mx-auto max-w-[75rem] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        <p className="font-display text-[clamp(3.5rem,8vw,6rem)] font-normal italic leading-none tracking-[-0.03em] text-cream-50">
          Ambar
        </p>
        <p className="mt-4 max-w-md text-[17px] leading-relaxed text-cream-200/65">
          Cocina marroquí halal en El Vendrell. Tajines, cuscús de los viernes,
          marisco fresco y desayunos desde primera hora.
        </p>

        <div className="mt-14 grid gap-12 border-t border-cream-100/10 pt-12 md:grid-cols-3">
          <div>
            <h2 className="text-[15px] font-semibold text-cream-50">Contacto</h2>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li>
                <a href={telHref} className="gold-underline inline-flex items-center gap-2.5 text-cream-100/85 hover:text-gold-300">
                  <Icon name="phone" className="h-4 w-4 text-gold-500" />
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline flex items-start gap-2.5 text-cream-100/85 hover:text-gold-300"
                >
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span>
                    {business.address.street}, {business.address.number}
                    <br />
                    {business.address.postalCode} {business.address.city}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={business.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline inline-flex items-center gap-2.5 text-cream-100/85 hover:text-gold-300"
                  aria-label="Instagram del restaurante"
                >
                  <Icon name="instagram" className="h-4 w-4 text-gold-500" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-cream-50">Horario</h2>
            <LiveStatus className="mt-5" />
            <p className="mt-2 text-sm text-cream-200/70">{hoursSummary}</p>
            <Link to="/informacion#horario" className="gold-underline mt-4 inline-block text-sm text-gold-400">
              Ver el horario completo
            </Link>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-cream-50">La casa</h2>
            <nav aria-label="Enlaces del pie" className="mt-5">
              <ul className="space-y-3 text-[15px]">
                {[
                  { to: '/carta', label: 'La carta' },
                  { to: '/informacion', label: 'El local y cómo llegar' },
                  { to: '/resenas', label: 'Opiniones' },
                  { to: '/aviso-legal', label: 'Aviso legal' },
                  { to: '/cookies', label: 'Política de cookies' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="gold-underline text-cream-100/80 hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream-100/10 py-8 text-[13px] text-cream-200/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name} · {business.address.city}
          </p>
          <p className="tnum">
            {business.rating.score.toString().replace('.', ',')} sobre 5 ·{' '}
            {business.rating.count} reseñas en Google
          </p>
        </div>
      </div>
    </footer>
  )
}
