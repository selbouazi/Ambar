import Reveal from './Reveal'
import BrushLabel from './BrushLabel'
import PhotoFrame from './PhotoFrame'
import { formatPrice, priceOf } from '../data/menu'

const TAG_LABEL = {
  'solo-viernes': 'Solo viernes',
  'menu-2': 'Menú +2 €',
  'por-persona': 'Por persona',
  'a-consultar': 'A consultar',
}

function Tags({ tags }) {
  const visible = (tags || []).filter((tag) => tag !== 'a-consultar')
  if (!visible.length) return null
  return (
    <span className="flex shrink-0 flex-wrap items-center gap-1.5">
      {visible.map((tag) => (
        <span
          key={tag}
          className="whitespace-nowrap rounded-sm bg-gold-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold-300"
        >
          {TAG_LABEL[tag] || tag}
        </span>
      ))}
    </span>
  )
}

function Leader() {
  return <span aria-hidden="true" className="menu-leader mb-1 min-w-6 flex-1 self-end" />
}

function MenuItemRow({ item }) {
  return (
    <li className="menu-row border-b border-cream-100/10 py-4">
      {item.variants?.length ? (
        <>
          <h3 className="font-display text-[20px] uppercase leading-snug tracking-wide text-cream-50">
            {item.name}
          </h3>
          <ul className="mt-1.5 space-y-1">
            {item.variants.map((variant) => (
              <li key={variant.label} className="flex items-baseline gap-3">
                <span className="text-[15px] text-cream-200/75">{variant.label}</span>
                <Leader />
                <span className="tnum shrink-0 text-[16px] font-semibold text-gold-400">
                  {formatPrice(variant.price)}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-[20px] uppercase leading-snug tracking-wide text-cream-50">
              {item.name}
            </h3>
            <Tags tags={item.tags} />
            <Leader />
            <span className="tnum shrink-0 text-[16px] font-semibold text-gold-400">
              {priceOf(item)}
            </span>
          </div>
          {item.description && (
            <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-cream-200/65">
              {item.description}
            </p>
          )}
        </>
      )}
    </li>
  )
}

/**
 * Una categoría de la carta. Se lee como el menú impreso: nombre a la
 * izquierda, precio a la derecha, puntos guía entre ambos. Algunas categorías
 * llevan una foto enmarcada para romper el ritmo.
 */
export default function MenuCategory({ category, headingId, variant = 0, photoKey, photoCaption }) {
  return (
    <section id={category.id} aria-labelledby={headingId} className="scroll-mt-40">
      <Reveal>
        <h2 id={headingId} className="inline-block">
          <BrushLabel variant={variant} size="lg">
            {category.name}
          </BrushLabel>
        </h2>
      </Reveal>

      <div className={photoKey ? 'mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12' : 'mt-6'}>
        <div>
          {(category.intro || category.note || category.menuExtra) && (
            <Reveal delay={60}>
              <div className="mb-2 space-y-2 text-[15px] leading-relaxed text-cream-200/75">
                {category.intro && <p>{category.intro}</p>}
                {category.note && <p>{category.note}</p>}
                {category.menuExtra && (
                  <p className="inline-block rounded-sm bg-gold-500 px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-night-950">
                    {category.menuExtra}
                  </p>
                )}
              </div>
            </Reveal>
          )}

          <Reveal delay={100}>
            <ul className="mt-2">
              {category.items.map((item, index) => (
                <MenuItemRow key={`${item.name}-${index}`} item={item} />
              ))}
            </ul>
          </Reveal>
        </div>

        {photoKey && (
          <Reveal delay={140} className="order-first lg:order-none">
            <PhotoFrame
              photoKey={photoKey}
              ratio="4/3"
              caption={photoCaption}
              sizes="(min-width: 1024px) 19rem, 100vw"
              tilt={variant % 2 === 0 ? 'left' : 'right'}
              className="mx-auto max-w-sm lg:sticky lg:top-40"
            />
          </Reveal>
        )}
      </div>
    </section>
  )
}
