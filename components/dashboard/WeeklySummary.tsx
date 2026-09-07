import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import type { MoodLog, ExerciseLog } from '@/types'

interface WeeklySummaryProps {
  thisWeekMoods: MoodLog[]
  lastWeekMoods: MoodLog[]
  thisWeekExercises: ExerciseLog[]
  lastWeekExercises: ExerciseLog[]
  thisWeekJournal: number
  lastWeekJournal: number
}

function avg(arr: number[]): number | null {
  if (!arr.length) return null
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function DiffBadge({ current, last }: { current: number | null; last: number | null }) {
  if (last === null || current === null) return <span className="text-xs text-gray-500">—</span>
  const diff = current - last
  if (diff === 0) return <span className="text-xs text-gray-500">→ same</span>
  const positive = diff > 0
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${positive ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
      {positive ? '+' : ''}{typeof current === 'number' && typeof last === 'number' && !Number.isInteger(diff) ? diff.toFixed(1) : diff} {positive ? '😊' : '😔'}
    </span>
  )
}

export default function WeeklySummary({
  thisWeekMoods,
  lastWeekMoods,
  thisWeekExercises,
  lastWeekExercises,
  thisWeekJournal,
  lastWeekJournal,
}: WeeklySummaryProps) {
  const thisAvgMood = avg(thisWeekMoods.map(m => m.score))
  const lastAvgMood = avg(lastWeekMoods.map(m => m.score))

  const thisExerciseCount = thisWeekExercises.length
  const lastExerciseCount = lastWeekExercises.length

  const rows = [
    {
      label: 'Avg Mood',
      thisValue: thisAvgMood !== null ? `${thisAvgMood.toFixed(1)}/10` : '—',
      diffCurrent: thisAvgMood,
      diffLast: lastAvgMood,
    },
    {
      label: 'Exercises',
      thisValue: thisExerciseCount,
      diffCurrent: thisExerciseCount,
      diffLast: lastExerciseCount,
    },
    {
      label: 'Journal Entries',
      thisValue: thisWeekJournal,
      diffCurrent: thisWeekJournal,
      diffLast: lastWeekJournal,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-white">This Week vs Last Week</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-800">
          {rows.map(row => (
            <div key={row.label} className="px-6 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-400">{row.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white">{row.thisValue}</span>
                <DiffBadge current={row.diffCurrent} last={row.diffLast} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
