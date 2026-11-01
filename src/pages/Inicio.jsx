import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import Photo from '../components/Photo'
import ReviewCard from '../components/ReviewCard'
import Gallery from '../components/Gallery'
import MapEmbed from '../components/MapEmbed'
import Icon from '../components/Icons'
import { HalalSeal, ZelligePattern, StarMotif } from '../components/Zellige'
import { LiveStatus, CouscousNotice } from '../components/Hours'
import { PROTOTIPO } from '../config'
import { business, hoursSummary, mapsHref, telHref } from '../data/business'
import { copy } from '../data/copy'
import { breakfastTeaser, findDishByTag, formatPrice, priceOf, starDishes } from '../data/menu'
import { hasPhoto, galleryPhotos } from '../data/photos'

const n = business

// El parallax de la retícula es lo único que usa framer-motion. Se monta solo
// cuando el visitante empieza a hacer scroll: así el trozo de framer no entra
// en la primera pintura (LCP) y el patrón estático ya está visible.
const HeroPattern = lazy(() => import('../components/HeroPattern'))

function HeroParallax() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        setActive(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!active) {
    return (
      <div className="pointer-events-none absolute inset-0 -bottom-24" aria-hidden="true">
        <ZelligePattern className="h-full w-full text-gold-400 opacity-[0.055]" tile={150} />
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="pointer-events-none absolute inset-0 -bottom-24" aria-hidden="true">
          <ZelligePattern className="h-full w-full text-gold-400 opacity-[0.055]" tile={150} />
        </div>
      }
    >
      <HeroPattern />
    </Suspense>
  )
}

function Stars({ className = 'h-4 w-4' }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
        </svg>
      ))}
    </span>
  )
}

/* ── Portada ─────────────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef(null)
  const photo = hasPhoto('heroInterior')
  const hasRating = n.rating.score !== null && n.rating.count !== null

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-maroc-950 text-cream-50">
      {photo && (
        <div className="absolute inset-0">
          <Photo photoKey="heroInterior" ratio="h-full" className="h-full" eager />
          <div className="photo-scrim absolute inset-0" aria-hidden="true" />
        </div>
      )}

      <HeroParallax />

      <div className="relative mx-auto flex w-full max-w-[75rem] flex-1 flex-col px-5 pb-10 pt-24 sm:px-8 lg:px-12 lg:pb-12 lg:pt-32">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-[15px] text-cream-200/70">{copy.hero.kicker}</p>

            <h1 className="mt-3 font-display text-[clamp(4.5rem,13vw,9rem)] font-normal italic leading-[0.84] tracking-[-0.04em] text-cream-50">
              Ambar
            </h1>

            <p className="mt-7 max-w-[32rem] text-[17px] leading-relaxed text-cream-200/80 sm:text-lg">
              {copy.hero.lead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CTAButton to="/carta" variant="primary" icon="arrow">
                Ver la carta
              </CTAButton>
              <CTAButton href={telHref} variant="onDark" icon="phone">
                Llamar
              </CTAButton>
            </div>

            <LiveStatus className="mt-8" showDetail />

            {/* En el prototipo, el hueco del hero y el sello halal van en columna. */}
            {PROTOTIPO && (
              <div className="mt-8 lg:hidden">
                <Photo photoKey="heroInterior" ratio="16/9" tone="dark" />
              </div>
            )}

            <div
              className={`flex items-center gap-4 border border-gold-500/25 bg-maroc-900/70 p-4 lg:hidden ${
                PROTOTIPO ? 'mt-4' : 'mt-8'
              }`}
            >
              <HalalSeal className="h-12 w-12 shrink-0 text-gold-400" />
              <div>
                <p className="font-display text-lg italic leading-tight text-cream-50">
                  {copy.hero.panelTitle}
                </p>
                <p className="mt-0.5 text-[13px] leading-snug text-cream-200/70">
                  {copy.hero.panelShort}
                </p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:col-span-5 lg:block">
            {PROTOTIPO ? (
              <div className="flex h-full flex-col border border-gold-500/25 bg-maroc-900 p-6">
                <Photo photoKey="heroInterior" ratio="16/9" tone="dark" />

                <div className="mt-6 flex items-start gap-4">
                  <HalalSeal className="h-12 w-12 shrink-0 text-gold-400" />
                  <div>
                    <p className="font-display text-2xl italic leading-tight text-cream-50">
                      {copy.hero.panelTitle}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-cream-200/70">
                      {copy.hero.panelShort}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex h-full min-h-[24rem] flex-col justify-between border border-gold-500/25 bg-maroc-900 p-8">
                <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.07]" tile={110} />
                <div className="relative">
                  <HalalSeal className="h-16 w-16 text-gold-400" />
                </div>
                <div className="relative mt-10">
                  <p className="font-display text-3xl italic leading-tight text-cream-50">
                    {copy.hero.panelTitle}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-cream-200/65">
                    {copy.hero.panelText}
                  </p>
                </div>
                <div className="relative mt-10 border-t border-cream-100/10 pt-5">
                  <div className="flex items-end gap-3">
                    <p className="tnum font-display text-5xl leading-none text-gold-400">
                      {n.rating.score.toString().replace('.', ',')}
                    </p>
                    <div className="pb-1">
                      <Stars className="h-3.5 w-3.5 text-gold-400" />
                      <p className="mt-1 text-[13px] text-cream-200/70">
                        {n.rating.count} reseñas en Google
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-cream-100/10 pt-5 text-[13px] text-cream-200/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {n.addressLines.length > 1
              ? `${n.addressLines[0]} · ${n.addressLines[1]}`
              : n.addressLines[0]}
          </p>
          <p className="tnum hidden sm:block">{hoursSummary}</p>
          {hasRating && (
            <p className="lg:hidden">
              {n.rating.score.toString().replace('.', ',')} sobre 5 · {n.rating.count} reseñas
            </p>
          )}
          <p className="tnum hidden lg:block">{n.priceRange}</p>
        </div>
      </div>
    </section>
  )
}

