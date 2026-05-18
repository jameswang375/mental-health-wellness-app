'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import LogExerciseModal from '@/components/exercises/LogExerciseModal'
import type { Exercise } from '@/types'

export default function ExerciseDetailClient({ exercise }: { exercise: Exercise }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button size="lg" onClick={() => setShowModal(true)}>
        Log this exercise
      </Button>

      {showModal && (
        <LogExerciseModal
          exercise={exercise}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
