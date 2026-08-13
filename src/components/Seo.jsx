import { useEffect } from 'react'
import { restaurante, GOOGLE_MAPS_URL } from '../data/restaurante'

const SITE_URL = 'https://restaurante-halal-ambar.vercel.app'
const OG_IMAGE = `${SITE_URL}/og-placeholder.svg`

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

function buildRestaurantJsonLd() {
  const n = restaurante.negocio
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: n.nombre,
    image: [OG_IMAGE],
    url: SITE_URL,
    telephone: n.telefono,
    priceRange: n.rango_precio,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ctra. de Valls, 70',
      postalCode: '43700',
      addressLocality: 'El Vendrell',
      addressRegion: 'Tarragona',
      addressCountry: 'ES',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(n.valoracion.puntuacion),
      reviewCount: String(n.valoracion.numero_resenas),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        opens: '09:00',
        closes: '00:00',
      },
    ],
    servesCuisine: ['Cocina marroquí', 'Halal'],
    acceptsReservations: 'True',
    hasMap: GOOGLE_MAPS_URL,
  }
}

export default function Seo({
  title,
  description,
  path = '/',
  image = OG_IMAGE,
  withRestaurantJsonLd = true,
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
    upsertMeta('property', 'og:locale', 'es_ES')
    upsertMeta('property', 'og:site_name', restaurante.negocio.nombre)
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

    const id = 'jsonld-restaurant'
    const existing = document.getElementById(id)
    if (withRestaurantJsonLd) {
      const s = existing || document.createElement('script')
      s.type = 'application/ld+json'
      s.id = id
      s.innerHTML = JSON.stringify(buildRestaurantJsonLd())
      if (!existing) document.head.appendChild(s)
    } else if (existing) {
      existing.remove()
    }
  }, [title, description, path, image, withRestaurantJsonLd])

  return null
}