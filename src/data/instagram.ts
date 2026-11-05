/**
 * Los últimos vídeos de Instagram, con su portada servida desde el propio
 * dominio. Lo genera `npm run instagram` (scripts/instagram.mjs); no se toca a
 * mano. Para refrescarlo cuando haya vídeos nuevos, vuelve a ejecutarlo.
 */

export interface InstagramPost {
  /** Identificador interno, estable (el shortcode del reel). */
  id: string
  /** Pie corto que se ve sobre la portada. Puede ir vacío. */
  title: string
  /** URL pública del reel. */
  reelUrl?: string
  /** Portada local. Si falta, la tarjeta cae en `photoKey`. */
  cover?: { base: string; width: number; height: number }
  /** Foto de respaldo cuando todavía no hay portada descargada. */
  photoKey?: string
}

export const instagramHandle = '@amb_ar2022'

export const instagramPosts: InstagramPost[] = [
  {
    "id": "DNb4wSDI_PY",
    "title": "",
    "reelUrl": "https://www.instagram.com/reel/DNb4wSDI_PY/",
    "cover": {
      "base": "/photos/gen/instagram-1",
      "width": 720,
      "height": 1280
    }
  },
  {
    "id": "DNEFdD4M0l7",
    "title": "maroqui",
    "reelUrl": "https://www.instagram.com/reel/DNEFdD4M0l7/",
    "cover": {
      "base": "/photos/gen/instagram-2",
      "width": 720,
      "height": 1280
    }
  },
  {
    "id": "DM0xk-AIAJI",
    "title": "مغربي",
    "reelUrl": "https://www.instagram.com/reel/DM0xk-AIAJI/",
    "cover": {
      "base": "/photos/gen/instagram-3",
      "width": 576,
      "height": 1024
    }
  }
]
