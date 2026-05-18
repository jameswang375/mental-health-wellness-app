'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/exercises', label: 'Exercises', icon: '💪' },
  { href: '/journal', label: 'Journal', icon: '📓' },
  { href: '/education', label: 'Learn', icon: '📚' },
  { href: '/progress', label: 'Progress', icon: '📈' },
  { href: '/profile', label: 'Profile', icon: '👤' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-open')
    if (stored !== null) setOpen(stored === 'true')
  }, [])

  function toggle() {
    setOpen(prev => {
      localStorage.setItem('sidebar-open', String(!prev))
      return !prev
    })
  }

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col bg-white border-r border-gray-200 py-6 transition-all duration-200',
        open ? 'w-56' : 'w-14'
      )}
    >
      <div className={cn('flex items-center mb-8', open ? 'px-6 justify-between' : 'px-0 justify-center')}>
        {open && (
          <span className="text-base font-semibold text-teal-600 leading-tight">
            Mental Health & Wellbeing
          </span>
        )}
        <button
          onClick={toggle}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              title={!open ? label : undefined}
              className={cn(
                'flex items-center rounded-lg text-sm font-medium transition-colors',
                open ? 'gap-3 px-3 py-2' : 'justify-center px-0 py-2',
                active
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <span className="text-base leading-none">{icon}</span>
              {open && label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
