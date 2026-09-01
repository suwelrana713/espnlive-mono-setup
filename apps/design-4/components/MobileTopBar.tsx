import Link from "next/link";
import { Radio, Search } from "lucide-react";

export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-panel/90 px-4 backdrop-blur-md lg:hidden">
      <Link href="/" className="flex items-baseline gap-2">
        <span className="display text-xl font-bold leading-none text-fg">
          ESPN
        </span>
        <span className="tag text-neon">// LIVE</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/sports/football"
          aria-label="Live now"
          className="mono flex items-center gap-2 rounded-tag border border-line-2 bg-panel-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-fg-mid transition hover:border-live hover:text-fg"
        >
          <span className="live-dot h-2 w-2 rounded-full bg-live" />
          On air
        </Link>
        <Link
          href="/search"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-tag border border-line-2 bg-panel-2 text-fg-mid transition hover:border-neon hover:text-fg"
        >
          <Search className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </header>
  );
}
