import { Card, CardContent } from '@/components/ui/Card'

interface QuickStatsProps {
  moodCount: number
  exerciseCount: number
  journalCount: number
  streak: number
}

export default function QuickStats({ moodCount, exerciseCount, journalCount, streak }: QuickStatsProps) {
  const streakLabel = streak === 0 ? '—' : `${streak} day${streak === 1 ? '' : 's'}`

  const stats = [
    { label: 'Mood Logs', value: moodCount, icon: '😊' },
    { label: 'Exercises Logged', value: exerciseCount, icon: '💪' },
    { label: 'Journal Entries', value: journalCount, icon: '📓' },
    { label: 'Streak', value: streakLabel, icon: '🔥' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <Card key={stat.label}>
          <CardContent className="pt-4">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
