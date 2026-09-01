import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  aside?: React.ReactNode;
  accent?: "primary" | "live" | "cool" | "warn";
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  icon,
  aside,
  accent = "primary",
  className,
}: SectionTitleProps) {
  const barColor = {
    primary: "bg-primary",
    live: "bg-live",
    cool: "bg-cool",
    warn: "bg-warn",
  }[accent];

  return (
    <div
      className={cn(
        "mb-4 flex items-end justify-between gap-4 border-b border-line pb-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("h-6 w-1 rounded-full", barColor)} />
        {icon && <span className="text-ink-2">{icon}</span>}
        <div>
          <h2 className="display text-[20px] font-extrabold leading-none text-ink">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-[12px] text-muted">{subtitle}</p>
          )}
        </div>
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
