import { createClient } from '@/lib/supabase/server'

function escapeCSV(value: string | null | undefined): string {
  if (value == null) return ''
  const str = String(value)
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const [{ data: moodLogs }, { data: exerciseLogs }, { data: journalEntries }] = await Promise.all([
    supabase.from('mood_logs').select('*').eq('user_id', user.id).order('logged_at', { ascending: false }),
    supabase.from('exercise_logs').select('*').eq('user_id', user.id).order('logged_at', { ascending: false }),
    supabase.from('journal_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
  ])

  const lines: string[] = []

  // Section 1: Mood Logs
  lines.push('Mood Logs')
  lines.push('Date,Score,Note')
  for (const log of moodLogs ?? []) {
    lines.push(`${escapeCSV(log.logged_at)},${log.score},${escapeCSV(log.note)}`)
  }

  lines.push('')

  // Section 2: Exercise Logs
  lines.push('Exercise Logs')
  lines.push('Date,Exercise,Duration (min),Notes')
  for (const log of exerciseLogs ?? []) {
    lines.push(`${escapeCSV(log.logged_at)},${escapeCSV(log.exercise_title)},${log.duration_min},${escapeCSV(log.notes)}`)
  }

  lines.push('')

  // Section 3: Journal Entries
  lines.push('Journal Entries')
  lines.push('Date,Prompt,Content')
  for (const entry of journalEntries ?? []) {
    lines.push(`${escapeCSV(entry.created_at)},${escapeCSV(entry.prompt_text)},${escapeCSV(entry.content)}`)
  }

  const csv = lines.join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="wellness-data.csv"',
    },
  })
}
