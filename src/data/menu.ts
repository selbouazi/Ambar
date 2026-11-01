/**
 * Carta transcrita de las fotos de la carta física del restaurante.
 * Esta lista manda sobre cualquier JSON o página anterior.
 *
 * Convenciones:
 * - `price` en euros (número). `null` = precio no legible en la foto.
 * - `priceLabel` solo cuando el precio no es un número simple ("desde 5 €").
 * - `variants` para platos con precio por persona / tamaño.
 * - `tags` se muestran como etiquetas en la carta.
 */

export type MenuTag = 'solo-viernes' | 'menu-2' | 'por-persona' | 'a-consultar' | 'verificar'

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
  note?: string
  /** Precio no legible en la carta física: se muestra "A consultar". */
  pricePending?: boolean
  /** Dato dudoso de la foto: se publica tal cual y se revisa con el dueño. */
  verify?: boolean
}

export interface MenuCategory {
  id: string
  name: string
  intro?: string
  note?: string
  /** Suplemento de menú común a toda la categoría. */
  menuExtra?: string
  items: MenuItem[]
}

export const menu: MenuCategory[] = [
  {
    id: 'desayuno',
    name: 'Desayuno',
    intro: 'Desde primera hora. Con té, café o zumo de naranja natural.',
    items: [
      {
        name: 'Desayuno 1',
        description:
          'Dos huevos con queso, mortadela, miel, aceitunas o mermelada, y té, café o zumo de naranja.',
        price: 6,
      },
      { name: 'Desayuno 2', description: 'Msemmen + té o café.', price: 3.5 },
      { name: 'Desayuno 3', description: 'Harxa + té o café.', price: 3.5 },
      { name: 'Msemmen con miel y queso', price: 1.5 },
      { name: 'Harxa con miel y queso', price: 1.5 },
    ],
  },
  {
    id: 'entrantes',
    name: 'Entrantes',
    items: [
      { name: 'Patatas bravas', price: 4 },
      {
        name: 'Croquetas, fingers o nuggets',
        pricePending: true,
        tags: ['a-consultar'],
        note: 'Precio pendiente de confirmar con el restaurante.',
      },
      { name: 'Alitas de pollo', price: 4.5 },
      {
        name: 'Ensalada marroquí',
        variants: [
          { label: '1 persona', price: 4 },
          { label: '2 personas', price: 8 },
        ],
      },
      { name: 'Pinchitos de carne, pollo o hígado', price: 3 },
    ],
  },
  {
    id: 'platos',
    name: 'Platos',
    intro: 'Cocina marroquí y brasa, cocinada al momento.',
    items: [
      { name: 'Tajín de carne', price: 7 },
      { name: 'Tajín de pollo', price: 7 },
      {
        name: 'Pollo a la brasa',
        price: 16,
        verify: true,
        note: 'TODO(confirmar): comprobar si el precio corresponde al pollo entero.',
      },
      { name: 'Patas de vaca', price: 7 },
      { name: 'Carne picada en brasa con ensalada', price: 9 },
      { name: 'Salchichas en brasa con ensalada', price: 9 },
      { name: 'Bistec en brasa con ensalada', price: 9 },
      { name: 'Cuscús', price: 7, tags: ['solo-viernes'] },
    ],
  },
  {
    id: 'platos-combinados',
    name: 'Platos combinados',
    note: 'Todos se sirven con ensalada y patatas fritas.',
    items: [
      { name: 'Pinchitos de pollo', price: 8 },
      { name: 'Carne picada', price: 8 },
      { name: 'Pinchitos de ternera', price: 8 },
      { name: 'Salchichas', price: 8 },
      { name: 'Pollo asado entero', price: 12 },
      { name: 'Pollo asado, medio', price: 6 },
    ],
  },
  {
    id: 'tacos',
    name: 'Tacos',
    menuExtra: 'Menú con bebida y patatas, +2 €',
    items: [
      { name: 'Pollo, ternera o carne picada', price: 5 },
      { name: 'Mixto', price: 5.5 },
      { name: 'Marisco (gamba y calamar)', price: 6 },
    ],
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    menuExtra: 'Menú con bebida y patatas, +2 €',
    items: [
      { name: 'Pollo o carne picada', price: 5 },
      { name: 'Doble', price: 7 },
    ],
  },
  {
    id: 'bocadillos',
    name: 'Bocadillos',
    menuExtra: 'Menú con bebida y patatas, +2 €',
    items: [
      { name: 'Pechuga de pollo', price: 4.5 },
      { name: 'Carne picada', price: 5 },
      { name: 'Mixto', price: 5 },
      { name: 'Vegetal', price: 4.5 },
    ],
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    note: 'Sabores: gambas y atún, pollo, carne picada o cuatro quesos.',
    items: [
      { name: 'Pequeña', price: 7 },
      { name: 'Mediana', price: 9 },
    ],
  },
  {
    id: 'pescado',
    name: 'Pescado y marisco',
    items: [
      { name: 'Lubina a la plancha', price: 12 },
      { name: 'Dorada a la plancha', price: 12 },
      {
        name: 'Fritura',
        variants: [
          { label: '1 persona', price: 14 },
          { label: '2 personas', price: 28 },
        ],
      },
      { name: 'Gamba a la plancha, 1/2 kg', price: 10 },
      {
        name: 'Paella de marisco',
        variants: [
          { label: '1 persona', price: 8 },
          { label: '2 personas', price: 16 },
        ],
      },
      { name: 'Sardinas o boquerones fritos', price: 7 },
      { name: 'Sopa de marisco', price: 4.5 },
    ],
  },
  {
    id: 'batidos',
    name: 'Batidos y zumos',
    items: [
      { name: 'Batido de aguacate', price: 3 },
      { name: 'Batido de plátano con leche', price: 2.5 },
      { name: 'Zumo de naranja natural', price: 2.5 },
      { name: 'Za3za3', description: 'Batido de fruta con frutos secos.', price: 5 },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    items: [
      { name: 'Té verde', price: 1.5 },
      { name: 'Café con leche', price: 1.4 },
      { name: 'Café solo', price: 1 },
      { name: 'Cortado', price: 1.2 },
      { name: 'Latas', price: 1.7 },
      { name: 'Energéticas', price: 2.5 },
      { name: 'Agua pequeña', price: 1 },
      { name: 'Agua grande', price: 1.5 },
    ],
  },
]

/** Platos estrella de la portada: los que más se piden, con precio real. */
export const starDishes = [
  {
    name: 'Tajín',
    detail: 'De pollo o de carne, a fuego lento y servido en su tandjra.',
    price: 7,
    categoryId: 'platos',
  },
  {
    name: 'Cuscús',
    detail: 'La receta de la casa. Solo se sirve los viernes.',
    price: 7,
    categoryId: 'platos',
    tags: ['solo-viernes'] as MenuTag[],
  },
  {
    name: 'Lubina a la plancha',
    detail: 'Pescado fresco, entero y hecho al momento.',
    price: 12,
    categoryId: 'pescado',
  },
  {
    name: 'Tacos',
    detail: 'Pollo, ternera, carne picada o marisco. Menú con bebida y patatas, +2 €.',
    price: 5,
    priceLabel: 'desde 5 €',
    categoryId: 'tacos',
  },
  {
    name: 'Desayuno marroquí',
    detail: 'Msemmen o harxa con miel y queso, y té o café.',
    price: 3.5,
    categoryId: 'desayuno',
  },
]

/** Formatea un precio en euros al estilo español: 7 → "7 €", 3.5 → "3,50 €". */
export function formatPrice(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0
  return `${value.toFixed(hasCents ? 2 : 0).replace('.', ',')} €`
}

/** Texto de precio de un ítem, con variantes si las hay. */
export function priceOf(item: MenuItem): string {
  if (item.pricePending) return 'A consultar'
  if (item.priceLabel) return item.priceLabel
  if (typeof item.price === 'number') return formatPrice(item.price)
  if (item.variants?.length) {
    return item.variants.map((v) => `${v.label}: ${formatPrice(v.price)}`).join(' · ')
  }
  return 'A consultar'
}

/** Total de platos de la carta, para metadatos y pruebas. */
export const menuItemCount = menu.reduce((total, category) => total + category.items.length, 0)
