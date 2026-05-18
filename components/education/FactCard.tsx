'use client'

import { useState } from 'react'
import type { Fact } from '@/types'

export default function FactCard({ fact }: { fact: Fact }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <p className="text-gray-900 font-medium leading-snug">{fact.statement}</p>

      {expanded && (
        <p className="text-sm text-gray-600 leading-relaxed">{fact.explanation}</p>
      )}

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-xs text-teal-600 hover:underline font-medium"
        >
          {expanded ? 'Show less' : 'Why?'}
        </button>

        <a
          href={fact.citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-teal-600 transition-colors"
          title={`${fact.citation.authors} (${fact.citation.year}). ${fact.citation.title}. ${fact.citation.journal}.`}
        >
          Source →
        </a>
      </div>

      {expanded && (
        <p className="text-xs text-gray-400 border-t border-gray-100 pt-2">
          {fact.citation.authors} ({fact.citation.year}).{' '}
          <em>{fact.citation.title}</em>.{' '}
          {fact.citation.journal}.
        </p>
      )}
    </div>
  )
}
