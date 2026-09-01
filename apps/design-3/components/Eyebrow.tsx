import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  number?: string;
}

export function Eyebrow({ children, className, number }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {number && (
        <span className="mono text-[10px] font-semibold text-accent tracking-[0.22em]">
          {number}
        </span>
      )}
      <span className="eyebrow">{children}</span>
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  number?: string;
  aside?: React.ReactNode;
}

export function SectionHead({ eyebrow, title, number, aside }: SectionHeadProps) {
  return (
    <div className="mb-8">
      <Eyebrow number={number}>{eyebrow}</Eyebrow>
      <div className="mt-3 flex items-end justify-between gap-6">
        <h2 className="serif text-3xl font-black text-ink sm:text-[40px] sm:leading-[1.05]">
          {title}
        </h2>
        {aside && <div className="hidden shrink-0 sm:block">{aside}</div>}
      </div>
    </div>
  );
}
