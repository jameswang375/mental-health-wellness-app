'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import type { ExerciseLog } from '@/types'

interface ExerciseChartProps {
  logs: ExerciseLog[]
}

export default function ExerciseChart({ logs }: ExerciseChartProps) {
  // Group by ISO date string (YYYY-MM-DD) so we can sort chronologically
  const byDate: Record<string, number> = {}
  logs.forEach(log => {
    const key = new Date(log.logged_at).toISOString().split('T')[0]
    byDate[key] = (byDate[key] ?? 0) + log.duration_min
  })

  const data = Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b)) // earliest → latest
    .slice(-14)
    .map(([isoDate, minutes]) => ({
      date: new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      minutes,
    }))

  if (data.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-8">No exercise logs yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} unit="m" />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value) => [`${value} min`, 'Exercise']}
        />
        <Bar dataKey="minutes" fill="#0d9488" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
