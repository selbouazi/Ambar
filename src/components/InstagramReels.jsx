import { useState } from 'react'
import Photo from './Photo'
import { instagramPosts } from '../data/instagram'
import { instagramHref } from '../data/site'

/** De la URL pública del reel a la del reproductor oficial. */
function embedSrc(url) {
  return `${url.replace(/\?.*$/, '').replace(/\/$/, '')}/embed/captioned/`
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5L8 5.5Z" />
    </svg>
  )
}

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.9v.1" />
    </svg>
  )
}

/**
 * Últimos vídeos de Instagram.
 *
 * Ninguna petición a Meta hasta que el visitante pulsa una tarjeta: entonces se
 * inserta el reproductor oficial. Sin `reelUrl` la tarjeta enlaza al perfil.
 */
export default function InstagramReels() {
  const [openId, setOpenId] = useState(null)

  return (
    <ul className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
      {instagramPosts.map((post) => {
        const abierto = openId === post.id
        const etiqueta = post.reelUrl ? `Reproducir el vídeo: ${post.title}` : `Ver en Instagram: ${post.title}`

        const interior = (
          <>
            <Photo
              photoKey={post.photoKey}
              ratio="h-full"
              className="aspect-[9/16]"
              imgClassName="transition-transform duration-300 group-hover:scale-[1.04]"
              sizes="(min-width: 1024px) 26vw, 33vw"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/15 to-night-950/25"
              aria-hidden="true"
            />
            <span
              className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-night-950/55 text-cream-50 ring-1 ring-cream-50/40 backdrop-blur-[2px] transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12"
              aria-hidden="true"
            >
              {post.reelUrl ? <PlayGlyph /> : <InstagramGlyph />}
            </span>
            <span className="absolute inset-x-0 bottom-0 hidden p-2.5 text-left sm:block sm:p-4">
              <span className="line-clamp-2 block text-[12px] leading-snug text-cream-50 sm:text-[14px]">
                {post.title}
              </span>
            </span>
          </>
        )

        const clase =
          'group relative block w-full overflow-hidden border border-cream-100/15 bg-night-800'

        return (
          <li key={post.id} className="relative">
            {abierto ? (
              <div className="relative aspect-[9/16] w-full overflow-hidden border border-cream-100/15 bg-night-900">
                <iframe
                  src={embedSrc(post.reelUrl)}
                  title={`Vídeo de Instagram: ${post.title}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : post.reelUrl ? (
              <button
                type="button"
                onClick={() => setOpenId(post.id)}
                aria-label={etiqueta}
                className={`${clase} min-h-11 cursor-pointer text-left`}
              >
                {interior}
              </button>
            ) : (
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={etiqueta}
                className={clase}
              >
                {interior}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

