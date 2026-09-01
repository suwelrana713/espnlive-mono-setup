"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Layers, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Scores", icon: Home },
  { href: "/sports", label: "Sports", icon: Layers },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/search", label: "Search", icon: Search },
] as const;

export function MobileTabs() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-surface/95 backdrop-blur-md lg:hidden">
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
              "flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors",
              active ? "text-primary" : "text-muted hover:text-ink",
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.75} />
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
