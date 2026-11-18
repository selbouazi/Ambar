import { useEffect, useMemo, useRef, useState } from 'react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CTAButton from '../components/CTAButton'
import MenuCategory from '../components/MenuCategory'
import Icon from '../components/Icons'
import { LiveStatus } from '../components/Hours'
import { scrollToHash } from '../components/SmoothScroll'
import useListoTrasPintar from '../useListoTrasPintar'
import { site, mapsHref, telHref } from '../data/site'
import { copy } from '../data/copy'
import { menu } from '../data/menu'

const CATEGORY_PHOTOS = {
  entrantes: { key: 'marisco', caption: 'Marisco fresco, preparado al momento' },
  platos: { key: 'tajine', caption: 'Tajín de carne con ciruelas y verduras' },
  pescado: { key: 'lubina', caption: 'Pescado y marisco fresco' },
}

function useScrollSpy(ids, enabled) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!enabled) return

    const onScroll = () => {
      const offset = 190
      let current = ids[0]
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, enabled])

  return active
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function Carta() {
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)
  const searching = query.trim().length > 0

  // La cabecera se pinta sola: las categorías (unos sesenta platos) entran en
  // el compromiso siguiente, ya con el primer fotograma pintado.
  const cabeceraLista = useListoTrasPintar()

  const filtered = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return menu

    return menu
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          normalize(`${item.name} ${item.description ?? ''}`).includes(term),
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [query])

  const ids = useMemo(() => filtered.map((category) => category.id), [filtered])
  const active = useScrollSpy(ids, !searching)
  const resultCount = filtered.reduce((total, category) => total + category.items.length, 0)

  return (
    <>
      <Seo
        title={copy.seo.carta.title}
        description={copy.seo.carta.description}
        path="/carta"
        withMenuJsonLd
      />

      <header className="relative overflow-hidden bg-night-950 pb-12 pt-28 text-cream-50 sm:pb-14 lg:pt-36">
        <div className="relative mx-auto grid max-w-page gap-10 px-gutter lg:grid-cols-12 lg:items-end lg:gap-20">
          <div className="lg:col-span-8">
            <Reveal priority>
              <h1 className="font-display text-h1 text-cream-50">
                La carta
              </h1>
              <p className="mt-5 max-w-2xl text-body leading-relaxed text-cream-200">
                {copy.carta.headerLead}
              </p>
            </Reveal>
          </div>

          <Reveal priority delay={80} className="lg:col-span-4">
            <div className="border-t border-cream-100/20 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <LiveStatus />
              <div className="mt-5 flex flex-wrap gap-3">
                <CTAButton href={telHref} variant="primary" icon="phone">
                  Llamar para pedir
                </CTAButton>
                <CTAButton href={mapsHref} external variant="onDark" icon="pin">
                  Cómo llegar
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {cabeceraLista ? (
        <Resto
          query={query}
          setQuery={setQuery}
          searchRef={searchRef}
          searching={searching}
          filtered={filtered}
          active={active}
          resultCount={resultCount}
        />
      ) : (
        /* Reserva de alto mientras entran las categorías: la página ya supera
           la altura de la ventana, así que ni el pie ni la barra de scroll se
           mueven cuando llega el contenido (CLS 0). */
        <div className="min-h-[85vh] bg-cream-50" aria-hidden="true" />
      )}
    </>
  )
}

/** Todo lo que va debajo de la cabecera: entra en el segundo compromiso de
 *  render, después del primer pintado de la página. */
