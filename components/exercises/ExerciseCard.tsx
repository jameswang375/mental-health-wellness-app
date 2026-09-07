import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import type { Exercise } from '@/types'
import { cn } from '@/lib/utils'

const subcategoryColors: Record<string, string> = {
  workout: 'bg-orange-500/15 text-orange-400',
  breathing: 'bg-blue-500/15 text-blue-400',
  stretching: 'bg-purple-500/15 text-purple-400',
  movement: 'bg-green-500/15 text-green-400',
  cbt: 'bg-yellow-500/15 text-yellow-400',
  journaling: 'bg-pink-500/15 text-pink-400',
  mindfulness: 'bg-teal-500/15 text-teal-400',
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
            <h3 className="font-semibold text-white leading-snug">{exercise.title}</h3>
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium shrink-0', subcategoryColors[exercise.subcategory] ?? 'bg-gray-800 text-gray-400')}>
              {exercise.subcategory}
            </span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 mb-4">{exercise.description}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
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
