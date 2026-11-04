import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import Icon from '../components/Icons'
import MapEmbed from '../components/MapEmbed'
import Faq from '../components/Faq'
import { StarPattern } from '../components/Ornament'
import { HoursTable, LiveStatus } from '../components/Hours'
import { site, mapsHref, telHref } from '../data/site'
import { copy } from '../data/copy'
import { findDishByTag, priceOf } from '../data/menu'
import useListoTrasPintar from '../useListoTrasPintar'

const n = site

export default function Informacion() {
  // La cabecera se pinta sola; el resto de la página entra después.
  const listo = useListoTrasPintar()

  return (
    <>
      <Seo
        title={copy.seo.info.title}
        description={copy.seo.info.description}
        path="/el-local"
        withFaqJsonLd
      />

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-night-950 pb-14 pt-28 text-cream-50 sm:pb-16 lg:pt-36">
        <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={190} />
        <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <h1 className="max-w-3xl font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.88] tracking-[-0.025em] text-cream-50">
              Todo lo práctico
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-cream-200">
              {copy.info.lead}
            </p>
          </Reveal>
          <Reveal priority delay={80}>
            <LiveStatus className="mt-7" />
          </Reveal>
        </div>
      </header>

      {/* Horario y cuscús */}
      {listo ? (
        <Resto />
      ) : (
        /* Reserva de alto mientras entran las secciones: nada de lo ya pintado
           se mueve cuando llegan (CLS 0). */
        <div className="min-h-[85vh] bg-cream-50" aria-hidden="true" />
      )}
    </>
  )
}

/** Todo lo que va debajo de la cabecera: entra en el segundo compromiso de
 *  render, después del primer fotograma pintado. */
function Resto() {
  const featured = findDishByTag('solo-viernes')
  const featuredPrice = featured ? priceOf(featured) : '7,00 €'

  return (
    <>
      <section id="horario" className="scroll-mt-24 bg-cream-50 py-20 text-ink sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading title="Horario" description={copy.info.horarioDesc} tone="light" />
            <Reveal delay={60}>
              <div className="mt-8 border border-ink/15">
                <HoursTable tone="light" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-ink-mute">
                {copy.info.horarioNote}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <div className="bg-night-900 px-6 py-9 text-cream-50 sm:px-10 sm:py-11">
                <h2 className="max-w-xl font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.96] tracking-[-0.015em]">
                  {copy.info.couscousTitle}
                </h2>

                <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="max-w-sm text-[15px] leading-relaxed text-cream-200">
                      {copy.info.couscousText}
                    </p>
                  </div>
                  <p className="tnum font-display text-[clamp(3.4rem,6vw,5rem)] leading-none text-gold-400">
                    {featuredPrice}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3 border-t border-cream-100/15 pt-6">
                  <CTAButton href={telHref} variant="primary" icon="phone">
                    Llamar para reservar
                  </CTAButton>
                  <CTAButton to="/carta#platos" variant="onDark" icon="arrow">
                    Ver en la carta
                  </CTAButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cómo llegar */}
      <section id="llegar" className="scroll-mt-24 bg-night-950 py-20 text-cream-50 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading title="Cómo llegar" description={copy.info.llegarDesc} />

            <Reveal delay={60}>
              <address className="mt-8 not-italic">
                <p className="font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.08] text-cream-50">
                  <span className="block">{n.addressLines[0]}</span>
                  <span className="block text-cream-200">{n.addressLines[1]}</span>
                  <span className="block text-cream-200">{n.addressLines[2]}</span>
                </p>
                {n.address.plusCode && (
                  <p className="mt-3 text-[13px] text-cream-200">Plus Code: {n.address.plusCode}</p>
                )}
              </address>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-cream-200">{n.parking.note}</p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href={mapsHref} external variant="primary" icon="external">
                  Abrir en Google Maps
                </CTAButton>
                <CTAButton href={telHref} variant="onDark" icon="phone">
                  {n.phone.display}
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <MapEmbed className="h-full min-h-[360px]" />
          </Reveal>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="scroll-mt-24 bg-cream-50 py-20 text-ink sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            title={copy.info.serviciosTitle}
            description={copy.info.serviciosDesc}
            tone="light"
          />

          <div className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {copy.info.servicios.map((service, i) => (
              <Reveal key={service.title} delay={i * 40}>
                <div className="border-t border-ink/15 pt-5">
                  <Icon name={service.icon} className="h-5 w-5 text-gold-700" />
                  <h3 className="mt-4 text-[18px] font-medium leading-snug text-ink">{service.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">{service.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 border-t border-ink/15 pt-6">
              <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">{copy.info.reservaNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="scroll-mt-24 bg-night-950 py-20 text-cream-50 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
          <div className="lg:col-span-4">
            <SectionHeading title={copy.info.faqTitle} description={copy.info.faqDesc} />
            <Reveal delay={80}>
              <p className="mt-6 text-[15px] leading-relaxed text-cream-200">
                {copy.info.faqHelp}{' '}
                <a href={telHref} className="gold-underline font-semibold text-gold-300">
                  {n.phone.display}
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8">
                <CTAButton href={telHref} variant="primary" icon="phone">
                  Llamar
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={60}>
              <Faq items={copy.info.faq} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
