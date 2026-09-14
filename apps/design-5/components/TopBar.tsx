"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Scores" },
  { href: "/sports", label: "Sports" },
  { href: "/schedule", label: "Schedule" },
  { href: "/about", label: "About" },
] as const;

export function TopBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="FanZoneLive home"
          className="flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
            <Zap className="h-4 w-4" strokeWidth={2.4} fill="currentColor" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="display text-[16px] font-extrabold tracking-tight text-ink">
              FanZoneLive
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Where fans watch
            </span>
          </div>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors",
                  active
                    ? "bg-primary-tint text-primary"
                    : "text-ink-2 hover:bg-surface-2",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="hidden items-center gap-2 rounded-md border border-line bg-surface-2 px-3 py-1.5 text-[13px] text-muted transition hover:border-primary/40 hover:text-ink sm:flex"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
            <span>Search teams, matches…</span>
            <kbd className="mono ml-2 rounded border border-line-2 bg-surface px-1.5 py-0.5 text-[10px] text-faint">
              /
            </kbd>
          </Link>
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-line text-ink transition hover:border-primary sm:hidden"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <Link
            href="/sports/football"
            className="flex items-center gap-2 rounded-md bg-live px-3 py-1.5 text-[13px] font-bold text-white transition hover:bg-live/85"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white live-dot" />
            Live
          </Link>
        </div>
      </div>
    </header>
  );
}
