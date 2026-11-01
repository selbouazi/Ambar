/**
 * Fuente única de verdad del negocio.
 * Todos los componentes leen de aquí: nada de datos duplicados.
 *
 * Hay dos juegos de datos:
 * - `REAL`: la ficha verificada del restaurante (Google Maps, 31/10/2026).
 * - `PLACEHOLDER`: marcadores neutros para el prototipo que se enseña al dueño.
 *
 * `business` exporta uno u otro según el flag `PROTOTIPO` (src/config.ts).
 * Con `PROTOTIPO = false` la web funciona exactamente como antes.
 *
 * Los campos marcados con TODO(confirmar) deben validarse con el propietario
 * antes de publicar. No inventar valores para sustituirlos.
 */

import { PROTOTIPO } from '../config'

export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface OpeningDay {
  key: DayKey
  label: string
  closed: boolean
  /** Hora de apertura en formato HH:MM (Europe/Madrid). */
  opens?: string
  /** Hora de cierre en formato HH:MM. "24:00" = medianoche. */
  closes?: string
  /** El dato procede de la guía de Google My Business y está pendiente de validar. */
  verify?: boolean
  note?: string
}

export interface Review {
  id: string
  /** null cuando la reseña no muestra nombre público. */
  author: string | null
  text: string
  rating: number
  source: 'google'
  sourceLabel: string
  /** Respuesta pública del propietario, si la hay. */
  ownerReply?: string
}

export interface Business {
  name: string
  shortName: string
  tagline: string
  description: string
  address: {
    street: string
    number: string
    postalCode: string
    city: string
    region: string
    country: string
    countryCode: string
    plusCode: string
    /** Dirección completa en una línea, para mapas y datos estructurados. */
    full: string
  }
  /** Dirección ya troceada en líneas para pintarla sin condicionales. */
  addressLines: string[]
  /**
   * TODO(confirmar): teléfono de la ficha de Google Maps.
   * La web antigua y una guía local mostraban 623 16 32 35.
   * Confirmar con el dueño cuál es el número activo antes de publicar.
   */
  phone: {
    display: string
    uri: string
    /** Número alternativo que aparecía en la web antigua. */
    previousDisplay: string
    confirmed: boolean
  }
  rating: {
    /** null en el prototipo: no se muestra ninguna nota real. */
    score: number | null
    count: number | null
    source: 'Google'
  }
  priceRange: string
  cuisine: string[]
  services: {
    eatIn: boolean
    takeaway: boolean
    contactlessDelivery: boolean
    delivery: boolean
    halal: boolean
    accessible: boolean
    goodForFamilies: boolean
    goodCoffee: boolean
    airConditioned: boolean
    quiet: boolean
  }
  /**
   * TODO(confirmar): la guía indica lunes cerrado; Google Maps solo muestra
   * "cierre 0:00". Confirmar el cierre semanal con el propietario.
   */
  hours: OpeningDay[]
  /** false = horario sin confirmar; la interfaz oculta el estado en vivo. */
  scheduleConfirmed: boolean
  timezone: string
  /** Día de la semana en que se sirve el cuscús. */
  couscousDay: DayKey
  /** La guía indica que no hace falta reservar. */
  reservationsRequired: false
  parking: {
    street: boolean
    free: boolean
    note: string
  }
  links: {
    maps: string
    mapsEmbed: string
    mapsReviews: string
    instagram: string
  }
  /** Hechos respaldados por reseñas reales de Google. */
  familyFacts: string[]
  reviews: Review[]
  /** Carta: ver src/data/menu.ts */
}

/* ── Datos reales ────────────────────────────────────────────────────────── */

const REAL_ADDRESS = {
  street: 'Ctra. de Valls',
  number: '70',
  postalCode: '43700',
  city: 'El Vendrell',
  region: 'Tarragona',
  country: 'España',
  countryCode: 'ES',
  plusCode: '6GFP+R5 El Vendrell',
  full: 'Ctra. de Valls, 70, 43700 El Vendrell, Tarragona, España',
} as const

