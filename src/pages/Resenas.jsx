import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ReviewCard, { HighlightCard } from '../components/ReviewCard'
import CTAButton from '../components/CTAButton'
import BrushLabel from '../components/BrushLabel'
import { StarPattern, StarMotif, Leaf } from '../components/Ornament'
import { site, mapsHref, telHref } from '../data/site'
import { copy } from '../data/copy'

const n = site

function Stars({ className = 'h-4 w-4' }) {
  return (
    <span className="flex items-center gap-1 text-gold-400" aria-hidden="true">
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
      <header className="relative overflow-hidden bg-night-950 pb-14 pt-28 sm:pb-16 lg:pt-36">
        <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={160} />
        <Leaf className="pointer-events-none absolute -right-6 top-24 h-44 w-32 text-leaf opacity-20" />
        <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal priority>
                <BrushLabel variant={2} size="md">
                  Google
                </BrushLabel>
                <h1 className="mt-4 font-display text-[clamp(3.4rem,9vw,6.5rem)] uppercase leading-[0.86] text-cream-50">
                  Quien viene, repite
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-cream-200/75">
                  {copy.resenasPage.lead}
                </p>
              </Reveal>
            </div>

            <Reveal priority delay={100} className="lg:col-span-5">
              <div className="border border-gold-500/60 bg-night-900/70 p-6">
                <div className="flex items-end gap-4">
                  <p className="tnum font-display text-7xl leading-none text-gold-400">
                    {n.rating.score.toString().replace('.', ',')}
                  </p>
                  <div className="pb-2">
                    <Stars className="h-4 w-4" />
                    <p className="mt-1.5 text-[14px] text-cream-200/80">
                      {n.rating.count} reseñas en Google
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-cream-200/55">
                  Datos de {n.rating.dateLabel}
                </p>
                <div className="mt-5 border-t border-cream-100/12 pt-4">
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-underline inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-gold-300"
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
      <section className="bg-night-900 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            <Reveal className="sm:col-span-2">
              <ReviewCard review={first} featured />
            </Reveal>

            {rest.map((review, i) => (
              <Reveal key={review.id} delay={80 + i * 60}>
                <ReviewCard review={review} className="h-full" />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl text-[14px] leading-relaxed text-cream-200/55">
              {copy.resenasPage.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lo que más se repite */}
      <section className="relative overflow-hidden bg-night-950 py-20 sm:py-24 lg:py-28">
        <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={180} />
        <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <BrushLabel variant={0}>En pocas palabras</BrushLabel>
              <SectionHeading
                title={copy.resenasPage.highlightsTitle}
                description="Frases del resumen de opiniones de Google. Sin nombres: son las ideas que más se repiten."
                className="mt-5"
              />
            </div>

            <div className="grid gap-4 lg:col-span-7">
              {n.reviewHighlights.map((text, i) => (
                <Reveal key={text} delay={i * 70}>
                  <HighlightCard text={text} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="relative overflow-hidden bg-gold-500 py-16 text-night-950 sm:py-20">
        <StarPattern
          className="pointer-events-none absolute inset-0 h-full w-full text-night-950 opacity-[0.05]"
          tile={150}
        />
        <div className="relative mx-auto flex max-w-[78rem] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] uppercase leading-[0.92]">
              {copy.resenasPage.closingTitle}
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-night-900/80">
              {copy.resenasPage.closingText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={telHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-night-950 px-6 py-3 text-[14px] font-bold uppercase tracking-[0.08em] text-gold-400 transition-colors hover:bg-night-800"
            >
              Llamar
            </a>
            <CTAButton to="/carta" variant="onCream" icon="arrow">
              Ver la carta
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
