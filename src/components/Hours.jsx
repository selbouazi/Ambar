import { business, hoursSummary } from '../data/business'
import { prettyTime, useOpenState, WEEK } from '../lib/hours'

/**
 * Indicador en vivo calculado en Europe/Madrid.
 * `tone` decide el color de texto según el campo sobre el que se apoya.
 *
 * Si el horario no está confirmado (prototipo), no se calcula nada: se muestra
 * un aviso neutro en lugar de «Abierto ahora».
 */
export function LiveStatus({ tone = 'dark', className = '', showDetail = false }) {
  const state = useOpenState()
  const text = tone === 'dark' ? 'text-gold-300' : 'text-gold-700'
  const detail = tone === 'dark' ? 'text-cream-200/70' : 'text-ink-mute'

  if (!business.scheduleConfirmed) {
    return (
      <div className={className}>
        <p role="status" className={`flex items-center gap-2.5 text-[15px] font-medium ${text}`}>
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-current opacity-40"
          />
          {hoursSummary}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <p role="status" className={`flex items-center gap-2.5 text-[15px] font-medium ${text}`}>
        <span
          aria-hidden="true"
          className={`inline-block h-2 w-2 shrink-0 rounded-full ${
            state.isOpen ? 'bg-[var(--color-open)]' : 'bg-current opacity-40'
          }`}
        />
        {state.label}
      </p>
      {showDetail && <p className={`mt-1.5 text-sm ${detail}`}>{state.detail}</p>}
    </div>
  )
}

/** Tabla de horario con el día actual resaltado. */
export function HoursTable({ className = '' }) {
  const state = useOpenState()
  const confirmed = business.scheduleConfirmed

  return (
    <div className={className}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Horario semanal de {business.name}</caption>
        <tbody>
          {WEEK.map((key) => {
            const day = business.hours.find((d) => d.key === key)
            const isToday = confirmed && key === state.todayKey
            return (
              <tr
                key={key}
                className={
                  isToday
                    ? 'bg-maroc-900 text-cream-50'
                    : 'text-ink'
                }
              >
                <th
                  scope="row"
                  className={`py-3 pl-4 pr-3 text-[15px] font-medium ${isToday ? 'text-cream-50' : 'text-ink'}`}
                >
                  {day.label}
                  {isToday && <span className="ml-2 text-[13px] font-normal text-gold-300">hoy</span>}
                </th>
                <td
                  className={`tnum py-3 pr-4 text-right text-[15px] ${
                    isToday ? 'text-cream-200/80' : 'text-ink-soft'
                  }`}
                >
                  {!confirmed ? (
                    '00:00 – 00:00'
                  ) : day.closed ? (
                    <span className={isToday ? 'text-cream-200/80' : 'text-ink-mute'}>Cerrado</span>
                  ) : (
                    <>
                      {prettyTime(day.opens)} – {prettyTime(day.closes)}
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* TODO(confirmar): el lunes cerrado procede de la guía de Google My Business. */}
    </div>
  )
}

/** Aviso de cuscús con el día de la semana en vivo. */
export function CouscousNotice({ className = '' }) {
  const state = useOpenState()

  if (!business.scheduleConfirmed) {
    return (
      <p className={className}>
        Aquí irá el aviso sobre el día en que se sirve.
      </p>
    )
  }

  return (
    <p className={className}>
      {state.isCouscousDay ? (
        <>
          <span className="font-semibold text-gold-300">Hoy hay cuscús.</span>{' '}
          <span className="text-cream-200/70">Se sirve mientras dure la olla.</span>
        </>
      ) : (
        <>
          <span className="font-semibold text-cream-100">
            El próximo, el {state.nextCouscousLabel}.
          </span>{' '}
          <span className="text-cream-200/70">Solo se prepara ese día.</span>
        </>
      )}
    </p>
  )
}
