import { cn } from "@/lib/utils";
import type { MatchStatus } from "@/lib/types";

interface StatusChipProps {
  status: MatchStatus;
  size?: "sm" | "md";
  className?: string;
}

export function StatusChip({
  status,
  size = "md",
  className,
}: StatusChipProps) {
  const base =
    "mono inline-flex items-center gap-1.5 rounded-tag font-bold uppercase tracking-[0.22em]";
  const dim = size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-1 text-[10px]";

  if (status === "live") {
    return (
      <span
        className={cn(base, dim, "bg-live text-void", className)}
        aria-label="Live"
      >
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-void" />
        On Air
      </span>
    );
  }
  if (status === "upcoming") {
    return (
      <span
        className={cn(
          base,
          dim,
          "border border-neon bg-neon/10 text-neon",
          className,
        )}
      >
        // Scheduled
      </span>
    );
  }
  return (
    <span
      className={cn(
        base,
        dim,
        "border border-line-2 bg-panel-2 text-fg-dim",
        className,
      )}
    >
      Full Time
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-2 w-2 rounded-full bg-live live-dot", className)}
    />
  );
}