function Resto({ query, setQuery, searchRef, searching, filtered, active, resultCount }) {
  const navRef = useRef(null)

  // En móvil la barra de categorías se desborda: la categoría activa se
  // desplaza a la vista para que siempre se vea dónde estás.
  useEffect(() => {
    const nav = navRef.current
    const chip = nav?.querySelector(`[data-cat="${active}"]`)
    if (!nav || !chip || nav.scrollWidth <= nav.clientWidth) return
    const target = chip.offsetLeft - (nav.clientWidth - chip.offsetWidth) / 2
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    nav.scrollTo({ left: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' })
  }, [active])

  return (
    <>
      {/* Navegación de categorías */}
      <div className="sticky top-16 z-30 border-b border-ink/15 bg-cream-50 lg:top-19">
        <div className="relative mx-auto max-w-page px-gutter">
          <nav
            ref={navRef}
            aria-label="Categorías de la carta"
            className="no-scrollbar -mx-gutter overflow-x-auto px-gutter"
          >
            <ul className="flex w-max items-center gap-1 py-1.5">
              {filtered.map((category) => {
                const isActive = !searching && category.id === active
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      data-cat={category.id}
                      onClick={() => {
                        setQuery('')
                        window.setTimeout(() => scrollToHash(category.id), 0)
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative flex min-h-11 items-center whitespace-nowrap px-3.5 text-label font-medium ${
                        isActive ? 'text-ink' : 'text-ink-mute hover:text-ink'
                      }`}
                    >
                      {category.name}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 bottom-0 h-0.5 bg-gold-700 transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream-50 to-transparent lg:hidden"
          />
        </div>
      </div>

      {/* Buscador */}
      <div className="border-b border-ink/10 bg-cream-100">
        <div className="mx-auto max-w-3xl px-gutter py-5">
          <label htmlFor="buscar-plato" className="sr-only">
            Buscar un plato en la carta
          </label>
          <div className="flex items-center gap-3 border border-ink/20 bg-cream-50 px-4 focus-within:border-gold-700">
            <Icon name="search" className="h-4 w-4 shrink-0 text-ink-mute" />
            <input
              ref={searchRef}
              id="buscar-plato"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.carta.searchPlaceholder}
              className="min-h-11 w-full bg-transparent text-body-sm text-ink outline-none placeholder:text-ink-mute"
            />
            {searching && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  searchRef.current?.focus()
                }}
                className="flex min-h-11 items-center gap-1 text-label text-ink-mute hover:text-ink"
              >
                Limpiar
                <Icon name="close" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {searching && (
            <p className="mt-2 text-label text-ink-mute" role="status">
              {resultCount === 0
                ? 'No hay platos que coincidan. Prueba con otra palabra.'
                : `${resultCount} ${resultCount === 1 ? 'plato encontrado' : 'platos encontrados'}.`}
            </p>
          )}
        </div>
      </div>

      {/* Categorías */}
      <div className="relative bg-cream-50 pb-20 pt-12 text-ink sm:pb-24 sm:pt-16">
        <div className="relative mx-auto max-w-menu px-gutter">
          {resultCount === 0 ? (
            <p className="py-16 text-center text-body text-ink-soft">{copy.carta.empty}</p>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              {filtered.map((category) => {
                const photo = CATEGORY_PHOTOS[category.id]
                return (
                  <MenuCategory
                    key={category.id}
                    category={category}
                    headingId={`${category.id}-titulo`}
                    photoKey={photo?.key}
                    photoCaption={photo?.caption}
                  />
                )
              })}
            </div>
          )}

          <div className="mt-16 border-t border-ink/15 pt-7">
            <p className="text-meta leading-relaxed text-ink-soft">
              {copy.carta.footnotePrefix}
              <a href={telHref} className="gold-underline font-semibold text-gold-700">
                {site.phone.display}
              </a>
              .
            </p>
            <p className="mt-2 text-meta text-ink-mute">{copy.carta.hoursNote}</p>
          </div>
        </div>
      </div>

      {/* Cierre */}
      <section className="border-t border-cream-100/10 bg-night-950 py-section-compact text-cream-50">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-gutter lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-2xl font-display text-h3">
              {copy.carta.closingTitle}
            </h2>
            <p className="mt-2 text-body-sm text-cream-200">{copy.carta.closingText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={telHref} variant="primary" icon="phone">
              Llamar
            </CTAButton>
            <CTAButton href={site.links.directions} external variant="onDark" icon="pin">
              Cómo llegar
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
