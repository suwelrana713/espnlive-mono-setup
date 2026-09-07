"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Radio,
  Trophy,
} from "lucide-react";
import type { Match } from "@/lib/types";
import { formatMatchDate, formatMatchTime, getMatchStatus } from "@/lib/types";
import { getBadgeUrl } from "@/lib/utils";
import { LiveDot, StatusPill } from "./StatusPill";

interface ScoreCardHeroProps {
  matches: Match[];
}

export function ScoreCardHero({ matches }: ScoreCardHeroProps) {
  const [idx, setIdx] = useState(0);
  const total = matches.length;

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 7000);
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
    <section className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line bg-surface-2/70 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <Trophy className="h-4 w-4 text-muted" strokeWidth={1.75} />
          <span className="mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Featured · {match.category.replace(/-/g, " ")}
          </span>
        </div>
        {total > 1 && (
          <div className="flex items-center gap-2">
            <span className="mono text-[11px] tabular-nums text-muted">
              {idx + 1} / {total}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => go(-1)}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-ink-2 transition hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => go(1)}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-ink-2 transition hover:border-primary hover:text-primary"
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 p-6 sm:p-8"
        >
          <div className="flex items-center justify-between gap-3">
            <StatusPill status={status} />
            <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {formatMatchDate(match.date)}
            </span>
          </div>

          {home && away ? (
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <TeamBlock team={home} align="left" />
              <div className="flex flex-col items-center gap-1">
                {isLive ? (
                  <>
                    <span className="numeric text-[10px] font-bold uppercase tracking-widest text-live">
                      In progress
                    </span>
                    <div className="numeric flex items-center gap-2 text-[28px] font-extrabold text-ink sm:text-[42px] md:text-[56px]">
                      <span>—</span>
                      <span className="text-faint">:</span>
                      <span>—</span>
                    </div>
                    <span className="mono flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-live">
                      <LiveDot />
                      Live now
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mono text-[10px] uppercase tracking-widest text-muted">
                      Kick-off
                    </span>
                    <div className="numeric text-[28px] font-extrabold leading-none text-ink sm:text-[42px] md:text-[56px]">
                      {formatMatchTime(match.date)}
                    </div>
                    <span className="mono text-[11px] text-muted">
                      {formatMatchDate(match.date)}
                    </span>
                  </>
                )}
              </div>
              <TeamBlock team={away} align="right" />
            </div>
          ) : (
            <h1 className="display max-w-2xl text-[32px] font-extrabold leading-tight text-ink sm:text-[44px]">
              {match.title}
            </h1>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <Link
              href={`/match/${match.id}?cat=${match.category}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-primary-2"
            >
              <Play className="h-4 w-4" fill="currentColor" />
              {isLive ? "Watch live" : "Open match"}
            </Link>
            <span className="mono flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-3 py-1.5 text-[11px] font-semibold text-muted">
              <Radio className="h-3.5 w-3.5" />
              {match.sources.length} mirror{match.sources.length === 1 ? "" : "s"}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
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
          : "flex items-center gap-4 sm:flex-row-reverse sm:text-right"
      }
    >
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-line bg-surface-2 sm:h-16 sm:w-16">
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
      <div>
        <p className="mono text-[10px] uppercase tracking-widest text-muted">
          {align === "left" ? "Home" : "Away"}
        </p>
        <p className="display mt-0.5 text-[20px] font-extrabold leading-tight text-ink sm:text-[24px]">
          {team.name}
        </p>
      </div>
    </div>
  );
}
