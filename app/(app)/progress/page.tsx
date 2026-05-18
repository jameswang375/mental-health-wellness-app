import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import MoodChart from '@/components/progress/MoodChart'
import ExerciseChart from '@/components/progress/ExerciseChart'
import MoodLogList from '@/components/progress/MoodLogList'
import CorrelationInsight from '@/components/progress/CorrelationInsight'
import TimeFilter from '@/components/progress/TimeFilter'
import type { MoodLog, ExerciseLog } from '@/types'

export default async function ProgressPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const { range: rawRange } = await searchParams
  const range = rawRange ?? '30'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const now = new Date()

  function getDateFilter(days: number): string {
    const d = new Date(now)
    d.setDate(d.getDate() - days)
    d.setHours(0, 0, 0, 0)
    return d.toISOString()
  }

  let moodQuery = supabase
    .from('mood_logs')
    .select('*')
    .eq('user_id', user!.id)
    .order('logged_at', { ascending: false })

  let exerciseQuery = supabase
    .from('exercise_logs')
    .select('*')
    .eq('user_id', user!.id)
    .order('logged_at', { ascending: false })

  if (range === '7') {
    const iso = getDateFilter(7)
    moodQuery = moodQuery.gte('logged_at', iso)
    exerciseQuery = exerciseQuery.gte('logged_at', iso)
  } else if (range === '30') {
    const iso = getDateFilter(30)
    moodQuery = moodQuery.gte('logged_at', iso).limit(30)
    exerciseQuery = exerciseQuery.gte('logged_at', iso).limit(60)
  } else {
    // all — no date filter, no limit
  }

  const [{ data: moodLogs }, { data: exerciseLogs }] = await Promise.all([
    moodQuery,
    exerciseQuery,
  ])

  const moods = (moodLogs ?? []) as MoodLog[]
  const exercises = (exerciseLogs ?? []) as ExerciseLog[]

  const avgMood = moods.length
    ? (moods.reduce((sum, m) => sum + m.score, 0) / moods.length).toFixed(1)
    : null

  const totalMinutes = exercises.reduce((sum, e) => sum + e.duration_min, 0)

  const rangeLabel = range === '7' ? 'Last 7 days' : range === '30' ? 'Last 30 days' : 'All time'

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Progress</h1>
          <p className="text-gray-500 text-sm mt-1">{rangeLabel} · Your mood and activity.</p>
        </div>
        <TimeFilter current={range} />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Mood entries', value: moods.length },
          { label: 'Avg mood', value: avgMood ? `${avgMood}/10` : '—' },
          { label: 'Exercise sessions', value: exercises.length },
          { label: 'Total minutes', value: totalMinutes > 0 ? `${totalMinutes}m` : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Correlation insight */}
      <CorrelationInsight moods={moods} exercises={exercises} />

      {/* Mood chart */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Mood Over Time</h2>
          <p className="text-xs text-gray-400 mt-0.5">{rangeLabel}</p>
        </CardHeader>
        <CardContent>
          <MoodChart logs={moods} />
        </CardContent>
      </Card>

      {/* Exercise chart */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Exercise Activity</h2>
          <p className="text-xs text-gray-400 mt-0.5">Minutes per day, last 14 days</p>
        </CardHeader>
        <CardContent>
          <ExerciseChart logs={exercises} />
        </CardContent>
      </Card>

      {/* Recent mood log */}
      {moods.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Mood Log</h2>
          </CardHeader>
          <CardContent className="p-0">
            <MoodLogList logs={moods} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
