'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function logMood(score: number, note: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('mood_logs').insert({
    user_id: user.id,
    score,
    note: note.trim() || null,
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/progress')
}

export async function logExercise(
  exerciseTitle: string,
  durationMin: number,
  notes: string,
  exerciseId?: string
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('exercise_logs').insert({
    user_id: user.id,
    exercise_id: exerciseId ?? null,
    exercise_title: exerciseTitle,
    duration_min: durationMin,
    notes: notes.trim() || null,
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/progress')
  revalidatePath('/exercises')
}

export async function saveJournalEntry(
  content: string,
  promptId: string | null,
  promptText: string | null
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('journal_entries').insert({
    user_id: user.id,
    content: content.trim(),
    prompt_id: promptId,
    prompt_text: promptText,
  })
  if (error) throw new Error(error.message)

  revalidatePath('/journal')
  revalidatePath('/dashboard')
}

export async function deleteMoodLog(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('mood_logs')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw new Error(error.message)

  revalidatePath('/progress')
  revalidatePath('/dashboard')
}

export async function deleteJournalEntry(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw new Error(error.message)

  revalidatePath('/journal')
  revalidatePath('/dashboard')
}

export async function updateProfile(displayName: string, goals: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('profiles')
    .upsert({ user_id: user.id, display_name: displayName, goals })
  if (error) throw new Error(error.message)

  revalidatePath('/profile')
  revalidatePath('/dashboard')
}

export async function deleteAccount(): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Prevent deleting the shared demo account
  if (user.email === process.env.NEXT_PUBLIC_DEMO_EMAIL) {
    return { error: 'The demo account cannot be deleted.' }
  }

  // Admin client needed to delete from auth.users
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await admin.auth.admin.deleteUser(user.id)
  if (error) return { error: error.message }

  await supabase.auth.signOut()
  return { error: null }
}
