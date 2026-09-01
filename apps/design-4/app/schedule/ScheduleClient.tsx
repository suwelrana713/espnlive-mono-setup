"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Match } from "@/lib/types";
import { EmptyBlock } from "@/components/EmptyBlock";
import { MatchesLoadMore } from "@/components/MatchesLoadMore";
import { cn } from "@/lib/utils";

interface ScheduleClientProps {
  matches: Match[];
}

function dateKey(ts: number) {
  return new Date(ts).toLocaleDateString("en-CA");
}

function shortDay(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (dateStr === dateKey(today.getTime())) return "Today";
  if (dateStr === dateKey(tomorrow.getTime())) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
}

function longDay(dateStr: string) {
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
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="border-b border-line pb-8">
        <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
          // Schedule · By date
        </p>
        <h1 className="display mt-3 text-[44px] font-bold leading-[0.95] text-fg sm:text-[68px]">
          The week ahead.
        </h1>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goto(-1)}
            disabled={idx <= 0}
            aria-label="Previous"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tag border border-line-2 bg-panel text-fg-mid transition hover:border-neon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
            {availableDates.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelected(d)}
                className={cn(
                  "shrink-0 rounded-tag border px-4 py-2 text-left transition",
                  selected === d
                    ? "border-neon bg-neon/10 text-fg shadow-[0_0_0_1px_rgba(0,229,255,0.35)]"
                    : "border-line-2 bg-panel text-fg-mid hover:border-neon/60 hover:text-fg",
                )}
              >
                <div className="mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                  {new Date(d).toLocaleDateString("en-US", { month: "short" })}
                </div>
                <div className="display text-[16px] font-bold leading-none">
                  {shortDay(d)}
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goto(1)}
            disabled={idx >= availableDates.length - 1}
            aria-label="Next"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tag border border-line-2 bg-panel text-fg-mid transition hover:border-neon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
            Filter
          </span>
          {sports.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSportFilter(s)}
              className={cn(
                "mono rounded-pill px-3 py-1 text-[11px] font-bold uppercase tracking-widest transition",
                sportFilter === s
                  ? "bg-neon text-void"
                  : "border border-line-2 bg-panel-2 text-fg-mid hover:border-neon hover:text-fg",
              )}
            >
              {s === "all" ? "All" : s.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-baseline justify-between border-b border-line pb-5">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
            Selected day
          </p>
          <h2 className="display mt-1 text-[28px] font-bold text-fg sm:text-[36px]">
            {longDay(selected)}
          </h2>
        </div>
        <p className="mono text-[11px] tabular-nums uppercase tracking-[0.22em] text-fg-mid">
          {String(dayMatches.length).padStart(3, "0")} broadcasts
        </p>
      </div>

      {dayMatches.length === 0 ? (
        <div className="mt-8">
          <EmptyBlock
            title="No broadcasts scheduled"
            description="Try another day or lift the sport filter."
          />
        </div>
      ) : (
        <motion.div
          key={selected + sportFilter}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
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
