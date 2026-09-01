import { ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";
import type { Match } from "@/lib/types";
import { ScoreRow } from "./ScoreRow";

interface CompetitionGroupProps {
  category: string;
  matches: Match[];
}

export function CompetitionGroup({ category, matches }: CompetitionGroupProps) {
  const label = category.replace(/-/g, " ");
  const live = matches.filter((m) => {
    const now = Date.now();
    const diff = now - m.date;
    return diff > 0 && diff < 3 * 60 * 60 * 1000;
  }).length;

  return (
    <section className="card overflow-hidden">
      <header className="flex items-center justify-between border-b border-line bg-surface-2/50 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Trophy className="h-4 w-4 text-muted" strokeWidth={1.75} />
          <span className="display text-[13px] font-extrabold capitalize text-ink">
            {label}
          </span>
          {live > 0 && (
            <span className="rounded-pill bg-live px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              {live} live
            </span>
          )}
          <span className="mono text-[10px] text-faint">
            · {matches.length} match{matches.length === 1 ? "" : "es"}
          </span>
        </div>
        <Link
          href={`/sports/${category}`}
          className="mono flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-2"
        >
          All
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </header>
      <div className="divide-y divide-line/60 py-1">
        {matches.map((m, i) => (
          <ScoreRow
            key={m.id}
            match={m}
            index={i}
            showCompetition={false}
          />
        ))}
      </div>
    </section>
  );
}
