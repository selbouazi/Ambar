import Reveal from './Reveal'
import { formatPrice, priceOf } from '../data/menu'

const TAG_LABEL = {
  'solo-viernes': 'Solo viernes',
  'menu-2': 'Menú +2 €',
  'por-persona': 'Por persona',
  'a-consultar': 'A consultar',
  verificar: 'Por confirmar',
}

function Tags({ tags }) {
  const visible = (tags || []).filter((tag) => tag !== 'a-consultar')
  if (!visible.length) return null
  return (
    <span className="flex shrink-0 flex-wrap items-center gap-1.5">
      {visible.map((tag) => (
        <span
          key={tag}
          className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${
            tag === 'solo-viernes'
              ? 'border-gold-600/50 text-gold-700'
              : 'border-ink/20 text-ink-mute'
          }`}
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
    <li className="menu-row border-b border-ink/10 py-4">
      {item.variants?.length ? (
        <>
          <h3 className="font-display text-[19px] font-medium leading-snug text-ink">
            {item.name}
          </h3>
          <ul className="mt-1.5 space-y-1">
            {item.variants.map((variant) => (
              <li key={variant.label} className="flex items-baseline gap-3">
                <span className="text-[15px] text-ink-soft">{variant.label}</span>
                <Leader />
                <span className="tnum shrink-0 font-display text-[17px] font-medium text-gold-700">
                  {formatPrice(variant.price)}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-[19px] font-medium leading-snug text-ink">
              {item.name}
            </h3>
            <Tags tags={item.tags} />
            <Leader />
            <span className="tnum shrink-0 font-display text-[17px] font-medium text-gold-700">
              {priceOf(item)}
            </span>
          </div>
          {item.description && (
            <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
          )}
        </>
      )}
    </li>
  )
}

/**
 * Una categoría de la carta. Se lee como un menú impreso: nombre a la
 * izquierda, precio a la derecha, punteado entre ambos.
 */
export default function MenuCategory({ category, headingId }) {
  return (
    <section id={category.id} aria-labelledby={headingId} className="scroll-mt-36">
      <Reveal>
        <h2
          id={headingId}
          className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-none tracking-[-0.02em] text-ink"
        >
          {category.name}
        </h2>
      </Reveal>

      {(category.intro || category.note || category.menuExtra) && (
        <Reveal delay={60}>
          <div className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
            {category.intro && <p>{category.intro}</p>}
            {category.note && <p>{category.note}</p>}
            {category.menuExtra && <p className="text-gold-700">{category.menuExtra}</p>}
          </div>
        </Reveal>
      )}

      <Reveal delay={100}>
        <ul className="mt-5">
          {category.items.map((item) => (
            <MenuItemRow key={item.name} item={item} />
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
