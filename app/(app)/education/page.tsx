import { createClient } from '@/lib/supabase/server'
import FactCard from '@/components/education/FactCard'
import type { Fact } from '@/types'

export default async function EducationPage() {
  const supabase = await createClient()
  const { data: facts } = await supabase.from('facts').select('*').order('topic')

  const allFacts = (facts ?? []) as Fact[]
  const topics = [...new Set(allFacts.map(f => f.topic))]

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Learn</h1>
        <p className="text-gray-500 text-sm mt-1">
          Evidence-based findings on mental health and wellness — each one backed by peer-reviewed research.
          Click <span className="text-teal-600 font-medium">Why?</span> to read the context, and{' '}
          <span className="text-gray-500 font-medium">Source →</span> to read the original paper.
        </p>
      </div>

      {topics.map(topic => (
        <section key={topic}>
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            {topicIcon(topic)}
            {topic}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allFacts.filter(f => f.topic === topic).map(fact => (
              <FactCard key={fact.id} fact={fact} />
            ))}
          </div>
        </section>
      ))}

      {allFacts.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-12">No facts yet.</p>
      )}
    </div>
  )
}

function topicIcon(topic: string) {
  const icons: Record<string, string> = {
    'Anxiety': '😰',
    'Depression': '🌧️',
    'Mood': '☀️',
    'Sleep': '😴',
    'Exercise & Mental Health': '🏃',
    'CBT & Mindfulness': '🧠',
  }
  return icons[topic] ?? '📖'
}
