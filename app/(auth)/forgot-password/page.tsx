'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

export default function ForgotPasswordPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
          <p className="text-gray-400 text-sm">
            We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the link.
          </p>
          <Link href="/login" className="inline-block mt-6 text-teal-400 hover:underline text-sm font-medium">
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-semibold text-teal-400">Mental Health & Wellbeing</Link>
          <p className="text-gray-400 mt-2 text-sm">Reset your password</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-8">
          <p className="text-sm text-gray-400 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? 'Sending…' : 'Send reset link'}
            </Button>
          </form>
        </div>

        <p className="text-center mt-6">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
