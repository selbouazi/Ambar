import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

const holder = { current: null }

export default function SmoothScroll({ children }) {
  const location = useLocation()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(!reduced)
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

  useEffect(() => {
    if (holder.current) holder.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname])

  return children
}

export function scrollToHash(id, offset = -96) {
  const el = document.getElementById(id)
  if (!el) return
  if (holder.current) holder.current.scrollTo(el, { offset })
  else el.scrollIntoView({ behavior: 'smooth' })
}