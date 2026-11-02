import data from './menu.json'

/**
 * Carta del restaurante, transcrita de la carta física.
 *
 * - `price` en euros (número). `null`/ausente = precio no visible.
 * - `variants` para platos con precio por persona o tamaño.
 * - `tags` se muestran como etiquetas en la carta.
 *
 * Para editar la carta, cambia `src/data/menu.json`; este archivo solo añade
 * tipos y utilidades de formato.
 */

export type MenuTag = 'solo-viernes' | 'menu-2' | 'por-persona' | 'a-consultar'

export interface MenuVariant {
  label: string
  price: number
}

export interface MenuItem {
  name: string
  description?: string
  price?: number
  priceLabel?: string
  variants?: MenuVariant[]
  tags?: MenuTag[]
  pricePending?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  intro?: string
  note?: string
  menuExtra?: string
  items: MenuItem[]
}

export const menu = data.categories as MenuCategory[]

export const menuItemCount = menu.reduce((total, category) => total + category.items.length, 0)

export const starDishes = [
  {
    name: 'Tajín',
    detail: 'De pollo o de carne, a fuego lento y servido en su recipiente de barro.',
    price: 7,
    categoryId: 'platos',
  },
  {
    name: 'Cuscús',
    detail: 'Solo se sirve los viernes. Es uno de los platos que más se repiten en las reseñas.',
    price: 7,
    categoryId: 'platos',
    tags: ['solo-viernes'] as MenuTag[],
  },
  {
    name: 'Lubina a la plancha',
    detail: 'Pescado entero, hecho al momento y servido con guarnición.',
    price: 12,
    categoryId: 'pescado',
  },
  {
    name: 'Paella de marisco',
    detail: 'Para una o dos personas, con marisco fresco.',
    price: 8,
    priceLabel: 'desde 8 €',
    categoryId: 'pescado',
  },
  {
    name: 'Msemmen con miel, queso',
    detail: 'Recién hecho, con té o café. El desayuno marroquí de la casa.',
    price: 1.5,
    categoryId: 'desayuno',
  },
]

export const breakfastTeaser = [
  {
    name: 'Desayuno 1',
    detail: '2 huevos con queso, mortadela, miel, aceitunas / mermelada, y té, café o zumo.',
    price: 6,
  },
  { name: 'Desayuno 2', detail: 'Msemmen + té o café.', price: 3.5 },
  { name: 'Desayuno 3', detail: 'Harxa + té o café.', price: 3.5 },
]

/** Formatea un precio al estilo español: 7 → "7 €", 3.5 → "3,50 €". */
export function formatPrice(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0
  return `${value.toFixed(hasCents ? 2 : 0).replace('.', ',')} €`
}

export function priceOf(item: MenuItem): string {
  if (item.pricePending) return 'Consultar'
  if (item.priceLabel) return item.priceLabel
  if (typeof item.price === 'number') return formatPrice(item.price)
  if (item.variants?.length) {
    return item.variants.map((v) => `${v.label}: ${formatPrice(v.price)}`).join(' · ')
  }
  return 'Consultar'
}

export function findDishByTag(tag: MenuTag): MenuItem | undefined {
  for (const category of menu) {
    const item = category.items.find((candidate) => candidate.tags?.includes(tag))
    if (item) return item
  }
  return undefined
}
