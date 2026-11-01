import { useEffect } from 'react'
import { business, mapsHref } from '../data/business'
import { menu } from '../data/menu'

/**
 * TODO(confirmar): dominio definitivo. Se mantiene el de Vercel actual.
 */
export const SITE_URL = 'https://restaurante-halal-ambar.vercel.app'
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

function buildOpeningHours() {
  return business.hours
    .filter((day) => !day.closed)
    .map((day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_NAMES_SCHEMA[day.key],
      opens: day.opens,
      closes: day.closes === '24:00' ? '00:00' : day.closes,
    }))
}

export function buildRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurante`,
    name: business.name,
    alternateName: business.shortName,
    description: business.description,
    url: SITE_URL,
    image: [OG_IMAGE],
    telephone: business.phone.display,
    priceRange: business.priceRange,
    currenciesAccepted: 'EUR',
    servesCuisine: ['Moroccan', 'Halal'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.street}, ${business.address.number}`,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.countryCode,
    },
    openingHoursSpecification: buildOpeningHours(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating.score,
      reviewCount: business.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    acceptsReservations: false,
    hasMap: mapsHref,
    sameAs: [business.links.instagram, mapsHref],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Cocina halal', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Apto para familias', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Para llevar', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Entrega a domicilio', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Local accesible', value: true },
    ],
    hasMenu: `${SITE_URL}/carta`,
  }
}

export function buildMenuJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Carta de ${business.name}`,
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

export default function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  withMenuJsonLd = false,
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
    upsertMeta('property', 'og:site_name', business.name)
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
    const existingMenu = document.getElementById(menuId)
    if (withMenuJsonLd) {
      const menuScript = existingMenu || document.createElement('script')
      menuScript.type = 'application/ld+json'
      menuScript.id = menuId
      menuScript.textContent = JSON.stringify(buildMenuJsonLd())
      if (!existingMenu) document.head.appendChild(menuScript)
    } else if (existingMenu) {
      existingMenu.remove()
    }
  }, [title, description, path, image, withMenuJsonLd])

  return null
}
