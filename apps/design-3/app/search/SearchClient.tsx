"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import { useAllMatches } from "@/hooks/useMatches";
import { useSports } from "@/hooks/useSports";
import { MatchRow } from "@/components/MatchRow";
import { SportTile } from "@/components/SportTile";
import { SearchField } from "@/components/SearchField";
import { EmptyPanel } from "@/components/EmptyPanel";
import { Eyebrow } from "@/components/Eyebrow";

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
    <div className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8">
      <div className="max-w-3xl">
        <p className="eyebrow">Find</p>
        <h1 className="serif mt-3 text-3xl sm:text-4xl md:text-[52px] font-black leading-[0.95] tracking-tight text-ink sm:text-[80px]">
          Search the wire.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Match titles, team names, sport names. Live and upcoming across all
          categories.
        </p>
        <div className="mt-10">
          <SearchField
            autoFocus
            defaultValue={initialQuery}
            onSearch={setQuery}
            placeholder="Try “Real Madrid”, “tennis”, “Lakers”…"
          />
        </div>
      </div>

      <div className="mt-16">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="h-8 w-8 animate-spin text-muted"
              strokeWidth={1.5}
            />
          </div>
        )}

        {!isLoading && query && !hasResults && (
          <EmptyPanel
            title={`No results for "${query}"`}
            description="Try a different keyword, or browse by sport instead."
            icon={<Search className="h-5 w-5" strokeWidth={1.5} />}
          />
        )}

        {!query && (
          <div className="flex flex-col items-start gap-3 border-t border-hairline pt-12">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-faint">
              // Awaiting input
            </span>
            <p className="serif text-2xl text-muted">
              Start typing to search across live matches and sport categories.
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
                  <Eyebrow number="A">
                    Sports · {filteredSports.length}
                  </Eyebrow>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {filteredSports.map((sport, i) => (
                      <SportTile key={sport.id} sport={sport} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {filteredMatches.length > 0 && (
                <section>
                  <Eyebrow number="B">
                    Matches · {filteredMatches.length}
                  </Eyebrow>
                  <div className="mt-4 border-t border-hairline">
                    {filteredMatches.slice(0, 40).map((match, i) => (
                      <MatchRow key={match.id} match={match} index={i} />
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
