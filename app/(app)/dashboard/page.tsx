import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import MoodCheckIn from '@/components/dashboard/MoodCheckIn'
import QuickStats from '@/components/dashboard/QuickStats'
import WeeklySummary from '@/components/dashboard/WeeklySummary'
import Link from 'next/link'
import { formatDate, getMoodColor, getMoodLabel, calcStreak } from '@/lib/utils'
import type { MoodLog, ExerciseLog, JournalEntry } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { data: profile },
    { data: moodLogs },
    { data: exerciseLogs },
    { data: journalEntries },
    { data: recentExercises },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', user!.id).single(),
    supabase.from('mood_logs').select('*').eq('user_id', user!.id).order('logged_at', { ascending: false }).limit(30),
    supabase.from('exercise_logs').select('*').eq('user_id', user!.id).order('logged_at', { ascending: false }).limit(30),
    supabase.from('journal_entries').select('*').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(30),
    supabase.from('exercise_logs').select('*').eq('user_id', user!.id).order('logged_at', { ascending: false }).limit(3),
  ])

  const displayName = profile?.display_name || user!.email?.split('@')[0]
  const lastMood = moodLogs?.[0] ?? null
  const alreadyLoggedToday = lastMood
    ? new Date(lastMood.logged_at).toDateString() === new Date().toDateString()
    : false

  const streak = calcStreak((moodLogs ?? []) as MoodLog[])

  // Weekly buckets
  const now = new Date()
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  const fourteenDaysAgo = new Date(now)
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)
  fourteenDaysAgo.setHours(0, 0, 0, 0)

  const allMoods = (moodLogs ?? []) as MoodLog[]
  const allExercises = (exerciseLogs ?? []) as ExerciseLog[]
  const allJournal = (journalEntries ?? []) as JournalEntry[]

  const thisWeekMoods = allMoods.filter(m => new Date(m.logged_at) >= sevenDaysAgo)
  const lastWeekMoods = allMoods.filter(m => {
    const d = new Date(m.logged_at)
    return d >= fourteenDaysAgo && d < sevenDaysAgo
  })
  const thisWeekExercises = allExercises.filter(e => new Date(e.logged_at) >= sevenDaysAgo)
  const lastWeekExercises = allExercises.filter(e => {
    const d = new Date(e.logged_at)
    return d >= fourteenDaysAgo && d < sevenDaysAgo
  })
  const thisWeekJournal = allJournal.filter(j => new Date(j.created_at) >= sevenDaysAgo).length
  const lastWeekJournal = allJournal.filter(j => {
    const d = new Date(j.created_at)
    return d >= fourteenDaysAgo && d < sevenDaysAgo
  }).length

  const recentJournal = allJournal.slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Good {getTimeOfDay()}, {displayName}
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s your wellness snapshot.</p>
      </div>

      <QuickStats
        moodCount={allMoods.length}
        exerciseCount={allExercises.length}
        journalCount={allJournal.length}
        streak={streak}
      />

      <WeeklySummary
        thisWeekMoods={thisWeekMoods}
        lastWeekMoods={lastWeekMoods}
        thisWeekExercises={thisWeekExercises}
        lastWeekExercises={lastWeekExercises}
        thisWeekJournal={thisWeekJournal}
        lastWeekJournal={lastWeekJournal}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood check-in */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Daily Mood Check-in</h2>
          </CardHeader>
          <CardContent>
            {alreadyLoggedToday ? (
              <div className="py-2">
                <p className="text-sm text-gray-500 mb-1">Today&apos;s mood</p>
                <p className="text-3xl font-bold" style={{ color: getMoodColor(lastMood!.score) }}>
                  {lastMood!.score}/10
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{getMoodLabel(lastMood!.score)}</p>
                {lastMood!.note && (
                  <p className="text-sm text-gray-600 mt-3 italic">&ldquo;{lastMood!.note}&rdquo;</p>
                )}
              </div>
            ) : (
              <MoodCheckIn />
            )}
          </CardContent>
        </Card>

        {/* Recent journal entries */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Journal</h2>
            <Link href="/journal" className="text-xs text-teal-600 hover:underline">View all</Link>
          </CardHeader>
          <CardContent>
            {recentJournal.length > 0 ? (
              <ul className="space-y-3">
                {recentJournal.map(entry => (
                  <li key={entry.id} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    {entry.prompt_text && (
                      <p className="text-xs text-teal-600 italic mb-1">&ldquo;{entry.prompt_text}&rdquo;</p>
                    )}
                    <p className="text-sm text-gray-700 line-clamp-2">{entry.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(entry.created_at)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <p className="text-2xl mb-2">📓</p>
                <p className="text-sm font-medium text-gray-700 mb-1">No journal entries yet</p>
                <p className="text-xs text-gray-400 mb-3">Writing regularly helps track your mental health over time.</p>
                <Link href="/journal" className="text-sm text-teal-600 hover:underline font-medium">Write your first entry →</Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent exercises */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          <Link href="/exercises" className="text-xs text-teal-600 hover:underline">Browse exercises</Link>
        </CardHeader>
        <CardContent>
          {recentExercises && recentExercises.length > 0 ? (
            <ul className="divide-y divide-gray-50">
              {recentExercises.map(log => (
                <li key={log.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.exercise_title}</p>
                    {log.notes && <p className="text-xs text-gray-400 mt-0.5">{log.notes}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{log.duration_min} min</p>
                    <p className="text-xs text-gray-400">{formatDate(log.logged_at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-2xl mb-2">💪</p>
              <p className="text-sm font-medium text-gray-700 mb-1">No activity logged yet</p>
              <p className="text-xs text-gray-400 mb-3">Even a 10-minute walk counts — small steps add up.</p>
              <Link href="/exercises" className="text-sm text-teal-600 hover:underline font-medium">Browse exercises →</Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}
