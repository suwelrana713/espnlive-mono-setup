import { cn } from "@/lib/utils";
import type { MatchStatus } from "@/lib/types";

interface StatusTagProps {
  status: MatchStatus;
  size?: "sm" | "md";
  className?: string;
}

export function StatusTag({ status, size = "md", className }: StatusTagProps) {
  const base =
    "mono inline-flex items-center gap-1.5 rounded-sm font-semibold uppercase tracking-[0.18em]";
  const dim = size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-1 text-[10px]";

  if (status === "live") {
    return (
      <span
        className={cn(base, dim, "bg-live text-white", className)}
        aria-label="Live match"
      >
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
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
          "border border-upcoming/40 bg-transparent text-upcoming",
          className,
        )}
      >
        Upcoming
      </span>
    );
  }
  return (
    <span
      className={cn(
        base,
        dim,
        "border border-hairline bg-transparent text-faint",
        className,
      )}
    >
      Full time
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block h-2 w-2 rounded-full bg-live live-dot",
        className,
      )}
    />
  );
}
