import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import ProfileForm from '@/components/profile/ProfileForm'
import DeleteAccountButton from '@/components/profile/DeleteAccountButton'
import ExportButton from '@/components/profile/ExportButton'
import type { Profile } from '@/types'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user!.id)
    .single()

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and wellness goals.</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Your Info</h2>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm text-gray-500">
            <span className="font-medium text-gray-700">Email: </span>{user!.email}
          </div>
          <ProfileForm profile={profile as Profile | null} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Your Data</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Download all your mood logs, exercise logs, and journal entries as a CSV file.
          </p>
          <ExportButton />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete your account and all associated data. This cannot be undone.
          </p>
          <DeleteAccountButton />
        </CardContent>
      </Card>
    </div>
  )
}