const MAPS_QUERY = encodeURIComponent(REAL_ADDRESS.full)
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`

const REAL: Business = {
  name: 'Restaurante Halal Ambar',
  shortName: 'Ambar',
  tagline: 'Cocina marroquí halal en El Vendrell',
  description:
    'Cocina marroquí cocinada en familia: tajines a fuego lento, cuscús los viernes, marisco fresco y desayunos de msemmen y harxa.',
  address: { ...REAL_ADDRESS },
  addressLines: [
    'Ctra. de Valls, 70',
    '43700 El Vendrell',
    'Tarragona',
  ],

  phone: {
    display: '+34 666 05 55 26',
    uri: '+34666055526',
    previousDisplay: '+34 623 16 32 35',
    confirmed: false, // TODO(confirmar) con el dueño
  },

  rating: {
    score: 4.9,
    count: 153,
    source: 'Google',
  },

  priceRange: '1–10 € por persona',
  cuisine: ['Cocina marroquí', 'Halal'],

  services: {
    eatIn: true,
    takeaway: true,
    contactlessDelivery: true,
    delivery: true,
    halal: true,
    accessible: true,
    goodForFamilies: true,
    goodCoffee: true,
    airConditioned: true,
    quiet: true,
  },

  // Lunes cerrado según la guía de Google My Business.
  // TODO(confirmar) con el propietario.
  hours: [
    { key: 'monday', label: 'Lunes', closed: true, verify: true, note: 'Cerrado' },
    { key: 'tuesday', label: 'Martes', closed: false, opens: '09:00', closes: '24:00' },
    { key: 'wednesday', label: 'Miércoles', closed: false, opens: '09:00', closes: '24:00' },
    { key: 'thursday', label: 'Jueves', closed: false, opens: '09:00', closes: '24:00' },
    { key: 'friday', label: 'Viernes', closed: false, opens: '09:00', closes: '24:00' },
    { key: 'saturday', label: 'Sábado', closed: false, opens: '09:00', closes: '24:00' },
    { key: 'sunday', label: 'Domingo', closed: false, opens: '09:00', closes: '24:00' },
  ],
  scheduleConfirmed: true,

  timezone: 'Europe/Madrid',
  couscousDay: 'friday',
  reservationsRequired: false,

  parking: {
    street: true,
    free: true,
    note: 'Hay plazas gratuitas en la calle. En hora punta cuesta encontrar sitio.',
  },

  links: {
    maps: MAPS_URL,
    mapsEmbed: `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed&hl=es`,
    mapsReviews: MAPS_URL,
    // TODO(confirmar): mantener el enlace existente, pero apuntar al perfil real.
    instagram: 'https://www.instagram.com',
  },

  familyFacts: [
    'Local climatizado y tranquilo, con música suave.',
    'Apto para familias y para ir con niños.',
    'Raciones abundantes y trato cercano del personal.',
    'Desayunos marroquíes desde primera hora: msemmen, harxa y té.',
    'El tajín es uno de los platos más valorados.',
    'Marisco fresco, preparado al momento.',
  ],

  reviews: [
    {
      id: 'google-1',
      author: null,
      text: 'Comida muy rica y de buena calidad, los platos son abundantes y muy ricos.',
      rating: 5,
      source: 'google',
      sourceLabel: 'Reseña en Google',
    },
    {
      id: 'google-2',
      author: null,
      text: 'Excelente servicio, muy buena comida y muy buen ambiente.',
      rating: 5,
      source: 'google',
      sourceLabel: 'Reseña en Google',
    },
    {
      id: 'google-3',
      author: null,
      text: 'Los mariscos estaban frescos y bien preparados.',
      rating: 5,
      source: 'google',
      sourceLabel: 'Reseña en Google',
    },
    {
      id: 'google-4',
      author: 'Fissal A.O',
      text: 'Buen restaurante con comida halal de la tierra de Marruecos. Me pedí un tagine y estaba muy bueno de 10!!',
      rating: 5,
      source: 'google',
      sourceLabel: 'Reseña en Google',
    },
    {
      id: 'google-5',
      author: 'Ayoub An',
      text: 'El local es acogedor, está climatizado y resulta perfecto para ir en familia, incluso con niños.',
      rating: 5,
      source: 'google',
      sourceLabel: 'Reseña en Google',
      ownerReply: 'gracias de corazón',
    },
  ],
}

/* ── Marcadores del prototipo ────────────────────────────────────────────── */

const DAYS: Array<{ key: DayKey; label: string }> = [
  { key: 'monday', label: 'Lunes' },
  { key: 'tuesday', label: 'Martes' },
  { key: 'wednesday', label: 'Miércoles' },
  { key: 'thursday', label: 'Jueves' },
  { key: 'friday', label: 'Viernes' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
]

const PLACEHOLDER: Business = {
  name: 'Restaurante Halal Ambar',
  shortName: 'Ambar',
  tagline: 'Cocina marroquí halal',
  description: 'Aquí irá la descripción del restaurante.',
  address: {
    street: 'Dirección del restaurante',
    number: '',
    postalCode: '',
    city: '',
    region: '',
    country: '',
    countryCode: '',
    plusCode: '',
    full: 'Dirección del restaurante',
  },
  addressLines: ['Dirección del restaurante'],

  phone: {
    display: '000 000 000',
    uri: '#',
    previousDisplay: '',
    confirmed: false,
  },

  rating: {
    score: null,
    count: null,
    source: 'Google',
  },

  priceRange: 'Precio por confirmar',
  cuisine: ['Cocina marroquí', 'Halal'],

  services: {
    eatIn: false,
    takeaway: false,
    contactlessDelivery: false,
    delivery: false,
    halal: false,
    accessible: false,
    goodForFamilies: false,
    goodCoffee: false,
    airConditioned: false,
    quiet: false,
  },

  // Todos los días con la misma franja neutra: el horario está por confirmar.
  hours: DAYS.map((day) => ({
    ...day,
    closed: false,
    opens: '00:00',
    closes: '00:00',
  })),
  scheduleConfirmed: false,

  timezone: 'Europe/Madrid',
  couscousDay: 'friday',
  reservationsRequired: false,

  parking: {
    street: false,
    free: false,
    note: 'Aquí irá la nota sobre el aparcamiento.',
  },

  links: {
    maps: '#',
    mapsEmbed: '',
    mapsReviews: '#',
    instagram: '#',
  },

  familyFacts: [
    'Aquí irá un dato sobre el ambiente del local.',
    'Aquí irá un dato sobre las familias.',
    'Aquí irá un dato sobre las raciones.',
    'Aquí irá un dato sobre los desayunos.',
    'Aquí irá un dato sobre los platos.',
    'Aquí irá un dato sobre el producto fresco.',
  ],

  reviews: [
    {
      id: 'demo-1',
      author: 'Nombre del cliente',
      text: 'Reseña de ejemplo',
      rating: 5,
      source: 'google',
      sourceLabel: 'Opinión de ejemplo',
    },
    {
      id: 'demo-2',
      author: 'Nombre del cliente',
      text: 'Reseña de ejemplo',
      rating: 5,
      source: 'google',
      sourceLabel: 'Opinión de ejemplo',
    },
    {
      id: 'demo-3',
      author: 'Nombre del cliente',
      text: 'Reseña de ejemplo',
      rating: 5,
      source: 'google',
      sourceLabel: 'Opinión de ejemplo',
    },
  ],
}

/* ── Selector ────────────────────────────────────────────────────────────── */

export const business: Business = PROTOTIPO ? PLACEHOLDER : REAL

/** Enlace `tel:` listo para usar. En prototipo no hay número real. */
export const telHref =
  business.phone.uri === '#' ? '#' : `tel:${business.phone.uri}`

/** Enlace a la ficha de Google Maps. En prototipo no hay enlace. */
export const mapsHref = business.links.maps

/** Horario resumido en una línea, para pies y metadatos. */
export const hoursSummary = business.scheduleConfirmed
  ? 'Martes a domingo, de 9:00 a 24:00'
  : 'Horario por confirmar'
