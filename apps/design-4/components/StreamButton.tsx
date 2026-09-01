"use client";

import { motion } from "framer-motion";
import { Radio, Users } from "lucide-react";
import type { Stream } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StreamButtonProps {
  stream: Stream;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

export function StreamButton({
  stream,
  selected,
  onClick,
  index = 0,
}: StreamButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className={cn(
        "group flex w-full items-center gap-3 rounded-panel border px-4 py-3 text-left transition-all",
        selected
          ? "border-neon bg-neon/10 text-fg shadow-[0_0_0_1px_rgba(0,229,255,0.35)]"
          : "border-line bg-panel text-fg-mid hover:border-neon/40 hover:bg-panel-2",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-tag border",
          selected
            ? "border-neon bg-neon/20 text-neon"
            : "border-line-2 bg-panel-2 text-fg-dim",
        )}
      >
        <Radio className="h-4 w-4" strokeWidth={1.75} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="display text-[14px] font-bold leading-tight text-fg">
          {stream.language || "Unknown feed"}
        </span>
        <span className="mono mt-1 text-[10px] uppercase tracking-[0.22em] text-fg-dim">
          {stream.hd ? "HD 1080" : "SD"} · Stream {stream.streamNo}
        </span>
      </div>

      <div className="flex flex-col items-end gap-1">
        {stream.viewers > 0 && (
          <span className="mono flex items-center gap-1 text-[11px] tabular-nums text-fg-mid">
            <Users className="h-3 w-3" />
            {stream.viewers.toLocaleString()}
          </span>
        )}
        {selected && (
          <span className="mono rounded-tag bg-neon px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-void">
            NOW
          </span>
        )}
      </div>
    </motion.button>
  );
}
