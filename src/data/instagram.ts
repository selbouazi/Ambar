/**
 * Los últimos vídeos de Instagram. Lo genera `npm run instagram`
 * (scripts/instagram.mjs); no se toca a mano. Para refrescarlo cuando haya
 * vídeos nuevos, vuelve a ejecutarlo.
 */

export interface InstagramPost {
  /** Identificador interno, estable (el shortcode del reel). */
  id: string
  /** URL pública del reel; el reproductor la usa para el embed oficial. */
  reelUrl: string
}

export const instagramHandle = '@amb_ar2022'

export const instagramPosts: InstagramPost[] = [
  {
    "id": "DNb4wSDI_PY",
    "reelUrl": "https://www.instagram.com/reel/DNb4wSDI_PY/"
  },
  {
    "id": "DNEFdD4M0l7",
    "reelUrl": "https://www.instagram.com/reel/DNEFdD4M0l7/"
  },
  {
    "id": "DM0xk-AIAJI",
    "reelUrl": "https://www.instagram.com/reel/DM0xk-AIAJI/"
  }
]
