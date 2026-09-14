"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  Calendar,
  Search,
  Radio,
  Info,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Feed", icon: Home, code: "01" },
  { href: "/sports", label: "Sports", icon: Layers, code: "02" },
  { href: "/schedule", label: "Schedule", icon: Calendar, code: "03" },
  { href: "/search", label: "Search", icon: Search, code: "04" },
  { href: "/about", label: "About", icon: Info, code: "05" },
  { href: "/contact", label: "Contact", icon: Mail, code: "06" },
] as const;

const HOT_SPORTS = [
  { id: "football", short: "FBL" },
  { id: "basketball", short: "BKB" },
  { id: "tennis", short: "TEN" },
  { id: "cricket", short: "CKT" },
  { id: "american-football", short: "NFL" },
  { id: "fight", short: "MMA" },
] as const;

export function SideNav() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col justify-between border-r border-line bg-panel px-5 py-6 lg:flex">
      <div className="flex flex-col gap-8">
        <Link
          href="/"
          aria-label="SportVibeHub home"
          className="flex items-baseline gap-2"
        >
          <span className="display text-3xl font-bold leading-none text-fg">
            SportVibe
          </span>
          <span className="tag text-neon">// HUB</span>
        </Link>

        <div>
          <p className="tag mb-3 text-fg-faint">Nav</p>
          <nav className="flex flex-col gap-1">
            {NAV.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-tag border-l-2 px-3 py-2.5 transition-colors",
                    active
                      ? "border-neon bg-panel-2 text-fg"
                      : "border-transparent text-fg-dim hover:border-line-2 hover:bg-panel-2/60 hover:text-fg",
                  )}
                >
                  <span className="mono w-6 text-[10px] tabular-nums text-fg-faint">
                    {link.code}
                  </span>
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  <span className="display text-[14px] tracking-wide">
                    {link.label}
                  </span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-neon" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="tag mb-3 text-fg-faint">Quick sports</p>
          <div className="grid grid-cols-3 gap-1.5">
            {HOT_SPORTS.map((s) => {
              const active = pathname === `/sports/${s.id}`;
              return (
                <Link
                  key={s.id}
                  href={`/sports/${s.id}`}
                  title={s.id}
                  className={cn(
                    "mono flex items-center justify-center rounded-tag border py-2 text-[11px] font-bold tracking-wider transition",
                    active
                      ? "border-neon bg-neon/10 text-neon"
                      : "border-line-2 bg-panel-2 text-fg-dim hover:border-neon hover:text-fg",
                  )}
                >
                  {s.short}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="/sports/football"
          className="group flex items-center justify-between rounded-tag border border-line-2 bg-panel-2 p-3 transition hover:border-live"
        >
          <div>
            <p className="tag text-fg-faint">On air</p>
            <p className="display mt-1 text-[15px] text-fg">Live now</p>
          </div>
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-live" />
        </Link>
        <p className="mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
          v.01 · Broadcast Center
        </p>
      </div>
    </aside>
  );
}
