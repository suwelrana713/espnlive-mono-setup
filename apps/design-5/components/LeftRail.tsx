"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  Calendar,
  Search,
  Info,
  Mail,
  Trophy,
  Circle,
  Target,
  Zap,
  Activity,
  Award,
  Flame,
  Dumbbell,
  Star,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY = [
  { href: "/", label: "Scores", icon: Home },
  { href: "/sports", label: "Sports", icon: Layers },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/search", label: "Search", icon: Search },
] as const;

const SECONDARY = [
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

const SPORTS = [
  { id: "football", name: "Football", icon: Circle },
  { id: "basketball", name: "Basketball", icon: Target },
  { id: "american-football", name: "NFL", icon: Zap },
  { id: "tennis", name: "Tennis", icon: Star },
  { id: "cricket", name: "Cricket", icon: Trophy },
  { id: "baseball", name: "Baseball", icon: Award },
  { id: "hockey", name: "Hockey", icon: Activity },
  { id: "motor-sports", name: "Motor", icon: Flame },
  { id: "fight", name: "MMA", icon: Dumbbell },
  { id: "rugby", name: "Rugby", icon: Trophy },
  { id: "golf", name: "Golf", icon: Globe },
] as const;

export function LeftRail() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-[80px] flex flex-col gap-6">
        <nav>
          <p className="label mb-2 px-3">Navigate</p>
          <div className="flex flex-col gap-0.5">
            {PRIMARY.map((link) => {
              const Icon = link.icon;
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-semibold transition-colors",
                    active
                      ? "bg-primary text-white"
                      : "text-ink-2 hover:bg-surface-2",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div>
          <p className="label mb-2 px-3">Sports</p>
          <div className="flex flex-col gap-0.5">
            {SPORTS.map((sport) => {
              const Icon = sport.icon;
              const active = pathname === `/sports/${sport.id}`;
              return (
                <Link
                  key={sport.id}
                  href={`/sports/${sport.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] transition-colors",
                    active
                      ? "bg-primary-tint text-primary font-semibold"
                      : "text-ink-2 hover:bg-surface-2",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      active ? "text-primary" : "text-muted",
                    )}
                    strokeWidth={1.75}
                  />
                  {sport.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="label mb-2 px-3">More</p>
          <div className="flex flex-col gap-0.5">
            {SECONDARY.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] transition-colors",
                    active
                      ? "bg-surface-2 text-ink font-semibold"
                      : "text-muted hover:bg-surface-2 hover:text-ink",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-md border border-line bg-surface p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-live live-dot" />
            <span className="label !text-live">Live now</span>
          </div>
          <p className="text-[12px] leading-relaxed text-muted">
            Tap any match with a live badge to jump into HD mirrors.
          </p>
        </div>
      </div>
    </aside>
  );
}
