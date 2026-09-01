import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No matches",
  description = "Nothing to show right now. Check back later.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-muted">
        {icon ?? <Inbox className="h-6 w-6" strokeWidth={1.5} />}
      </span>
      <div>
        <p className="display text-[18px] font-extrabold text-ink">{title}</p>
        <p className="mt-1 max-w-md text-[13px] text-muted">{description}</p>
      </div>
    </div>
  );
}
