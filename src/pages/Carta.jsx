import { useEffect, useMemo, useRef, useState } from 'react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import CTAButton from '../components/CTAButton'
import MenuCategory from '../components/MenuCategory'
import Icon from '../components/Icons'
import { ZelligePattern } from '../components/Zellige'
import { LiveStatus } from '../components/Hours'
import { scrollToHash } from '../components/SmoothScroll'
import { business, mapsHref, telHref } from '../data/business'
import { copy } from '../data/copy'
import { menu } from '../data/menu'

const n = business

/** Resalta en la navegación la categoría visible. */
function useScrollSpy(ids, enabled) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!enabled) return

    const onScroll = () => {
      const offset = 160
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
  const hasMaps = Boolean(mapsHref) && mapsHref !== '#'

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

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-maroc-950 pb-14 pt-28 text-cream-50 sm:pb-16 lg:pt-36">
        <ZelligePattern className="pointer-events-none absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" tile={130} />
        <div className="relative mx-auto max-w-[75rem] px-5 sm:px-8 lg:px-12">
          <Reveal priority>
            <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.03em]">
              La carta
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-cream-200/70">
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
                {hasMaps && (
                  <CTAButton href={mapsHref} external variant="onDark" icon="pin">
                    Cómo llegar
                  </CTAButton>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Navegación de categorías */}
      <div className="sticky top-16 z-30 border-b border-ink/10 bg-cream-50 lg:top-[72px]">
        <div className="relative mx-auto max-w-[82rem] px-5 sm:px-8 lg:px-12">
          <nav aria-label="Categorías de la carta" className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
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
                      className={`flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-[14px] font-medium transition-colors ${
                        isActive
                          ? 'bg-maroc-900 text-cream-50'
                          : 'text-ink-soft hover:bg-cream-200 hover:text-ink'
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
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream-50 to-transparent lg:hidden"
          />
        </div>
      </div>

      {/* Buscador */}
      <div className="border-b border-ink/10 bg-cream-100">
        <div className="mx-auto max-w-[46rem] px-5 py-5 sm:px-8">
          <label htmlFor="buscar-plato" className="sr-only">
            Buscar un plato en la carta
          </label>
          <div className="flex items-center gap-3 border border-ink/20 bg-cream-50 px-4 focus-within:border-gold-600">
            <Icon name="search" className="h-4 w-4 shrink-0 text-ink-mute" />
            <input
              ref={searchRef}
              id="buscar-plato"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.carta.searchPlaceholder}
              className="min-h-11 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-mute"
            />
            {searching && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  searchRef.current?.focus()
                }}
                className="flex min-h-11 items-center gap-1 text-[13px] text-ink-mute hover:text-ink"
              >
                Limpiar
                <Icon name="close" className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {searching && (
            <p className="mt-2 text-[13px] text-ink-mute" role="status">
              {resultCount === 0
                ? 'No hay platos que coincidan. Prueba con otra palabra.'
                : `${resultCount} ${resultCount === 1 ? 'plato' : 'platos'} encontrados.`}
            </p>
          )}
        </div>
      </div>

      {/* Categorías */}
      <div className="bg-cream-50 pb-20 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-[46rem] px-5 sm:px-8">
          {resultCount === 0 ? (
            <p className="py-16 text-center text-[17px] text-ink-soft">
              {copy.carta.empty}
            </p>
          ) : (
            <div className="space-y-14 sm:space-y-16">
              {filtered.map((category) => (
                <MenuCategory
                  key={category.id}
                  category={category}
                  headingId={`${category.id}-titulo`}
                />
              ))}
            </div>
          )}

          <div className="mt-16 border-t border-ink/10 pt-8">
            <p className="text-[14px] leading-relaxed text-ink-mute">
              {copy.carta.footnotePrefix}
              <a href={telHref} className="gold-underline text-gold-700">
                {n.phone.display}
              </a>
              .
            </p>
            <p className="mt-2 text-[14px] text-ink-mute">{copy.carta.hoursNote}</p>
          </div>
        </div>
      </div>

      {/* Cierre */}
      <section className="bg-maroc-900 py-16 text-cream-50 sm:py-20">
        <div className="mx-auto flex max-w-[75rem] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-normal leading-tight">
              {copy.carta.closingTitle}
            </h2>
            <p className="mt-2 text-[15px] text-cream-200/65">
              {copy.carta.closingText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTAButton href={telHref} variant="primary" icon="phone">
              Llamar
            </CTAButton>
            {hasMaps && (
              <CTAButton href={mapsHref} external variant="onDark" icon="pin">
                Cómo llegar
              </CTAButton>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
