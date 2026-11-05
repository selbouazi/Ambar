import { instagramPosts } from '../data/instagram'

/** De la URL pública del reel a la del reproductor oficial. */
function embedSrc(url) {
  return `${url.replace(/\?.*$/, '').replace(/\/$/, '')}/embed/captioned/`
}

/**
 * Últimos vídeos de Instagram, con el reproductor oficial a la vista desde el
 * principio: arranca en pausa con la portada del propio Instagram y se
 * reproduce al pulsar. Los iframes se cargan de forma diferida, cuando el
 * bloque se acerca a la pantalla.
 */
export default function InstagramReels() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
      {instagramPosts.map((post, i) => (
        <li key={post.id}>
          <div className="relative aspect-[9/16] w-full overflow-hidden border border-cream-100/15 bg-night-900">
            <iframe
              src={embedSrc(post.reelUrl)}
              title={`Vídeo de Instagram ${i + 1}`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
