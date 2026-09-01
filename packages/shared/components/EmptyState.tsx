import { Tv2 } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title = 'No matches found',
  description = 'Check back later for upcoming events.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        {icon ?? <Tv2 className="h-8 w-8 text-white/30" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white/80">{title}</h3>
      <p className="max-w-sm text-sm text-white/40">{description}</p>
    </div>
  )
}
