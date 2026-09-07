import { cn } from '@/lib/utils'

interface LiveBadgeProps {
  className?: string
  size?: 'sm' | 'md'
}

export function LiveBadge({ className, size = 'md' }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-red-600 font-bold uppercase tracking-wider text-white',
        size === 'sm' ? 'px-2 py-0.5 text-[11px] sm:text-[10px]' : 'px-2.5 py-1 text-xs',
        className
      )}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
      LIVE
    </span>
  )
}

export function UpcomingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400',
        className
      )}
    >
      UPCOMING
    </span>
  )
}
