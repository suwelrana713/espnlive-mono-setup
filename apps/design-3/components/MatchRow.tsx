"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Match } from "@/lib/types";
import { getMatchStatus, formatMatchTime, formatMatchDate } from "@/lib/types";
import { getBadgeUrl, cn } from "@/lib/utils";
import { StatusTag, LiveDot } from "./StatusTag";

interface MatchRowProps {
  match: Match;
  index?: number;
  compact?: boolean;
}

function Badge({ src, name }: { src: string; name: string }) {
  return (
    <span className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-hairline bg-panel">
      <Image
        src={getBadgeUrl(src)}
        alt={name}
        fill
        className="object-contain p-0.5"
        unoptimized
        onError={(e) => {
          (e.target as HTMLImageElement).style.visibility = "hidden";
        }}
      />
    </span>
  );
}

export function MatchRow({ match, index = 0, compact = false }: MatchRowProps) {
  const status = getMatchStatus(match.date);
  const isLive = status === "live";
  const category = match.category.replace(/-/g, " ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.24), duration: 0.24 }}
    >
      <Link
        href={`/match/${match.id}?cat=${match.category}`}
        className={cn(
          "group relative grid items-center gap-4 border-b border-hairline py-4 transition-colors hover:bg-panel",
          "grid-cols-[64px_1fr_auto] sm:grid-cols-[92px_1fr_auto_28px] sm:gap-6 sm:px-4",
          isLive && "bg-panel/60",
          compact && "py-3 sm:px-2",
        )}
      >
        <div className="flex flex-col items-start gap-1">
          {isLive ? (
            <div className="flex items-center gap-1.5">
              <LiveDot />
              <span className="mono text-[11px] font-semibold uppercase tracking-[0.16em] text-live">
                Live
              </span>
            </div>
          ) : (
            <span className="mono text-[13px] font-semibold text-ink tabular-nums">
              {formatMatchTime(match.date)}
            </span>
          )}
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-faint">
            {status === "finished" ? "FT" : formatMatchDate(match.date).split(",")[0]}
          </span>
        </div>

        <div className="min-w-0">
          {match.teams ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <Badge src={match.teams.home.badge} name={match.teams.home.name} />
                <span className="serif line-clamp-1 text-[17px] font-semibold text-ink sm:text-[19px]">
                  {match.teams.home.name}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Badge src={match.teams.away.badge} name={match.teams.away.name} />
                <span className="serif line-clamp-1 text-[17px] font-semibold text-ink sm:text-[19px]">
                  {match.teams.away.name}
                </span>
              </div>
            </div>
          ) : (
            <p className="serif line-clamp-2 text-[18px] font-semibold text-ink sm:text-[22px]">
              {match.title}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3">
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {category}
            </span>
            <span className="h-1 w-1 rounded-full bg-hairline" />
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {match.sources.length} {match.sources.length === 1 ? "source" : "sources"}
            </span>
          </div>
        </div>

        <div className="hidden flex-col items-end gap-2 sm:flex">
          <StatusTag status={status} size="sm" />
          {isLive ? (
            <span className="mono text-[11px] text-muted">Tap to watch</span>
          ) : (
            <span className="mono text-[11px] text-muted">
              {formatMatchDate(match.date)}
            </span>
          )}
        </div>

        <div className="hidden items-center justify-center sm:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-ink transition group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </div>

        <div className="flex flex-col items-end gap-1 sm:hidden">
          <StatusTag status={status} size="sm" />
        </div>
      </Link>
    </motion.div>
  );
}
