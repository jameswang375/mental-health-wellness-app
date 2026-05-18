export default function DashboardLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* Heading */}
      <div className="h-7 w-48 bg-gray-200 rounded-lg" />

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <div className="h-6 w-8 bg-gray-200 rounded" />
            <div className="h-7 w-12 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Two cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
            <div className="h-5 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-3/4 bg-gray-100 rounded" />
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Bottom card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-gray-50">
            <div className="h-4 w-40 bg-gray-100 rounded" />
            <div className="h-4 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
