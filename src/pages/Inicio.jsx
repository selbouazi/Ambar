import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTAButton from '../components/CTAButton'
import Photo from '../components/Photo'
import PhotoFrame from '../components/PhotoFrame'
import ReviewCard, { HighlightCard } from '../components/ReviewCard'
import Gallery from '../components/Gallery'
import MapEmbed from '../components/MapEmbed'
import BrushLabel from '../components/BrushLabel'
import Icon from '../components/Icons'
import { LogoMark, Wordmark } from '../components/Brand'
import { StarPattern, StarMotif, HalalSeal, Leaf, DottedRule } from '../components/Ornament'
import { LiveStatus, CouscousNotice } from '../components/Hours'
import { site, hoursSummary, mapsHref, telHref, instagramHref } from '../data/site'
import { copy } from '../data/copy'
import { breakfastTeaser, findDishByTag, formatPrice, priceOf, starDishes } from '../data/menu'

const n = site

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night-950 text-cream-50">
      <div className="absolute inset-0">
        <Photo photoKey="heroInterior" ratio="h-full" className="h-full" eager sizes="100vw" />
        <div className="photo-scrim absolute inset-0" aria-hidden="true" />
      </div>
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={170} />

      <div className="relative mx-auto flex w-full max-w-[78rem] flex-1 flex-col px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <BrushLabel variant={0} size="md">
              {copy.hero.kicker}
            </BrushLabel>

            <h1 className="mt-5">
              <Wordmark className="block text-[clamp(5.5rem,18vw,12rem)]">Ambar</Wordmark>{' '}
              <span className="mt-2 block max-w-md text-[13px] font-semibold uppercase tracking-[0.32em] text-cream-100/80">
                Restaurante halal · El Vendrell
              </span>
            </h1>

            <p className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-cream-100/85 sm:text-lg">
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

            <div className="mt-8 flex items-start gap-4 border-l-2 border-gold-500 pl-4">
              <HalalSeal className="hidden h-12 w-12 shrink-0 text-gold-400 sm:block" />
              <div>
                <p className="font-brush text-[24px] leading-tight text-gold-300">{copy.hero.panelTitle}</p>
                <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-cream-100/70">
                  {copy.hero.panelText}
                </p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:col-span-5 lg:block">
            <div className="ml-auto max-w-sm border border-gold-500/60 bg-night-950/75 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <LogoMark className="h-14 w-14" />
                <div className="text-right">
                  <p className="tnum font-display text-5xl leading-none text-gold-400">
                    {n.rating.score.toString().replace('.', ',')}
                  </p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-cream-200/70">
                    {n.rating.count} reseñas en Google
                  </p>
                  <p className="text-[11px] text-cream-200/50">Datos de {n.rating.dateLabel}</p>
                </div>
              </div>

              <DottedRule className="my-5 text-gold-500" />

              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-400">Hoy</p>
              <p className="mt-1 text-[15px] text-cream-100/85">{hoursSummary}</p>

              <div className="mt-6 border-t border-cream-100/12 pt-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-400">Precio medio</p>
                <p className="mt-1 text-[15px] text-cream-100/85">{n.priceRange}</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-cream-100/15 pt-5 text-[12px] uppercase tracking-[0.1em] text-cream-100/65 sm:flex-row sm:items-center sm:justify-between">
          <p>Ctra. de Valls, 70 · El Vendrell</p>
          <p className="hidden sm:block">{n.rating.score.toString().replace('.', ',')} sobre 5 · {n.rating.count} reseñas</p>
          <p>{n.priceRange}</p>
        </div>
      </div>
    </section>
  )
}

