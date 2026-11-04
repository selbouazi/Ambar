import { useEffect, useState } from 'react'

/**
 * Devuelve `false` durante el primer compromiso de render y `true` después
 * del primer fotograma pintado.
 *
 * Se usa para pintar solo la cabecera de cada página en el primer
 * compromiso: el mayor contenido de la primera pantalla no espera a montar
 * el resto (el efecto sobre el LCP se mide con Lighthouse). El contenido que
 * entra después va siempre por debajo de lo ya pintado y con una reserva de
 * alto, así que no desplaza nada visible.
 */
export default function useListoTrasPintar() {
  const [listo, setListo] = useState(false)

  useEffect(() => {
    let segundo = 0
    const primero = requestAnimationFrame(() => {
      segundo = requestAnimationFrame(() => setListo(true))
    })
    return () => {
      cancelAnimationFrame(primero)
      cancelAnimationFrame(segundo)
    }
  }, [])

  return listo
}
