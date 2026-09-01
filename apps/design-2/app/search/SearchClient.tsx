'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, Radio } from 'lucide-react'
import { useAllMatches } from '@/hooks/useMatches'
import { useSports } from '@/hooks/useSports'
import { MatchCard } from '@/components/MatchCard'
import { SportCard } from '@/components/SportCard'
import { EmptyState } from '@/components/EmptyState'
import { SearchBar } from '@/components/SearchBar'
import { SectionHeader } from '@/components/SectionHeader'

interface Props {
  initialQuery: string
}

export function SearchClient({ initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery)
  const { data: allMatches = [], isLoading: matchesLoading } = useAllMatches()
  const { data: sports = [] } = useSports()

  const filteredMatches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allMatches.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.teams?.home.name.toLowerCase().includes(q) ||
        m.teams?.away.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q),
    )
  }, [query, allMatches])

  const filteredSports = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return sports.filter((s) => s.name.toLowerCase().includes(q) || s.id.includes(q))
  }, [query, sports])

  const hasResults = filteredMatches.length > 0 || filteredSports.length > 0
  const isLoading = matchesLoading && !!query.trim()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <SectionHeader
        code="//"
        eyebrow="Signal Finder"
        title="Search"
        meta="Scan the full network for matches, teams and channels"
      />

      <div className="mb-8">
        <SearchBar
          autoFocus
          defaultValue={initialQuery}
          onSearch={setQuery}
          placeholder="Search matches, teams, channels…"
          className="w-full"
        />
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <Loader2 className="h-6 w-6 animate-spin text-[color:var(--color-neon-cyan)]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            Scanning network…
          </p>
        </div>
      )}

      {!isLoading && query && !hasResults && (
        <EmptyState
          title={`No signal for "${query}"`}
          description="Adjust your query or browse the channel directory."
          icon={<Search className="h-6 w-6 text-[color:var(--color-neon-cyan)]" />}
        />
      )}

      {!query && !isLoading && (
        <div className="glass flex flex-col items-center justify-center gap-4 rounded-[22px] py-20 text-center">
          <Radio className="h-8 w-8 text-[color:var(--color-neon-cyan)] signal-pulse" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
            Awaiting Signal
          </p>
          <p className="max-w-sm text-sm text-[color:var(--color-ink-2)]">
            Type a team, match or sport name above to scan the full broadcast index.
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {hasResults && (
          <motion.div
            key={query}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {filteredSports.length > 0 && (
              <section>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
                  &mdash;&nbsp; Channels &middot; {filteredSports.length}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {filteredSports.map((sport, i) => (
                    <SportCard key={sport.id} sport={sport} index={i} />
                  ))}
                </div>
              </section>
            )}

            {filteredMatches.length > 0 && (
              <section>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
                  &mdash;&nbsp; Matches &middot; {filteredMatches.length}
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {filteredMatches.map((match, i) => (
                    <MatchCard key={match.id} match={match} index={i} />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
