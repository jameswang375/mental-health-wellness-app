'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteAccount } from '@/lib/actions'

export default function DeleteAccountButton() {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setLoading(true)
    setError(null)
    const { error } = await deleteAccount()
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      sessionStorage.setItem('account-deleted', 'true')
      window.location.href = '/'
    }
  }

  return (
    <div className="space-y-3">
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
        >
          Delete my account
        </button>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
          <p className="text-sm text-red-800 font-medium">Are you sure?</p>
          <p className="text-xs text-red-600">
            This permanently deletes your account and all associated data, including mood logs, journal entries, and exercise history. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Deleting…' : 'Yes, delete everything'}
            </button>
            <button
              onClick={() => setConfirming(false)}
              disabled={loading}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      )}
    </div>
  )
}
