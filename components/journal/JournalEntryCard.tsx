'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'
import { deleteJournalEntry } from '@/lib/actions'
import type { JournalEntry } from '@/types'

interface JournalEntryCardProps {
  entry: JournalEntry
}

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this entry?')) return
    setDeleting(true)
    try {
      await deleteJournalEntry(entry.id)
      router.refresh()
    } catch {
      setDeleting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-5">
        {entry.prompt_text && (
          <p className="text-xs text-teal-600 font-medium mb-2 italic">
            &ldquo;{entry.prompt_text}&rdquo;
          </p>
        )}
        <p className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}>
          {entry.content}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(entry.created_at)}</span>
            {entry.content.length > 200 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-teal-600 hover:underline"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
