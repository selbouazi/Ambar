import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import ReviewCard from '../components/ReviewCard'
import CTAButton from '../components/CTAButton'
import { ZelligePattern } from '../components/Zellige'
import { business, mapsHref, telHref } from '../data/business'

const n = business

function Stars({ className = 'h-5 w-5' }) {
  return (
    <span className="flex items-center gap-1 text-gold-400" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
        </svg>
      ))}
    </span>
  )
}

export default function Resenas() {
  const [first, ...rest] = n.reviews

  return (
    <>
      <Seo
        title="Opiniones · Restaurante halal Ambar, El Vendrell"
        description={`Opiniones de clientes de Ambar en El Vendrell: ${n.rating.score} sobre 5 con ${n.rating.count} reseñas en Google. Cocina marroquí halal, tajín y cuscús.`}
        path="/resenas"
      />

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-maroc-950 pb-14 pt-28 text-cream-50 sm:pb-16 lg:pt-36">
        <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" tile={130} />
        <div className="relative mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal priority>
                <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
                  Lo que dicen
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-cream-200/70">
                  Reseñas publicadas en la ficha de Google del restaurante. Las
                  mostramos tal cual, sin retocar.
                </p>
              </Reveal>
            </div>

            <Reveal priority delay={100} className="lg:col-span-5">
              <div className="border-t border-cream-100/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="flex items-end gap-4">
                  <p className="tnum font-display text-7xl leading-none text-gold-400">
                    {n.rating.score.toString().replace('.', ',')}
                  </p>
                  <div className="pb-2">
                    <Stars />
                    <p className="mt-1.5 text-[14px] text-cream-200/70">
                      {n.rating.count} reseñas en Google
                    </p>
                  </div>
                </div>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-underline mt-4 inline-block text-[14px] text-gold-300"
                >
                  Ver la ficha en Google
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Reseñas */}
      <section className="bg-cream-50 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
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
            <p className="mt-10 max-w-2xl text-[14px] leading-relaxed text-ink-mute">
              Las reseñas se atribuyen a «Reseña en Google» cuando la persona no
              publica su nombre. Puedes leerlas todas, con sus respuestas, en la ficha
              del restaurante en Google.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-maroc-900 py-16 text-cream-50 sm:py-20">
        <div className="mx-auto flex max-w-[75rem] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-normal leading-tight">
              Ven a comprobarlo tú mismo
            </h2>
            <p className="mt-2 text-[15px] text-cream-200/65">
              Reserva opcional. También puedes pedir para llevar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={telHref} variant="primary" icon="phone">
              Llamar
            </CTAButton>
            <CTAButton to="/carta" variant="onDark" icon="arrow">
              Ver la carta
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
