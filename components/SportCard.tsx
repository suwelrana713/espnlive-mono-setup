'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Circle, Trophy, Zap, Flame, Target, Activity,
  Dumbbell, Globe, Star, Music2, Layers, Award
} from 'lucide-react'
import type { Sport } from '@/lib/types'
import { cn } from '@/lib/utils'

const SPORT_META: Record<string, { icon: React.ReactNode; color: string; gradient: string }> = {
  football: { icon: <Circle className="h-6 w-6" />, color: 'text-emerald-400', gradient: 'from-emerald-500/20 to-emerald-900/10' },
  basketball: { icon: <Target className="h-6 w-6" />, color: 'text-orange-400', gradient: 'from-orange-500/20 to-orange-900/10' },
  'american-football': { icon: <Zap className="h-6 w-6" />, color: 'text-yellow-400', gradient: 'from-yellow-500/20 to-yellow-900/10' },
  hockey: { icon: <Activity className="h-6 w-6" />, color: 'text-blue-400', gradient: 'from-blue-500/20 to-blue-900/10' },
  baseball: { icon: <Award className="h-6 w-6" />, color: 'text-red-400', gradient: 'from-red-500/20 to-red-900/10' },
  'motor-sports': { icon: <Flame className="h-6 w-6" />, color: 'text-rose-400', gradient: 'from-rose-500/20 to-rose-900/10' },
  fight: { icon: <Dumbbell className="h-6 w-6" />, color: 'text-purple-400', gradient: 'from-purple-500/20 to-purple-900/10' },
  tennis: { icon: <Star className="h-6 w-6" />, color: 'text-lime-400', gradient: 'from-lime-500/20 to-lime-900/10' },
  rugby: { icon: <Trophy className="h-6 w-6" />, color: 'text-amber-400', gradient: 'from-amber-500/20 to-amber-900/10' },
  golf: { icon: <Globe className="h-6 w-6" />, color: 'text-teal-400', gradient: 'from-teal-500/20 to-teal-900/10' },
  billiards: { icon: <Layers className="h-6 w-6" />, color: 'text-indigo-400', gradient: 'from-indigo-500/20 to-indigo-900/10' },
  afl: { icon: <Music2 className="h-6 w-6" />, color: 'text-pink-400', gradient: 'from-pink-500/20 to-pink-900/10' },
  darts: { icon: <Target className="h-6 w-6" />, color: 'text-cyan-400', gradient: 'from-cyan-500/20 to-cyan-900/10' },
  cricket: { icon: <Trophy className="h-6 w-6" />, color: 'text-green-400', gradient: 'from-green-500/20 to-green-900/10' },
  other: { icon: <Globe className="h-6 w-6" />, color: 'text-slate-400', gradient: 'from-slate-500/20 to-slate-900/10' },
}

interface SportCardProps {
  sport: Sport
  matchCount?: number
  index?: number
}

export function SportCard({ sport, matchCount, index = 0 }: SportCardProps) {
  const meta = SPORT_META[sport.id] ?? SPORT_META.other

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <Link
        href={`/sports/${sport.id}`}
        className={cn(
          'group flex flex-col gap-3 rounded-2xl border border-white/5 bg-gradient-to-br p-5 transition-all duration-300',
          meta.gradient,
          'hover:border-white/15 hover:shadow-lg hover:shadow-black/20'
        )}
      >
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-black/20', meta.color)}>
          {meta.icon}
        </div>
        <div>
          <p className="font-semibold text-white">{sport.name}</p>
          {matchCount !== undefined && (
            <p className="mt-0.5 text-xs text-white/40">
              {matchCount} {matchCount === 1 ? 'match' : 'matches'}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
