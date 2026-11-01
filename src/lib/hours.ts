import { useEffect, useState } from 'react'
import { business, type DayKey } from '../data/business'

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

const DAY_NAMES: Record<DayKey, string> = {
  monday: 'lunes',
  tuesday: 'martes',
  wednesday: 'miércoles',
  thursday: 'jueves',
  friday: 'viernes',
  saturday: 'sábado',
  sunday: 'domingo',
}

export interface MadridNow {
  dayKey: DayKey
  /** Minutos desde medianoche, en Europe/Madrid. */
  minutes: number
  dayLabel: string
}

/** Hora actual en Europe/Madrid, independiente de la zona del visitante. */
export function getMadridNow(date: Date = new Date()): MadridNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: business.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const rawHour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0')
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0')
  // Algunos motores devuelven "24" a medianoche con hour12:false.
  const hour = rawHour === 24 ? 0 : rawHour
  const dayKey = WEEKDAY_TO_KEY[weekday] ?? 'monday'

  return { dayKey, minutes: hour * 60 + minute, dayLabel: DAY_NAMES[dayKey] }
}

function toMinutes(time?: string): number {
  if (!time) return 0
  const [h, m] = time.split(':').map(Number)
  return h * 60 + (m || 0)
}

/** "09:00" → "9:00"; "24:00" → "24:00". */
export function prettyTime(time?: string): string {
  if (!time) return ''
  const [h, m] = time.split(':')
  return `${Number(h)}:${m}`
}

export interface OpenState {
  isOpen: boolean
  /** Línea corta para la cabecera. */
  label: string
  /** Línea secundaria con el próximo cambio. */
  detail: string
  todayKey: DayKey
  todayLabel: string
  todaySchedule: (typeof business.hours)[number]
  isCouscousDay: boolean
  /** Día (en minúsculas) del próximo cuscús. */
  nextCouscousLabel: string
}

function scheduleFor(day: DayKey) {
  return business.hours.find((d) => d.key === day) ?? business.hours[0]
}

function nextOpenDay(from: DayKey, includeToday: boolean): DayKey {
  const start = WEEK.indexOf(from) + (includeToday ? 0 : 1)
  for (let i = 0; i < 7; i += 1) {
    const key = WEEK[(start + i) % 7]
    if (!scheduleFor(key).closed) return key
  }
  return from
}

/** Estado de apertura calculado en Europe/Madrid. */
export function getOpenState(date: Date = new Date()): OpenState {
  const now = getMadridNow(date)
  const today = scheduleFor(now.dayKey)
  const isCouscousDay = now.dayKey === business.couscousDay

  const nextCouscousIndex = (WEEK.indexOf(business.couscousDay) - WEEK.indexOf(now.dayKey) + 7) % 7
  const nextCouscousLabel =
    nextCouscousIndex === 0 ? 'hoy' : DAY_NAMES[business.couscousDay]

  if (!today.closed && today.opens && today.closes) {
    const open = toMinutes(today.opens)
    const close = toMinutes(today.closes) || 24 * 60

    if (now.minutes >= open && now.minutes < close) {
      return {
        isOpen: true,
        label: `Abierto ahora · hasta las ${prettyTime(today.closes)}`,
        detail: `Hoy, de ${prettyTime(today.opens)} a ${prettyTime(today.closes)}.`,
        todayKey: now.dayKey,
        todayLabel: now.dayLabel,
        todaySchedule: today,
        isCouscousDay,
        nextCouscousLabel,
      }
    }

    if (now.minutes < open) {
      return {
        isOpen: false,
        label: `Cerrado · abre hoy a las ${prettyTime(today.opens)}`,
        detail: `Hoy, de ${prettyTime(today.opens)} a ${prettyTime(today.closes)}.`,
        todayKey: now.dayKey,
        todayLabel: now.dayLabel,
        todaySchedule: today,
        isCouscousDay,
        nextCouscousLabel,
      }
    }
  }

  const nextDay = nextOpenDay(now.dayKey, false)
  const next = scheduleFor(nextDay)
  const isTomorrow = nextDay === WEEK[(WEEK.indexOf(now.dayKey) + 1) % 7]
  const when = isTomorrow ? 'mañana' : `el ${DAY_NAMES[nextDay]}`

  return {
    isOpen: false,
    label: `Cerrado · abre ${when} a las ${prettyTime(next.opens)}`,
    detail: today.closed ? `Los ${DAY_NAMES[now.dayKey]} cerramos.` : 'Fuera del horario de cocina.',
    todayKey: now.dayKey,
    todayLabel: now.dayLabel,
    todaySchedule: today,
    isCouscousDay,
    nextCouscousLabel,
  }
}

/** Estado que se refresca cada minuto (y al volver a la pestaña). */
export function useOpenState(): OpenState {
  const [state, setState] = useState<OpenState>(() => getOpenState())

  useEffect(() => {
    const tick = () => setState(getOpenState())
    const id = window.setInterval(tick, 60_000)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [])

  return state
}
