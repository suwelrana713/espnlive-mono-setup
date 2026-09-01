import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-tag bg-line-2", className)}
    />
  );
}

export function MatchTileSkeleton() {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-panel">
      <div className="aspect-[16/10] bg-panel-2" />
      <div className="space-y-2 border-t border-line p-4">
        <Bar className="h-4 w-3/4" />
        <Bar className="h-4 w-1/2" />
        <div className="flex items-center justify-between pt-3">
          <Bar className="h-3 w-20" />
          <Bar className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}

export function TileGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <MatchTileSkeleton key={i} />
      ))}
    </div>
  );
}

export function MatchListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="rounded-panel border border-line bg-panel">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-line px-4 py-3 last:border-b-0"
        >
          <div className="flex w-14 flex-col gap-1">
            <Bar className="h-3 w-12" />
            <Bar className="h-2.5 w-10" />
          </div>
          <div className="flex-1 space-y-2">
            <Bar className="h-4 w-40" />
            <Bar className="h-4 w-36" />
          </div>
          <div className="hidden flex-col items-end gap-1 sm:flex">
            <Bar className="h-4 w-16" />
            <Bar className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-panel">
      <div className="grid-backdrop min-h-[280px] space-y-6 p-10">
        <Bar className="h-3 w-24" />
        <Bar className="h-14 w-2/3" />
        <Bar className="h-14 w-1/3" />
        <Bar className="h-10 w-40" />
      </div>
    </div>
  );
}

export function BrickGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-full flex-col justify-between gap-6 rounded-panel border border-line bg-panel p-5"
        >
          <Bar className="h-3 w-10" />
          <div className="space-y-3">
            <Bar className="h-10 w-10 rounded-full" />
            <Bar className="h-6 w-28" />
            <Bar className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
