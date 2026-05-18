'use client'

export default function ExportButton() {
  return (
    <button
      onClick={() => { window.location.href = '/api/export' }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <span>↓</span>
      Download my data (CSV)
    </button>
  )
}
