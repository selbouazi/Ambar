/**
 * Manifiesto de fotografías.
 *
 * Los originales están en `public/photos/`. `npm run photos` genera las
 * variantes avif/webp/jpg en `public/photos/gen/` y reescribe
 * `photo-manifest.json`. El componente <Photo> sirve la variante adecuada.
 *
 * Si una foto no existe, <Photo> dibuja un panel de marca con el nombre del
 * plato: la maquetación nunca deja una caja vacía.
 */

import manifest from './photo-manifest.json'
import specData from './photo-specs.json'

export type PhotoRatio = '16/9' | '4/5' | '4/3' | '3/2' | '1/1'

export interface PhotoSpec {
  file: string
  alt: string
  ratio: PhotoRatio
  section: string
  position?: string
  sizes?: string
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

export function getPhoto(key: PhotoKey): PhotoAsset | undefined {
  const spec = photoSpecs[key]
  if (!spec) return undefined
  const asset = assets[spec.file]
  return asset && asset.formats?.webp?.length ? asset : undefined
}

export function hasPhoto(key: PhotoKey): boolean {
  return Boolean(getPhoto(key))
}

export function galleryPhotos(): PhotoKey[] {
  return (Object.keys(photoSpecs) as PhotoKey[]).filter(
    (key) => key.startsWith('galeria') && hasPhoto(key),
  )
}
