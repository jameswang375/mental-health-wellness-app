'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { updateProfile } from '@/lib/actions'
import type { Profile } from '@/types'

const GOAL_OPTIONS = [
  'Reduce anxiety',
  'Improve sleep',
  'Build exercise habits',
  'Manage stress',
  'Practice mindfulness',
  'Improve mood',
  'Build resilience',
  'Journaling habit',
]

interface ProfileFormProps {
  profile: Profile | null
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [goals, setGoals] = useState<string[]>(profile?.goals ?? [])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toggleGoal(goal: string) {
    setGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      await updateProfile(displayName, goals)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Display name</label>
        <input
          type="text"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder="Your name"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Wellness goals</label>
        <div className="flex flex-wrap gap-2">
          {GOAL_OPTIONS.map(goal => (
            <button
              key={goal}
              type="button"
              onClick={() => toggleGoal(goal)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                goals.includes(goal)
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={saving}>
        {saving ? 'Saving…' : saved ? 'Saved!' : 'Save changes'}
      </Button>
    </form>
  )
}
