import Link from 'next/link'

interface TimeFilterProps {
  current: string
}

const filters = [
  { label: '7 days', value: '7' },
  { label: '30 days', value: '30' },
  { label: 'All time', value: 'all' },
]

export default function TimeFilter({ current }: TimeFilterProps) {
  return (
    <div className="flex gap-1">
      {filters.map(f => (
        <Link
          key={f.value}
          href={`?range=${f.value}`}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            current === f.value
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {f.label}
        </Link>
      ))}
    </div>
  )
}
