import { cn } from '@/lib/utils'

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-white/5', className)} />
  )
}

export function MatchCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/3 p-4">
      <Skeleton className="mb-3 h-3 w-20" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-12 rounded-lg" />
        <div className="flex flex-1 items-center justify-end gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <Skeleton className="mt-3 h-3 w-32" />
    </div>
  )
}

export function SportCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/3 p-6">
      <Skeleton className="mb-3 h-10 w-10 rounded-xl" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-2 h-3 w-16" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-white/3">
      <Skeleton className="absolute inset-0 rounded-none" />
    </div>
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  )
}
