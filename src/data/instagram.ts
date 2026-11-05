/**
 * Los tres últimos vídeos de Instagram.
 *
 * Mientras una entrada no tenga `reelUrl`, la tarjeta muestra una foto real del
 * restaurante y enlaza al perfil. En cuanto se pega la URL del reel
 * (`https://www.instagram.com/reel/XXXXXXX/`), esa tarjeta pasa a reproducir el
 * vídeo con el reproductor oficial de Instagram, que solo se carga al pulsar
 * (igual que el mapa): no se incrusta nada de Meta hasta que el visitante lo
 * pide.
 */

export interface InstagramPost {
  /** Identificador interno, estable. */
  id: string
  /** Pie corto que se ve sobre la foto. */
  title: string
  /** Foto de portada mientras no hay vídeo incrustado. */
  photoKey: string
  /** URL pública del reel. Vacío = todavía no lo tenemos. */
  reelUrl?: string
}

export const instagramHandle = '@amb_ar2022'

export const instagramPosts: InstagramPost[] = [
  {
    id: 'reel-1',
    title: 'Tajín de pollo con patatas',
    photoKey: 'galeria05',
  },
  {
    id: 'reel-2',
    title: 'Pollo con arroz, ensalada y pan',
    photoKey: 'galeria03',
  },
  {
    id: 'reel-3',
    title: 'Té con hierbabuena, pan y aceitunas',
    photoKey: 'galeria02',
  },
]
