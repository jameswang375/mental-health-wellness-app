import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getMoodLabel(score: number) {
  if (score <= 2) return 'Very Low'
  if (score <= 4) return 'Low'
  if (score <= 6) return 'Moderate'
  if (score <= 8) return 'Good'
  return 'Excellent'
}

export function getMoodColor(score: number) {
  if (score <= 2) return '#ef4444'
  if (score <= 4) return '#f97316'
  if (score <= 6) return '#eab308'
  if (score <= 8) return '#22c55e'
  return '#10b981'
}

export function calcStreak(logs: { logged_at: string }[]): number {
  if (!logs.length) return 0

  // Build a set of unique date strings (YYYY-MM-DD)
  const dateset = new Set(
    logs.map(l => new Date(l.logged_at).toLocaleDateString('en-CA')) // 'en-CA' gives YYYY-MM-DD
  )

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayStr = today.toLocaleDateString('en-CA')
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toLocaleDateString('en-CA')

  // If no log today OR yesterday, streak is 0
  if (!dateset.has(todayStr) && !dateset.has(yesterdayStr)) return 0

  // Count backwards from today
  let streak = 0
  const cursor = new Date(today)
  while (true) {
    const dateStr = cursor.toLocaleDateString('en-CA')
    if (dateset.has(dateStr)) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}
