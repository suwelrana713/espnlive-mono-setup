"use client";

import { motion } from "framer-motion";
import { Radio, Users } from "lucide-react";
import type { Stream } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StreamPillProps {
  stream: Stream;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

export function StreamPill({
  stream,
  selected,
  onClick,
  index = 0,
}: StreamPillProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className={cn(
        "group flex w-full items-center justify-between gap-3 border px-4 py-3 text-left transition-colors",
        selected
          ? "border-ink bg-ink text-paper"
          : "border-hairline bg-panel text-ink hover:border-ink",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border",
            selected
              ? "border-paper/40 bg-white/10"
              : "border-hairline bg-panel-soft",
          )}
        >
          <Radio className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
        <div className="flex flex-col">
          <span className="text-[14px] font-semibold leading-tight">
            {stream.language || "Unknown"}
          </span>
          <span
            className={cn(
              "mono mt-1 text-[10px] uppercase tracking-[0.22em]",
              selected ? "text-paper/70" : "text-muted",
            )}
          >
            {stream.hd ? "HD 1080" : "SD"} · Stream {stream.streamNo}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {stream.viewers > 0 && (
          <span
            className={cn(
              "mono flex items-center gap-1 text-[11px] tabular-nums",
              selected ? "text-paper/80" : "text-muted",
            )}
          >
            <Users className="h-3 w-3" />
            {stream.viewers.toLocaleString()}
          </span>
        )}
        {selected && (
          <span className="mono text-[10px] uppercase tracking-[0.24em] text-paper">
            Now
          </span>
        )}
      </div>
    </motion.button>
  );
}
