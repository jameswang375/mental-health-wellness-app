export default function ProgressLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      <div className="h-7 w-28 bg-gray-200 rounded-lg" />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <div className="h-7 w-10 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Charts */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <div className="h-5 w-36 bg-gray-200 rounded" />
          <div className="h-56 w-full bg-gray-100 rounded-lg" />
        </div>
      ))}
    </div>
  )
}
