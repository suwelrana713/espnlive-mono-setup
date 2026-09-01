"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Match } from "@/lib/types";
import { formatMatchDate, formatMatchTime, getMatchStatus } from "@/lib/types";
import { getBadgeUrl, getPosterUrl } from "@/lib/utils";
import { StatusChip, LiveDot } from "./StatusChip";

interface ScoreHeroProps {
  matches: Match[];
}

export function ScoreHero({ matches }: ScoreHeroProps) {
  const [idx, setIdx] = useState(0);
  const total = matches.length;

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6500);
    return () => clearInterval(t);
  }, [total]);

  if (!total) return null;
  const match = matches[idx];
  const status = getMatchStatus(match.date);
  const isLive = status === "live";
  const home = match.teams?.home;
  const away = match.teams?.away;

  const go = (delta: number) => setIdx((i) => (i + delta + total) % total);

  return (
    <section className="brackets relative overflow-hidden bg-panel">
      <div className="grid-backdrop absolute inset-0 opacity-40" />
      {match.poster && (
        <Image
          src={getPosterUrl(match.poster)}
          alt=""
          fill
          className="object-cover opacity-15"
          unoptimized
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/70 to-void" />

      <div className="relative flex flex-col gap-6 p-6 sm:p-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <StatusChip status={status} />
            <span className="mono text-[11px] uppercase tracking-[0.24em] text-fg-dim">
              CH · {match.category.replace(/-/g, " ")}
            </span>
          </div>
          {total > 1 && (
            <div className="flex items-center gap-2">
              <span className="mono text-[11px] tabular-nums text-fg-dim">
                {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => go(-1)}
                  className="flex h-8 w-8 items-center justify-center rounded-tag border border-line-2 bg-panel-2 text-fg-mid transition hover:border-neon hover:text-fg"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => go(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-tag border border-line-2 bg-panel-2 text-fg-mid transition hover:border-neon hover:text-fg"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={match.id + idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6"
          >
            {home && away ? (
              <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
                <TeamBlock team={home} align="left" />
                <div className="flex flex-col items-center gap-2">
                  <span className="tag text-fg-faint">
                    {isLive ? "SCORE" : "KICK-OFF"}
                  </span>
                  <div
                    className={
                      isLive
                        ? "mono rounded-tag border-2 border-live bg-live/10 px-6 py-3 text-[48px] font-bold leading-none text-live sm:text-[72px]"
                        : "mono rounded-tag border-2 border-neon/40 bg-panel-2 px-6 py-3 text-[48px] font-bold leading-none text-fg sm:text-[72px]"
                    }
                  >
                    {isLive ? "LIVE" : formatMatchTime(match.date)}
                  </div>
                  <span className="mono text-[11px] tracking-[0.22em] text-fg-dim">
                    {formatMatchDate(match.date)}
                  </span>
                </div>
                <TeamBlock team={away} align="right" />
              </div>
            ) : (
              <h1 className="display max-w-3xl text-3xl font-bold leading-tight text-fg sm:text-5xl">
                {match.title}
              </h1>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <Link
                href={`/match/${match.id}?cat=${match.category}`}
                className="group mono inline-flex items-center gap-3 rounded-tag border border-neon bg-neon px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-void transition hover:bg-transparent hover:text-neon"
              >
                <Play className="h-4 w-4" fill="currentColor" />
                {isLive ? "Tune in" : "Open channel"}
              </Link>
              <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim">
                <LiveDot className={isLive ? "" : "!bg-fg-faint !animate-none"} />
                {match.sources.length} mirror{match.sources.length === 1 ? "" : "s"}
              </div>
              <span className="mono ml-auto rounded-tag border border-line-2 bg-panel-2 px-3 py-1.5 text-[11px] text-fg-dim">
                ID · {match.id.slice(0, 10)}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TeamBlock({
  team,
  align,
}: {
  team: { name: string; badge: string };
  align: "left" | "right";
}) {
  return (
    <div
      className={
        align === "left"
          ? "flex items-center gap-4"
          : "flex flex-row-reverse items-center gap-4 text-right sm:flex-row"
      }
    >
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-tag border border-line-2 bg-panel-2">
        <Image
          src={getBadgeUrl(team.badge)}
          alt={team.name}
          fill
          className="object-contain p-2"
          unoptimized
          onError={(e) => {
            (e.target as HTMLImageElement).style.visibility = "hidden";
          }}
        />
      </span>
      <div className={align === "right" ? "text-right sm:text-left" : ""}>
        <span className="tag text-fg-faint">Home / Away</span>
        <p className="display mt-1 text-2xl font-bold leading-tight text-fg sm:text-4xl">
          {team.name}
        </p>
      </div>
    </div>
  );
}
