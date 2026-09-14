export default function Loading() {
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-32 rounded bg-panel" />
        <div className="h-14 w-3/4 rounded bg-panel" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-panel border border-line bg-panel"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
