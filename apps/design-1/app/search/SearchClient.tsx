'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { useAllMatches } from '@/hooks/useMatches'
import { useSports } from '@/hooks/useSports'
import { MatchCard } from '@/components/MatchCard'
import { SportCard } from '@/components/SportCard'
import { EmptyState } from '@/components/EmptyState'
import { SearchBar } from '@/components/SearchBar'

interface SearchClientProps {
  initialQuery: string
}

export function SearchClient({ initialQuery }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery)
  const { data: allMatches = [], isLoading: matchesLoading } = useAllMatches()
  const { data: sports = [] } = useSports()

  const filteredMatches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allMatches.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.teams?.home.name.toLowerCase().includes(q) ||
      m.teams?.away.name.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    )
  }, [query, allMatches])

  const filteredSports = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return sports.filter(s => s.name.toLowerCase().includes(q) || s.id.includes(q))
  }, [query, sports])

  const hasResults = filteredMatches.length > 0 || filteredSports.length > 0
  const isLoading = matchesLoading && !!query.trim()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-black text-white">Search</h1>
        <SearchBar
          autoFocus
          defaultValue={initialQuery}
          onSearch={setQuery}
          placeholder="Search matches, teams, sports…"
          className="w-full"
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-white/30" />
        </div>
      )}

      {!isLoading && query && !hasResults && (
        <EmptyState
          title={`No results for "${query}"`}
          description="Try a different search term or browse by sport."
          icon={<Search className="h-8 w-8 text-white/30" />}
        />
      )}

      {!query && (
        <div className="text-center py-20">
          <Search className="mx-auto mb-4 h-12 w-12 text-white/10" />
          <p className="text-white/30">Start typing to search</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {hasResults && (
          <motion.div
            key={query}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {filteredSports.length > 0 && (
              <section>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                  Sports ({filteredSports.length})
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {filteredSports.map((sport, i) => (
                    <SportCard key={sport.id} sport={sport} index={i} />
                  ))}
                </div>
              </section>
            )}

            {filteredMatches.length > 0 && (
              <section>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                  Matches ({filteredMatches.length})
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
