import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-panel/90 px-4 backdrop-blur-md lg:hidden">
      <Link
        href="/"
        aria-label="SportVibeHub home"
        className="flex items-center"
      >
        <Image
          src="/logo.png"
          alt="SportVibeHub"
          width={170}
          height={40}
          priority
          className="h-9 w-auto"
        />
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