function Historia() {
  return (
    <section className="relative overflow-hidden bg-night-900 py-20 sm:py-28 lg:py-32">
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={170} />
      <Leaf className="pointer-events-none absolute -left-5 bottom-0 h-44 w-32 text-leaf opacity-20" />
      <div className="relative mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <Reveal className="lg:col-span-5">
          <PhotoFrame
            photoKey="historiaInterior"
            ratio="4/5"
            caption="El comedor de Ambar, tranquilo y climatizado."
            className="mx-auto max-w-sm lg:max-w-none"
          />
        </Reveal>

        <div className="lg:col-span-7 lg:pt-4">
          <Reveal>
            <BrushLabel variant={2}>La casa</BrushLabel>
          </Reveal>
          <SectionHeading
            title={copy.historia.title}
            description={copy.historia.description}
            className="mt-5"
          />

          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-cream-200/75">
              {copy.historia.body}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-5 border-t border-gold-500/30 pt-6">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-cream-200/55">Google</dt>
                <dd className="tnum mt-1 font-display text-3xl text-gold-400">
                  {n.rating.score.toString().replace('.', ',')}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-cream-200/55">Reseñas</dt>
                <dd className="tnum mt-1 font-display text-3xl text-gold-400">{n.rating.count}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.14em] text-cream-200/55">Cuscús</dt>
                <dd className="mt-1 font-display text-3xl text-gold-400">Vie</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CTAButton to="/carta" variant="onDark" icon="arrow">
                La carta completa
              </CTAButton>
              <p className="max-w-xs text-[13px] leading-relaxed text-cream-200/60">
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
      <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <BrushLabel variant={3}>De la carta</BrushLabel>
          </Reveal>
          <SectionHeading
            title={copy.cartaDestacada.title}
            description={copy.cartaDestacada.description}
            className="mt-5"
          />
          <Reveal delay={140}>
            <div className="mt-8">
              <CTAButton to="/carta" variant="onDark" icon="arrow">
                Ver toda la carta
              </CTAButton>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 hidden lg:block">
              <PhotoFrame
                photoKey="marisco"
                ratio="4/3"
                caption="Marisco y pescado, recién hechos."
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {starDishes.map((dish, i) => (
              <Reveal as="li" key={dish.name} delay={i * 60}>
                <Link
                  to={`/carta#${dish.categoryId}`}
                  className="group flex items-baseline gap-3 border-b border-cream-100/12 py-5 transition-colors hover:border-gold-500/60"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2.5">
                      <h3 className="font-display text-[24px] uppercase leading-snug tracking-wide text-cream-50">
                        {dish.name}
                      </h3>
                      {dish.tags?.includes('solo-viernes') && (
                        <span className="rounded-sm bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-night-950">
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
                    className="menu-leader mb-1 min-w-6 flex-1 self-end"
                  />
                  <span className="tnum shrink-0 text-[17px] font-semibold text-gold-400">
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

function CouscousBanner() {
  const featured = findDishByTag('solo-viernes')
  const featuredPrice = featured ? priceOf(featured) : '7,00 €'

  return (
    <section className="bg-gold-500 py-14 text-night-950 sm:py-20">
      <div className="mx-auto grid max-w-[78rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
        <Reveal className="lg:col-span-4">
          <PhotoFrame
            photoKey="cuscus"
            ratio="4/3"
            tilt="right"
            caption="Cuscús con verduras y garbanzos"
            sizes="(min-width: 1024px) 32vw, 100vw"
          />
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-brush text-[27px] leading-none text-night-900/80">El plato de la semana</p>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7vw,5.5rem)] uppercase leading-[0.9]">
              {copy.couscous.title}
            </h2>
            <CouscousNotice className="mt-4 text-[16px] leading-relaxed text-night-900/85 [&_span]:!text-night-900" />
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <p className="tnum font-display text-5xl leading-none">{featuredPrice}</p>
              <CTAButton to="/carta#platos" variant="onCream" icon="arrow">
                Ver en la carta
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Desayunos() {
  return (
    <section className="relative overflow-hidden bg-night-950 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <BrushLabel variant={1}>Por la mañana</BrushLabel>
          </Reveal>
          <SectionHeading title={copy.desayunos.title} description={copy.desayunos.description} className="mt-5" />
          <Reveal delay={140}>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-cream-200/75">
              {copy.desayunos.body}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 border border-gold-500/50 p-5">
              <p className="font-brush text-[22px] leading-snug text-gold-300">También hay brunch</p>
              <p className="mt-1 text-[14px] leading-relaxed text-cream-200/70">{copy.desayunos.note}</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {breakfastTeaser.map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 70}>
                <div className="menu-row flex items-baseline gap-3 border-b border-cream-100/12 py-5">
                  <div className="min-w-0">
                    <h3 className="font-display text-[22px] uppercase leading-snug tracking-wide text-cream-50">
                      {item.name}
                    </h3>
                    <p className="mt-1 max-w-md text-[15px] leading-relaxed text-cream-200/70">
                      {item.detail}
                    </p>
                  </div>
                  <span aria-hidden="true" className="menu-leader mb-1 min-w-6 flex-1 self-end" />
                  <span className="tnum shrink-0 text-[17px] font-semibold text-gold-400">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={240}>
            <p className="mt-5 text-[13px] text-cream-200/55">
              El horario de desayunos está pendiente de confirmar. Llámanos antes de venir.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Resenas() {
  return (
    <section className="bg-night-900 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <BrushLabel variant={2}>Google</BrushLabel>
            </Reveal>
            <SectionHeading title={copy.resenas.title} description={copy.resenas.description} className="mt-5" />
            <Reveal delay={140}>
              <div className="mt-8 flex items-end gap-4">
                <p className="tnum font-display text-6xl leading-none text-gold-400">
                  {n.rating.score.toString().replace('.', ',')}
                </p>
                <div className="pb-1">
                  <div className="flex items-center gap-1 text-gold-400" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarMotif key={i} className="h-4 w-4" filled />
                    ))}
                  </div>
                  <p className="mt-1 text-[13px] text-cream-200/70">{n.rating.count} reseñas · {n.rating.dateLabel}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <CTAButton to="/resenas" variant="onDark" icon="arrow">
                  Leer las reseñas
                </CTAButton>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {n.reviews.map((review, i) => (
              <Reveal key={review.id} delay={i * 80} className={i === 0 ? 'sm:col-span-2' : ''}>
                <ReviewCard review={review} featured={i === 0} />
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
    <section className="relative overflow-hidden bg-night-950 py-20 text-cream-50 sm:py-28 lg:py-32">
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={180} />
      <Leaf className="pointer-events-none absolute -right-8 top-10 h-48 w-36 text-leaf opacity-20" />
      <div className="relative mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <BrushLabel variant={3}>En familia</BrushLabel>
          </Reveal>
          <SectionHeading title={copy.familias.title} description={copy.familias.description} className="mt-5" />
          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              {copy.familias.services.map((service) => (
                <span key={service.label} className="flex items-center gap-2 text-[13px] text-cream-200/75">
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
              <Reveal as="li" key={fact} delay={i * 50}>
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

function Llegar() {
  return (
    <section id="llegar" className="scroll-mt-24 bg-night-900 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[78rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <Reveal>
            <BrushLabel variant={0}>A un paso</BrushLabel>
          </Reveal>
          <SectionHeading title={copy.llegar.title} description={copy.llegar.description} className="mt-5" />

          <Reveal delay={120}>
            <address className="mt-8 not-italic">
              <p className="font-display text-[26px] uppercase leading-snug text-cream-50">
                <span className="block">{n.addressLines[0]}</span>
                <span className="block text-cream-200/75">{n.addressLines[1]}</span>
              </p>
              <p className="mt-3 text-[13px] text-cream-200/55">Plus Code: {n.address.plusCode}</p>
            </address>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-cream-200/70">{n.parking.note}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={mapsHref} external variant="primary" icon="external">
                Abrir en Google Maps
              </CTAButton>
              <CTAButton href={telHref} variant="onDark" icon="phone">
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

function Cierre() {
  return (
    <section className="relative overflow-hidden bg-gold-500 py-16 text-night-950 sm:py-20 lg:py-24">
      <StarPattern className="pointer-events-none absolute inset-0 h-full w-full text-night-950 opacity-[0.05]" tile={150} />
      <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] uppercase leading-[0.9]">
                {copy.cierre.titleA}
                <br />
                {copy.cierre.titleB}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-night-900/80">
                {copy.cierre.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-5">
            <div className="border-t border-night-950/25 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <a
                href={telHref}
                className="inline-flex items-center gap-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none text-night-950 hover:text-night-800"
              >
                <Icon name="phone" className="h-7 w-7" />
                {n.phone.display}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={telHref}
                  className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-night-950 px-6 py-3 text-[14px] font-bold uppercase tracking-[0.08em] text-gold-400 transition-colors hover:bg-night-800"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Llamar ahora
                </a>
                <CTAButton href={instagramHref} external variant="onCream">
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
  return (
    <>
      <Seo title={copy.seo.home.title} description={copy.seo.home.description} path="/" />
      <Hero />
      <Historia />
      <CartaDestacada />
      <CouscousBanner />
      <Desayunos />
      <section className="bg-night-900 pb-20 pt-4 sm:pb-28 lg:pb-32">
        <div className="mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <div className="mb-9 flex items-center gap-4">
            <BrushLabel variant={1}>El local</BrushLabel>
            <DottedRule className="hidden flex-1 sm:flex" />
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] uppercase leading-none text-cream-50">
            {copy.gallery.title}
          </h2>
          <Gallery className="mt-8" />
        </div>
      </section>
      <Resenas />
      <Familias />
      <Llegar />
      <Cierre />
    </>
  )
}
