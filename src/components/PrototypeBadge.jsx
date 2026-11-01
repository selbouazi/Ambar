import { PROTOTIPO } from '../config'

/**
 * Aviso discreto de que la web es un prototipo de diseño.
 * Se oculta solo con `PROTOTIPO = false`.
 */
export default function PrototypeBadge({ className = '', full = false }) {
  if (!PROTOTIPO) return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 px-2.5 py-1 text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-gold-300 ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
      {full ? (
        'Prototipo · diseño de muestra'
      ) : (
        <>
          <span className="sm:hidden">Prototipo</span>
          <span className="hidden sm:inline">Prototipo · diseño de muestra</span>
        </>
      )}
    </span>
  )
}
