import type { MoodLog, ExerciseLog } from '@/types'

interface CorrelationInsightProps {
  moods: MoodLog[]
  exercises: ExerciseLog[]
}

export default function CorrelationInsight({ moods, exercises }: CorrelationInsightProps) {
  // Build set of dates with exercise
  const exerciseDates = new Set(
    exercises.map(e => new Date(e.logged_at).toLocaleDateString('en-CA'))
  )

  const moodsWithExercise = moods.filter(m =>
    exerciseDates.has(new Date(m.logged_at).toLocaleDateString('en-CA'))
  )
  const moodsWithout = moods.filter(m =>
    !exerciseDates.has(new Date(m.logged_at).toLocaleDateString('en-CA'))
  )

  const hasEnoughData = moods.length >= 5 && moodsWithExercise.length >= 1 && moodsWithout.length >= 1

  if (!hasEnoughData) {
    return (
      <div className="rounded-xl border border-teal-100 bg-teal-50 px-6 py-4">
        <p className="text-sm text-teal-700 font-medium mb-1">Exercise & Mood Correlation</p>
        <p className="text-sm text-teal-600">
          Keep logging your moods and exercises — once you have more data, we&apos;ll show you how exercises affect your mood.
        </p>
      </div>
    )
  }

  const avgWithExercise = (
    moodsWithExercise.reduce((s, m) => s + m.score, 0) / moodsWithExercise.length
  ).toFixed(1)
  const avgWithout = (
    moodsWithout.reduce((s, m) => s + m.score, 0) / moodsWithout.length
  ).toFixed(1)

  const diff = parseFloat(avgWithExercise) - parseFloat(avgWithout)
  const isSignificantBoost = diff >= 0.5

  return (
    <div className="rounded-xl border border-teal-100 bg-teal-50 px-6 py-4">
      <p className="text-sm text-teal-700 font-medium mb-1">Exercises & Mood Correlation</p>
      <p className="text-sm text-teal-700">
        On days you exercised your avg mood was{' '}
        <span className="font-semibold">{avgWithExercise}/10</span>{' '}
        vs{' '}
        <span className="font-semibold">{avgWithout}/10</span>{' '}
        on rest days.{' '}
        {isSignificantBoost
          ? 'Exercises seem to boost your mood — keep it up! 🌟'
          : 'Interesting — rest days have been solid too. Balance is key.'}
      </p>
    </div>
  )
}
