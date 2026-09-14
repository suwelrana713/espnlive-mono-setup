export default function Loading() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-white/5" />
        <div className="h-16 w-3/4 rounded bg-white/5" />
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass h-40 rounded-[22px]" />
          ))}
        </div>
      </div>
    </div>
  )
}
