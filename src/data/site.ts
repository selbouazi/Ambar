/**
 * Fuente única de verdad del negocio.
 * Todo lo que aparece en la web sale de aquí: no repetir teléfonos,
 * direcciones ni horarios por los componentes.
 *
 * Los datos marcados con `pending` deben confirmarse con el titular antes de
 * publicar. No inventar valores para sustituirlos.
 */

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
  /** Hora de apertura en formato HH:MM. */
  opens?: string
  /** Hora de cierre en formato HH:MM. "24:00" = medianoche. */
  closes?: string
  /** false = dato todavía no confirmado por el titular. */
  confirmed: boolean
  note?: string
}

export interface Review {
  id: string
  author: string | null
  text: string
  source: 'google'
  sourceLabel: string
  excerpt?: boolean
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
    full: string
  }
  addressLines: string[]
  phone: {
    display: string
    uri: string
  }
  rating: {
    score: number
    count: number
    /** Fecha a la que corresponden los datos, visible en la web. */
    dateLabel: string
    source: 'Google'
  }
  priceRange: string
  cuisine: string[]
  services: {
    eatIn: boolean
    takeaway: boolean
    delivery: boolean
    contactlessDelivery: boolean
    terrace: boolean
    tableService: boolean
    barService: boolean
    breakfast: boolean
    brunch: boolean
    lunch: boolean
    dinner: boolean
    wifi: boolean
    toilets: boolean
    accessible: boolean
    parking: boolean
    goodForFamilies: boolean
    kidsMenu: boolean
    card: boolean
    nfc: boolean
  }
  hours: OpeningDay[]
  /** false = horario incompleto; la web no anuncia «abierto ahora». */
  scheduleConfirmed: boolean
  timezone: string
  couscousDay: DayKey
  parking: {
    street: boolean
    free: boolean
    note: string
  }
  links: {
    maps: string
    mapsEmbed: string
    directions: string
    instagram: string
  }
  /** Hechos respaldados por la ficha de Google y las reseñas reales. */
  familyFacts: string[]
  reviews: Review[]
  /** Frases que más se repiten en el resumen de Google. */
  reviewHighlights: string[]
}

const ADDRESS = {
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

const MAPS_QUERY = encodeURIComponent(
  'Restaurante Halal Ambar, Ctra. de Valls, 70, 43700 El Vendrell',
)

export const site: Business = {
  name: 'Restaurante Halal Ambar',
  shortName: 'Ambar',
  tagline: 'Cocina marroquí halal en El Vendrell',
  description:
    'Restaurante halal en El Vendrell: cocina marroquí, parrilla, pescado, cuscús los viernes y desayunos de msemmen y harxa.',

  address: { ...ADDRESS },
  addressLines: ['Ctra. de Valls, 70', '43700 El Vendrell', 'Tarragona'],

  phone: {
    display: '666 05 55 26',
    uri: '+34666055526',
  },

  rating: {
    score: 4.9,
    count: 154,
    dateLabel: 'noviembre de 2026',
    source: 'Google',
  },

  priceRange: '1–10 € por persona',
  cuisine: ['Cocina marroquí', 'Halal'],

  services: {
    eatIn: true,
    takeaway: true,
    delivery: true,
    contactlessDelivery: true,
    terrace: true,
    tableService: true,
    barService: true,
    breakfast: true,
    brunch: true,
    lunch: true,
    dinner: true,
    wifi: true,
    toilets: true,
    accessible: true,
    parking: true,
    goodForFamilies: true,
    kidsMenu: true,
    card: true,
    nfc: true,
  },

  // Confirmado: lunes cerrado y el martes abre a las 12:30.
  // El resto del horario no se pudo verificar: queda como «Por confirmar».
  hours: [
    { key: 'monday', label: 'Lunes', closed: true, confirmed: true, note: 'Cerrado' },
    {
      key: 'tuesday',
      label: 'Martes',
      closed: false,
      opens: '12:30',
      confirmed: false,
      note: 'Abre a las 12:30. Cierre por confirmar.',
    },
    { key: 'wednesday', label: 'Miércoles', closed: false, confirmed: false, note: 'Por confirmar' },
    { key: 'thursday', label: 'Jueves', closed: false, confirmed: false, note: 'Por confirmar' },
    { key: 'friday', label: 'Viernes', closed: false, confirmed: false, note: 'Por confirmar' },
    { key: 'saturday', label: 'Sábado', closed: false, confirmed: false, note: 'Por confirmar' },
    { key: 'sunday', label: 'Domingo', closed: false, confirmed: false, note: 'Por confirmar' },
  ],
  scheduleConfirmed: false,

  timezone: 'Europe/Madrid',
  couscousDay: 'friday',

  parking: {
    street: true,
    free: true,
    note: 'Aparcamiento gratuito en la calle. En horas punta puede costar encontrar plaza.',
  },

  links: {
    maps: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
    mapsEmbed: `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed&hl=es`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`,
    instagram: 'https://www.instagram.com/amb_ar2022',
  },

  familyFacts: [
    'Local tranquilo y climatizado, con música suave.',
    'Ideal para familias y grupos; hay menú infantil.',
    'Terraza, servicio en mesa y servicio de barra.',
    'Wi-Fi gratis y pago con tarjeta o móvil (NFC).',
    'Acceso, aseo y aparcamiento adaptados.',
    'Desayunos, brunch, comida y cena.',
  ],

  reviews: [
    {
      id: 'fissal',
      author: 'Fissal A.',
      text: 'Buen restaurante con comida halal de la tierra de Marruecos. Me pedí un tagine y estaba muy bueno de 10!! Se nota que manejan muy bien la cocina marroquí.',
      source: 'google',
      sourceLabel: 'Reseña de Google',
    },
    {
      id: 'jordy',
      author: 'Jordy S.',
      text: '¡Buen sitio! … el ambiente es muy tranquilo y muy cómodo para venir a pasar un rato con la familia o amigos, música suave, sillas muy cómodas, ambiente bien iluminado…',
      source: 'google',
      sourceLabel: 'Reseña de Google',
      excerpt: true,
    },
    {
      id: 'ayoub',
      author: 'Ayoub A.',
      text: 'El local es acogedor, está climatizado y resulta perfecto para ir en familia, incluso con niños. El ambiente es tranquilo y agradable, y el trato del personal es muy atento y amable.',
      source: 'google',
      sourceLabel: 'Reseña de Google',
    },
  ],

  reviewHighlights: [
    'Comida muy rica y de buena calidad, los platos son abundantes y muy ricos.',
    'Excelente servicio, muy buena comida y muy buen ambiente.',
    'Los mariscos estaban frescos y bien preparados.',
  ],
}

export const telHref = `tel:${site.phone.uri}`
export const mapsHref = site.links.maps
export const directionsHref = site.links.directions
export const instagramHref = site.links.instagram

export const hoursSummary = 'Lunes cerrado · Martes desde las 12:30'
