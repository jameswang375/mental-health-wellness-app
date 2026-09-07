'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  async function handleDemo() {
    setDemoLoading(true)
    setError(null)

    try {
      // Reset demo data to a clean slate
      const res = await fetch('/api/demo', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to reset demo data')

      // Sign in as the demo user
      const { error } = await supabase.auth.signInWithPassword({
        email: process.env.NEXT_PUBLIC_DEMO_EMAIL!,
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
      })
      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not start demo. Please try again.')
      setDemoLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-semibold text-teal-400">Mental Health & Wellbeing</Link>
          <p className="text-gray-400 mt-2 text-sm">Welcome back</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder:text-gray-500 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-teal-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder:text-gray-500 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <button
          onClick={handleDemo}
          disabled={demoLoading}
          className="mt-4 w-full rounded-xl border-2 border-dashed border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/15 transition-colors py-3 text-sm font-medium text-teal-400 disabled:opacity-60"
        >
          {demoLoading ? 'Starting demo…' : 'Try the demo — no account needed'}
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          No account?{' '}
          <Link href="/signup" className="text-teal-400 hover:underline font-medium">
            Sign up free
          </Link>
        </p>
        <p className="text-center mt-3">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
