"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import { useAllMatches } from "@/hooks/useMatches";
import { useSports } from "@/hooks/useSports";
import { ScoreRow } from "@/components/ScoreRow";
import { SportTile } from "@/components/SportGrid";
import { SearchBox } from "@/components/SearchBox";
import { EmptyState } from "@/components/EmptyState";
import { SectionTitle } from "@/components/SectionTitle";

interface SearchClientProps {
  initialQuery: string;
}

export function SearchClient({ initialQuery }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const { data: allMatches = [], isLoading: matchesLoading } = useAllMatches();
  const { data: sports = [] } = useSports();

  const filteredMatches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allMatches.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.teams?.home.name.toLowerCase().includes(q) ||
        m.teams?.away.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q),
    );
  }, [query, allMatches]);

  const filteredSports = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return sports.filter(
      (s) => s.name.toLowerCase().includes(q) || s.id.includes(q),
    );
  }, [query, sports]);

  const hasResults = filteredMatches.length > 0 || filteredSports.length > 0;
  const isLoading = matchesLoading && !!query.trim();

  return (
    <div className="space-y-8">
      <div>
        <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
          Search
        </span>
        <h1 className="display mt-3 text-[32px] font-extrabold leading-[1.05] text-ink sm:text-[42px]">
          Find any match.
        </h1>
        <p className="mt-2 max-w-xl text-[14px] text-muted">
          Search across match titles, team names, and sport channels. Live and
          scheduled results.
        </p>
        <div className="mt-6 max-w-2xl">
          <SearchBox
            autoFocus
            defaultValue={initialQuery}
            onSearch={setQuery}
          />
        </div>
      </div>

      <div>
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" strokeWidth={1.75} />
          </div>
        )}

        {!isLoading && query && !hasResults && (
          <EmptyState
            title={`No results for "${query}"`}
            description="Try a different keyword, or browse by sport instead."
            icon={<Search className="h-5 w-5" strokeWidth={1.5} />}
          />
        )}

        {!query && (
          <div className="card flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <Search
              className="mb-2 h-10 w-10 text-line-2"
              strokeWidth={1.5}
            />
            <p className="display text-[16px] font-extrabold text-ink">
              Start typing to search
            </p>
            <p className="text-[13px] text-muted">
              Live matches, scheduled fixtures, sport channels.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {hasResults && (
            <motion.div
              key={query}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {filteredSports.length > 0 && (
                <section>
                  <SectionTitle
                    title={`Sports · ${filteredSports.length}`}
                    accent="warn"
                  />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSports.map((sport, i) => (
                      <SportTile key={sport.id} sport={sport} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {filteredMatches.length > 0 && (
                <section>
                  <SectionTitle
                    title={`Matches · ${filteredMatches.length}`}
                    accent="primary"
                  />
                  <div className="card divide-y divide-line/60">
                    {filteredMatches.slice(0, 40).map((match, i) => (
                      <ScoreRow key={match.id} match={match} index={i} />
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
