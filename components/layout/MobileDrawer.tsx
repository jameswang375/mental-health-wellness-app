'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/exercises', label: 'Exercises', icon: '💪' },
  { href: '/journal', label: 'Journal', icon: '📓' },
  { href: '/education', label: 'Learn', icon: '📚' },
  { href: '/progress', label: 'Progress', icon: '📈' },
  { href: '/profile', label: 'Profile', icon: '👤' },
]

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = usePathname()

  useEffect(() => { onClose() }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 md:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transition-transform duration-200 md:hidden flex flex-col py-6',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="px-6 mb-8 flex items-center justify-between">
          <span className="text-base font-semibold text-teal-600 leading-tight">
            Mental Health & Wellbeing
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
