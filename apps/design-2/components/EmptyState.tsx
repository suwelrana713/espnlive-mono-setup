import { Radio } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = 'Signal lost',
  description = 'No broadcast on this channel right now.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="glass relative flex flex-col items-center justify-center overflow-hidden rounded-[22px] py-20 text-center">
      <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_10px)] pointer-events-none" />
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-[color:var(--color-panel)]">
        {icon ?? <Radio className="h-6 w-6 text-[color:var(--color-neon-cyan)]" />}
      </div>
      <p className="relative font-mono text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-ink-3)]">
        &mdash;&nbsp; no&nbsp;feed &nbsp;&mdash;
      </p>
      <h3 className="relative mt-3 text-lg font-semibold text-[color:var(--color-ink-1)]">{title}</h3>
      <p className="relative mt-1 max-w-sm text-sm text-[color:var(--color-ink-2)]">{description}</p>
    </div>
  )
}
