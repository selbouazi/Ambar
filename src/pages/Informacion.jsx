import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import BrushLabel from '../components/BrushLabel'
import Icon from '../components/Icons'
import MapEmbed from '../components/MapEmbed'
import Faq from '../components/Faq'
import Photo from '../components/Photo'
import { StarPattern, StarMotif, Leaf, DottedRule } from '../components/Ornament'
import { HoursTable, LiveStatus } from '../components/Hours'
import { site, mapsHref, telHref } from '../data/site'
import { copy } from '../data/copy'
import { findDishByTag, priceOf } from '../data/menu'

const n = site

export default function Informacion() {
  const featured = findDishByTag('solo-viernes')
  const featuredPrice = featured ? priceOf(featured) : '7 €'

  return (
    <>
      <Seo
        title={copy.seo.info.title}
        description={copy.seo.info.description}
        path="/el-local"
        withFaqJsonLd
      />

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-night-950 pb-14 pt-28 sm:pb-16 lg:pt-36">
        <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={160} />
        <Leaf className="pointer-events-none absolute -right-6 top-20 h-48 w-36 text-leaf opacity-20" />
        <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <BrushLabel variant={3} size="md">
              El local
            </BrushLabel>
            <h1 className="mt-4 font-display text-[clamp(3.4rem,9vw,6.5rem)] uppercase leading-[0.86] text-cream-50">
              Todo lo práctico
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-cream-200/75">
              {copy.info.lead}
            </p>
          </Reveal>
          <Reveal priority delay={100}>
            <LiveStatus className="mt-7" showDetail />
          </Reveal>
        </div>
      </header>

      {/* Horario y cuscús */}
      <section id="horario" className="scroll-mt-24 bg-night-900 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading title="Horario" description={copy.info.horarioDesc} />
            <Reveal delay={120}>
              <div className="mt-8 border border-gold-500/60 bg-night-950">
                <HoursTable />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-cream-200/60">
                {copy.info.horarioNote}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="relative overflow-hidden bg-gold-500 px-6 py-9 text-night-950 sm:px-10 sm:py-11">
                <StarPattern
                  className="pointer-events-none absolute inset-0 h-full w-full text-night-950 opacity-[0.06]"
                  tile={130}
                />
                <div className="relative">
                  <p className="font-brush text-[24px] leading-none text-night-900/75">
                    El plato de la semana
                  </p>
                  <h2 className="mt-2 max-w-xl font-display text-[clamp(2.2rem,4.4vw,3.4rem)] uppercase leading-[0.9]">
                    {copy.info.couscousTitle}
                  </h2>

                  <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                      <p className="max-w-xs text-[15px] leading-relaxed text-night-900/80">
                        {copy.info.couscousText}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-5">
                        <p className="tnum font-display text-5xl leading-none">{featuredPrice}</p>
                        <CTAButton to="/carta#platos" variant="onCream" icon="arrow">
                          Ver en la carta
                        </CTAButton>
                      </div>
                    </div>

                    <figure className="hidden w-52 shrink-0 sm:block lg:w-56">
                      <div className="border-2 border-night-950 bg-night-950 p-1.5">
                        <Photo
                          photoKey="cuscus"
                          title="Cuscús de los viernes"
                          note="Se prepara ese día y se sirve mientras dure la olla."
                          ratio="4/3"
                          sizes="224px"
                        />
                      </div>
                      <figcaption className="mt-2 text-[13px] leading-snug text-night-900/70">
                        Cuscús, solo los viernes.
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href={telHref} variant="primary" icon="phone">
                  Llamar para reservar
                </CTAButton>
                <CTAButton to="/carta" variant="onDark" icon="arrow">
                  Ver la carta
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cómo llegar */}
      <section id="llegar" className="scroll-mt-24 bg-night-950 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading title="Cómo llegar" description={copy.info.llegarDesc} />

            <Reveal delay={120}>
              <address className="mt-8 not-italic">
                <p className="font-display text-[26px] uppercase leading-snug text-cream-50">
                  <span className="block">{n.addressLines[0]}</span>
                  <span className="block text-cream-200/75">{n.addressLines[1]}</span>
                  <span className="block text-cream-200/75">{n.addressLines[2]}</span>
                </p>
                {n.address.plusCode && (
                  <p className="mt-3 text-[13px] text-cream-200/55">
                    Plus Code: {n.address.plusCode}
                  </p>
                )}
              </address>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-cream-200/70">
                {n.parking.note}
              </p>
            </Reveal>

            <Reveal delay={240}>
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

          <Reveal delay={100} className="lg:col-span-7">
            <MapEmbed className="h-full min-h-[360px]" />
          </Reveal>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="relative scroll-mt-24 overflow-hidden bg-gold-500 py-20 text-night-950 sm:py-24 lg:py-28">
        <StarPattern
          className="pointer-events-none absolute inset-x-0 h-full w-full text-night-950 opacity-[0.05]"
          tile={160}
        />
        <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            tone="light"
            title={copy.info.serviciosTitle}
            description={copy.info.serviciosDesc}
          />

          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {copy.info.servicios.map((service, i) => (
              <Reveal key={service.title} delay={i * 60}>
                <div className="border-t border-night-950/25 pt-5">
                  <Icon name={service.icon} className="h-5 w-5 text-night-950/80" />
                  <h3 className="mt-4 font-display text-[21px] uppercase leading-snug tracking-wide">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-night-900/80">
                    {service.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex items-start gap-3 border-t border-night-950/25 pt-6">
              <StarMotif className="mt-1 h-4 w-4 shrink-0 text-night-950" />
              <p className="max-w-2xl text-[15px] leading-relaxed text-night-900/85">
                {copy.info.reservaNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="scroll-mt-24 bg-night-900 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-4">
            <SectionHeading title={copy.info.faqTitle} description={copy.info.faqDesc} />
            <Reveal delay={120}>
              <p className="mt-6 text-[15px] leading-relaxed text-cream-200/75">
                {copy.info.faqHelp}{' '}
                <a href={telHref} className="gold-underline font-semibold text-gold-400">
                  {n.phone.display}
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8">
                <DottedRule className="mb-7" />
                <CTAButton href={telHref} variant="primary" icon="phone">
                  Llamar
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <Faq items={copy.info.faq} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
