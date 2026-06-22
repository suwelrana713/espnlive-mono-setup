'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Match } from '@/lib/types'
import { MatchCard } from '@/components/MatchCard'
import { EmptyState } from '@/components/EmptyState'
import { cn } from '@/lib/utils'

interface ScheduleClientProps {
  matches: Match[]
}

function dateKey(ts: number) {
  return new Date(ts).toLocaleDateString('en-CA')
}

function formatDayHeader(dateStr: string) {
  const d = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  if (dateStr === dateKey(today.getTime())) return 'Today'
  if (dateStr === dateKey(tomorrow.getTime())) return 'Tomorrow'
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export function ScheduleClient({ matches }: ScheduleClientProps) {
  const today = dateKey(Date.now())
  const [selectedDate, setSelectedDate] = useState(today)
  const [sportFilter, setSportFilter] = useState('all')

  const grouped = useMemo(() => {
    const map: Record<string, Match[]> = {}
    for (const m of matches) {
      const k = dateKey(m.date)
      if (!map[k]) map[k] = []
      map[k].push(m)
    }
    return map
  }, [matches])

  const availableDates = useMemo(() => Object.keys(grouped).sort(), [grouped])

  const sports = useMemo(() => {
    const set = new Set(matches.map(m => m.category))
    return ['all', ...Array.from(set)]
  }, [matches])

  const dayMatches = useMemo(() => {
    const ms = grouped[selectedDate] ?? []
    if (sportFilter === 'all') return ms
    return ms.filter(m => m.category === sportFilter)
  }, [grouped, selectedDate, sportFilter])

  const currentIdx = availableDates.indexOf(selectedDate)

  function goTo(delta: number) {
    const next = availableDates[currentIdx + delta]
    if (next) setSelectedDate(next)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
            <Calendar className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Schedule</h1>
            <p className="text-sm text-white/40">Daily match schedule</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => goTo(-1)}
          disabled={currentIdx <= 0}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-white/50 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {availableDates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={cn(
                'shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition',
                selectedDate === date
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                  : 'border border-white/8 text-white/50 hover:border-white/20 hover:text-white'
              )}
            >
              {formatDayHeader(date)}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(1)}
          disabled={currentIdx >= availableDates.length - 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-white/50 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {sports.map(sport => (
          <button
            key={sport}
            onClick={() => setSportFilter(sport)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize transition',
              sportFilter === sport
                ? 'bg-white/15 text-white'
                : 'text-white/40 hover:text-white/70'
            )}
          >
            {sport === 'all' ? 'All Sports' : sport.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">{formatDayHeader(selectedDate)}</h2>
        <p className="text-sm text-white/30">{dayMatches.length} match{dayMatches.length !== 1 ? 'es' : ''}</p>
      </div>

      {dayMatches.length === 0 ? (
        <EmptyState title="No matches" description="No matches scheduled for this day." />
      ) : (
        <motion.div
          key={selectedDate + sportFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {dayMatches.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
        </motion.div>
      )}
    </div>
  )
}
