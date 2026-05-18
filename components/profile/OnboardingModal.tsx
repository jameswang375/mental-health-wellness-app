'use client'

import { useState, useEffect } from 'react'
import { updateProfile } from '@/lib/actions'

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

interface OnboardingModalProps {
  show: boolean
}

export default function OnboardingModal({ show }: OnboardingModalProps) {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (show && localStorage.getItem('onboarding-done') !== 'true') {
      setVisible(true)
    }
  }, [show])

  function dismiss() {
    localStorage.setItem('onboarding-done', 'true')
    setVisible(false)
  }

  function toggleGoal(goal: string) {
    setGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  async function handleFinish() {
    setSaving(true)
    try {
      await updateProfile(name, goals)
    } catch {
      // best-effort
    } finally {
      dismiss()
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {visible && (
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome! 👋</h2>
                <p className="text-sm text-gray-500">Let&apos;s set up your profile so we can personalise your experience.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What should we call you?</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={dismiss}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Your wellness goals</h2>
                <p className="text-sm text-gray-500">Select all that apply. You can change these anytime.</p>
              </div>
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
              <div className="flex items-center justify-between">
                <button
                  onClick={dismiss}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={handleFinish}
                  disabled={saving}
                  className="bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Get started 🎉'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
