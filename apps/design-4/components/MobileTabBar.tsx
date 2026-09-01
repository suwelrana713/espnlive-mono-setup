"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Layers, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/sports", label: "Sports", icon: Layers },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/search", label: "Search", icon: Search },
] as const;

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-panel/95 backdrop-blur-md lg:hidden">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active =
          pathname === tab.href ||
          (tab.href !== "/" && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 border-t-2 py-3 text-fg-dim transition-colors",
              active
                ? "border-neon text-fg"
                : "border-transparent hover:text-fg-mid",
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={active ? 2 : 1.5} />
            <span className="mono text-[10px] uppercase tracking-[0.22em]">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
