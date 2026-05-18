'use client'

import { useEffect, useState } from 'react'

export default function AccountDeletedBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('account-deleted') === 'true') {
      sessionStorage.removeItem('account-deleted')
      setShow(true)
      setTimeout(() => setShow(false), 4000)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-xl shadow-lg">
      ✓ Your account has been successfully deleted.
    </div>
  )
}
