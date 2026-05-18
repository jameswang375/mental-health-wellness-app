'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { saveJournalEntry } from '@/lib/actions'
import type { JournalPrompt } from '@/types'

interface NewEntryFormProps {
  prompts: JournalPrompt[]
  onSaved?: () => void
}

export default function NewEntryForm({ prompts, onSaved }: NewEntryFormProps) {
  const router = useRouter()
  const [selectedPrompt, setSelectedPrompt] = useState<JournalPrompt | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function pickRandomPrompt() {
    const available = prompts.filter(p => p.id !== selectedPrompt?.id)
    const pool = available.length > 0 ? available : prompts
    setSelectedPrompt(pool[Math.floor(Math.random() * pool.length)])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    setError(null)
    try {
      await saveJournalEntry(content, selectedPrompt?.id ?? null, selectedPrompt?.text ?? null)
      setContent('')
      setSelectedPrompt(null)
      router.refresh()
      onSaved?.()
    } catch {
      setError('Failed to save entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedPrompt ? (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
          <p className="text-sm text-teal-800 italic">&ldquo;{selectedPrompt.text}&rdquo;</p>
          <button
            type="button"
            onClick={() => setSelectedPrompt(null)}
            className="text-xs text-teal-600 mt-2 hover:underline"
          >
            Remove prompt
          </button>
        </div>
      ) : (
        <Button type="button" variant="secondary" size="sm" onClick={pickRandomPrompt}>
          Get a random prompt
        </Button>
      )}

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={7}
        placeholder="Write your thoughts here…"
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading || !content.trim()}>
        {loading ? 'Saving…' : 'Save Entry'}
      </Button>
    </form>
  )
}
