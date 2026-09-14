"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Front" },
  { href: "/sports", label: "Sports" },
  { href: "/schedule", label: "Schedule" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
] as const;

const SPORTS_TICKER = [
  { href: "/sports/football", label: "Football" },
  { href: "/sports/basketball", label: "Basketball" },
  { href: "/sports/tennis", label: "Tennis" },
  { href: "/sports/cricket", label: "Cricket" },
  { href: "/sports/american-football", label: "NFL" },
  { href: "/sports/hockey", label: "Hockey" },
  { href: "/sports/baseball", label: "Baseball" },
  { href: "/sports/motor-sports", label: "Motor Sport" },
  { href: "/sports/fight", label: "MMA" },
  { href: "/sports/rugby", label: "Rugby" },
  { href: "/sports/golf", label: "Golf" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              aria-label="KickoffStreams home"
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt="KickoffStreams"
                width={200}
                height={44}
                priority
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {NAV.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "mono text-[11px] uppercase tracking-[0.22em] transition-colors",
                      active
                        ? "text-ink"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "border-b pb-[2px]",
                        active ? "border-accent" : "border-transparent",
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="mono hidden items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted lg:flex">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
              <span>On air</span>
            </div>

            <Link
              href="/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center border border-transparent text-ink transition hover:border-hairline"
            >
              <Search className="h-4 w-4" strokeWidth={1.75} />
            </Link>

            <Link
              href="/sports/football"
              className="mono hidden items-center gap-2 rounded-sm bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition hover:bg-accent sm:inline-flex"
            >
              <Radio className="h-3.5 w-3.5" strokeWidth={2} />
              Watch Live
            </Link>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center border border-transparent text-ink transition hover:border-hairline md:hidden"
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-1 overflow-x-auto border-t border-hairline py-2.5 md:flex">
          <span className="mono shrink-0 pr-3 text-[10px] uppercase tracking-[0.22em] text-faint">
            Sports
          </span>
          <div className="flex items-center gap-1 overflow-x-auto">
            {SPORTS_TICKER.map((sport, i) => {
              const active = pathname === sport.href;
              return (
                <Link
                  key={sport.href}
                  href={sport.href}
                  className={cn(
                    "shrink-0 rounded-pill px-3 py-1 text-[12px] font-medium transition-colors",
                    active
                      ? "bg-ink text-paper"
                      : "text-ink-2 hover:bg-panel-soft",
                    i === 0 && "ml-0",
                  )}
                >
                  {sport.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-16 z-50 border-b border-hairline bg-paper md:hidden">
          <nav className="mx-auto flex max-w-[1360px] flex-col px-5 py-4 sm:px-8">
            {NAV.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-hairline py-4",
                    active ? "text-ink" : "text-muted",
                  )}
                >
                  <span className="serif text-xl">{link.label}</span>
                  <span className="mono text-[10px] uppercase tracking-[0.24em] text-faint">
                    0{NAV.indexOf(link) + 1}
                  </span>
                </Link>
              );
            })}

            <div className="mono mt-6 mb-2 text-[10px] uppercase tracking-[0.22em] text-faint">
              Sports
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SPORTS_TICKER.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="rounded-pill border border-hairline px-3 py-1 text-[12px] text-ink-2"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
