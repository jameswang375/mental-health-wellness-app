'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import type { MoodLog } from '@/types'
import { getMoodColor } from '@/lib/utils'

interface MoodChartProps {
  logs: MoodLog[]
}

export default function MoodChart({ logs }: MoodChartProps) {
  const data = logs
    .slice()
    .reverse()
    .map(log => ({
      date: new Date(log.logged_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: log.score,
    }))

  if (data.length === 0) {
    return <p className="text-sm text-gray-500 text-center py-8">No mood logs yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <YAxis domain={[1, 10]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: '#111827', border: '1px solid #374151', color: '#e5e7eb' }}
          formatter={(value) => [value, 'Mood']}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#0d9488"
          strokeWidth={2}
          dot={{ fill: '#0d9488', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
