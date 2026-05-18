'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { getMoodLabel, getMoodColor } from '@/lib/utils'
import { logMood } from '@/lib/actions'

export default function MoodCheckIn() {
  const router = useRouter()
  const [score, setScore] = useState<number>(5)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await logMood(score, note)
      setDone(true)
      router.refresh()
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-4">
        <p className="text-teal-600 font-medium">Mood logged — keep it up!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">How are you feeling?</label>
          <span className="text-sm font-semibold" style={{ color: getMoodColor(score) }}>
            {score}/10 — {getMoodLabel(score)}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={score}
          onChange={e => setScore(Number(e.target.value))}
          className="w-full accent-teal-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Very Low</span>
          <span>Excellent</span>
        </div>
      </div>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={2}
        placeholder="Anything on your mind? (optional)"
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Logging…' : 'Log Mood'}
      </Button>
    </form>
  )
}
