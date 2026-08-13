import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export default function Counter({
  value,
  decimals = 0,
  suffix = '',
  className,
  duration = 1.6,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState('0')

  const format = (v) =>
    decimals > 0
      ? v.toFixed(decimals).replace('.', ',')
      : String(Math.round(v))

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(format(value))
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(format(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}