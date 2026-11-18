import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ReviewCard, { HighlightCard } from '../components/ReviewCard'
import CTAButton from '../components/CTAButton'
import { StarMotif } from '../components/Ornament'
import { site, mapsHref, telHref } from '../data/site'
import { copy } from '../data/copy'

const n = site

function Stars({ className = 'h-4 w-4' }) {
  return (
    <span className="flex items-center gap-1 text-gold-500" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarMotif key={i} className={className} filled />
      ))}
    </span>
  )
}

export default function Resenas() {
  const [first, ...rest] = n.reviews

  return (
    <>
      <Seo
        title={copy.seo.resenas.title}
        description={copy.seo.resenas.description}
        path="/resenas"
      />

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-night-950 pb-14 pt-28 text-cream-50 sm:pb-16 lg:pt-36">
        <div className="relative mx-auto max-w-page px-gutter">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal priority>
                <h1 className="max-w-3xl font-display text-h1 text-cream-50">
                  Quien viene, repite
                </h1>
                <p className="mt-5 max-w-xl text-body leading-relaxed text-cream-200">
                  {copy.resenasPage.lead}
                </p>
              </Reveal>
            </div>

            <Reveal priority delay={80} className="lg:col-span-5">
              <div className="border border-cream-100/20 p-6">
                <div className="flex items-end gap-4">
                  <p className="tnum font-display text-7xl font-bold tracking-tighter leading-none text-gold-400">
                    {n.rating.score.toString().replace('.', ',')}
                  </p>
                  <div className="pb-2">
                    <Stars />
                    <p className="mt-1.5 text-meta text-cream-200">
                      {n.rating.count} reseñas en Google
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-label text-cream-200">Datos de {n.rating.dateLabel}</p>
                <div className="mt-5 border-t border-cream-100/15 pt-4">
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-underline inline-flex min-h-11 items-center gap-2 text-meta font-semibold text-gold-300"
                  >
                    Ver la ficha en Google
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Reseñas */}
      <section className="bg-cream-50 py-section-sm text-ink">
        <div className="mx-auto max-w-page px-gutter">
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            <Reveal className="sm:col-span-2">
              <ReviewCard review={first} featured tone="light" />
            </Reveal>

            {rest.map((review, i) => (
              <Reveal key={review.id} delay={60 + i * 40}>
                <ReviewCard review={review} tone="light" className="h-full" />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-10 max-w-2xl text-meta leading-relaxed text-ink-mute">
              {copy.resenasPage.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lo que más se repite */}
      <section className="relative overflow-hidden bg-night-900 py-section-sm text-cream-50">
        <div className="relative mx-auto max-w-page px-gutter">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHeading
                title={copy.resenasPage.highlightsTitle}
                description="Frases del resumen de opiniones de Google. Sin nombres: son las ideas que más se repiten."
              />
            </div>

            <div className="grid gap-5 lg:col-span-7">
              {n.reviewHighlights.map((text, i) => (
                <Reveal key={text} delay={i * 40}>
                  <HighlightCard text={text} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-cream-50 py-section-compact text-ink">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-gutter lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-2xl font-display text-h3">
              {copy.resenasPage.closingTitle}
            </h2>
            <p className="mt-2 max-w-xl text-body-sm leading-relaxed text-ink-soft">
              {copy.resenasPage.closingText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={telHref} variant="primary" icon="phone">
              Llamar
            </CTAButton>
            <CTAButton to="/carta" variant="onCream" icon="arrow">
              Ver la carta
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
