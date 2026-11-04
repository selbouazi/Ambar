import Reveal from './Reveal'
import Photo from './Photo'
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
          className="whitespace-nowrap border border-gold-700/35 px-2 py-0.5 text-[13px] font-medium text-gold-700"
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
    <li className="menu-row border-b border-ink/12 py-4">
      {item.variants?.length ? (
        <>
          <h3 className="text-[17px] font-medium leading-snug text-ink">{item.name}</h3>
          <ul className="mt-1.5 space-y-1">
            {item.variants.map((variant) => (
              <li key={variant.label} className="flex items-baseline gap-3">
                <span className="text-[15px] text-ink-soft">{variant.label}</span>
                <Leader />
                <span className="tnum shrink-0 text-[18px] font-semibold text-gold-700">
                  {formatPrice(variant.price)}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-3">
            <h3 className="text-[17px] font-medium leading-snug text-ink">{item.name}</h3>
            <Tags tags={item.tags} />
            <Leader />
            <span className="tnum shrink-0 text-[18px] font-semibold text-gold-700">
              {priceOf(item)}
            </span>
          </div>
          {item.description && (
            <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-ink-mute">
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
 * izquierda, precio a la derecha, puntos guía entre ambos. En pantallas
 * anchas, las categorías con más de cinco platos se reparten en dos columnas.
 */
export default function MenuCategory({ category, headingId, photoKey, photoCaption }) {
  const twoColumns = category.items.length > 5
  const half = Math.ceil(category.items.length / 2)
  const columns = twoColumns
    ? [category.items.slice(0, half), category.items.slice(half)]
    : [category.items]

  return (
    <section id={category.id} aria-labelledby={headingId} className="scroll-mt-40">
      <Reveal>
        <div className="flex items-end justify-between gap-6 border-b border-ink/20 pb-4">
          <h2
            id={headingId}
            className="font-display text-[clamp(2.2rem,4.8vw,3.6rem)] leading-none tracking-[-0.015em] text-ink"
          >
            {category.name}
          </h2>
          <span className="tnum pb-1 text-[13px] text-ink-mute">
            {category.items.length} {category.items.length === 1 ? 'plato' : 'platos'}
          </span>
        </div>
      </Reveal>

      {(category.intro || category.note || category.menuExtra) && (
        <Reveal delay={40}>
          <div className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink-soft">
            {category.intro && <p>{category.intro}</p>}
            {category.note && <p>{category.note}</p>}
            {category.menuExtra && (
              <p className="inline-block border border-gold-700/35 px-3 py-1 text-[13px] font-medium text-gold-700">
                {category.menuExtra}
              </p>
            )}
          </div>
        </Reveal>
      )}

      {photoKey && (
        <Reveal delay={60}>
          <figure className="mt-7">
            <Photo
              photoKey={photoKey}
              ratio="16/9"
              sizes="(min-width: 1024px) 76rem, 100vw"
              className="w-full"
            />
            {photoCaption && (
              <figcaption className="mt-2 text-[13px] text-ink-mute">{photoCaption}</figcaption>
            )}
          </figure>
        </Reveal>
      )}

      <Reveal delay={80}>
        <div
          className={
            twoColumns
              ? 'mt-2 grid gap-x-12 lg:grid-cols-2 lg:gap-x-20'
              : 'mt-2'
          }
        >
          {columns.map((column, columnIndex) => (
            <ul key={columnIndex}>
              {column.map((item, index) => (
                <MenuItemRow key={`${item.name}-${index}`} item={item} />
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
