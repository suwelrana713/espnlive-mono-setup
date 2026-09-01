"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Match } from "@/lib/types";
import { EmptyPanel } from "@/components/EmptyPanel";
import { MatchesLoadMore } from "@/components/MatchesLoadMore";
import { cn } from "@/lib/utils";

interface ScheduleClientProps {
  matches: Match[];
}

function dateKey(ts: number) {
  return new Date(ts).toLocaleDateString("en-CA");
}

function formatDayLabel(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (dateStr === dateKey(today.getTime())) return "Today";
  if (dateStr === dateKey(tomorrow.getTime())) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
}

function formatFullDay(dateStr: string) {
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

  const availableDates = useMemo(
    () => Object.keys(grouped).sort(),
    [grouped],
  );
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
    <div className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8">
      <div className="border-b border-hairline pb-10">
        <p className="eyebrow">Schedule · By date</p>
        <h1 className="serif mt-3 text-[44px] font-black leading-[0.95] tracking-tight text-ink sm:text-[68px]">
          The week ahead.
        </h1>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goto(-1)}
            disabled={idx <= 0}
            aria-label="Previous day"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-hairline text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
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
                  "shrink-0 border px-4 py-2 text-left transition",
                  selected === d
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline bg-panel text-ink hover:border-ink",
                )}
              >
                <div className="mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                  {new Date(d).toLocaleDateString("en-US", { month: "short" })}
                </div>
                <div className="serif text-[18px] font-semibold leading-none">
                  {formatDayLabel(d)}
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goto(1)}
            disabled={idx >= availableDates.length - 1}
            aria-label="Next day"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-hairline text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-faint">
            Filter
          </span>
          {sports.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSportFilter(s)}
              className={cn(
                "rounded-pill px-3 py-1 text-[12px] font-medium capitalize transition",
                sportFilter === s
                  ? "bg-ink text-paper"
                  : "border border-hairline text-ink-2 hover:border-ink",
              )}
            >
              {s === "all" ? "All sports" : s.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-baseline justify-between border-b border-hairline pb-5">
        <div>
          <p className="eyebrow">Day</p>
          <h2 className="serif mt-2 text-[28px] font-black text-ink sm:text-[36px]">
            {formatFullDay(selected)}
          </h2>
        </div>
        <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {dayMatches.length}{" "}
          {dayMatches.length === 1 ? "listing" : "listings"}
        </p>
      </div>

      {dayMatches.length === 0 ? (
        <div className="mt-8">
          <EmptyPanel
            title="No matches scheduled"
            description="Try another day or lift the sport filter."
          />
        </div>
      ) : (
        <motion.div
          key={selected + sportFilter}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
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
