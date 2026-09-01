"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Match } from "@/lib/types";
import { formatMatchDate, formatMatchTime, getMatchStatus } from "@/lib/types";
import { getBadgeUrl, cn } from "@/lib/utils";
import { LiveDot } from "./StatusPill";

interface ScoreRowProps {
  match: Match;
  index?: number;
  showCompetition?: boolean;
}

function Badge({ src, name }: { src: string; name: string }) {
  return (
    <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-surface-2">
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

export function ScoreRow({
  match,
  index = 0,
  showCompetition = true,
}: ScoreRowProps) {
  const status = getMatchStatus(match.date);
  const isLive = status === "live";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.015, 0.2), duration: 0.2 }}
    >
      <Link
        href={`/match/${match.id}?cat=${match.category}`}
        className={cn(
          "group grid items-center gap-3 rounded-md border border-transparent px-3 py-2.5 transition-colors sm:grid-cols-[60px_1fr_auto_28px]",
          "grid-cols-[60px_1fr_auto] hover:border-line hover:bg-surface",
          isLive && "bg-live-tint/40 hover:bg-live-tint/60",
        )}
      >
        <div className="flex flex-col items-start gap-0.5">
          {isLive ? (
            <div className="flex items-center gap-1.5">
              <LiveDot />
              <span className="mono text-[11px] font-bold uppercase text-live">
                Live
              </span>
            </div>
          ) : status === "finished" ? (
            <span className="mono text-[11px] font-bold uppercase text-muted">
              FT
            </span>
          ) : (
            <span className="numeric text-[15px] font-bold leading-none text-ink tabular-nums">
              {formatMatchTime(match.date)}
            </span>
          )}
          <span className="mono text-[10px] text-faint">
            {status === "upcoming"
              ? formatMatchDate(match.date).split(",")[0]
              : status === "finished"
                ? formatMatchDate(match.date).split(",")[0]
                : `${match.sources.length} mirror${match.sources.length === 1 ? "" : "s"}`}
          </span>
        </div>

        <div className="min-w-0">
          {match.teams ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Badge src={match.teams.home.badge} name={match.teams.home.name} />
                <span className="line-clamp-1 text-[14px] font-semibold text-ink">
                  {match.teams.home.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge src={match.teams.away.badge} name={match.teams.away.name} />
                <span className="line-clamp-1 text-[14px] font-semibold text-ink">
                  {match.teams.away.name}
                </span>
              </div>
            </div>
          ) : (
            <p className="line-clamp-2 text-[14px] font-semibold text-ink">
              {match.title}
            </p>
          )}
          {showCompetition && (
            <p className="mono mt-1.5 text-[10px] uppercase tracking-[0.12em] text-muted">
              {match.category.replace(/-/g, " ")}
            </p>
          )}
        </div>

        <div className="hidden flex-col items-end gap-1 sm:flex">
          {isLive ? (
            <div className="numeric rounded-md bg-live px-2 py-1 text-[13px] font-bold text-white">
              LIVE
            </div>
          ) : status === "upcoming" ? (
            <div className="numeric rounded-md bg-primary-tint px-2 py-1 text-[13px] font-bold text-primary tabular-nums">
              {formatMatchTime(match.date)}
            </div>
          ) : (
            <div className="numeric rounded-md bg-surface-2 px-2 py-1 text-[13px] font-bold text-muted">
              FT
            </div>
          )}
        </div>

        <div className="hidden items-center justify-center sm:flex">
          <Star
            className="h-4 w-4 text-faint opacity-0 transition-opacity group-hover:opacity-100"
            strokeWidth={1.5}
          />
        </div>
      </Link>
    </motion.div>
  );
}
