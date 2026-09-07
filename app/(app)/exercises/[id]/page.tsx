import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ExerciseDetailClient from '@/components/exercises/ExerciseDetailClient'
import type { Exercise } from '@/types'

const difficultyColors = {
  beginner: 'bg-green-500/15 text-green-400',
  intermediate: 'bg-yellow-500/15 text-yellow-400',
  advanced: 'bg-red-500/15 text-red-400',
}

const categoryColors: Record<string, string> = {
  workout: 'bg-orange-500/15 text-orange-400',
  breathing: 'bg-blue-500/15 text-blue-400',
  stretching: 'bg-purple-500/15 text-purple-400',
  movement: 'bg-green-500/15 text-green-400',
  cbt: 'bg-yellow-500/15 text-yellow-400',
  journaling: 'bg-pink-500/15 text-pink-400',
  mindfulness: 'bg-teal-500/15 text-teal-400',
}

export default async function ExerciseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: exercise } = await supabase.from('exercises').select('*').eq('id', id).single()

  if (!exercise) notFound()

  const ex = exercise as Exercise

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/exercises" className="text-sm text-teal-400 hover:underline">
        ← Back to exercises
      </Link>

      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', categoryColors[ex.subcategory] ?? 'bg-gray-800 text-gray-400')}>
            {ex.subcategory}
          </span>
          <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium capitalize', difficultyColors[ex.difficulty])}>
            {ex.difficulty}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-800 text-gray-400 capitalize">
            {ex.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white">{ex.title}</h1>
        <p className="text-gray-400 mt-2 leading-relaxed">{ex.description}</p>
        <p className="text-sm text-gray-500 mt-3">{ex.duration_min} minutes</p>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="font-semibold text-white mb-4">Instructions</h2>
        <ol className="space-y-3">
          {ex.instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-teal-500/15 text-teal-400 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <ExerciseDetailClient exercise={ex} />
    </div>
  )
}
