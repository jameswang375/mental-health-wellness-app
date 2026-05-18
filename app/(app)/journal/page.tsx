import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import NewEntryForm from '@/components/journal/NewEntryForm'
import JournalList from '@/components/journal/JournalList'
import type { JournalEntry, JournalPrompt } from '@/types'

export default async function JournalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: entries }, { data: prompts }] = await Promise.all([
    supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false }),
    supabase.from('journal_prompts').select('*').order('category'),
  ])

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Journal</h1>
        <p className="text-gray-500 text-sm mt-1">
          A private space to reflect. Your entries are only visible to you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">New Entry</h2>
        </CardHeader>
        <CardContent>
          <NewEntryForm prompts={(prompts as JournalPrompt[]) ?? []} />
        </CardContent>
      </Card>

      {entries && entries.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900">Past Entries</h2>
          <JournalList entries={entries as JournalEntry[]} />
        </div>
      )}

      {(!entries || entries.length === 0) && (
        <p className="text-center text-sm text-gray-400 py-8">
          Your journal entries will appear here.
        </p>
      )}
    </div>
  )
}
