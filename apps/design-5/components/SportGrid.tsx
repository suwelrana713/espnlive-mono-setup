"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Circle,
  Trophy,
  Zap,
  Flame,
  Target,
  Activity,
  Dumbbell,
  Globe,
  Star,
  Music2,
  Layers,
  Award,
} from "lucide-react";
import type { Sport } from "@/lib/types";
import { cn } from "@/lib/utils";

type Meta = { Icon: React.ElementType; tone: string };

const META: Record<string, Meta> = {
  football: { Icon: Circle, tone: "text-emerald-600 bg-emerald-50" },
  basketball: { Icon: Target, tone: "text-orange-600 bg-orange-50" },
  "american-football": { Icon: Zap, tone: "text-amber-600 bg-amber-50" },
  hockey: { Icon: Activity, tone: "text-sky-600 bg-sky-50" },
  baseball: { Icon: Award, tone: "text-red-600 bg-red-50" },
  "motor-sports": { Icon: Flame, tone: "text-rose-600 bg-rose-50" },
  fight: { Icon: Dumbbell, tone: "text-violet-600 bg-violet-50" },
  tennis: { Icon: Star, tone: "text-lime-700 bg-lime-50" },
  rugby: { Icon: Trophy, tone: "text-amber-700 bg-amber-50" },
  golf: { Icon: Globe, tone: "text-teal-600 bg-teal-50" },
  billiards: { Icon: Layers, tone: "text-indigo-600 bg-indigo-50" },
  afl: { Icon: Music2, tone: "text-pink-600 bg-pink-50" },
  darts: { Icon: Target, tone: "text-cyan-600 bg-cyan-50" },
  cricket: { Icon: Trophy, tone: "text-green-600 bg-green-50" },
  other: { Icon: Globe, tone: "text-slate-600 bg-slate-100" },
};

interface SportTileProps {
  sport: Sport;
  matchCount?: number;
  index?: number;
}

export function SportTile({ sport, matchCount, index = 0 }: SportTileProps) {
  const meta = META[sport.id] ?? META.other;
  const Icon = meta.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.25), duration: 0.2 }}
    >
      <Link
        href={`/sports/${sport.id}`}
        className="card flex h-full items-center gap-3 p-3 transition hover:-translate-y-0.5 hover:shadow-lift"
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
            meta.tone,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="display truncate text-[14px] font-extrabold leading-tight text-ink">
            {sport.name}
          </p>
          {matchCount !== undefined && (
            <p className="numeric mt-0.5 text-[11px] font-semibold text-muted tabular-nums">
              {matchCount} {matchCount === 1 ? "match" : "matches"}
            </p>
          )}
        </div>
        <span className="mono shrink-0 rounded-pill border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase text-muted">
          Open
        </span>
      </Link>
    </motion.div>
  );
}
