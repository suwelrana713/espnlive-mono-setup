"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import type { Match } from "@/lib/types";
import { EmptyState } from "@/components/EmptyState";
import { MatchesLoadMore } from "@/components/MatchesLoadMore";
import { SectionTitle } from "@/components/SectionTitle";
import { cn } from "@/lib/utils";

interface ScheduleClientProps {
  matches: Match[];
}

function dateKey(ts: number) {
  return new Date(ts).toLocaleDateString("en-CA");
}

function shortLabel(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (dateStr === dateKey(today.getTime())) return "Today";
  if (dateStr === dateKey(tomorrow.getTime())) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

function longLabel(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ScheduleClient({ matches }: ScheduleClientProps) {
  const today = dateKey(Date.now());
  const [selected, setSelected] = useState(today);
  const [sportFilter, setSportFilter] = useState("all");

  const grouped = useMemo(() => {
    const map: Record<string, Match[]> = {};
    for (const m of matches) {
      const k = dateKey(m.date);
      if (!map[k]) map[k] = [];
      map[k].push(m);
    }
    return map;
  }, [matches]);

  const availableDates = useMemo(() => Object.keys(grouped).sort(), [grouped]);
  const sports = useMemo(() => {
    const set = new Set(matches.map((m) => m.category));
    return ["all", ...Array.from(set)];
  }, [matches]);

  const dayMatches = useMemo(() => {
    const ms = grouped[selected] ?? [];
    if (sportFilter === "all") return ms;
    return ms.filter((m) => m.category === sportFilter);
  }, [grouped, selected, sportFilter]);

  const idx = availableDates.indexOf(selected);
  const goto = (delta: number) => {
    const next = availableDates[idx + delta];
    if (next) setSelected(next);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
          Schedule
        </span>
        <h1 className="display mt-3 text-[32px] font-extrabold leading-[1.05] text-ink sm:text-[42px]">
          The week ahead.
        </h1>
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted" strokeWidth={1.75} />
          <span className="label !text-muted">Pick a day</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => goto(-1)}
            disabled={idx <= 0}
            aria-label="Previous"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>

          <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
            {availableDates.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelected(d)}
                className={cn(
                  "shrink-0 rounded-md border px-3 py-2 text-center transition",
                  selected === d
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-surface text-ink-2 hover:border-primary/40",
                )}
              >
                <div className="mono text-[10px] uppercase tracking-widest opacity-70">
                  {new Date(d).toLocaleDateString("en-US", { month: "short" })}
                </div>
                <div className="numeric text-[16px] font-extrabold leading-none">
                  {new Date(d).getDate()}
                </div>
                <div className="mono mt-0.5 text-[10px] opacity-70">
                  {shortLabel(d)}
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goto(1)}
            disabled={idx >= availableDates.length - 1}
            aria-label="Next"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          <Filter className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
          <span className="label !text-muted">Filter</span>
          <div className="flex flex-wrap gap-1.5">
            {sports.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSportFilter(s)}
                className={cn(
                  "rounded-pill px-2.5 py-0.5 text-[11px] font-semibold capitalize transition",
                  sportFilter === s
                    ? "bg-ink text-white"
                    : "border border-line bg-surface text-ink-2 hover:border-primary/40",
                )}
              >
                {s === "all" ? "All sports" : s.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <SectionTitle
        title={longLabel(selected)}
        subtitle={`${dayMatches.length} match${dayMatches.length === 1 ? "" : "es"}`}
        accent="primary"
      />

      {dayMatches.length === 0 ? (
        <EmptyState
          title="No matches this day"
          description="Try another day or lift the sport filter."
        />
      ) : (
        <motion.div
          key={selected + sportFilter}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MatchesLoadMore
            key={selected + sportFilter}
            matches={dayMatches}
            step={12}
          />
        </motion.div>
      )}
    </div>
  );
}
