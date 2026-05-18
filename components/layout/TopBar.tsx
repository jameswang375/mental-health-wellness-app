'use client'

import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface TopBarProps {
  user: User
  onMenuClick: () => void
}

export default function TopBar({ user, onMenuClick }: TopBarProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.refresh()
    router.push('/login')
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="md:hidden text-gray-500 hover:text-gray-800 transition-colors p-1"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <span className="md:hidden absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-teal-600">
        Mental Health & Wellbeing
      </span>

      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm text-gray-600 hidden sm:block">{user.email}</span>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