/* ── La casa ─────────────────────────────────────────────────────────────── */

function Historia() {
  const hasRating = n.rating.score !== null && n.rating.count !== null

  return (
    <section className="bg-cream-50 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <Reveal className="lg:col-span-5">
          <Photo
            photoKey="historiaInterior"
            title="El comedor"
            ratio="4/5"
            tone="light"
            className="w-full"
          />
        </Reveal>

        <div className="lg:col-span-7 lg:pt-6">
          <SectionHeading
            title={copy.historia.title}
            description={copy.historia.description}
          />

          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              {copy.historia.body}
            </p>
          </Reveal>

          {hasRating && (
            <Reveal delay={180}>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
                <div>
                  <dt className="text-[13px] text-ink-mute">Valoración</dt>
                  <dd className="tnum mt-1 font-display text-4xl leading-none text-gold-700">
                    {n.rating.score.toString().replace('.', ',')}
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-mute">Reseñas</dt>
                  <dd className="tnum mt-1 font-display text-4xl leading-none text-gold-700">
                    {n.rating.count}
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-mute">Horario</dt>
                  <dd className="tnum mt-1 font-display text-4xl leading-none text-gold-700">9–24</dd>
                </div>
              </dl>
            </Reveal>
          )}

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CTAButton to="/carta" variant="onCream" icon="arrow">
                La carta completa
              </CTAButton>
              <p className="text-[14px] text-ink-mute">{copy.historia.reserveNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Carta destacada ─────────────────────────────────────────────────────── */

function CartaDestacada() {
  return (
    <section className="bg-maroc-950 py-20 text-cream-50 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            title={copy.cartaDestacada.title}
            description={copy.cartaDestacada.description}
          />
          <Reveal delay={140}>
            <div className="mt-8">
              <CTAButton to="/carta" variant="onDark" icon="arrow">
                Ver toda la carta
              </CTAButton>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {starDishes.map((dish, i) => (
              <Reveal as="li" key={dish.name} delay={i * 60}>
                <Link
                  to={`/carta#${dish.categoryId}`}
                  className="group flex items-baseline gap-3 border-b border-cream-100/12 py-5 transition-colors hover:border-gold-500/40"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <h3 className="font-display text-[22px] font-medium leading-snug text-cream-50">
                        {dish.name}
                      </h3>
                      {dish.tags?.includes('solo-viernes') && (
                        <span className="rounded-full border border-gold-500/50 px-2 py-0.5 text-[11px] text-gold-300">
                          Solo viernes
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-md text-[14px] leading-relaxed text-cream-200/70">
                      {dish.detail}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mb-1 min-w-6 flex-1 self-end border-b border-dotted border-cream-100/20 transition-colors group-hover:border-gold-500/50"
                  />
                  <span className="tnum shrink-0 font-display text-[19px] font-medium text-gold-400">
                    {dish.priceLabel || priceOf(dish)}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ── Plato destacado ─────────────────────────────────────────────────────── */

function CouscousBanner() {
  const featured = findDishByTag('solo-viernes')
  const featuredPrice = featured ? priceOf(featured) : '0 €'

  return (
    <section className="bg-cream-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden bg-maroc-900 px-6 py-10 text-cream-50 sm:px-12 sm:py-14">
            <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.06]" tile={120} />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal italic leading-[0.95] tracking-[-0.03em]">
                  {copy.couscous.title}
                </h2>
                <CouscousNotice className="mt-4 text-[16px] leading-relaxed" />
              </div>
              <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-end lg:justify-center lg:gap-3">
                <p className="tnum font-display text-6xl leading-none text-gold-400">{featuredPrice}</p>
                <CTAButton to="/carta#platos" variant="onDark">
                  Ver en la carta
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Desayunos ───────────────────────────────────────────────────────────── */

function Desayunos() {
  const desayunos = breakfastTeaser.map((item) => ({
    name: item.name,
    detail: item.detail,
    price: item.priceLabel || formatPrice(item.price),
  }))

  return (
    <section className="bg-cream-50 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            title={copy.desayunos.title}
            description={copy.desayunos.description}
          />
          <Reveal delay={140}>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">
              {copy.desayunos.body}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {desayunos.map((item, i) => (
              <Reveal as="li" key={`${item.name}-${i}`} delay={i * 70}>
                <div className="menu-row flex items-baseline gap-3 border-b border-ink/10 py-5">
                  <div className="min-w-0">
                    <h3 className="font-display text-[21px] font-medium leading-snug text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-1 max-w-md text-[15px] leading-relaxed text-ink-soft">
                      {item.detail}
                    </p>
                  </div>
                  <span aria-hidden="true" className="menu-leader mb-1 min-w-6 flex-1 self-end" />
                  <span className="tnum shrink-0 font-display text-[19px] font-medium text-gold-700">
                    {item.price}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={240}>
            <p className="mt-6 text-[14px] text-ink-mute">{copy.desayunos.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Reseñas ─────────────────────────────────────────────────────────────── */

function Resenas() {
  const [first, second, third] = n.reviews
  const hasRating = n.rating.score !== null && n.rating.count !== null

  return (
    <section className="bg-cream-100 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading title={copy.resenas.title} description={copy.resenas.description} />
            {hasRating ? (
              <Reveal delay={120}>
                <div className="mt-8 flex items-end gap-4">
                  <p className="tnum font-display text-6xl leading-none text-gold-700">
                    {n.rating.score.toString().replace('.', ',')}
                  </p>
                  <div className="pb-1">
                    <Stars className="h-4 w-4 text-gold-600" />
                    <p className="mt-1 text-[14px] text-ink-mute">{n.rating.count} reseñas en Google</p>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={120}>
                <div className="mt-8 flex items-center gap-3">
                  <Stars className="h-4 w-4 text-gold-600" />
                  <p className="text-[14px] text-ink-mute">{copy.resenasPage.ratingPlaceholder}</p>
                </div>
              </Reveal>
            )}
            <Reveal delay={180}>
              <div className="mt-8">
                <CTAButton to="/resenas" variant="onCream" icon="arrow">
                  Leer las opiniones
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            <Reveal className="sm:col-span-2">
              <ReviewCard review={first} featured />
            </Reveal>
            <Reveal delay={90}>
              <ReviewCard review={second} />
            </Reveal>
            <Reveal delay={150}>
              <ReviewCard review={third} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Familias y servicios ────────────────────────────────────────────────── */

function Familias() {
  return (
    <section className="bg-maroc-900 py-20 text-cream-50 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            title={copy.familias.title}
            description={copy.familias.description}
          />
          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {copy.familias.services.map((service) => (
                <span key={service.label} className="flex items-center gap-2 text-[14px] text-cream-200/70">
                  <Icon name={service.icon} className="h-4 w-4 text-gold-400" />
                  {service.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {n.familyFacts.map((fact, i) => (
              <Reveal as="li" key={fact} delay={i * 60}>
                <div className="flex gap-3 border-t border-cream-100/12 pt-4">
                  <StarMotif className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-500" />
                  <p className="text-[15px] leading-relaxed text-cream-200/80">{fact}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ── Cómo llegar ─────────────────────────────────────────────────────────── */

function Llegar() {
  const hasMaps = Boolean(mapsHref) && mapsHref !== '#'

  return (
    <section id="llegar" className="scroll-mt-24 bg-cream-50 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[75rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading title={copy.llegar.title} description={copy.llegar.description} />

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
            <div className="mt-6">
              <LiveStatus tone="light" showDetail />
            </div>
          </Reveal>

          <Reveal delay={240}>
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
          <MapEmbed className="h-full min-h-[340px]" />
        </Reveal>
      </div>
    </section>
  )
}

/* ── Cierre ──────────────────────────────────────────────────────────────── */

function Cierre() {
  const hasMaps = Boolean(mapsHref) && mapsHref !== '#'

  return (
    <section className="relative overflow-hidden bg-maroc-950 py-20 text-cream-50 sm:py-28 lg:py-36">
      <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" tile={150} />
      <div className="relative mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
                {copy.cierre.titleA}
                <br />
                <span className="italic">{copy.cierre.titleB}</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-cream-200/70">
                {copy.cierre.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-5">
            <div className="border-t border-cream-100/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <a
                href={telHref}
                className="inline-flex items-center gap-3 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none text-cream-50 hover:text-gold-300"
              >
                <Icon name="phone" className="h-6 w-6 text-gold-400" />
                {n.phone.display.replace('+34 ', '')}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href={telHref} variant="primary" icon="phone">
                  Llamar ahora
                </CTAButton>
                {hasMaps && (
                  <CTAButton href={mapsHref} external variant="onDark" icon="pin">
                    Cómo llegar
                  </CTAButton>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Página ──────────────────────────────────────────────────────────────── */

export default function Inicio() {
  return (
    <>
      <Seo
        title={copy.seo.home.title}
        description={copy.seo.home.description}
        path="/"
      />
      <Hero />
      <Historia />
      <CartaDestacada />
      <CouscousBanner />
      <Desayunos />
      {(PROTOTIPO || galleryPhotos().length >= 4) && (
        <section className="bg-cream-50 pb-20 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
            <SectionHeading title={copy.gallery.title} className="mb-10" />
            <Gallery />
          </div>
        </section>
      )}
      <Resenas />
      <Familias />
      <Llegar />
      <Cierre />
    </>
  )
}
