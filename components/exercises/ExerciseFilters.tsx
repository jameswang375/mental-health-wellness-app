'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const categories = [
  { value: '', label: 'All' },
  { value: 'physical', label: 'Physical' },
  { value: 'mental', label: 'Mental' },
]

const subcategories = [
  { value: '', label: 'All types' },
  { value: 'workout', label: 'Workout' },
  { value: 'breathing', label: 'Breathing' },
  { value: 'stretching', label: 'Stretching' },
  { value: 'movement', label: 'Movement' },
  { value: 'cbt', label: 'CBT' },
  { value: 'mindfulness', label: 'Mindfulness' },
  { value: 'journaling', label: 'Journaling' },
]

interface ExerciseFiltersProps {
  activeCategory?: string
  activeSubcategory?: string
}

export default function ExerciseFilters({ activeCategory, activeSubcategory }: ExerciseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // Reset subcategory when changing category
    if (key === 'category') params.delete('subcategory')
    router.push(`/exercises?${params.toString()}`)
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateFilter('category', value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
              (activeCategory ?? '') === value
                ? 'bg-teal-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {subcategories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateFilter('subcategory', value)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              (activeSubcategory ?? '') === value
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
