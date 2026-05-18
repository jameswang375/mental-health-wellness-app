import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import ExerciseCard from '@/components/exercises/ExerciseCard'
import ExerciseFilters from '@/components/exercises/ExerciseFilters'
import type { Exercise } from '@/types'

interface ExercisesPageProps {
  searchParams: Promise<{ category?: string; subcategory?: string }>
}

export default async function ExercisesPage({ searchParams }: ExercisesPageProps) {
  const { category, subcategory } = await searchParams
  const supabase = await createClient()

  let query = supabase.from('exercises').select('*').order('category').order('title')
  if (category) query = query.eq('category', category)
  if (subcategory) query = query.eq('subcategory', subcategory)

  const { data: exercises } = await query

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Exercises</h1>
        <p className="text-gray-500 text-sm mt-1">
          Physical and mental exercises grounded in evidence-based practice.
        </p>
      </div>

      <Suspense fallback={null}>
        <ExerciseFilters activeCategory={category} activeSubcategory={subcategory} />
      </Suspense>

      {exercises && exercises.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(exercises as Exercise[]).map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm py-12 text-center">No exercises found.</p>
      )}
    </div>
  )
}
