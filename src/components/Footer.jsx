import { Link } from 'react-router-dom'
import Icon from './Icons'
import { LogoMark, Wordmark } from './Brand'
import { StarPattern, Leaf } from './Ornament'
import { site, hoursSummary, mapsHref, telHref, instagramHref } from '../data/site'
import { copy } from '../data/copy'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-gold-500/20 bg-night-950 text-cream-200">
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={170} />
      <Leaf className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-32 text-leaf opacity-20 sm:h-56 sm:w-44" />

      <div className="relative mx-auto max-w-[78rem] px-5 pt-16 sm:px-8 lg:px-12 lg:pt-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Wordmark className="block text-[clamp(4rem,12vw,7rem)]">Ambar</Wordmark>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-cream-200/70">
              {copy.footer.description}
            </p>
          </div>
          <div className="flex items-center">
            <LogoMark className="h-16" alt="" />
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-cream-100/10 pt-10 md:grid-cols-3">
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-400">Contacto</h2>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2.5 text-cream-100/85 hover:text-gold-300"
                >
                  <Icon name="phone" className="h-4 w-4 text-gold-500" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-cream-100/85 hover:text-gold-300"
                >
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span>
                    <span className="block">{site.addressLines[0]}</span>
                    <span className="block">{site.addressLines[1]}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-cream-100/85 hover:text-gold-300"
                  aria-label="Instagram de Ambar (@amb_ar2022)"
                >
                  <Icon name="instagram" className="h-4 w-4 text-gold-500" />
                  @amb_ar2022
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-400">Horario</h2>
            <p className="mt-5 text-[15px] text-cream-100/85">{hoursSummary}</p>
            <p className="mt-1 text-[13px] text-cream-200/60">En festivos puede cambiar.</p>
            <Link
              to="/el-local#horario"
              className="gold-underline mt-4 inline-block text-[14px] text-gold-400"
            >
              Ver el horario completo
            </Link>
          </div>

          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-400">La casa</h2>
            <nav aria-label="Enlaces del pie" className="mt-5">
              <ul className="space-y-3 text-[15px]">
                {[
                  { to: '/carta', label: 'La carta' },
                  { to: '/el-local', label: 'El local y cómo llegar' },
                  { to: '/resenas', label: 'Reseñas' },
                  { to: '/aviso-legal', label: 'Aviso legal' },
                  { to: '/politica-de-cookies', label: 'Política de cookies' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-cream-100/80 hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream-100/10 py-7 text-[13px] text-cream-200/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {site.address.city}
          </p>
          <p className="tnum">
            {site.rating.score.toString().replace('.', ',')} sobre 5 · {site.rating.count} reseñas en Google ·{' '}
            {site.rating.dateLabel}
          </p>
        </div>
      </div>
    </footer>
  )
}
