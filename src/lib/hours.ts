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

function toMinutes(time?: string): number | null {
  if (!time) return null
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export interface OpenState {
  open: boolean
  /** Texto corto: «Abierto ahora · cierra a las 24:00». */
  label: string
}

/**
 * Estado en vivo según el horario confirmado de site.ts. Devuelve null si
 * el horario no está confirmado: entonces la web no anuncia «abierto ahora».
 */
export function getOpenState(date: Date = new Date()): OpenState | null {
  if (!site.scheduleConfirmed) return null
  const now = getMadridNow(date)
  const todayIndex = WEEK.indexOf(now.dayKey)
  const today = site.hours.find((d) => d.key === now.dayKey)
  const opens = toMinutes(today?.opens)
  const closes = toMinutes(today?.closes)

  if (today && !today.closed && opens !== null && closes !== null) {
    if (now.minutes >= opens && now.minutes < closes) {
      return { open: true, label: `Abierto ahora · cierra a las ${prettyTime(today.closes)}` }
    }
    if (now.minutes < opens) {
      return { open: false, label: `Cerrado · abre hoy a las ${prettyTime(today.opens)}` }
    }
  }

  for (let step = 1; step <= 7; step++) {
    const key = WEEK[(todayIndex + step) % 7]
    const day = site.hours.find((d) => d.key === key)
    if (day && !day.closed && day.opens) {
      const when = step === 1 ? 'mañana' : `el ${DAY_NAMES[key]}`
      return { open: false, label: `Cerrado · abre ${when} a las ${prettyTime(day.opens)}` }
    }
  }
  return null
}
