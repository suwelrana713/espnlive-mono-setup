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
  ArrowUpRight,
} from "lucide-react";
import type { Sport } from "@/lib/types";
import { cn } from "@/lib/utils";

type SportMeta = { Icon: React.ElementType; hue: string };

const SPORT_META: Record<string, SportMeta> = {
  football: { Icon: Circle, hue: "text-emerald-700" },
  basketball: { Icon: Target, hue: "text-orange-700" },
  "american-football": { Icon: Zap, hue: "text-amber-700" },
  hockey: { Icon: Activity, hue: "text-sky-700" },
  baseball: { Icon: Award, hue: "text-red-700" },
  "motor-sports": { Icon: Flame, hue: "text-rose-700" },
  fight: { Icon: Dumbbell, hue: "text-violet-700" },
  tennis: { Icon: Star, hue: "text-lime-700" },
  rugby: { Icon: Trophy, hue: "text-amber-800" },
  golf: { Icon: Globe, hue: "text-teal-700" },
  billiards: { Icon: Layers, hue: "text-indigo-700" },
  afl: { Icon: Music2, hue: "text-pink-700" },
  darts: { Icon: Target, hue: "text-cyan-700" },
  cricket: { Icon: Trophy, hue: "text-green-700" },
  other: { Icon: Globe, hue: "text-slate-700" },
};

interface SportTileProps {
  sport: Sport;
  matchCount?: number;
  index?: number;
}

export function SportTile({ sport, matchCount, index = 0 }: SportTileProps) {
  const meta = SPORT_META[sport.id] ?? SPORT_META.other;
  const Icon = meta.Icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.28 }}
    >
      <Link
        href={`/sports/${sport.id}`}
        className={cn(
          "group flex h-full flex-col justify-between gap-6 border border-hairline bg-panel p-5 transition-all",
          "hover:-translate-y-0.5 hover:border-ink hover:shadow-lift",
        )}
      >
        <div className="flex items-start justify-between">
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-faint">
            No. {num}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-faint transition-colors group-hover:text-accent"
            strokeWidth={1.75}
          />
        </div>

        <div>
          <Icon className={cn("h-8 w-8", meta.hue)} strokeWidth={1.5} />
          <p className="serif mt-4 text-2xl font-black leading-tight text-ink">
            {sport.name}
          </p>
          {matchCount !== undefined && (
            <p className="mono mt-2 text-[11px] uppercase tracking-[0.22em] text-muted">
              {matchCount} {matchCount === 1 ? "listing" : "listings"}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
