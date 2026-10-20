/** "1994-03-12" → "12.03.1994". Дата без времени: разбираем строку, чтобы часовой пояс не сдвинул день. */
export function formatDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate)
  if (!match) {
    throw new Error(`Некорректная дата: "${isoDate}"`)
  }
  const [, year, month, day] = match
  return `${day}.${month}.${year}`
}

const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' })

/** Момент времени (ISO с поясом) → "20.10.2026, 14:05" в часовом поясе пользователя. */
export function formatDateTime(isoInstant: string): string {
  return dateTimeFormatter.format(new Date(isoInstant))
}

/** Момент времени → "14:05". */
export function formatTime(isoInstant: string): string {
  return timeFormatter.format(new Date(isoInstant))
}
