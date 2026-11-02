import { site, type DayKey } from '../data/site'

/** Días en el orden de la semana española (lunes primero). */
export const WEEK: DayKey[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const WEEKDAY_TO_KEY: Record<string, DayKey> = {
  Mon: 'monday',
  Tue: 'tuesday',
  Wed: 'wednesday',
  Thu: 'thursday',
  Fri: 'friday',
  Sat: 'saturday',
  Sun: 'sunday',
}

export interface MadridNow {
  dayKey: DayKey
  minutes: number
  dayLabel: string
}

const DAY_NAMES: Record<DayKey, string> = {
  monday: 'lunes',
  tuesday: 'martes',
  wednesday: 'miércoles',
  thursday: 'jueves',
  friday: 'viernes',
  saturday: 'sábado',
  sunday: 'domingo',
}

/** Hora actual en Europe/Madrid, independiente de la zona del visitante. */
export function getMadridNow(date: Date = new Date()): MadridNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const rawHour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0')
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0')
  const hour = rawHour === 24 ? 0 : rawHour
  const dayKey = WEEKDAY_TO_KEY[weekday] ?? 'monday'

  return { dayKey, minutes: hour * 60 + minute, dayLabel: DAY_NAMES[dayKey] }
}

/** "09:00" → "9:00". */
export function prettyTime(time?: string): string {
  if (!time) return ''
  const [h, m] = time.split(':')
  return `${Number(h)}:${m}`
}
