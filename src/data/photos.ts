/**
 * Manifiesto de fotografías.
 *
 * Los derechos de todas las imágenes son del propietario del restaurante y se
 * usan con su permiso. No se enlazan ni se descargan imágenes de Google Maps
 * desde el código: Suli las coloca a mano en `public/photos/`.
 *
 * `npm run photos` procesa los originales con sharp, genera las variantes
 * avif/webp/jpg en `public/photos/gen/` y reescribe `photo-manifest.json`.
 * Si un archivo no existe, <Photo> dibuja un panel de zellige intencional
 * (nunca el texto «FOTO PENDIENTE»).
 */

import manifest from './photo-manifest.json'
import specData from './photo-specs.json'

export type PhotoRatio = '16/9' | '4/5' | '4/3' | '3/2' | '1/1'

export interface PhotoSpec {
  /** Nombre del archivo original, sin extensión. */
  file: string
  alt: string
  ratio: PhotoRatio
  /** Sección o uso previsto, para FOTOS-PENDIENTES.md. */
  section: string
  /** Punto de recorte por defecto (object-position). */
  position?: string
  /** Valor de `sizes` para el srcset. */
  sizes?: string
  /** El hero se carga con prioridad alta. */
  priority?: boolean
}

export interface PhotoVariant {
  width: number
  height: number
  src: string
}

export interface PhotoAsset {
  width: number
  height: number
  position?: string
  formats: {
    avif?: PhotoVariant[]
    webp?: PhotoVariant[]
    jpg?: PhotoVariant[]
  }
}

export const photoSpecs = specData as Record<string, PhotoSpec>

export type PhotoKey = keyof typeof specData

const assets = manifest as unknown as Record<string, PhotoAsset>

/** Devuelve el asset procesado, o undefined si la foto aún no existe. */
export function getPhoto(key: PhotoKey): PhotoAsset | undefined {
  const spec = photoSpecs[key]
  if (!spec) return undefined
  const asset = assets[spec.file]
  return asset && asset.formats?.webp?.length ? asset : undefined
}

/** ¿Existe la foto? Se usa para decidir si se renderiza una sección entera. */
export function hasPhoto(key: PhotoKey): boolean {
  return Boolean(getPhoto(key))
}

/** Fotos de galería disponibles, en orden. */
export function galleryPhotos(): PhotoKey[] {
  return (Object.keys(photoSpecs) as PhotoKey[]).filter(
    (key) => key.startsWith('galeria') && hasPhoto(key),
  )
}
