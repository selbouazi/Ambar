import { Link } from 'react-router-dom'
import Icon, { HalalSeal } from './Icons'
import { Diamond } from './Zellige'
import { restaurante, GOOGLE_MAPS_URL } from '../data/restaurante'

export default function Footer() {
  const n = restaurante.negocio
  const year = new Date().getFullYear()
  const ig = n.enlaces.instagram

  return (
    <footer className="relative overflow-hidden bg-maroc-950 text-cream-200">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_0.9fr]">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-4">
              <HalalSeal className="h-16 w-16 text-gold-500" />
              <div>
                <p className="font-display text-3xl font-semibold italic text-cream-50">
                  Ambar
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-gold-400">
                  Restaurante Halal · El Vendrell
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream-200/60">
              Cocina marroquí, cocinada en familia y en calma. Del cuscús de los viernes
              al marisco a la brasa: hospitalidad marinera en la Ctra. de Valls.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-400">
              Contacto
            </p>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${n.telefono_uri}`}
                  className="gold-underline inline-flex items-center gap-2.5 text-cream-100/85 hover:text-gold-300"
                >
                  <Icon name="phone" className="h-4 w-4 text-gold-500" />
                  {n.telefono}
                </a>
              </li>
              <li>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline flex items-start gap-2.5 text-cream-100/85 hover:text-gold-300"
                >
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  Ctra. de Valls, 70 · 43700 El Vendrell
                </a>
              </li>
              <li>
                <a
                  href={n.enlaces.pedidos_online.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline inline-flex items-center gap-2.5 text-cream-100/85 hover:text-gold-300"
                >
                  <Icon name="delivery" className="h-4 w-4 text-gold-500" />
                  Pedir a domicilio · {n.enlaces.pedidos_online.texto}
                </a>
              </li>
              <li>
                <a
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (perfil pendiente de confirmar)"
                  className="gold-underline inline-flex items-center gap-2.5 text-cream-100/85 hover:text-gold-300"
                >
                  <Icon name="check" className="h-4 w-4 text-gold-500" />
                  Instagram
                  <span className="rounded-full border border-gold-500/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-gold-400">
                    [FALTA DATO]
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-400">
              Horario
            </p>
            <p className="mt-5 font-display text-2xl italic text-cream-50">
              {n.horario.apertura} — {n.horario.cierre}
            </p>
            <p className="mt-2 text-xs text-cream-200/55">
              {n.horario.nota} ·{' '}
              <span className="uppercase tracking-wide text-gold-400/80">[FALTA DATO]</span>
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Enlaces">
              {[
                { to: '/carta', label: 'Carta' },
                { to: '/resenas', label: 'Reseñas' },
                { to: '/informacion', label: 'Información' },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="gold-underline text-xs font-medium uppercase tracking-[0.18em] text-cream-200/70 hover:text-gold-300"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-cream-100/10 py-7 sm:flex-row sm:justify-between">
          <p className="text-xs text-cream-200/40">
            © {year} {n.nombre} · Ctra. de Valls, 70, El Vendrell
          </p>
          <p className="flex items-center gap-2 text-xs text-cream-200/40">
            <Diamond className="h-2 w-2 text-gold-500" />
            <Link to="/contacto" className="gold-underline hover:text-gold-300">
              Cómo llegar
            </Link>
            <span className="text-cream-200/25">·</span>
            Valoración {n.valoracion.puntuacion} · {n.valoracion.numero_resenas} reseñas
          </p>
        </div>
      </div>
    </footer>
  )
}