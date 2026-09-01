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

const META: Record<string, { Icon: React.ElementType; short: string; glow: string }> = {
  football: { Icon: Circle, short: "FBL", glow: "text-emerald-400" },
  basketball: { Icon: Target, short: "BKB", glow: "text-orange-400" },
  "american-football": { Icon: Zap, short: "NFL", glow: "text-amber-400" },
  hockey: { Icon: Activity, short: "HKY", glow: "text-sky-400" },
  baseball: { Icon: Award, short: "BSB", glow: "text-red-400" },
  "motor-sports": { Icon: Flame, short: "MTR", glow: "text-rose-400" },
  fight: { Icon: Dumbbell, short: "MMA", glow: "text-violet-400" },
  tennis: { Icon: Star, short: "TEN", glow: "text-lime-400" },
  rugby: { Icon: Trophy, short: "RGB", glow: "text-amber-500" },
  golf: { Icon: Globe, short: "GLF", glow: "text-teal-400" },
  billiards: { Icon: Layers, short: "BIL", glow: "text-indigo-400" },
  afl: { Icon: Music2, short: "AFL", glow: "text-pink-400" },
  darts: { Icon: Target, short: "DRT", glow: "text-cyan-400" },
  cricket: { Icon: Trophy, short: "CKT", glow: "text-green-400" },
  other: { Icon: Globe, short: "OTH", glow: "text-slate-400" },
};

interface SportBrickProps {
  sport: Sport;
  matchCount?: number;
  index?: number;
}

export function SportBrick({ sport, matchCount, index = 0 }: SportBrickProps) {
  const meta = META[sport.id] ?? META.other;
  const Icon = meta.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        href={`/sports/${sport.id}`}
        className="scanline-on-hover group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-panel border border-line bg-panel p-5 transition-all hover:border-neon"
      >
        <div className="flex items-center justify-between">
          <span className="mono rounded-tag border border-line-2 bg-panel-2 px-2 py-0.5 text-[10px] font-bold tracking-widest text-fg-dim">
            {meta.short}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-fg-faint transition-colors group-hover:text-neon"
            strokeWidth={1.75}
          />
        </div>

        <div>
          <Icon
            className={cn("h-10 w-10 transition-colors", meta.glow)}
            strokeWidth={1.5}
          />
          <p className="display mt-4 text-2xl font-bold leading-tight text-fg">
            {sport.name}
          </p>
          {matchCount !== undefined && (
            <p className="mono mt-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim">
              {String(matchCount).padStart(3, "0")} listings
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
