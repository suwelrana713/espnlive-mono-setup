import { cn } from "@/lib/utils";

interface SectionBarProps {
  code: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
}

export function SectionBar({
  code,
  eyebrow,
  title,
  aside,
  className,
}: SectionBarProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-3">
        <span className="mono rounded-tag border border-neon/40 bg-neon/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-neon">
          [ {code} ]
        </span>
        <span className="mono text-[10px] uppercase tracking-[0.28em] text-fg-dim">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-line-2" />
      </div>
      <div className="mt-4 flex items-end justify-between gap-6">
        <h2 className="display text-3xl font-bold text-fg sm:text-[40px] sm:leading-[1.02]">
          {title}
        </h2>
        {aside && <div className="hidden shrink-0 sm:block">{aside}</div>}
      </div>
    </div>
  );
}
