'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const exchanged = useRef(false)

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Handles hash-based tokens (implicit flow) — fires automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })

    const code = searchParams.get('code')

    if (code) {
      // PKCE flow — ref guard prevents double-invocation in React Strict Mode
      if (exchanged.current) return
      exchanged.current = true

      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          setError('This reset link has expired or has already been used. Please request a new one.')
        }
        // On success, onAuthStateChange fires PASSWORD_RECOVERY and sets ready
      })
    } else {
      // No code in URL — wait briefly to see if hash tokens establish a session
      const timer = setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          setError('Invalid or expired reset link. Please request a new one.')
        }
      }, 1500)
      return () => {
        clearTimeout(timer)
        subscription.unsubscribe()
      }
    }

    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  }

  if (done) {
    return (
      <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-8 text-center">
        <p className="font-semibold text-white mb-1">Password updated</p>
        <p className="text-sm text-gray-400">Redirecting you to your dashboard…</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-8">
      {!ready && !error && (
        <p className="text-sm text-gray-500 text-center py-4">Verifying link…</p>
      )}

      {error && (
        <div className="space-y-4">
          <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          <Link href="/forgot-password">
            <Button className="w-full" variant="secondary">Request a new link</Button>
          </Link>
        </div>
      )}

      {ready && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">New password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-900 text-white placeholder:text-gray-500 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm password</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full bg-gray-900 text-white placeholder:text-gray-500 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Repeat your new password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? 'Updating…' : 'Update password'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-semibold text-teal-400">Mental Health & Wellbeing</Link>
          <p className="text-gray-400 mt-2 text-sm">Choose a new password</p>
        </div>
        <Suspense fallback={
          <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-8 text-center text-sm text-gray-500">
            Loading…
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
