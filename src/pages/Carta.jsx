import { useEffect, useMemo, useRef, useState } from 'react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CTAButton from '../components/CTAButton'
import MenuCategory from '../components/MenuCategory'
import BrushLabel from '../components/BrushLabel'
import Icon from '../components/Icons'
import { StarPattern, Leaf, DottedRule } from '../components/Ornament'
import { LiveStatus } from '../components/Hours'
import { scrollToHash } from '../components/SmoothScroll'
import { site, mapsHref, telHref } from '../data/site'
import { copy } from '../data/copy'
import { menu } from '../data/menu'

const CATEGORY_PHOTOS = {
  entrantes: { key: 'marisco', caption: 'Marisco fresco, preparado al momento' },
  platos: { key: 'cuscus', caption: 'Cuscús de los viernes' },
  pescado: { key: 'lubina', caption: 'Pescado a la plancha' },
}

function useScrollSpy(ids, enabled) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!enabled) return

    const onScroll = () => {
      const offset = 180
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

      <header className="relative overflow-hidden border-b border-gold-500/20 bg-night-900 pb-12 pt-28 sm:pb-14 lg:pt-36">
        <StarPattern className="pointer-events-none absolute inset-0 h-full w-full star-texture" tile={160} />
        <Leaf className="pointer-events-none absolute -right-6 top-16 h-44 w-32 text-leaf opacity-20" />
        <div className="relative mx-auto max-w-[78rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <BrushLabel variant={1} size="md">
              {copy.menuCount} platos
            </BrushLabel>
            <h1 className="mt-4 font-display text-[clamp(3.4rem,9vw,6.5rem)] uppercase leading-[0.86] text-cream-50">
              La carta
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-cream-200/75">
              {copy.carta.headerLead}
            </p>
          </Reveal>

          <Reveal priority delay={100}>
            <div className="mt-8 flex flex-col gap-5 border-t border-cream-100/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <LiveStatus />
              <div className="flex flex-wrap gap-3">
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

      {/* Navegación de categorías */}
      <div className="sticky top-16 z-30 border-b border-gold-500/25 bg-night-950/97 backdrop-blur-sm lg:top-[76px]">
        <div className="relative mx-auto max-w-[82rem] px-5 sm:px-8 lg:px-12">
          <nav
            aria-label="Categorías de la carta"
            className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
          >
            <ul className="flex w-max items-center gap-1 py-2">
              {filtered.map((category) => {
                const isActive = !searching && category.id === active
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('')
                        window.setTimeout(() => scrollToHash(category.id), 0)
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex min-h-11 items-center whitespace-nowrap rounded-sm px-4 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors ${
                        isActive
                          ? 'bg-gold-500 text-night-950'
                          : 'text-cream-200/70 hover:bg-night-800 hover:text-cream-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-night-950 to-transparent lg:hidden"
          />
        </div>
      </div>

      {/* Buscador */}
      <div className="border-b border-cream-100/10 bg-night-900">
        <div className="mx-auto max-w-[46rem] px-5 py-5 sm:px-8">
          <label htmlFor="buscar-plato" className="sr-only">
            Buscar un plato en la carta
          </label>
          <div className="flex items-center gap-3 border border-cream-100/25 bg-night-950 px-4 focus-within:border-gold-500">
            <Icon name="search" className="h-4 w-4 shrink-0 text-cream-200/60" />
            <input
              ref={searchRef}
              id="buscar-plato"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.carta.searchPlaceholder}
              className="min-h-11 w-full bg-transparent text-[15px] text-cream-50 outline-none placeholder:text-cream-200/50"
            />
            {searching && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  searchRef.current?.focus()
                }}
                className="flex min-h-11 items-center gap-1 text-[13px] text-cream-200/70 hover:text-cream-50"
              >
                Limpiar
                <Icon name="close" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {searching && (
            <p className="mt-2 text-[13px] text-cream-200/60" role="status">
              {resultCount === 0
                ? 'No hay platos que coincidan. Prueba con otra palabra.'
                : `${resultCount} ${resultCount === 1 ? 'plato encontrado' : 'platos encontrados'}.`}
            </p>
          )}
        </div>
      </div>

      {/* Categorías */}
      <div className="relative bg-night-950 pb-20 pt-12 sm:pb-24 sm:pt-16">
        <StarPattern className="pointer-events-none absolute inset-x-0 top-0 h-96 star-texture" tile={190} />
        <div className="relative mx-auto max-w-[50rem] px-5 sm:px-8">
          {resultCount === 0 ? (
            <p className="py-16 text-center text-[17px] text-cream-200/75">{copy.carta.empty}</p>
          ) : (
            <div className="space-y-16 sm:space-y-20">
              {filtered.map((category, index) => {
                const photo = CATEGORY_PHOTOS[category.id]
                return (
                  <MenuCategory
                    key={category.id}
                    category={category}
                    headingId={`${category.id}-titulo`}
                    variant={index}
                    photoKey={photo?.key}
                    photoCaption={photo?.caption}
                  />
                )
              })}
            </div>
          )}

          <div className="mt-16">
            <DottedRule className="mb-8" />
            <p className="text-[14px] leading-relaxed text-cream-200/70">
              {copy.carta.footnotePrefix}
              <a href={telHref} className="font-semibold text-gold-400">
                {site.phone.display}
              </a>
              .
            </p>
            <p className="mt-2 text-[14px] text-cream-200/60">{copy.carta.hoursNote}</p>
          </div>
        </div>
      </div>

      {/* Cierre */}
      <section className="border-t border-gold-500/20 bg-night-900 py-16 sm:py-20">
        <div className="mx-auto flex max-w-[78rem] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] uppercase leading-tight text-cream-50">
              {copy.carta.closingTitle}
            </h2>
            <p className="mt-2 text-[15px] text-cream-200/70">{copy.carta.closingText}</p>
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
