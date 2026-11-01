import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import Icon from '../components/Icons'
import MapEmbed from '../components/MapEmbed'
import Faq from '../components/Faq'
import { HoursTable, LiveStatus, CouscousNotice } from '../components/Hours'
import { ZelligePattern, StarMotif } from '../components/Zellige'
import { business, mapsHref, telHref } from '../data/business'
import { copy } from '../data/copy'
import { findDishByTag, priceOf } from '../data/menu'

const n = business

export default function Informacion() {
  const hasMaps = Boolean(mapsHref) && mapsHref !== '#'
  const featured = findDishByTag('solo-viernes')
  const featuredPrice = featured ? priceOf(featured) : '0 €'

  return (
    <>
      <Seo
        title={copy.seo.info.title}
        description={copy.seo.info.description}
        path="/informacion"
      />

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-maroc-950 pb-14 pt-28 text-cream-50 sm:pb-16 lg:pt-36">
        <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" tile={130} />
        <div className="relative mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
              El local
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-cream-200/70">
              {copy.info.lead}
            </p>
          </Reveal>
          <Reveal priority delay={100}>
            <LiveStatus className="mt-7" showDetail />
          </Reveal>
        </div>
      </header>

      {/* Horario */}
      <section id="horario" className="scroll-mt-24 bg-cream-50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title="Horario"
              description={copy.info.horarioDesc}
            />
            <Reveal delay={120}>
              <div className="mt-8 border border-ink/12 bg-cream-100">
                <HoursTable />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 text-[13px] text-ink-mute">
                {copy.info.horarioNote}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="relative overflow-hidden bg-maroc-900 px-6 py-10 text-cream-50 sm:px-10 sm:py-12">
                <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.06]" tile={110} />
                <div className="relative">
                  <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-normal italic leading-tight">
                    {copy.info.couscousTitle}
                  </h3>
                  <CouscousNotice className="mt-3 text-[15px] leading-relaxed" />
                  <div className="mt-7 flex items-end justify-between gap-6 border-t border-cream-100/12 pt-6">
                    <p className="max-w-xs text-[14px] leading-relaxed text-cream-200/70">
                      {copy.info.couscousText}
                    </p>
                    <p className="tnum font-display text-5xl leading-none text-gold-400">{featuredPrice}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href={telHref} variant="primary" icon="phone">
                  Llamar para reservar
                </CTAButton>
                <CTAButton to="/carta" variant="onCream" icon="arrow">
                  Ver la carta
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cómo llegar */}
      <section id="llegar" className="scroll-mt-24 bg-cream-100 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title="Cómo llegar"
              description={copy.info.llegarDesc}
            />
            <Reveal delay={120}>
              <address className="mt-8 not-italic">
                <p className="font-display text-2xl leading-snug text-ink">
                  {n.addressLines.map((line, i) => (
                    <span
                      key={line}
                      className={`block ${i > 0 && i === n.addressLines.length - 1 ? 'text-ink-soft' : ''}`}
                    >
                      {line}
                    </span>
                  ))}
                </p>
                {n.address.plusCode && (
                  <p className="mt-3 text-[13px] text-ink-mute">Plus code: {n.address.plusCode}</p>
                )}
              </address>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-3">
                {hasMaps && (
                  <CTAButton href={mapsHref} external variant="primary" icon="external">
                    Abrir en Google Maps
                  </CTAButton>
                )}
                <CTAButton href={telHref} variant={hasMaps ? 'onCream' : 'primary'} icon="phone">
                  Llamar
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
      <section id="servicios" className="scroll-mt-24 bg-maroc-950 py-20 text-cream-50 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            tone="dark"
            title={copy.info.serviciosTitle}
            description={copy.info.serviciosDesc}
          />

          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {copy.info.servicios.map((service, i) => (
              <Reveal key={service.title} delay={i * 60}>
                <div className="border-t border-cream-100/12 pt-5">
                  <Icon name={service.icon} className="h-5 w-5 text-gold-400" />
                  <h3 className="mt-4 font-display text-[20px] font-medium leading-snug text-cream-50">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-cream-200/70">
                    {service.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex items-start gap-3 border-t border-cream-100/12 pt-6">
              <StarMotif className="mt-1 h-4 w-4 shrink-0 text-gold-500" />
              <p className="max-w-2xl text-[15px] leading-relaxed text-cream-200/70">
                {copy.info.reservaNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="scroll-mt-24 bg-cream-50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-4">
            <SectionHeading
              title={copy.info.faqTitle}
              description={copy.info.faqDesc}
            />
            <Reveal delay={120}>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
                {copy.info.faqHelp}{' '}
                <a href={telHref} className="gold-underline font-medium text-gold-700">
                  Llámanos al {n.phone.display}
                </a>
                .
              </p>
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
