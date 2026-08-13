import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import { FadeIn, EASE } from '../components/FadeIn'
import CTAButton from '../components/CTAButton'
import MenuCategory from '../components/MenuCategory'
import { ZelligeGrain } from '../components/Zellige'
import { restaurante, slugCategoria } from '../data/restaurante'
import { PHOTOS, PHOTO_LABELS } from '../data/photos'

const n = restaurante.negocio

const COVERS = {
  Desayunos: { src: PHOTOS.desayuno, label: PHOTO_LABELS.desayuno },
  Platos: { src: PHOTOS.tajin, label: PHOTO_LABELS.tajin },
  Pescado: { src: PHOTOS.mariscos, label: PHOTO_LABELS.mariscos },
  Tacos: { src: PHOTOS.tacos, label: PHOTO_LABELS.tacos },
}

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function Carta() {
  const categorias = restaurante.carta.map((c) => ({
    ...c,
    slug: slugCategoria(c.categoria),
  }))
  const ids = categorias.map((c) => c.slug)
  const active = useScrollSpy(ids)

  return (
    <>
      <Seo
        title={`La carta · ${n.nombre} El Vendrell`}
        description={`Carta completa de ${n.nombre}: entrantes, tajines, pizzas, pescado a la plancha, desayunos marroquíes, batidos y bebidas. Precios de ${n.rango_precio.toLowerCase()}.`}
        path="/carta"
      />

      {/* Cabecera */}
      <header className="relative overflow-hidden bg-maroc-950 pb-16 pt-40 text-cream-50 sm:pb-20 lg:pt-48">
        <ZelligeGrain className="pointer-events-none absolute -right-20 top-10 h-[60vh] w-[60vh] text-gold-400 opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-gold-400">
              <span className="h-px w-10 bg-gold-500/70" />
              Menú
            </p>
            <h1 className="mt-5 font-display text-6xl font-medium italic leading-none tracking-tight sm:text-7xl lg:text-8xl">
              La carta
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream-200/70">
              Todo se prepara al momento. Desayunos desde primera hora, marisco a la
              brasa al mediodía y tajines que llenan las noches del Vendrell.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-cream-200/55">
              <span className="font-display text-2xl italic text-gold-400">
                {n.rango_precio}
              </span>
              <span className="h-5 w-px bg-cream-100/20" aria-hidden="true" />
              <span>
                {n.horario.apertura} – {n.horario.cierre} · {n.direccion.split(',')[0]}
              </span>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Scrollspy sticky */}
      <nav
        aria-label="Categorías de la carta"
        className="sticky top-[84px] z-40 border-y border-gold-500/15 bg-cream-50/95 backdrop-blur-xl lg:top-[92px]"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-2.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categorias.map((c) => {
            const isActive = active === c.slug
            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(c.slug)
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 124
                    window.scrollTo({ top: y, behavior: 'smooth' })
                  }
                }}
                aria-current={isActive ? 'true' : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ${
                  isActive
                    ? 'bg-maroc-900 text-gold-300 shadow-md'
                    : 'text-ink/60 hover:bg-cream-200 hover:text-ink'
                }`}
              >
                {c.categoria}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Categorías */}
      <div className="mx-auto max-w-7xl space-y-24 px-5 py-16 sm:px-8 lg:space-y-32 lg:py-24">
        {categorias.map((cat, i) => (
          <MenuCategory
            key={cat.slug}
            category={{ ...cat, cover: COVERS[cat.categoria] }}
            index={i}
          />
        ))}
      </div>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-[2.5rem] bg-maroc-900 px-6 py-14 text-center text-cream-50 sm:px-12"
        >
          <ZelligeGrain className="absolute inset-0 h-full w-full text-gold-400 opacity-[0.05]" />
          <div className="relative">
            <h2 className="font-display text-4xl font-medium italic tracking-tight sm:text-5xl">
              ¿Dudas con la carta?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-200/70">
              Llámanos y te contamos cómo preparamos cada plato, o elige la terraza para
              venir a verlo con calma.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href={`tel:${n.telefono_uri}`} variant="gold" icon="phone">
                Llamar · {n.telefono.replace('+34 ', '')}
              </CTAButton>
              <CTAButton
                href={n.enlaces.pedidos_online.url}
                external
                variant="outlineCream"
                icon="delivery"
              >
                Pedir a domicilio
              </CTAButton>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}