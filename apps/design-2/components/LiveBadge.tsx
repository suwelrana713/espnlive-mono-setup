import { cn } from '@/lib/utils'

interface LiveBadgeProps {
  className?: string
  size?: 'sm' | 'md'
}

export function LiveBadge({ className, size = 'md' }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[6px] border border-[color:var(--color-signal)]/60 bg-[color:var(--color-signal)]/12 font-mono uppercase tracking-[0.22em] text-[color:var(--color-signal)]',
        size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]',
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal)] signal-pulse" />
      ON&nbsp;AIR
    </span>
  )
}

export function UpcomingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[6px] border border-[color:var(--color-neon-cyan)]/45 bg-[color:var(--color-neon-cyan)]/8 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-neon-cyan-soft)]',
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-neon-cyan)]" />
      SCHEDULED
    </span>
  )
}

export function FinishedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[6px] border border-white/8 bg-white/2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-3)]',
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-ink-3)]" />
      FT
    </span>
  )
}
