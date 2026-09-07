'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight, Users } from 'lucide-react'
import type { Match } from '@/lib/types'
import { getMatchStatus, formatMatchDate, formatMatchTime } from '@/lib/types'
import { getBadgeUrl, cn } from '@/lib/utils'
import { LiveBadge, UpcomingBadge } from './LiveBadge'

interface MatchCardProps {
  match: Match
  index?: number
  compact?: boolean
}

function TeamDisplay({ name, badge, align = 'left' }: { name: string; badge: string; align?: 'left' | 'right' }) {
  return (
    <div className={cn('flex flex-1 items-center gap-2.5 min-w-0', align === 'right' && 'flex-row-reverse')}>
      <div className="relative h-9 w-9 shrink-0">
        <Image
          src={getBadgeUrl(badge)}
          alt={name}
          fill
          className="object-contain"
          unoptimized
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
      <span className={cn('line-clamp-2 sm:line-clamp-1 min-w-0 flex-1 text-sm font-semibold text-white', align === 'right' && 'text-right')}>
        {name}
      </span>
    </div>
  )
}

export function MatchCard({ match, index = 0, compact = false }: MatchCardProps) {
  const status = getMatchStatus(match.date)
  const isLive = status === 'live'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ scale: 1.01, y: -1 }}
    >
      <Link
        href={`/match/${match.id}?cat=${match.category}`}
        className={cn(
          'group relative flex flex-col gap-3 overflow-hidden rounded-2xl border p-4 transition-all duration-300',
          isLive
            ? 'border-red-500/20 bg-gradient-to-br from-red-950/20 to-black/40 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-950/30'
            : 'border-white/5 bg-white/2 hover:border-white/12 hover:bg-white/4 hover:shadow-lg hover:shadow-black/20',
          compact && 'gap-2 p-3'
        )}
      >
        {isLive && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent" />
        )}

        <div className="flex items-center justify-between">
          {isLive ? (
            <LiveBadge size="sm" />
          ) : status === 'upcoming' ? (
            <UpcomingBadge />
          ) : (
            <span className="text-xs text-white/30">Finished</span>
          )}
          <span className="flex items-center gap-1 text-xs text-white/30 capitalize">
            {match.category.replace('-', ' ')}
          </span>
        </div>

        {match.teams ? (
          <div className="flex items-center gap-2">
            <TeamDisplay name={match.teams.home.name} badge={match.teams.home.badge} />
            <div className="flex h-8 w-14 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-bold text-white/60">
              {isLive ? '● ●' : 'VS'}
            </div>
            <TeamDisplay name={match.teams.away.name} badge={match.teams.away.badge} align="right" />
          </div>
        ) : (
          <p className="text-sm font-semibold text-white line-clamp-2">{match.title}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Calendar className="h-3 w-3" />
            {formatMatchDate(match.date)} · {formatMatchTime(match.date)}
          </div>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Users className="h-3 w-3" />
            {match.sources.length} {match.sources.length === 1 ? 'stream' : 'streams'}
          </div>
        </div>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 md:opacity-0 transition-opacity md:group-hover:opacity-100">
          <ChevronRight className="h-4 w-4 text-white/30" />
        </div>
      </Link>
    </motion.div>
  )
}
