export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-32 rounded bg-line" />
        <div className="h-12 w-3/4 rounded bg-line" />
        <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}
