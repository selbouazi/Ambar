import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import Photo from '../components/Photo'
import PhotoFrame from '../components/PhotoFrame'
import ReviewCard from '../components/ReviewCard'
import Gallery from '../components/Gallery'
import MapEmbed from '../components/MapEmbed'
import Icon from '../components/Icons'
import { StarPattern, StarMotif, HalalSeal, Leaf } from '../components/Ornament'
import { CouscousNotice } from '../components/Hours'
import { site, mapsHref, telHref, instagramHref } from '../data/site'
import { copy } from '../data/copy'
import { findDishByTag, priceOf, starDishes } from '../data/menu'
import useListoTrasPintar from '../useListoTrasPintar'

const n = site

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night-950 text-cream-50">
      <div className="absolute inset-0" aria-hidden="true">
        <Photo
          photoKey="heroInterior"
          mobilePhotoKey="galeria03"
          ratio="h-full"
          className="h-full"
          alt=""
          eager
          position="center 72%"
          sizes="100vw"
        />
        <div className="photo-scrim absolute inset-0" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[86rem] flex-1 flex-col px-5 pb-24 pt-28 sm:px-8 md:pb-8 lg:px-12 lg:pt-36">
        <div className="flex flex-1 flex-col justify-end pb-12 lg:justify-center lg:pb-20">
          <div className="max-w-4xl">
            <h1 className="font-display text-[clamp(5.4rem,21vw,14rem)] leading-[0.78] tracking-[-0.035em] text-cream-50">
              Ambar
            </h1>
            <div className="mt-7 grid gap-7 lg:grid-cols-12 lg:items-end">
              <p className="max-w-xl text-[17px] leading-relaxed text-cream-200 sm:text-[19px] lg:col-span-7">
                {copy.hero.lead}
              </p>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <CTAButton to="/carta" variant="primary" icon="arrow">
                  Ver la carta
                </CTAButton>
                <CTAButton href={telHref} variant="onDark" icon="phone">
                  Llamar
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 border-t border-cream-100/25 pt-6 text-[14px] sm:grid-cols-3 sm:gap-8">
          <div className="flex items-center gap-3">
            <HalalSeal className="h-9 w-9 shrink-0 text-gold-400" />
            <p className="text-cream-200">
              <span className="text-cream-50">Cocina halal</span>
              <span className="block text-[13px]">Tajín, parrilla y pescado</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StarMotif className="h-6 w-6 shrink-0 text-gold-400" filled />
            <p className="text-cream-200">
              <span className="tnum text-cream-50">
                {n.rating.score.toString().replace('.', ',')} sobre 5
              </span>
              <span className="block text-[13px]">{n.rating.count} reseñas en Google</span>
            </p>
          </div>
          <div className="flex items-center gap-3 sm:justify-end">
            <Icon name="clock" className="h-5 w-5 shrink-0 text-gold-400" />
            <p className="text-cream-200">
              <span className="text-cream-50">Martes a domingo</span>
              <span className="block text-[13px]">12:30 – 24:00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Historia() {
  return (
    <section className="bg-cream-50 py-20 text-ink sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-20 lg:px-12">
        <Reveal className="lg:col-span-5">
          <PhotoFrame
            photoKey="historiaInterior"
            ratio="4/5"
            caption="El comedor de Ambar, tranquilo y climatizado."
            tone="light"
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="mx-auto max-w-md lg:max-w-none"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            title={copy.historia.title}
            description={copy.historia.description}
            tone="light"
          />

          <Reveal delay={80}>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              {copy.historia.body}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-ink/15 pt-6">
              <div>
                <dt className="text-[13px] text-ink-mute">Google</dt>
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
                <dt className="text-[13px] text-ink-mute">Cuscús</dt>
                <dd className="mt-1 font-display text-4xl leading-none text-gold-700">Viernes</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <CTAButton to="/carta" variant="onCream" icon="arrow">
                La carta completa
              </CTAButton>
              <p className="max-w-xs text-[14px] leading-relaxed text-ink-mute">
                {copy.historia.reserveNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CartaDestacada() {
  return (
    <section className="relative overflow-hidden bg-night-950 py-20 text-cream-50 sm:py-28 lg:py-32">
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={190} />
      <div className="relative mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-7">
          <SectionHeading
            title={copy.cartaDestacada.title}
            description={copy.cartaDestacada.description}
          />

          <ul className="mt-10">
            {starDishes.map((dish, i) => (
              <Reveal as="li" key={dish.name} delay={i * 40}>
                <Link
                  to={`/carta#${dish.categoryId}`}
                  className="group flex items-baseline gap-3 border-b border-cream-100/15 py-5 hover:border-gold-500/60"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <h3 className="text-[18px] font-medium leading-snug text-cream-50">
                        {dish.name}
                      </h3>
                      {dish.tags?.includes('solo-viernes') && (
                        <span className="border border-gold-500/50 px-2 py-0.5 text-[13px] font-medium text-gold-300">
                          Solo viernes
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-md text-[15px] leading-relaxed text-cream-200">
                      {dish.detail}
                    </p>
                  </div>
                  <span aria-hidden="true" className="menu-leader mb-1 min-w-6 flex-1 self-end" />
                  <span className="tnum shrink-0 text-[19px] font-semibold text-gold-400">
                    {dish.priceLabel || priceOf(dish)}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-9">
              <CTAButton to="/carta" variant="onDark" icon="arrow">
                Ver toda la carta
              </CTAButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-5">
          <PhotoFrame
            photoKey="marisco"
            ratio="4/5"
            caption="Marisco y pescado, recién hechos."
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="mx-auto max-w-md lg:max-w-none"
          />
        </Reveal>
      </div>
    </section>
  )
}

function CouscousBanner() {
  const featured = findDishByTag('solo-viernes')
  const featuredPrice = featured ? priceOf(featured) : '7,00 €'

  return (
    <section className="bg-cream-50 py-20 text-ink sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-20 lg:px-12">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="max-w-2xl font-display text-[clamp(2.8rem,6.8vw,6rem)] leading-[0.94] tracking-[-0.02em] text-ink">
              {copy.couscous.title}
            </h2>
            <CouscousNotice tone="light" className="mt-5 max-w-xl text-[16px] leading-relaxed" />
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-5">
          <div className="border-t border-ink/20 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="tnum font-display text-[clamp(3.6rem,7vw,5.5rem)] leading-none text-gold-700">
              {featuredPrice}
            </p>
            <div className="mt-6">
              <CTAButton to="/carta#platos" variant="onCream" icon="arrow">
                Ver en la carta
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Resenas() {
  return (
    <section className="bg-cream-50 pb-20 pt-4 text-ink sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-t border-ink/15 pt-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeading
              title={copy.resenas.title}
              description={copy.resenas.description}
              tone="light"
            />
            <Reveal delay={100}>
              <div className="mt-8 flex items-end gap-4">
                <p className="tnum font-display text-7xl leading-none text-gold-700">
                  {n.rating.score.toString().replace('.', ',')}
                </p>
                <div className="pb-1">
                  <div className="flex items-center gap-1 text-gold-700" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarMotif key={i} className="h-4 w-4" filled />
                    ))}
                  </div>
                  <p className="mt-1 text-[14px] text-ink-mute">
                    {n.rating.count} reseñas · {n.rating.dateLabel}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8">
                <CTAButton to="/resenas" variant="onCream" icon="arrow">
                  Leer las reseñas
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {n.reviews.map((review, i) => (
              <Reveal key={review.id} delay={i * 50} className={i === 0 ? 'sm:col-span-2' : ''}>
                <ReviewCard review={review} featured={i === 0} tone="light" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Familias() {
  return (
    <section className="relative overflow-hidden bg-night-900 py-20 text-cream-50 sm:py-28 lg:py-32">
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={200} />
      <Leaf className="pointer-events-none absolute -right-10 bottom-0 h-56 w-40 text-leaf opacity-20" />
      <div className="relative mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading title={copy.familias.title} description={copy.familias.description} />
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              {copy.familias.services.map((service) => (
                <span key={service.label} className="flex items-center gap-2 text-[14px] text-cream-200">
                  <Icon name={service.icon} className="h-4 w-4 text-gold-400" />
                  {service.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {n.familyFacts.map((fact, i) => (
              <Reveal as="li" key={fact} delay={i * 40}>
                <div className="flex gap-3 border-t border-cream-100/15 pt-4">
                  <StarMotif className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-500" />
                  <p className="text-[15px] leading-relaxed text-cream-200">{fact}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Llegar() {
  return (
    <section id="llegar" className="scroll-mt-24 bg-cream-50 py-20 text-ink sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading title={copy.llegar.title} description={copy.llegar.description} tone="light" />

          <Reveal delay={80}>
            <address className="mt-8 not-italic">
              <p className="font-display text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.08] text-ink">
                <span className="block">{n.addressLines[0]}</span>
                <span className="block text-ink-mute">{n.addressLines[1]}</span>
              </p>
              <p className="mt-3 text-[13px] text-ink-mute">Plus Code: {n.address.plusCode}</p>
            </address>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-soft">{n.parking.note}</p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={mapsHref} external variant="primary" icon="external">
                Abrir en Google Maps
              </CTAButton>
              <CTAButton href={telHref} variant="onCream" icon="phone">
                Llamar
              </CTAButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-7">
          <MapEmbed className="h-full min-h-[340px]" />
        </Reveal>
      </div>
    </section>
  )
}

function Cierre() {
  return (
    <section className="relative overflow-hidden bg-night-950 py-16 text-cream-50 sm:py-20 lg:py-24">
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={180} />
      <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-2xl font-display text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[0.94] tracking-[-0.02em]">
                {copy.cierre.titleA}
                <br />
                {copy.cierre.titleB}
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-cream-200">
                {copy.cierre.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="border-t border-cream-100/20 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <a
                href={telHref}
                className="inline-flex items-center gap-3 font-display text-[clamp(2rem,3.6vw,3rem)] leading-none text-cream-50 hover:text-gold-300"
              >
                <Icon name="phone" className="h-6 w-6 text-gold-400" />
                {n.phone.display}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href={telHref} variant="primary" icon="phone">
                  Llamar ahora
                </CTAButton>
                <CTAButton href={instagramHref} external variant="onDark">
                  Instagram
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Inicio() {
  // En la portada abierta directamente, el hero ya viene pintado en el HTML
  // (#hero-estatico): React lo deja tal cual y no lo vuelve a renderizar.
  const heroEstatico = typeof window !== 'undefined' && window.__heroEstatico === true
  // El hero se pinta en el primer compromiso; las secciones entran después.
  const seccionesListas = useListoTrasPintar()

  return (
    <>
      <Seo title={copy.seo.home.title} description={copy.seo.home.description} path="/" />
      {!heroEstatico && <Hero />}
      {seccionesListas ? (
        <>
          <Historia />
          <CartaDestacada />
          <CouscousBanner />
          <section className="bg-night-950 pb-20 pt-4 text-cream-50 sm:pb-28 lg:pb-32">
            <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-12">
              <div className="mb-9 flex items-end justify-between gap-6">
                <h2 className="font-display text-[clamp(2.15rem,4.6vw,3.75rem)] leading-[1.02] tracking-[-0.012em] text-cream-50">
                  {copy.gallery.title}
                </h2>
                <p className="hidden pb-1 text-[14px] text-cream-200 sm:block">
                  Fotos reales del restaurante
                </p>
              </div>
              <Gallery />
            </div>
          </section>
          <Resenas />
          <Familias />
          <Llegar />
          <Cierre />
        </>
      ) : (
        /* Reserva de alto mientras entran las secciones: nadie de lo ya pintado
           se mueve cuando llegan (CLS 0). */
        <div className="min-h-[85vh] bg-cream-50" aria-hidden="true" />
      )}
    </>
  )
}
