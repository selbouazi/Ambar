import { useEffect } from 'react'
import { site, mapsHref, instagramHref } from '../data/site'
import { menu } from '../data/menu'
import { copy } from '../data/copy'

/** TODO: cambiar por el dominio definitivo si el titular registra uno. */
export const SITE_URL = 'https://ambar-nu-two.vercel.app'
const OG_IMAGE = `${SITE_URL}/og.png`

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const DAY_NAMES_SCHEMA = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

/** Solo el horario confirmado: nunca inventar aperturas ni cierres. */
function buildOpeningHours() {
  return site.hours
    .filter((day) => day.confirmed && !day.closed && day.opens && day.closes)
    .map((day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_NAMES_SCHEMA[day.key],
      opens: day.opens,
      closes: day.closes === '24:00' ? '00:00' : day.closes,
    }))
}

export function buildRestaurantJsonLd() {
  const hours = buildOpeningHours()

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurante`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: SITE_URL,
    image: [OG_IMAGE],
    logo: `${SITE_URL}/icon-512.png`,
    telephone: `+${site.phone.uri.replace('+', '')}`,
    priceRange: site.priceRange,
    currenciesAccepted: 'EUR',
    servesCuisine: ['Moroccan', 'Halal'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.number}`,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
    acceptsReservations: true,
    hasMap: mapsHref,
    sameAs: [instagramHref, mapsHref],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Cocina halal', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Apto para familias', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Menú infantil', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Terraza', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Para llevar', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Entrega a domicilio', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Local accesible', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratis', value: true },
    ],
    hasMenu: `${SITE_URL}/carta`,
  }
}

export function buildMenuJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Carta de ${site.name}`,
    inLanguage: 'es-ES',
    hasMenuSection: menu.map((category) => ({
      '@type': 'MenuSection',
      name: category.name,
      ...(category.note ? { description: category.note } : {}),
      hasMenuItem: category.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(typeof item.price === 'number'
          ? {
              offers: {
                '@type': 'Offer',
                price: item.price.toFixed(2),
                priceCurrency: 'EUR',
              },
            }
          : {}),
      })),
    })),
  }
}

export function buildFaqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export default function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  withMenuJsonLd = false,
  withFaqJsonLd = false,
}) {
  useEffect(() => {
    document.title = title
    const full = `${SITE_URL}${path}`

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', full)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:locale', 'es_ES')
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', full)

    const restaurantId = 'jsonld-restaurant'
    let script = document.getElementById(restaurantId)
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = restaurantId
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(buildRestaurantJsonLd())

    const menuId = 'jsonld-menu'
    let menuScript = document.getElementById(menuId)
    if (withMenuJsonLd) {
      if (!menuScript) {
        menuScript = document.createElement('script')
        menuScript.type = 'application/ld+json'
        menuScript.id = menuId
        document.head.appendChild(menuScript)
      }
      menuScript.textContent = JSON.stringify(buildMenuJsonLd())
    } else if (menuScript) {
      menuScript.remove()
    }

    const faqId = 'jsonld-faq'
    let faqScript = document.getElementById(faqId)
    if (withFaqJsonLd) {
      if (!faqScript) {
        faqScript = document.createElement('script')
        faqScript.type = 'application/ld+json'
        faqScript.id = faqId
        document.head.appendChild(faqScript)
      }
      faqScript.textContent = JSON.stringify(buildFaqJsonLd(copy.info.faq))
    } else if (faqScript) {
      faqScript.remove()
    }
  }, [title, description, path, image, withMenuJsonLd, withFaqJsonLd])

  return null
}
