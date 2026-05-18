export type Category = 'physical' | 'mental'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ExerciseSubcategory =
  | 'workout'
  | 'breathing'
  | 'stretching'
  | 'movement'
  | 'cbt'
  | 'journaling'
  | 'mindfulness'

export interface Profile {
  user_id: string
  display_name: string | null
  goals: string[]
  created_at: string
}

export interface Exercise {
  id: string
  title: string
  category: Category
  subcategory: ExerciseSubcategory
  description: string
  instructions: string[]
  duration_min: number
  difficulty: Difficulty
}

export interface ExerciseLog {
  id: string
  user_id: string
  exercise_id: string | null
  exercise_title: string
  duration_min: number
  notes: string | null
  logged_at: string
}

export interface MoodLog {
  id: string
  user_id: string
  score: number // 1–10
  note: string | null
  logged_at: string
}

export interface JournalPrompt {
  id: string
  text: string
  category: string
}

export interface JournalEntry {
  id: string
  user_id: string
  prompt_id: string | null
  prompt_text: string | null
  content: string
  created_at: string
}

export interface Citation {
  authors: string
  title: string
  journal: string
  year: number
  url: string
}

export interface Fact {
  id: string
  topic: string
  statement: string
  explanation: string
  citation: Citation
}
