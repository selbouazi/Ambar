import { site, hoursSummary } from '../data/site'
import { getMadridNow, prettyTime, WEEK } from '../lib/hours'

/** Estado resumido del horario. No anuncia «abierto ahora» sin horario completo. */
export function LiveStatus({ className = '', showDetail = false }) {
  return (
    <div className={className}>
      <p role="status" className="flex items-center gap-2.5 text-[15px] font-medium text-gold-400">
        <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full bg-gold-500" />
        {hoursSummary}
      </p>
      {showDetail && (
        <p className="mt-1.5 text-sm text-cream-200/70">
          El resto del horario está pendiente de confirmar. Llámanos si vienes desde lejos.
        </p>
      )}
    </div>
  )
}

/** Tabla de horario con el día actual resaltado. */
export function HoursTable({ className = '' }) {
  const today = getMadridNow().dayKey

  return (
    <div className={className}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Horario semanal de {site.name}</caption>
        <tbody>
          {WEEK.map((key) => {
            const day = site.hours.find((d) => d.key === key)
            const isToday = key === today
            return (
              <tr
                key={key}
                className={isToday ? 'bg-gold-500 text-night-950' : 'border-b border-cream-100/10 last:border-0 text-cream-100'}
              >
                <th
                  scope="row"
                  className={`py-3 pl-4 pr-3 text-[15px] font-medium ${isToday ? 'text-night-950' : 'text-cream-50'}`}
                >
                  {day.label}
                  {isToday && <span className="ml-2 text-[12px] font-semibold uppercase tracking-wide">hoy</span>}
                </th>
                <td className={`py-3 pr-4 text-right text-[14px] ${isToday ? 'text-night-900' : 'text-cream-200/75'}`}>
                  {day.closed ? (
                    <span className={isToday ? 'text-night-900' : 'text-cream-200/60'}>Cerrado</span>
                  ) : day.confirmed && day.opens && day.closes ? (
                    <>
                      {prettyTime(day.opens)} – {prettyTime(day.closes)}
                    </>
                  ) : day.opens ? (
                    <>Desde las {prettyTime(day.opens)} · cierre por confirmar</>
                  ) : (
                    'Por confirmar'
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** Aviso de cuscús, sin cálculo en vivo. */
export function CouscousNotice({ className = '' }) {
  return (
    <p className={className}>
      <span className="font-semibold text-gold-400">Solo los viernes.</span>{' '}
      <span className="text-cream-200/75">Se prepara ese día y se sirve mientras dure la olla.</span>
    </p>
  )
}
