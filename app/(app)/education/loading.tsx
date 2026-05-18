export default function EducationLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-pulse">
      <div className="h-7 w-20 bg-gray-200 rounded-lg" />

      {[...Array(3)].map((_, section) => (
        <div key={section} className="space-y-4">
          <div className="h-5 w-28 bg-gray-200 rounded" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-2/3 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
