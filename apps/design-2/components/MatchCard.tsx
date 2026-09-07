'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Radio, Wifi } from 'lucide-react'
import type { Match } from '@/lib/types'
import { getMatchStatus, formatMatchDate, formatMatchTime } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MatchCardProps {
  match: Match
  index?: number
  compact?: boolean
}

const CAT_ACCENT: Record<string, string> = {
  football: 'from-emerald-400/40 via-emerald-400/0 to-transparent',
  basketball: 'from-orange-400/40 via-orange-400/0 to-transparent',
  'american-football': 'from-yellow-400/40 via-yellow-400/0 to-transparent',
  hockey: 'from-sky-400/40 via-sky-400/0 to-transparent',
  baseball: 'from-rose-400/40 via-rose-400/0 to-transparent',
  'motor-sports': 'from-red-400/40 via-red-400/0 to-transparent',
  fight: 'from-purple-400/40 via-purple-400/0 to-transparent',
  tennis: 'from-lime-400/40 via-lime-400/0 to-transparent',
  cricket: 'from-green-400/40 via-green-400/0 to-transparent',
  rugby: 'from-amber-400/40 via-amber-400/0 to-transparent',
  golf: 'from-teal-400/40 via-teal-400/0 to-transparent',
  darts: 'from-cyan-400/40 via-cyan-400/0 to-transparent',
}

export function MatchCard({ match, index = 0, compact = false }: MatchCardProps) {
  const status = getMatchStatus(match.date)
  const isLive = status === 'live'
  const isUpcoming = status === 'upcoming'
  const accent = CAT_ACCENT[match.category] ?? 'from-violet-400/40 via-violet-400/0 to-transparent'

  const home = match.teams?.home.name
  const away = match.teams?.away.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/match/${match.id}?cat=${match.category}`}
        className={cn(
          'group relative flex overflow-hidden rounded-[22px] border transition-all duration-300',
          'border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]',
          'hover:border-[color:var(--color-neon-cyan)]/35 hover:shadow-[0_0_0_1px_rgba(34,228,255,0.15),0_20px_40px_-20px_rgba(34,228,255,0.35)]',
          'hover:-translate-y-[2px]',
          compact ? 'p-3' : 'p-4'
        )}
      >
        {/* Left accent rail — category tint */}
        <span
          aria-hidden
          className={cn(
            'absolute left-0 top-0 h-full w-1 bg-gradient-to-b',
            isLive ? 'from-[color:var(--color-signal)] via-[color:var(--color-signal)]/40 to-transparent' : accent
          )}
        />

        {/* Timeline dot */}
        <div className="relative mr-4 flex flex-col items-center gap-1 pl-2">
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-mono text-[10px] uppercase tracking-[0.15em]',
              isLive
                ? 'border-[color:var(--color-signal)]/45 bg-[color:var(--color-signal)]/12 text-[color:var(--color-signal)] signal-pulse'
                : isUpcoming
                  ? 'border-[color:var(--color-neon-cyan)]/30 bg-[color:var(--color-neon-cyan)]/8 text-[color:var(--color-neon-cyan-soft)]'
                  : 'border-white/8 bg-white/4 text-[color:var(--color-ink-3)]'
            )}
          >
            {isLive ? <Radio className="h-4 w-4" /> : <span className="min-w-0 truncate">{formatMatchTime(match.date).replace(/\s/g, '')}</span>}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-ink-4)]">
            {formatMatchDate(match.date).split(' ')[1] ?? ''}
          </span>
        </div>

        {/* Content column */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">
              {match.category.replace('-', ' ')}
            </span>
            {match.popular && (
              <span className="rounded-full bg-[color:var(--color-neon-lime)]/12 px-1.5 py-px font-mono text-[9px] uppercase tracking-widest text-[color:var(--color-neon-lime)]">
                Trend
              </span>
            )}
          </div>

          {home && away ? (
            <div className="mt-1.5 flex flex-col gap-0.5">
              <p className="truncate text-sm font-semibold text-[color:var(--color-ink-1)]">{home}</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[color:var(--color-ink-4)]">vs</span>
                <p className="truncate text-sm font-semibold text-[color:var(--color-ink-1)]">{away}</p>
              </div>
            </div>
          ) : (
            <p className="mt-1.5 line-clamp-2 text-sm font-semibold text-[color:var(--color-ink-1)]">
              {match.title}
            </p>
          )}

          <div className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-ink-3)]">
            <span className="inline-flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              {match.sources.length}&nbsp;src
            </span>
            <span aria-hidden className="h-3 w-px bg-white/8" />
            <span>{formatMatchDate(match.date)}</span>
          </div>
        </div>

        {/* Chevron reveal */}
        <div className="ml-3 flex items-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/6 bg-white/3 text-[color:var(--color-ink-3)] transition group-hover:border-[color:var(--color-neon-cyan)]/45 group-hover:bg-[color:var(--color-neon-cyan)]/10 group-hover:text-[color:var(--color-neon-cyan)]">
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
