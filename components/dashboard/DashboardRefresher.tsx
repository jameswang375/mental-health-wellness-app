'use client'

import { useRouter } from 'next/navigation'

export default function DashboardRefresher({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div onClick={() => {}} onKeyDown={() => {}}>
      {/* Clones children and injects router refresh as onLogged */}
      <MoodCheckInWrapper onLogged={() => router.refresh()}>
        {children}
      </MoodCheckInWrapper>
    </div>
  )
}

function MoodCheckInWrapper({
  children,
  onLogged,
}: {
  children: React.ReactNode
  onLogged: () => void
}) {
  // Pass onLogged down by re-rendering the child with the prop
  if (children && typeof children === 'object' && 'props' in (children as object)) {
    const child = children as React.ReactElement<{ onLogged: () => void }>
    return <child.type {...child.props} onLogged={onLogged} />
  }
  return <>{children}</>
}
