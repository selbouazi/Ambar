import Seo from '../components/Seo'
import { FadeIn } from '../components/FadeIn'
import CTAButton from '../components/CTAButton'
import Icon from '../components/Icons'
import { ZelligeGrain, ZelligeLine } from '../components/Zellige'
import {
  restaurante,
  GOOGLE_MAPS_URL,
  GOOGLE_MAPS_EMBED_SRC,
  MAILTO_RESERVA,
} from '../data/restaurante'

const n = restaurante.negocio

export default function Contacto() {
  const ig = n.enlaces.instagram

  return (
    <>
      <Seo
        title={`Contacto · ${n.nombre} El Vendrell`}
        description={`Contacta con ${n.nombre} en El Vendrell: ${n.telefono}. Dirección: ${n.direccion}. Pedidos a domicilio en Just Eat.`}
        path="/contacto"
      />

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-maroc-950 pb-16 pt-40 text-cream-50 sm:pb-20 lg:pt-48">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-gold-400">
              <span className="h-px w-10 bg-gold-500/70" />
              Contacto
            </p>
            <h1 className="mt-5 font-display text-6xl font-medium italic leading-none tracking-tight sm:text-7xl">
              Hablemos
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream-200/70">
              Una llamada y en nada estás sentado en la terraza con un té en la mano.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Teléfono, protagonista */}
      <section className="relative overflow-hidden bg-gold-500 py-16 text-maroc-950 sm:py-20">
        <ZelligeGrain className="absolute inset-0 h-full w-full text-maroc-900 opacity-[0.06]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center sm:px-8 lg:flex-row lg:justify-between lg:text-left">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]">
              Reservas · Pedidos · Grúas… bueno, y consultas
            </p>
            <a
              href={`tel:${n.telefono_uri}`}
              className="mt-3 inline-flex items-center gap-4 font-display text-5xl font-semibold italic tracking-tight sm:text-6xl lg:text-7xl"
            >
              <Icon name="phone" className="h-9 w-9 shrink-0" />
              {n.telefono.replace('+34 ', '')}
            </a>
          </FadeIn>
          <FadeIn delay={0.12} className="flex flex-wrap justify-center gap-3">
            <CTAButton
              href={`tel:${n.telefono_uri}`}
              variant="dark"
              icon="phone"
            >
              Llamar ahora
            </CTAButton>
            <CTAButton
              href={MAILTO_RESERVA}
              variant="outlineDark"
              icon="arrow"
            >
              Reservar por correo
            </CTAButton>
          </FadeIn>
        </div>
      </section>

      {/* Mapa + datos */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="space-y-8">
            <FadeIn>
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-600">
                Dirección
              </p>
              <p className="mt-3 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                Ctra. de Valls, 70
                <br />
                43700 El Vendrell · Tarragona
              </p>
              <div className="mt-4">
                <CTAButton
                  href={GOOGLE_MAPS_URL}
                  external
                  variant="dark"
                  icon="pin"
                >
                  Abrir en Google Maps
                </CTAButton>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex items-center gap-3 border-y border-ink/10 py-5">
                <Icon name="clock" className="h-5 w-5 text-gold-600" />
                <p className="text-sm text-ink/70">
                  <span className="font-semibold text-ink">
                    {n.horario.apertura} — {n.horario.cierre}
                  </span>{' '}
                  · {n.horario.nota.toLowerCase()}{' '}
                  <span className="uppercase tracking-wide text-gold-600">[FALTA DATO]</span>
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-600">
                Pedir a domicilio
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={n.enlaces.pedidos_online.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-gold-500 hover:text-gold-600"
                >
                  <Icon name="delivery" className="h-5 w-5" />
                  {n.enlaces.pedidos_online.texto}
                </a>
                <a
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-gold-500 hover:text-gold-600"
                >
                  <Icon name="camera" className="h-5 w-5" />
                  Instagram
                  <span className="rounded-full border border-gold-500/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-gold-600">
                    [FALTA DATO]
                  </span>
                </a>
              </div>
              <p className="mt-2 text-xs text-ink/50">
                Perfil de Instagram pendiente de confirmar con el cliente.
              </p>
            </FadeIn>
          </div>

          <FadeIn y={26}>
            <div className="overflow-hidden rounded-[2rem] border border-gold-500/25 shadow-2xl shadow-maroc-950/10 [filter:sepia(18%)_saturate(0.9)]">
              <iframe
                src={GOOGLE_MAPS_EMBED_SRC}
                title={`Mapa para llegar a ${n.nombre} — ${n.direccion}`}
                className="h-[420px] w-full border-0 lg:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-16 text-center">
          <ZelligeLine className="mx-auto max-w-xs text-gold-500/60" />
          <p className="mx-auto mt-6 max-w-xl text-ink/60">
            Sin sistema de reservas online por ahora: reservar es una llamada o un
            correo. Estamos abiertos de {n.horario.apertura} a {n.horario.cierre}.
          </p>
        </FadeIn>
      </section>
    </>
  )
}