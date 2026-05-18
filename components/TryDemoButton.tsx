'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface TryDemoButtonProps {
  className?: string
  label?: string
}

export default function TryDemoButton({
  className = '',
  label = '✨ Try the demo',
}: TryDemoButtonProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDemo() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/demo', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to reset demo')

      const { error } = await supabase.auth.signInWithPassword({
        email: process.env.NEXT_PUBLIC_DEMO_EMAIL!,
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
      })
      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleDemo}
        disabled={loading}
        className={className}
      >
        {loading ? 'Starting…' : label}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
