'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Circle, Trophy, Zap, Flame, Target, Activity,
  Dumbbell, Globe, Star, Music2, Layers, Award,
} from 'lucide-react'
import type { Sport } from '@/lib/types'
import { cn } from '@/lib/utils'

const SPORT_ICON: Record<string, React.ReactNode> = {
  football: <Circle className="h-5 w-5" />,
  basketball: <Target className="h-5 w-5" />,
  'american-football': <Zap className="h-5 w-5" />,
  hockey: <Activity className="h-5 w-5" />,
  baseball: <Award className="h-5 w-5" />,
  'motor-sports': <Flame className="h-5 w-5" />,
  fight: <Dumbbell className="h-5 w-5" />,
  tennis: <Star className="h-5 w-5" />,
  rugby: <Trophy className="h-5 w-5" />,
  golf: <Globe className="h-5 w-5" />,
  billiards: <Layers className="h-5 w-5" />,
  afl: <Music2 className="h-5 w-5" />,
  darts: <Target className="h-5 w-5" />,
  cricket: <Trophy className="h-5 w-5" />,
  other: <Globe className="h-5 w-5" />,
}

interface SportCardProps {
  sport: Sport
  matchCount?: number
  index?: number
}

export function SportCard({ sport, matchCount, index = 0 }: SportCardProps) {
  const icon = SPORT_ICON[sport.id] ?? SPORT_ICON.other
  const hasCount = typeof matchCount === 'number'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/sports/${sport.id}`}
        className={cn(
          'group relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-5 transition-all duration-300',
          'hover:border-[color:var(--color-neon-magenta)]/40 hover:-translate-y-1',
          'hover:shadow-[0_20px_40px_-20px_rgba(255,43,214,0.4)]'
        )}
      >
        {/* corner glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[color:var(--color-neon-magenta)]/0 blur-2xl transition-all duration-500 group-hover:bg-[color:var(--color-neon-magenta)]/25"
        />

        <div className="relative flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/4 text-[color:var(--color-ink-1)] transition group-hover:border-[color:var(--color-neon-cyan)]/40 group-hover:text-[color:var(--color-neon-cyan)]">
            {icon}
          </div>
          {hasCount && (
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-4)]">
                Feeds
              </p>
              <p className="font-mono text-2xl leading-none text-[color:var(--color-ink-1)] tabular-nums">
                {matchCount!.toString().padStart(2, '0')}
              </p>
            </div>
          )}
        </div>

        <div className="relative mt-6">
          <p className="text-base font-semibold text-[color:var(--color-ink-1)] capitalize">
            {sport.name}
          </p>
          <div className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">
            <span className="h-px flex-1 bg-white/8" />
            <span>Channel</span>
            <span>/{sport.id}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
