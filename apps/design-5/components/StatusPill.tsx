import { cn } from "@/lib/utils";
import type { MatchStatus } from "@/lib/types";

interface StatusPillProps {
  status: MatchStatus;
  size?: "sm" | "md";
  className?: string;
}

export function StatusPill({
  status,
  size = "md",
  className,
}: StatusPillProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-pill font-bold uppercase";
  const dim =
    size === "sm"
      ? "px-1.5 py-0.5 text-[9px] tracking-[0.1em]"
      : "px-2 py-0.5 text-[10px] tracking-[0.12em]";

  if (status === "live") {
    return (
      <span
        className={cn(base, dim, "bg-live text-white", className)}
        aria-label="Live"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white live-dot" />
        Live
      </span>
    );
  }
  if (status === "upcoming") {
    return (
      <span
        className={cn(
          base,
          dim,
          "border border-primary/30 bg-primary-tint text-primary",
          className,
        )}
      >
        Soon
      </span>
    );
  }
  return (
    <span
      className={cn(
        base,
        dim,
        "border border-line-2 bg-surface-2 text-muted",
        className,
      )}
    >
      FT
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
