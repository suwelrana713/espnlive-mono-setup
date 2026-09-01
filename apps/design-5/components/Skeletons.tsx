import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return <div className={cn("skeleton h-3 w-24", className)} />;
}

export function ScoreRowSkeleton() {
  return (
    <div className="grid grid-cols-[60px_1fr_auto] items-center gap-3 px-3 py-2.5 sm:grid-cols-[60px_1fr_auto_28px]">
      <div className="flex flex-col gap-1">
        <Bar className="h-3.5 w-12" />
        <Bar className="h-2.5 w-10" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Bar className="h-6 w-6 rounded-sm" />
          <Bar className="h-3.5 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Bar className="h-6 w-6 rounded-sm" />
          <Bar className="h-3.5 w-28" />
        </div>
      </div>
      <div className="hidden sm:block">
        <Bar className="h-6 w-14 rounded-md" />
      </div>
      <div className="hidden sm:block">
        <Bar className="h-4 w-4" />
      </div>
    </div>
  );
}

export function ScoreListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="card">
      <div className="border-b border-line bg-surface-2/50 px-4 py-2.5">
        <Bar className="h-3 w-24" />
      </div>
      <div className="divide-y divide-line/60">
        {Array.from({ length: count }).map((_, i) => (
          <ScoreRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="card p-6 sm:p-8">
      <Bar className="h-3 w-32" />
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Bar className="h-14 w-14 rounded-md" />
          <div className="space-y-2">
            <Bar className="h-3 w-10" />
            <Bar className="h-6 w-32" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Bar className="h-3 w-12" />
          <Bar className="h-12 w-24" />
        </div>
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <Bar className="h-3 w-10" />
            <Bar className="h-6 w-32" />
          </div>
          <Bar className="h-14 w-14 rounded-md" />
        </div>
      </div>
      <Bar className="mt-6 h-10 w-40 rounded-md" />
    </div>
  );
}

export function SportTileSkeleton() {
  return (
    <div className="card flex items-center gap-4 p-4">
      <Bar className="h-12 w-12 rounded-md" />
      <div className="flex-1 space-y-2">
        <Bar className="h-4 w-24" />
        <Bar className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SportGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SportTileSkeleton key={i} />
      ))}
    </div>
  );
}
