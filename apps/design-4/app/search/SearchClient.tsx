"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import { useAllMatches } from "@/hooks/useMatches";
import { useSports } from "@/hooks/useSports";
import { MatchTile } from "@/components/MatchTile";
import { SportBrick } from "@/components/SportBrick";
import { SearchInput } from "@/components/SearchInput";
import { EmptyBlock } from "@/components/EmptyBlock";
import { SectionBar } from "@/components/SectionBar";

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
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="border-b border-line pb-10">
        <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
          // Query · Search index
        </p>
        <h1 className="display mt-3 text-3xl sm:text-4xl md:text-[52px] font-bold leading-[0.95] text-fg sm:text-[80px]">
          Query the wire.
        </h1>
        <p className="mt-4 max-w-xl text-fg-mid">
          Match titles, team names, sport channels. Live and scheduled across
          every category.
        </p>
        <div className="mt-10 max-w-2xl">
          <SearchInput
            autoFocus
            defaultValue={initialQuery}
            onSearch={setQuery}
          />
        </div>
      </div>

      <div className="mt-14">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="h-8 w-8 animate-spin text-neon"
              strokeWidth={1.5}
            />
          </div>
        )}

        {!isLoading && query && !hasResults && (
          <EmptyBlock
            title={`No results for "${query}"`}
            description="Try a different keyword, or browse by channel instead."
            icon={<Search className="h-5 w-5" strokeWidth={1.5} />}
          />
        )}

        {!query && (
          <div className="flex flex-col items-start gap-3 rounded-panel border border-dashed border-line-2 bg-panel/40 p-10">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
              // status: awaiting query
            </span>
            <p className="display text-2xl font-bold text-fg-mid">
              Start typing to search across live and scheduled broadcasts.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {hasResults && (
            <motion.div
              key={query}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {filteredSports.length > 0 && (
                <section>
                  <SectionBar
                    code="A"
                    eyebrow="Channels matched"
                    title={`${filteredSports.length} sport${filteredSports.length === 1 ? "" : "s"}`}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {filteredSports.map((sport, i) => (
                      <SportBrick key={sport.id} sport={sport} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {filteredMatches.length > 0 && (
                <section>
                  <SectionBar
                    code="B"
                    eyebrow="Broadcasts matched"
                    title={`${filteredMatches.length} listing${filteredMatches.length === 1 ? "" : "s"}`}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredMatches.slice(0, 30).map((match, i) => (
                      <MatchTile key={match.id} match={match} index={i} />
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
