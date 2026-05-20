'use client'

import { useState } from 'react'
import JournalEntryCard from '@/components/journal/JournalEntryCard'
import type { JournalEntry } from '@/types'

interface JournalListProps {
  entries: JournalEntry[]
}

export default function JournalList({ entries }: JournalListProps) {
  const [search, setSearch] = useState('')

  if (!entries.length) {
    return (
      <p className="text-center text-sm text-gray-400 py-8">
        Your journal entries will appear here.
      </p>
    )
  }

  const filtered = search
    ? entries.filter(e =>
        e.content.toLowerCase().includes(search.toLowerCase()) ||
        (e.prompt_text ?? '').toLowerCase().includes(search.toLowerCase())
      )
    : entries

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search entries…"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-6">No entries match your search.</p>
      ) : (
        filtered.map(entry => <JournalEntryCard key={entry.id} entry={entry} />)
      )}
    </div>
  )
}
