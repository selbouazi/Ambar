import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Seo from '../components/Seo'
import { FadeIn, Stagger, StaggerItem } from '../components/FadeIn'
import { EASE } from '../components/FadeIn'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import Photo from '../components/Photo'
import DishCard from '../components/DishCard'
import ReviewCard from '../components/ReviewCard'
import Counter from '../components/Counter'
import Icon, { HalalSeal } from '../components/Icons'
import { ZelligeGrain, StarBadge } from '../components/Zellige'
import { restaurante, GOOGLE_MAPS_URL } from '../data/restaurante'
import { PHOTOS, PHOTO_LABELS } from '../data/photos'

const n = restaurante.negocio

function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 900], [0, 190])
  const yContent = useTransform(scrollY, [0, 900], [0, 120])

  return (
    <section ref={ref} className="relative min-h-svh overflow-hidden bg-maroc-950">
      <motion.div style={{ y: yBg }} className="absolute inset-0 -bottom-40">
        <Photo
          src={PHOTOS.heroFachada}
          label={PHOTO_LABELS.heroFachada}
          ratio="w-full h-full"
          rounded="rounded-none"
          eager
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-maroc-950 via-maroc-950/55 to-maroc-950/40" />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_10%,transparent_40%,rgba(23,26,17,0.55)_100%)]"
        aria-hidden="true"
      />
      <ZelligeGrain className="pointer-events-none absolute -right-24 top-24 h-[45vh] w-[45vh] text-gold-400 opacity-[0.06]" />

      <motion.div
        style={{ y: yContent }}
        className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-24 pt-32 sm:px-8 lg:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-gold-400"
        >
          <span className="h-px w-10 bg-gold-500/70" />
          Restaurante halal · El Vendrell · Tarragona
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          className="mt-5 font-display text-[clamp(4.5rem,16vw,10rem)] font-medium italic leading-[0.92] tracking-tight text-cream-50"
        >
          Ambar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-cream-200/85 sm:text-xl"
        >
          Cocina marroquí cocinada en familia, con la calma de casa.
          Del cuscús de los viernes al marisco a la brasa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold text-gold-400">
              <Counter value={n.valoracion.puntuacion} decimals={1} />
            </span>
            <span className="flex items-center gap-0.5 text-gold-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
                </svg>
              ))}
            </span>
          </span>
          <span className="h-5 w-px bg-cream-100/20" aria-hidden="true" />
          <span className="text-sm text-cream-200/75">
            <Counter value={n.valoracion.numero_resenas} /> reseñas reales en Google
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <CTAButton to="/carta" variant="gold" icon="arrow">
            Ver la carta
          </CTAButton>
          <CTAButton href={`tel:${n.telefono_uri}`} variant="outlineCream" icon="phone">
            Llamar
          </CTAButton>
          <CTAButton
            href={GOOGLE_MAPS_URL}
            external
            variant="ghost"
            className="text-cream-200/80"
          >
            Cómo llegar
          </CTAButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-14 flex items-center justify-between border-t border-cream-100/15 pt-5 text-[11px] uppercase tracking-[0.22em] text-cream-200/55"
        >
          <span>Ctra. de Valls, 70 · 43700 El Vendrell</span>
          <span className="hidden sm:inline">Abierto · {n.horario.apertura} a {n.horario.cierre}</span>
          <span className="hidden items-center gap-2 md:inline-flex">
            {n.rango_precio}
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Storytelling() {
  return (
    <section className="relative overflow-hidden bg-cream-50 py-24 sm:py-32 lg:py-40">
      <StarBadge className="pointer-events-none absolute right-8 top-16 h-24 w-24 opacity-40 lg:right-20 lg:h-32 lg:w-32" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-6" y={28}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-5 -top-5 h-full w-full rounded-[2.5rem] border border-gold-500/35 md:-left-7 md:-top-7"
            />
            <Photo
              src={PHOTOS.interior}
              label={PHOTO_LABELS.interior}
              ratio="aspect-[4/5]"
              className="w-full"
            />
            <div className="absolute -bottom-8 -right-3 hidden items-center gap-3 rounded-2xl border border-gold-500/30 bg-cream-100 px-5 py-4 shadow-xl shadow-maroc-950/10 sm:flex">
              <HalalSeal className="h-14 w-14 text-maroc-800" />
              <div>
                <p className="font-display text-lg italic text-ink">Cocina halal</p>
                <p className="text-xs text-ink/60">Siempre certificada</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="lg:col-span-6">
          <SectionHeading
            align="left"
            kicker="Nuestra historia"
            title="Un rincón marroquí, abierto a toda la familia"
            tone="light"
            className="max-w-xl"
          />
          <FadeIn delay={0.1}>
            <p className="-mt-2 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              En <em className="font-display italic text-ink">Ambar</em> cocinamos recetas
              marroquíes como se hacían en casa: a fuego lento, con calma y buenos
              ingredientes. Tajines, cuscús solo los viernes, marisco a la brasa y unos
              desayunos que arrancan el día con el sabor del norte de África.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
              Un local acogedor e informal donde venir con los niños, con amigos o,
              sencillamente, a cenar tranquilo frente a la cocina vista.
            </p>
          </FadeIn>

          <Stagger className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <StaggerItem>
              <p className="font-display text-4xl font-semibold text-gold-600 lg:text-5xl">
                <Counter value={n.valoracion.puntuacion} decimals={1} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink/55">Valoración en Google</p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-display text-4xl font-semibold text-gold-600 lg:text-5xl">
                <Counter value={n.valoracion.numero_resenas} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink/55">Reseñas reales</p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-display text-4xl font-semibold text-gold-600 lg:text-5xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink/55">Cocina halal</p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-display text-4xl font-semibold text-gold-600 lg:text-5xl">
                {n.horario.apertura.split(':')[0]}–{n.horario.cierre.split(':')[0]}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ink/55">
                Horas abiertos <span className="text-gold-600">· [FALTA DATO]</span>
              </p>
            </StaggerItem>
          </Stagger>

          <FadeIn delay={0.2} className="mt-12 flex flex-wrap gap-3">
            <CTAButton href={`tel:${n.telefono_uri}`} variant="dark" icon="phone">
              Llamar y reservar
            </CTAButton>
            <CTAButton to="/informacion" variant="outlineDark">
              Más sobre el local
            </CTAButton>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

const ESPECIALIDADES = [
  {
    photo: PHOTOS.tajin,
    label: PHOTO_LABELS.tajin,
    name: 'Tajín',
    description: 'De pollo o de ternera, a fuego lento, servido en su tandjra.',
    price: '7 €',
    category: 'Platos',
  },
  {
    photo: PHOTOS.cuscus,
    label: PHOTO_LABELS.cuscus,
    name: 'Cuscús',
    description: 'La receta de la casa. Solo se sirve los viernes.',
    price: '7 €',
    note: 'Viernes',
    category: 'Platos',
  },
  {
    photo: PHOTOS.mariscos,
    label: PHOTO_LABELS.mariscos,
    name: 'Marisco a la brasa',
    description: 'Gambas a la plancha y paella de marisco, del día a la mesa.',
    price: '8 €',
    category: 'Pescado',
  },
  {
    photo: PHOTOS.tacos,
    label: PHOTO_LABELS.tacos,
    name: 'Tacos',
    description: 'Pollo, ternera, carne picada o marisco, con bebida y patatas +2 €.',
    price: '5 €',
    category: 'Tacos',
  },
]

function Especialidades() {
  return (
    <section className="relative overflow-hidden bg-maroc-900 py-24 text-cream-50 sm:py-32">
      <ZelligeGrain className="pointer-events-none absolute -left-32 bottom-0 h-[50vh] w-[50vh] text-gold-400 opacity-[0.05]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Especialidades"
          title="Lo que no puedes irte sin probar"
          description={`Cuatro platos que han convertido a Ambar en una parada obligada del Vendrell — ${n.rango_precio.toLowerCase()}.`}
          tone="dark"
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {ESPECIALIDADES.map((d) => (
            <StaggerItem key={d.name} className="h-full">
              <DishCard {...d} />
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn delay={0.15} className="mt-12 text-center">
          <CTAButton to="/carta" variant="outlineCream" icon="arrow">
            Ver la carta completa
          </CTAButton>
        </FadeIn>
      </div>
    </section>
  )
}

function ResenasAvance() {
  const [a, b, c] = restaurante.resenas_destacadas
  return (
    <section className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
          <FadeIn>
            <SectionHeading
              align="left"
              kicker="Reseñas"
              title="Quien viene, repite"
              description="Así describen los clientes su visita a Ambar en Google."
            />
            <div className="mt-8 flex items-center gap-5">
              <p className="font-display text-7xl font-semibold text-gold-600">
                <Counter value={n.valoracion.puntuacion} decimals={1} />
              </p>
              <div>
                <span className="flex items-center gap-1 text-gold-500">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
                    </svg>
                  ))}
                </span>
                <p className="mt-1.5 text-sm text-ink/60">
                  <Counter value={n.valoracion.numero_resenas} /> reseñas en Google
                </p>
              </div>
            </div>
            <div className="mt-8">
              <CTAButton to="/resenas" variant="dark" icon="arrow">
                Todas las reseñas
              </CTAButton>
            </div>
          </FadeIn>

          <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.1}>
            <StaggerItem className="md:translate-y-8">
              <ReviewCard author={a.autor} text={a.texto} />
            </StaggerItem>
            <StaggerItem>
              <ReviewCard author={b.autor} text={b.texto} featured />
            </StaggerItem>
            <StaggerItem className="md:col-span-2">
              <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
                <ReviewCard author={c.autor} text={c.texto} />
                <div className="flex flex-col justify-center rounded-[1.75rem] border border-gold-500/30 bg-maroc-800 p-8 text-cream-50">
                  <Icon name="quote" className="h-6 w-6 text-gold-400" />
                  <p className="mt-4 font-display text-xl italic leading-snug text-cream-100">
                    &ldquo;{restaurante.resenas_destacadas[3].texto}&rdquo;
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-cream-200/55">
                    {restaurante.resenas_destacadas[3].autor} · Google
                  </p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  )
}

const SERVICIOS = [
  { icon: 'moon', label: 'Cocina halal' },
  { icon: 'family', label: 'Ideal para familias' },
  { icon: 'umbrella', label: 'Terraza' },
  { icon: 'delivery', label: 'A domicilio y para llevar' },
  { icon: 'wifi', label: 'Wi-Fi gratis' },
  { icon: 'coffee', label: 'Buen café' },
  { icon: 'baby', label: 'Menú infantil' },
  { icon: 'wheelchair', label: 'Accesible' },
]

function Servicios() {
  return (
    <section className="border-y border-gold-500/15 bg-maroc-800 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-400">
            Un lugar para disfrutar
          </p>
        </FadeIn>
        <Stagger className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-8" stagger={0.06}>
          {SERVICIOS.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group flex flex-col items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold-500/30 text-gold-400 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-500/10">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-cream-200/60">
                  {s.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-maroc-900 py-24 sm:py-32">
      <ZelligeGrain className="pointer-events-none absolute inset-x-0 top-0 h-full w-full text-gold-400 opacity-[0.045]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <FadeIn>
          <HalalSeal className="mx-auto h-20 w-20 text-gold-500" />
          <h2 className="mt-8 font-display text-5xl font-medium italic leading-[1.02] tracking-tight text-cream-50 sm:text-6xl lg:text-7xl">
            ¿Te reservamos
            <br />
            una mesa?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-cream-200/70">
            Abierto de {n.horario.apertura} a {n.horario.cierre} en la Ctra. de Valls,
            70, El Vendrell. Reserva por teléfono y te la preparamos al detalle.
          </p>
        </FadeIn>
        <FadeIn delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CTAButton href={`tel:${n.telefono_uri}`} variant="gold" icon="phone">
            Reservar · {n.telefono.replace('+34 ', '')}
          </CTAButton>
          <CTAButton
            href={n.enlaces.pedidos_online.url}
            external
            variant="outlineCream"
            icon="delivery"
          >
            Pedir a domicilio
          </CTAButton>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="mt-6 text-xs text-cream-200/45">
            Sin sistema de reservas online por ahora — reservar es una llamada.{' '}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-underline text-gold-400"
            >
              Cómo llegar →
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export default function Inicio() {
  return (
    <>
      <Seo
        title={`${n.nombre} · Cocina marroquí halal en El Vendrell`}
        description={`Restaurante halal en El Vendrell: tajines, cuscús los viernes, marisco a la brasa y desayunos marroquíes. Valoración ${n.valoracion.puntuacion} sobre 5 con ${n.valoracion.numero_resenas} reseñas.`}
        path="/"
      />
      <Hero />
      <Storytelling />
      <Especialidades />
      <ResenasAvance />
      <Servicios />
      <CtaFinal />
    </>
  )
}