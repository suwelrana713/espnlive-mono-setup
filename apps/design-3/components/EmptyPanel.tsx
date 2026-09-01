import { CircleOff } from "lucide-react";

interface EmptyPanelProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyPanel({
  title = "Nothing to show",
  description = "Check back later for upcoming events.",
  icon,
}: EmptyPanelProps) {
  return (
    <div className="flex flex-col items-start gap-4 border border-dashed border-hairline-strong bg-panel/40 p-10">
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-faint">
        // Empty
      </span>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-panel-soft text-ink">
          {icon ?? <CircleOff className="h-5 w-5" strokeWidth={1.5} />}
        </span>
        <div>
          <p className="serif text-2xl font-black text-ink">{title}</p>
          <p className="mt-1 max-w-md text-sm text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}
