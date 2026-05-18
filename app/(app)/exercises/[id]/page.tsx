import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ExerciseDetailClient from '@/components/exercises/ExerciseDetailClient'
import type { Exercise } from '@/types'

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

const categoryColors: Record<string, string> = {
  workout: 'bg-orange-100 text-orange-700',
  breathing: 'bg-blue-100 text-blue-700',
  stretching: 'bg-purple-100 text-purple-700',
  movement: 'bg-green-100 text-green-700',
  cbt: 'bg-yellow-100 text-yellow-700',
  journaling: 'bg-pink-100 text-pink-700',
  mindfulness: 'bg-teal-100 text-teal-700',
}

export default async function ExerciseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: exercise } = await supabase.from('exercises').select('*').eq('id', id).single()

  if (!exercise) notFound()

  const ex = exercise as Exercise

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/exercises" className="text-sm text-teal-600 hover:underline">
        ← Back to exercises
      </Link>

      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', categoryColors[ex.subcategory] ?? 'bg-gray-100 text-gray-600')}>
            {ex.subcategory}
          </span>
          <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium capitalize', difficultyColors[ex.difficulty])}>
            {ex.difficulty}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-600 capitalize">
            {ex.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{ex.title}</h1>
        <p className="text-gray-500 mt-2 leading-relaxed">{ex.description}</p>
        <p className="text-sm text-gray-400 mt-3">{ex.duration_min} minutes</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Instructions</h2>
        <ol className="space-y-3">
          {ex.instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <ExerciseDetailClient exercise={ex} />
    </div>
  )
}
