import Link from 'next/link'
import TryDemoButton from '@/components/TryDemoButton'
import AccountDeletedBanner from '@/components/AccountDeletedBanner'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      <AccountDeletedBanner />
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span className="text-xl font-semibold text-teal-600">Mental Health Wellness App</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Log in
          </Link>
          <TryDemoButton
            label="✨ Try Demo"
            className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60"
          />
        </div>
      </nav>

      <section className="max-w-3xl mx-auto text-center px-8 pt-24 pb-20">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Your mental and physical
          <span className="text-teal-600"> wellbeing</span>, grounded in science
        </h1>
        <p className="text-xl text-gray-500 mb-10 leading-relaxed">
          Evidence-based exercises, CBT tools, and research-backed education. All in one place.
          Real techniques. Real Sources. Not intended to be a replacement for psychotherapy.
        </p>
        <TryDemoButton
          label="✨ Try the demo! No account needed"
          className="bg-teal-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-60"
        />
        <p className="text-sm text-gray-400 mt-4">
          or{' '}
          <Link href="/signup" className="text-teal-600 hover:underline">
            create a free account
          </Link>
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-8 pb-24 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: '💪',
            title: 'Exercises',
            body: 'Explore physical workouts, breathing exercises, CBT techniques, mindfulness practices, and more in one easy-to-access library.',
          },
          {
            icon: '📚',
            title: 'Education',
            body: 'Understand the science behind mental health. Every article is grounded in peer-reviewed research with citations.',
          },
          {
            icon: '📈',
            title: 'Progress',
            body: "Track your mood over time, log your exercise, and write in your private journal to see how far you've come.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{body}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
