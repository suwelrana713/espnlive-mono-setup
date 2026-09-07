'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, CalendarClock } from 'lucide-react'
import type { Match } from '@/lib/types'
import { EmptyState } from '@/components/EmptyState'
import { MatchesLoadMore } from '@/components/MatchesLoadMore'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/lib/utils'

function dateKey(ts: number) {
  return new Date(ts).toLocaleDateString('en-CA')
}

function formatDayHeader(dateStr: string, today: string, tomorrow: string) {
  if (dateStr === today) return 'Today'
  if (dateStr === tomorrow) return 'Tomorrow'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function dayChipLabel(dateStr: string, today: string, tomorrow: string) {
  if (dateStr === today) return { top: 'TODAY', bot: '—' }
  if (dateStr === tomorrow) return { top: 'TOM', bot: '+1' }
  const d = new Date(dateStr)
  return {
    top: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    bot: d.getDate().toString().padStart(2, '0'),
  }
}

interface Props {
  matches: Match[]
}

export function ScheduleClient({ matches }: Props) {
  const [today, setToday] = useState('')
  const [tomorrow, setTomorrow] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [sportFilter, setSportFilter] = useState('all')

  useEffect(() => {
    const now = Date.now()
    const t = dateKey(now)
    const tm = dateKey(now + 86_400_000)
    setToday(t)
    setTomorrow(tm)
    setSelectedDate((prev) => prev || t)
  }, [])

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
    const set = new Set(matches.map((m) => m.category))
    return ['all', ...Array.from(set)]
  }, [matches])

  const dayMatches = useMemo(() => {
    if (!selectedDate) return []
    const ms = grouped[selectedDate] ?? []
    if (sportFilter === 'all') return ms
    return ms.filter((m) => m.category === sportFilter)
  }, [grouped, selectedDate, sportFilter])

  const currentIdx = availableDates.indexOf(selectedDate)

  function goTo(delta: number) {
    const next = availableDates[currentIdx + delta]
    if (next) setSelectedDate(next)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <SectionHeader
        code="//"
        eyebrow="Broadcast Grid"
        title="Programme Schedule"
        meta="Daily fixture calendar across every channel"
      />

      {/* Day rail */}
      <div className="glass mb-4 flex items-stretch overflow-hidden rounded-[22px]">
        <button
          type="button"
          aria-label="Previous day"
          onClick={() => goTo(-1)}
          disabled={currentIdx <= 0}
          className="flex w-12 shrink-0 items-center justify-center border-r border-white/6 text-[color:var(--color-ink-3)] transition hover:bg-white/3 hover:text-[color:var(--color-neon-cyan)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex flex-1 flex-nowrap gap-1 overflow-x-auto p-2">
          {availableDates.map((date) => {
            const label = dayChipLabel(date, today, tomorrow)
            const active = selectedDate === date
            return (
              <button
                type="button"
                key={date}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  'group relative flex min-w-[56px] sm:min-w-[68px] shrink-0 flex-col items-center justify-center rounded-[14px] border px-3 py-2 transition',
                  active
                    ? 'border-[color:var(--color-neon-cyan)]/50 bg-[color:var(--color-neon-cyan)]/10 text-[color:var(--color-neon-cyan)] shadow-[0_0_0_1px_rgba(34,228,255,0.2)]'
                    : 'border-white/6 bg-white/2 text-[color:var(--color-ink-2)] hover:border-white/16 hover:text-[color:var(--color-ink-1)]',
                )}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.25em]">{label.top}</span>
                <span className="mt-0.5 font-mono text-lg leading-none tabular-nums">
                  {label.bot}
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-1/2 h-px w-6 -translate-x-1/2 bg-[color:var(--color-neon-cyan)] shadow-[0_0_10px_rgba(34,228,255,0.6)]"
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          aria-label="Next day"
          onClick={() => goTo(1)}
          disabled={currentIdx >= availableDates.length - 1}
          className="flex w-12 shrink-0 items-center justify-center border-l border-white/6 text-[color:var(--color-ink-3)] transition hover:bg-white/3 hover:text-[color:var(--color-neon-cyan)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Sport filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {sports.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSportFilter(s)}
            className={cn(
              'rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition',
              sportFilter === s
                ? 'bg-[color:var(--color-neon-magenta)]/15 text-[color:var(--color-neon-magenta)] shadow-[0_0_0_1px_rgba(255,43,214,0.35)]'
                : 'border border-white/6 bg-white/2 text-[color:var(--color-ink-3)] hover:border-white/16 hover:text-[color:var(--color-ink-1)]',
            )}
          >
            {s === 'all' ? 'All Sports' : s.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* Day header */}
      <div className="mb-6 flex items-baseline gap-3">
        <CalendarClock className="h-5 w-5 text-[color:var(--color-neon-cyan)]" />
        <h2 className="text-xl font-semibold text-[color:var(--color-ink-1)]" suppressHydrationWarning>
          {selectedDate ? formatDayHeader(selectedDate, today, tomorrow) : '—'}
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)] tabular-nums">
          {dayMatches.length.toString().padStart(2, '0')} feed{dayMatches.length !== 1 ? 's' : ''}
        </span>
      </div>

      {dayMatches.length === 0 ? (
        <EmptyState title="Off air" description="No broadcasts scheduled for this day." />
      ) : (
        <motion.div
          key={selectedDate + sportFilter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MatchesLoadMore
            key={selectedDate + sportFilter}
            matches={dayMatches}
            step={12}
          />
        </motion.div>
      )}
    </div>
  )
}
