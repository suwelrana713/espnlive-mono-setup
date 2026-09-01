"use client";

import { motion } from "framer-motion";
import { Radio, Users, CheckCircle2 } from "lucide-react";
import type { Stream } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StreamOptionProps {
  stream: Stream;
  selected?: boolean;
  onClick?: () => void;
  index?: number;
}

export function StreamOption({
  stream,
  selected,
  onClick,
  index = 0,
}: StreamOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.2) }}
      className={cn(
        "group flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-all",
        selected
          ? "border-primary bg-primary-tint"
          : "border-line bg-surface hover:border-primary/40 hover:bg-surface-2",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
          selected ? "bg-primary text-white" : "bg-surface-2 text-muted",
        )}
      >
        <Radio className="h-4 w-4" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="display line-clamp-1 text-[14px] font-extrabold text-ink">
          {stream.language || "Unknown"}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-[11px]">
          <span
            className={cn(
              "mono rounded-pill px-1.5 py-0.5 font-bold",
              stream.hd
                ? "bg-live-tint text-live"
                : "bg-surface-2 text-muted",
            )}
          >
            {stream.hd ? "HD" : "SD"}
          </span>
          <span className="mono text-muted">Stream #{stream.streamNo}</span>
        </div>
      </div>

      {stream.viewers > 0 && (
        <div className="flex items-center gap-1 text-[11px] text-muted">
          <Users className="h-3 w-3" />
          <span className="numeric tabular-nums">
            {stream.viewers.toLocaleString()}
          </span>
        </div>
      )}
      {selected && (
        <CheckCircle2
          className="h-4 w-4 text-primary"
          strokeWidth={2.5}
          fill="currentColor"
        />
      )}
    </motion.button>
  );
}
