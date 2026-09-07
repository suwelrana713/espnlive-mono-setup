import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  code: string
  eyebrow: string
  title: string
  meta?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ code, eyebrow, title, meta, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-6 flex items-end justify-between gap-3 sm:gap-4', className)}>
      <div className="flex items-start gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-neon-cyan)] tabular-nums pt-1">
          {code}
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            &mdash;&nbsp;{eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[color:var(--color-ink-1)] sm:text-3xl">
            {title}
          </h2>
          {meta && (
            <p className="mt-1 text-xs text-[color:var(--color-ink-3)]">{meta}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
