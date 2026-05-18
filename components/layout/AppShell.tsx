'use client'

import { useState } from 'react'
import type { User } from '@supabase/supabase-js'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import MobileDrawer from '@/components/layout/MobileDrawer'
import PageTransition from '@/components/layout/PageTransition'

export default function AppShell({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar user={user} onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}
