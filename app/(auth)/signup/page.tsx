'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

export default function SignupPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: displayName },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (data.session) {
      // Email confirmation is off — user is already signed in
      router.push('/dashboard')
      router.refresh()
    } else {
      // Email confirmation is on — show the check your email screen
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
          <p className="text-gray-400 text-sm">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
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
          <p className="text-gray-400 mt-2 text-sm">Create your account</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder:text-gray-500 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your name"
              />
            </div>
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
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
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

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-400 hover:underline font-medium">
            Sign in
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
