import Link from 'next/link'
import TryDemoButton from '@/components/TryDemoButton'
import AccountDeletedBanner from '@/components/AccountDeletedBanner'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-teal-950">
      <AccountDeletedBanner />
      <nav className="fade-in-up flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span className="text-xl font-semibold text-teal-400">Mental Health Wellness App</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Log in
          </Link>
          <TryDemoButton
            label="Try Demo"
            className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors disabled:opacity-60"
          />
        </div>
      </nav>

      <section className="max-w-3xl mx-auto text-center px-8 pt-24 pb-20">
        <h1
          className="fade-in-up text-5xl font-bold text-white leading-tight mb-6"
          style={{ animationDelay: '100ms' }}
        >
          Your mental and physical
          <span className="text-teal-400"> wellbeing</span>, grounded in science
        </h1>
        <p
          className="fade-in-up text-xl text-gray-400 mb-10 leading-relaxed"
          style={{ animationDelay: '200ms' }}
        >
          Evidence-based exercises, CBT tools, and research-backed education. All in one place.
          Real techniques. Real Sources. Not intended to be a replacement for psychotherapy.
        </p>
        <div className="fade-in-up" style={{ animationDelay: '300ms' }}>
          <TryDemoButton
            label="Try the demo, no account needed"
            className="bg-teal-500 text-white text-lg px-8 py-4 rounded-xl hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-60"
          />
        </div>
        <p className="fade-in-up text-sm text-gray-500 mt-4" style={{ animationDelay: '350ms' }}>
          or{' '}
          <Link href="/signup" className="text-teal-400 hover:underline">
            create a free account
          </Link>
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-8 pb-24 grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'Exercises',
            body: 'Explore physical workouts, breathing exercises, CBT techniques, mindfulness practices, and more in one easy-to-access library.',
          },
          {
            title: 'Education',
            body: 'Understand the science behind mental health. Every article is grounded in peer-reviewed research with citations.',
          },
          {
            title: 'Progress',
            body: "Track your mood over time, log your exercise, and write in your private journal to see how far you've come.",
          },
        ].map(({ title, body }, i) => (
          <div
            key={title}
            className="fade-in-up bg-gray-900/60 rounded-xl border border-gray-800 p-6 backdrop-blur-sm"
            style={{ animationDelay: `${400 + i * 100}ms` }}
          >
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{body}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
