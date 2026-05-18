import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL

  if (!serviceRoleKey) {
    console.error('Demo reset: SUPABASE_SERVICE_ROLE_KEY is not set')
    return NextResponse.json({ error: 'Server misconfiguration: missing service role key' }, { status: 500 })
  }

  if (!demoEmail) {
    console.error('Demo reset: NEXT_PUBLIC_DEMO_EMAIL is not set')
    return NextResponse.json({ error: 'Server misconfiguration: missing demo email' }, { status: 500 })
  }

  const serviceClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey
  )

  const { error } = await serviceClient.rpc('reset_demo_data', {
    demo_email: demoEmail,
  })

  if (error) {
    console.error('Demo reset error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
