'use client'

import { useRouter } from 'next/navigation'
import { deleteMoodLog } from '@/lib/actions'
import type { MoodLog } from '@/types'

interface MoodLogListProps {
  logs: MoodLog[]
}

export default function MoodLogList({ logs }: MoodLogListProps) {
  const router = useRouter()

  async function handleDelete(id: string) {
    if (!confirm('Delete this mood log?')) return
    try {
      await deleteMoodLog(id)
      router.refresh()
    } catch {
      // silently fail
    }
  }

  if (!logs.length) return null

  return (
    <div className="divide-y divide-gray-50">
      {logs.map(log => (
        <div key={log.id} className="px-6 py-3 flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-gray-900">{log.score}/10</span>
            {log.note && (
              <span className="text-sm text-gray-500 ml-3 italic">&ldquo;{log.note}&rdquo;</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              {new Date(log.logged_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <button
              onClick={() => handleDelete(log.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete mood log"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
