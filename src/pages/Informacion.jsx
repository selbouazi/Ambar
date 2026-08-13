import Seo from '../components/Seo'
import { FadeIn } from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import Icon from '../components/Icons'
import { ZelligeGrain, ZelligeLine } from '../components/Zellige'
import { restaurante, GOOGLE_MAPS_URL } from '../data/restaurante'

const n = restaurante.negocio

const GRUPOS = [
  {
    icon: 'delivery',
    titulo: 'Opciones de servicio',
    items: restaurante.opciones_servicio,
  },
  {
    icon: 'star',
    titulo: 'Ambiente',
    items: restaurante.ambiente,
  },
  {
    icon: 'wifi',
    titulo: 'Servicios',
    items: restaurante.servicios,
  },
  {
    icon: 'nfc',
    titulo: 'Métodos de pago',
    items: restaurante.pagos,
  },
  {
    icon: 'baby',
    titulo: 'Para los pequeños',
    items: restaurante.ninos,
  },
  {
    icon: 'wheelchair',
    titulo: 'Accesibilidad',
    items: restaurante.accesibilidad,
  },
  {
    icon: 'car',
    titulo: 'Aparcamiento',
    items: restaurante.aparcamiento,
    nota: 'En la calle hay plazas gratis, aunque a veces cuesta encontrar hueco.',
  },
  {
    icon: 'family',
    titulo: 'Ideal para',
    items: restaurante.clientela,
  },
]

export default function Informacion() {
  return (
    <>
      <Seo
        title={`Información práctica · ${n.nombre} El Vendrell`}
        description={`Horario, dirección y servicios de ${n.nombre} en El Vendrell: terraza, wifi gratis, accesible, menú infantil, aparcamiento y pagos con tarjeta.`}
        path="/informacion"
      />

      <header className="relative overflow-hidden bg-maroc-950 pb-16 pt-40 text-cream-50 sm:pb-20 lg:pt-48">
        <ZelligeGrain className="pointer-events-none absolute left-10 top-10 h-[45vh] w-[45vh] text-gold-400 opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-gold-400">
              <span className="h-px w-10 bg-gold-500/70" />
              Información
            </p>
            <h1 className="mt-5 font-display text-6xl font-medium italic leading-none tracking-tight sm:text-7xl">
              Antes de venir
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream-200/70">
              Horario, dónde aparcar, cómo pagamos… todo lo que hace la visita
              sencilla.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Horario y dirección, destacados */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn className="h-full">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-maroc-900 p-9 text-cream-50 lg:p-12">
              <ZelligeGrain className="absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" />
              <div className="relative">
                <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-400">
                  Horario
                </p>
                <p className="mt-6 font-display text-6xl font-medium italic leading-none tracking-tight lg:text-7xl">
                  {n.horario.apertura}
                  <span className="mx-3 text-gold-400">—</span>
                  {n.horario.cierre}
                </p>
              </div>
              <div className="relative mt-10 flex items-start gap-3 border-t border-cream-100/15 pt-6 text-sm text-cream-200/65">
                <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <p>
                  {n.horario.nota} ·{' '}
                  <span className="rounded-full border border-gold-500/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-gold-400">
                    [FALTA DATO]
                  </span>
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="h-full">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-gold-500/30 bg-cream-100 p-9 text-ink lg:p-12">
              <div className="relative">
                <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-600">
                  Dónde estamos
                </p>
                <p className="mt-6 font-display text-3xl font-medium leading-tight tracking-tight lg:text-4xl">
                  Ctra. de Valls, 70
                  <br />
                  43700 El Vendrell
                  <br />
                  <span className="italic text-ink/60">Tarragona · España</span>
                </p>
              </div>
              <div className="relative mt-10">
                <CTAButton
                  href={GOOGLE_MAPS_URL}
                  external
                  variant="dark"
                  icon="pin"
                >
                  Cómo llegar
                </CTAButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Grupos de comodidades */}
      <section className="bg-cream-100 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            kicker="Comodidades"
            title="Cómodo en cada detalle"
            tone="light"
          />
          <div className="mt-14 space-y-4">
            {GRUPOS.map((g, i) => (
              <FadeIn key={g.titulo} delay={Math.min(i * 0.04, 0.2)} y={18}>
                <div className="flex flex-col gap-5 rounded-3xl border border-gold-500/15 bg-cream-50 px-6 py-6 transition-colors duration-300 hover:border-gold-500/40 sm:flex-row sm:items-start sm:gap-8 sm:px-8">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-600">
                    <Icon name={g.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium italic text-ink">
                      {g.titulo}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 rounded-full bg-cream-200 px-3.5 py-1.5 text-[13px] text-ink/75"
                        >
                          <Icon name="check" className="h-3.5 w-3.5 text-gold-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {g.nota && (
                      <p className="mt-2 text-xs text-ink/50">{g.nota}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-16 text-center">
            <ZelligeLine className="mx-auto max-w-xs text-gold-500/60" />
            <p className="mx-auto mt-6 max-w-xl text-ink/65">
              ¿Vienes con el coche? En la calle hay aparcamiento gratuito, aunque a
              veces cuesta encontrar plaza. Para cualquier duda, una llamada.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <CTAButton href={`tel:${n.telefono_uri}`} variant="gold" icon="phone">
                Llamar · {n.telefono.replace('+34 ', '')}
              </CTAButton>
              <CTAButton to="/contacto" variant="outlineDark" icon="pin">
                Página de contacto
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}