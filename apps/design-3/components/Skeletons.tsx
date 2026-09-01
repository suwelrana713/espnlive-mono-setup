import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-hairline-strong/60", className)}
    />
  );
}

export function MatchRowSkeleton() {
  return (
    <div className="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-hairline py-4 sm:grid-cols-[92px_1fr_auto_28px] sm:gap-6 sm:px-4">
      <div className="flex flex-col gap-2">
        <Bar className="h-3.5 w-14" />
        <Bar className="h-2.5 w-10" />
      </div>
      <div className="flex flex-col gap-2">
        <Bar className="h-4 w-40" />
        <Bar className="h-4 w-36" />
        <Bar className="mt-1 h-2.5 w-24" />
      </div>
      <div className="hidden flex-col items-end gap-2 sm:flex">
        <Bar className="h-4 w-16" />
        <Bar className="h-2.5 w-20" />
      </div>
      <div className="hidden sm:block">
        <Bar className="h-7 w-7 rounded-full" />
      </div>
    </div>
  );
}

export function MatchListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <MatchRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-panel">
      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 p-10">
          <Bar className="h-3 w-24" />
          <Bar className="h-16 w-3/4" />
          <Bar className="h-14 w-1/2" />
          <div className="flex items-center gap-4 pt-6">
            <Bar className="h-14 w-40" />
            <Bar className="h-10 w-32" />
          </div>
        </div>
        <div className="min-h-[280px] bg-panel-soft" />
      </div>
    </div>
  );
}

export function SportTileSkeleton() {
  return (
    <div className="flex h-full flex-col justify-between gap-6 border border-hairline bg-panel p-5">
      <Bar className="h-3 w-10" />
      <div className="space-y-3">
        <Bar className="h-8 w-8 rounded-full" />
        <Bar className="h-6 w-28" />
        <Bar className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SportGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <SportTileSkeleton key={i} />
      ))}
    </div>
  );
}
