import { CircleOff } from "lucide-react";

interface EmptyBlockProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyBlock({
  title = "No signal",
  description = "The wire is quiet. Check back soon.",
  icon,
}: EmptyBlockProps) {
  return (
    <div className="brackets flex flex-col items-start gap-4 rounded-panel border border-dashed border-line-2 bg-panel/40 p-8">
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
        // status: empty
      </span>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-tag border border-line-2 bg-panel-2 text-fg-dim">
          {icon ?? <CircleOff className="h-5 w-5" strokeWidth={1.5} />}
        </span>
        <div>
          <p className="display text-2xl font-bold text-fg">{title}</p>
          <p className="mt-1 max-w-md text-sm text-fg-dim">{description}</p>
        </div>
      </div>
    </div>
  );
}
