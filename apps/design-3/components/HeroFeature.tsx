"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Match } from "@/lib/types";
import { getMatchStatus, formatMatchDate, formatMatchTime } from "@/lib/types";
import { getPosterUrl } from "@/lib/utils";
import { StatusTag, LiveDot } from "./StatusTag";

interface HeroFeatureProps {
  matches: Match[];
}

export function HeroFeature({ matches }: HeroFeatureProps) {
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
  const category = match.category.replace(/-/g, " ");

  const go = (delta: number) => setIdx((i) => (i + delta + total) % total);

  const homeName = match.teams?.home.name;
  const awayName = match.teams?.away.name;
  const headline =
    homeName && awayName ? `${homeName} vs ${awayName}` : match.title;

  return (
    <section className="relative">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="mono text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
            No. 01
          </span>
          <span className="eyebrow">Front page · Today’s feature</span>
        </div>
        {total > 1 && (
          <div className="flex items-center gap-2">
            <span className="mono text-[11px] tabular-nums text-muted">
              {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => go(-1)}
                className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center border border-hairline transition hover:border-ink"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => go(1)}
                className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center border border-hairline transition hover:border-ink"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-md border border-hairline bg-panel">
        <AnimatePresence mode="wait">
          <motion.article
            key={match.id + idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="flex flex-col justify-between p-7 sm:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <StatusTag status={status} />
                  <span className="mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    {category}
                  </span>
                </div>

                <h1 className="serif mt-6 text-2xl sm:text-3xl md:text-[40px] font-black leading-[0.98] tracking-tight text-ink sm:text-[64px] lg:text-[80px]">
                  {headline}
                </h1>

                {homeName && awayName && (
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                    {isLive
                      ? "Live now on multiple mirrors. Pick a stream and go."
                      : `Broadcast begins ${formatMatchDate(match.date)} at ${formatMatchTime(match.date)}. ${match.sources.length} source${match.sources.length === 1 ? "" : "s"} lined up.`}
                  </p>
                )}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href={`/match/${match.id}?cat=${match.category}`}
                  className="group inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-4 text-white transition hover:bg-accent"
                >
                  <span className="mono text-[13px] sm:text-[12px] font-semibold uppercase tracking-[0.22em]">
                    {isLive ? "Watch live" : "Open match"}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <div className="flex flex-col">
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-faint">
                    Kick-off
                  </span>
                  <span className="mono mt-1 text-[16px] font-semibold text-ink tabular-nums">
                    {formatMatchDate(match.date)} · {formatMatchTime(match.date)}
                  </span>
                </div>

                {isLive && (
                  <div className="flex items-center gap-2 text-live">
                    <LiveDot />
                    <span className="mono text-[11px] font-semibold uppercase tracking-[0.22em]">
                      On air
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative min-h-[160px] sm:min-h-[200px] md:min-h-[240px] overflow-hidden border-t border-hairline lg:border-l lg:border-t-0">
              {match.poster ? (
                <Image
                  src={getPosterUrl(match.poster)}
                  alt={headline}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  unoptimized
                  priority
                />
              ) : (
                <PosterFallback headline={headline} category={category} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent lg:from-transparent lg:via-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1 text-white/90">
                  <span className="mono text-[10px] uppercase tracking-[0.22em] opacity-70">
                    Sources
                  </span>
                  <span className="mono text-[24px] font-semibold tabular-nums">
                    {String(match.sources.length).padStart(2, "0")}
                  </span>
                </div>
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                  ID · {match.id.slice(0, 8)}
                </span>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

function PosterFallback({
  headline,
  category,
}: {
  headline: string;
  category: string;
}) {
  return (
    <div className="flex h-full min-h-[240px] items-end bg-gradient-to-br from-ink to-accent p-6 text-white">
      <div>
        <p className="mono text-[10px] uppercase tracking-[0.22em] opacity-70">
          {category}
        </p>
        <p className="serif mt-1 text-2xl font-black leading-tight sm:text-3xl">
          {headline}
        </p>
      </div>
    </div>
  );
}
