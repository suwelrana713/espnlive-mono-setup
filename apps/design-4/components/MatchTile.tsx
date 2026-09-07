"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import type { Match } from "@/lib/types";
import { formatMatchDate, formatMatchTime, getMatchStatus } from "@/lib/types";
import { getBadgeUrl, getPosterUrl, cn } from "@/lib/utils";
import { StatusChip, LiveDot } from "./StatusChip";

interface MatchTileProps {
  match: Match;
  index?: number;
  variant?: "grid" | "list";
}

export function MatchTile({ match, index = 0, variant = "grid" }: MatchTileProps) {
  const status = getMatchStatus(match.date);
  const isLive = status === "live";
  const category = match.category.replace(/-/g, " ");

  if (variant === "list") return <MatchListRow match={match} index={index} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.28 }}
    >
      <Link
        href={`/match/${match.id}?cat=${match.category}`}
        className="scanline-on-hover group relative flex h-full flex-col overflow-hidden rounded-panel border border-line bg-panel transition-all hover:border-neon"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-panel-2">
          {match.poster ? (
            <Image
              src={getPosterUrl(match.poster)}
              alt={match.title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover opacity-70 transition group-hover:opacity-100 group-hover:scale-[1.02]"
              unoptimized
            />
          ) : (
            <div className="grid-backdrop absolute inset-0" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
          <div className="absolute left-1.5 sm:left-3 top-3 flex items-center gap-2">
            <StatusChip status={status} size="sm" />
          </div>
          <div className="absolute right-1.5 sm:right-3 top-3">
            <span className="mono rounded-tag bg-void/80 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-fg-dim backdrop-blur-sm">
              {category}
            </span>
          </div>
          <div className="absolute bottom-1.5 sm:bottom-3 left-1.5 sm:left-3 right-1.5 sm:right-3">
            {match.teams ? (
              <div className="flex items-center gap-3">
                <TeamBadge src={match.teams.home.badge} name={match.teams.home.name} />
                <span className="mono text-[11px] font-bold tracking-widest text-fg-mid">
                  VS
                </span>
                <TeamBadge src={match.teams.away.badge} name={match.teams.away.name} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 border-t border-line p-4">
          {match.teams ? (
            <div className="flex flex-col gap-1">
              <p className="display line-clamp-1 text-[16px] font-bold leading-tight text-fg">
                {match.teams.home.name}
              </p>
              <p className="display line-clamp-1 text-[16px] font-bold leading-tight text-fg">
                {match.teams.away.name}
              </p>
            </div>
          ) : (
            <p className="display line-clamp-2 text-[16px] font-bold text-fg">
              {match.title}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between">
            <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim">
              {isLive ? (
                <>
                  <LiveDot />
                  <span className="text-live">Live</span>
                </>
              ) : (
                <span className="tabular-nums text-fg-mid">
                  {formatMatchTime(match.date)} · {formatMatchDate(match.date).split(",")[0]}
                </span>
              )}
            </div>
            <span
              className={cn(
                "mono flex items-center gap-1 text-[11px] tabular-nums",
                isLive ? "text-neon" : "text-fg-dim",
              )}
            >
              <Radio className="h-3 w-3" />
              {String(match.sources.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TeamBadge({ src, name }: { src: string; name: string }) {
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-tag border border-line-2 bg-panel-2">
      <Image
        src={getBadgeUrl(src)}
        alt={name}
        fill
        sizes="32px"
        className="object-contain p-1"
        unoptimized
        onError={(e) => {
          (e.target as HTMLImageElement).style.visibility = "hidden";
        }}
      />
    </span>
  );
}

function MatchListRow({ match, index }: { match: Match; index: number }) {
  const status = getMatchStatus(match.date);
  const isLive = status === "live";
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.2) }}
    >
      <Link
        href={`/match/${match.id}?cat=${match.category}`}
        className="group flex items-center gap-4 border-b border-line px-4 py-3 transition-colors hover:bg-panel"
      >
        <div className="mono flex w-14 shrink-0 flex-col text-[11px] tabular-nums text-fg-mid">
          {isLive ? (
            <>
              <span className="flex items-center gap-1.5 text-live">
                <LiveDot />
                LIVE
              </span>
              <span className="text-fg-faint">now</span>
            </>
          ) : (
            <>
              <span>{formatMatchTime(match.date)}</span>
              <span className="text-fg-faint">
                {formatMatchDate(match.date).split(",")[0]}
              </span>
            </>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {match.teams ? (
            <div className="flex flex-col">
              <p className="display line-clamp-1 text-[15px] font-bold text-fg">
                {match.teams.home.name}
              </p>
              <p className="display line-clamp-1 text-[15px] font-bold text-fg">
                {match.teams.away.name}
              </p>
            </div>
          ) : (
            <p className="display line-clamp-2 text-[15px] font-bold text-fg">
              {match.title}
            </p>
          )}
        </div>
        <div className="hidden flex-col items-end gap-1 sm:flex">
          <StatusChip status={status} size="sm" />
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
            {match.category.replace("-", " ")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
