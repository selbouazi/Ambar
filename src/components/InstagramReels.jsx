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
 *
 * El embed mide siempre `1,25 × ancho + 272 px` (zona del vídeo 4:5, cabecera
 * y pie), así que la caja usa unidades de contenedor para no recortarlo ni
 * dejar huecos: `125cqw + 272px`.
 */
export default function InstagramReels() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
      {instagramPosts.map((post, i) => (
        <li key={post.id} className="[container-type:inline-size]">
          <div className="relative h-[calc(125cqw+272px)] w-full overflow-hidden border border-cream-100/15 bg-night-900">
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
