'use client'

import { motion } from 'framer-motion'
import { Signal, Users } from 'lucide-react'
import type { Stream } from '@/lib/types'
import { cn } from '@/lib/utils'

interface StreamCardProps {
  stream: Stream
  selected?: boolean
  onClick?: () => void
  index?: number
}

export function StreamCard({ stream, selected, onClick, index = 0 }: StreamCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'group relative flex w-full items-center gap-3 overflow-hidden rounded-[14px] border p-3 text-left transition-all duration-200',
        selected
          ? 'border-[color:var(--color-neon-cyan)]/55 bg-[color:var(--color-neon-cyan)]/8 shadow-[0_0_0_1px_rgba(34,228,255,0.25),0_10px_28px_-12px_rgba(34,228,255,0.5)]'
          : 'border-white/6 bg-white/2 hover:border-white/16 hover:bg-white/4'
      )}
    >
      {/* channel # */}
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] tabular-nums',
          selected
            ? 'border-[color:var(--color-neon-cyan)]/50 bg-[color:var(--color-neon-cyan)]/12 text-[color:var(--color-neon-cyan)]'
            : 'border-white/8 bg-white/4 text-[color:var(--color-ink-2)]'
        )}
      >
        {String(stream.streamNo).padStart(2, '0')}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-[color:var(--color-ink-1)] capitalize">
            {stream.language || 'Feed'}
          </p>
          <span
            className={cn(
              'rounded-[4px] px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.18em]',
              stream.hd
                ? 'bg-[color:var(--color-neon-lime)]/15 text-[color:var(--color-neon-lime)]'
                : 'bg-white/6 text-[color:var(--color-ink-3)]'
            )}
          >
            {stream.hd ? 'HD' : 'SD'}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-3)]">
          <span className="inline-flex items-center gap-1">
            <Signal className="h-3 w-3" />
            {stream.source}
          </span>
          {stream.viewers > 0 && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" />
              {stream.viewers.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {selected && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--color-neon-cyan)]/15">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-neon-cyan)]" />
        </div>
      )}
    </motion.button>
  )
}
