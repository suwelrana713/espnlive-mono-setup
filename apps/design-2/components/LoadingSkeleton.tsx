import { cn } from '@/lib/utils'

function Bar({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-md bg-white/4', className)} />
}

export function MatchCardSkeleton() {
  return (
    <div className="glass flex items-center gap-4 rounded-[22px] p-4">
      <Bar className="h-14 w-14 rounded-2xl" />
      <div className="flex-1 space-y-2">
        <Bar className="h-3 w-24" />
        <Bar className="h-4 w-48" />
        <Bar className="h-3 w-32" />
      </div>
      <Bar className="h-10 w-16 rounded-lg" />
    </div>
  )
}

export function SportCardSkeleton() {
  return (
    <div className="glass rounded-[22px] p-5">
      <Bar className="mb-4 h-8 w-16" />
      <Bar className="h-4 w-24" />
      <Bar className="mt-2 h-3 w-16" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="glass relative overflow-hidden rounded-[32px]">
      <Bar className="h-[420px] w-full rounded-none" />
    </div>
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  )
}
