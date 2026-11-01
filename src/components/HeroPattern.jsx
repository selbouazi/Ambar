import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ZelligePattern } from './Zellige'

/**
 * Retícula de zellige con un parallax muy leve al hacer scroll.
 *
 * Vive en su propio módulo para que framer-motion no entre en el bundle
 * inicial: el patrón estático se pinta al instante y el parallax se añade
 * cuando el trozo ya se ha descargado. Con movimiento reducido no se mueve.
 */
export default function HeroPattern() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 70])

  return (
    <motion.div
      style={{ y }}
      className="pointer-events-none absolute inset-0 -bottom-24"
      aria-hidden="true"
    >
      <ZelligePattern className="h-full w-full text-gold-400 opacity-[0.055]" tile={150} />
    </motion.div>
  )
}
