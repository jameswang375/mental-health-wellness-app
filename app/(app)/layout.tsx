import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import OnboardingModal from '@/components/profile/OnboardingModal'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('user_id', user.id)
    .single()

  return (
    <>
      <AppShell user={user}>{children}</AppShell>
      <OnboardingModal show={!profile?.display_name} />
    </>
  )
}
