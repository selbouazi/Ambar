import Seo from '../components/Seo'
import { FadeIn, Stagger, StaggerItem } from '../components/FadeIn'
import Counter from '../components/Counter'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import ReviewCard from '../components/ReviewCard'
import { ZelligeGrain, ZelligeLine } from '../components/Zellige'
import { restaurante, GOOGLE_MAPS_URL } from '../data/restaurante'

const n = restaurante.negocio

export default function Resenas() {
  return (
    <>
      <Seo
        title={`Reseñas · ${n.nombre} (${n.valoracion.puntuacion}/5)`}
        description={`Opiniones de clientes de ${n.nombre} en El Vendrell: ${n.valoracion.puntuacion} sobre 5 con ${n.valoracion.numero_resenas} reseñas en Google. Cocina marroquí halal recomendada por familias.`}
        path="/resenas"
      />

      <header className="relative overflow-hidden bg-maroc-950 pb-16 pt-40 text-cream-50 sm:pb-24 lg:pt-48">
        <ZelligeGrain className="pointer-events-none absolute -right-24 bottom-0 h-[55vh] w-[55vh] text-gold-400 opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-gold-400">
              <span className="h-px w-10 bg-gold-500/70" />
              Reseñas
            </p>
            <h1 className="mt-5 font-display text-6xl font-medium italic leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Palabra de cliente
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream-200/70">
              La mejor carta de presentación de Ambar la escriben quienes vienen a
              comer y repiten.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Bloque editorial de valoración */}
      <section className="border-b border-gold-500/15 bg-maroc-900 py-20 text-cream-50 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <FadeIn>
            <div className="flex items-center gap-6">
              <p className="font-display text-8xl font-semibold leading-none text-gold-400 sm:text-9xl">
                <Counter value={n.valoracion.puntuacion} decimals={1} />
              </p>
              <div>
                <span className="flex items-center gap-1 text-gold-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                      <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
                    </svg>
                  ))}
                </span>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-cream-200/65">
                  sobre 5 · Google
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="lg:pl-10">
              <p className="font-display text-3xl font-medium italic leading-snug text-cream-100 sm:text-4xl">
                <Counter value={n.valoracion.numero_resenas} /> reseñas reales, casi
                todos repiten
              </p>
              <div className="mt-7">
                <CTAButton
                  href={GOOGLE_MAPS_URL}
                  external
                  variant="gold"
                  icon="external"
                >
                  Ver en Google
                </CTAButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mosaico de reseñas */}
      <section className="bg-cream-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            kicker="Lo que nos escriben"
            title="Reseñas que nos dan fuerzas"
            tone="light"
          />
          <Stagger
            className="mt-14 columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3"
            stagger={0.07}
          >
            {restaurante.resenas_destacadas.map((r) => (
              <StaggerItem key={r.autor} className="break-inside-avoid">
                <ReviewCard author={r.autor} text={r.texto} />
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn className="mt-16 text-center">
            <ZelligeLine className="mx-auto max-w-xs text-gold-500/60" />
            <p className="mx-auto mt-6 max-w-xl text-ink/65">
              ¿Ya nos has probado? Deja tu reseña en Google y ayúdanos a seguir
              creciendo.
            </p>
            <div className="mt-6">
              <CTAButton
                href={GOOGLE_MAPS_URL}
                external
                variant="dark"
                icon="external"
              >
                Escribir una reseña
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}