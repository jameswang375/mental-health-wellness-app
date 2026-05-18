import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import type { Exercise } from '@/types'
import { cn } from '@/lib/utils'

const subcategoryColors: Record<string, string> = {
  workout: 'bg-orange-100 text-orange-700',
  breathing: 'bg-blue-100 text-blue-700',
  stretching: 'bg-purple-100 text-purple-700',
  movement: 'bg-green-100 text-green-700',
  cbt: 'bg-yellow-100 text-yellow-700',
  journaling: 'bg-pink-100 text-pink-700',
  mindfulness: 'bg-teal-100 text-teal-700',
}

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Link href={`/exercises/${exercise.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-gray-900 leading-snug">{exercise.title}</h3>
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium shrink-0', subcategoryColors[exercise.subcategory] ?? 'bg-gray-100 text-gray-600')}>
              {exercise.subcategory}
            </span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{exercise.description}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{exercise.duration_min} min</span>
            <span>·</span>
            <span className="capitalize">{exercise.difficulty}</span>
            <span>·</span>
            <span className="capitalize">{exercise.category}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
