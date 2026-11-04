import { site, hoursSummary } from '../data/site'
import { getMadridNow, prettyTime, WEEK } from '../lib/hours'

/** Estado resumido del horario confirmado. */
export function LiveStatus({ className = '', showDetail = false, tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <div className={className}>
      <p
        role="status"
        className={`flex items-center gap-2.5 text-[15px] font-medium ${light ? 'text-ink' : 'text-cream-50'}`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-2 w-2 shrink-0 rounded-full ${light ? 'bg-gold-700' : 'bg-gold-500'}`}
        />
        {hoursSummary}
      </p>
      {showDetail && (
        <p className={`mt-1.5 text-[14px] ${light ? 'text-ink-mute' : 'text-cream-200'}`}>
          En festivos el horario puede cambiar. Llámanos si vienes desde lejos.
        </p>
      )}
    </div>
  )
}

/** Tabla de horario con el día actual resaltado. */
export function HoursTable({ className = '', tone = 'dark' }) {
  const today = getMadridNow().dayKey
  const light = tone === 'light'

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
                className={
                  isToday
                    ? 'bg-gold-700 text-cream-50'
                    : `border-b last:border-0 ${light ? 'border-ink/12 text-ink' : 'border-cream-100/12 text-cream-100'}`
                }
              >
                <th
                  scope="row"
                  className={`py-3 pl-4 pr-3 text-[15px] font-medium ${
                    isToday ? 'text-cream-50' : light ? 'text-ink' : 'text-cream-50'
                  }`}
                >
                  {day.label}
                  {isToday && <span className="ml-2 text-[13px] font-medium">hoy</span>}
                </th>
                <td
                  className={`py-3 pr-4 text-right text-[14px] ${
                    isToday ? 'text-cream-50' : light ? 'text-ink-soft' : 'text-cream-200'
                  }`}
                >
                  {day.closed ? (
                    <span className={isToday ? 'text-cream-50' : light ? 'text-ink-mute' : 'text-cream-200'}>
                      Cerrado
                    </span>
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
export function CouscousNotice({ className = '', tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <p className={className}>
      <span className={`font-semibold ${light ? 'text-gold-700' : 'text-gold-400'}`}>
        Solo los viernes.
      </span>{' '}
      <span className={light ? 'text-ink-soft' : 'text-cream-200'}>
        Se prepara ese día y se sirve mientras dure la olla.
      </span>
    </p>
  )
}
