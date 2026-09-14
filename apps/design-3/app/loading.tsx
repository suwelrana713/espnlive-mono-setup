export default function Loading() {
  return (
    <div className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 bg-hairline" />
        <div className="h-16 w-3/4 bg-hairline" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 border border-hairline bg-panel" />
          ))}
        </div>
      </div>
    </div>
  );
}
