import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

const holder = { current: null }

/**
 * Scroll suave con Lenis. Se desactiva por completo si el visitante pide
 * movimiento reducido, y respeta los enlaces con hash (/carta#platos).
 */
export default function SmoothScroll({ children }) {
  const location = useLocation()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    holder.current = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      holder.current = null
    }
  }, [enabled])

  // Al cambiar de página: arriba del todo, o al ancla indicada.
  useEffect(() => {
    const hash = location.hash?.replace('#', '')

    if (!hash) {
      if (holder.current) holder.current.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
      return
    }

    const id = window.setTimeout(() => scrollToHash(hash), 120)
    return () => window.clearTimeout(id)
  }, [location.pathname, location.hash])

  return children
}

/** Desplaza la vista a un elemento, compensando la barra superior fija. */
export function scrollToHash(id, offset = -96) {
  const el = document.getElementById(id)
  if (!el) return
  if (holder.current) holder.current.scrollTo(el, { offset })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
