import { Suspense } from "react";
import {
  getLiveMatches,
  getPopularMatches,
  getSports,
  getMatchesBySport,
} from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import { HeroBanner } from "@/components/HeroBanner";
import { MatchCard } from "@/components/MatchCard";
import { SportCard } from "@/components/SportCard";
import { HeroSkeleton, GridSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Zap, TrendingUp, Clock, Calendar } from "lucide-react";
import { ResponsiveAd, AdBanner } from "@/components/ads/AdBanner";
import { AdNativeBanner } from "@/components/ads/AdNativeBanner";

export const revalidate = 60;

async function HeroSection() {
  const [live, popular] = await Promise.allSettled([
    getLiveMatches(),
    getPopularMatches(),
  ]);
  const liveMatches = live.status === "fulfilled" ? live.value : [];
  const popularMatches = popular.status === "fulfilled" ? popular.value : [];
  const featured = [...(liveMatches || []), ...(popularMatches || [])];
  // .slice()
  // .sort((a, b) =>
  //   a.category === "football" ? -1 : b.category === "football" ? 1 : 0,
  // );
  if (!featured.length) return null;
  return <HeroBanner match={featured.slice(0, 8)} />;
}

async function LiveSection() {
  let matches = await getLiveMatches().catch(() => []);
  if (!matches.length) {
    const football = await getMatchesBySport("football").catch(() => []);
    matches = football.filter((m) => getMatchStatus(m.date) === "live");
  }
  matches = matches
    .slice()
    .sort((a, b) =>
      a.category === "football" ? -1 : b.category === "football" ? 1 : 0,
    );
  if (!matches.length)
    return (
      <EmptyState
        title="No live matches"
        description="Check back soon for live events."
      />
    );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matches.slice(0, 6).map((m, i) => (
        <MatchCard key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function PopularSection() {
  const raw = await getPopularMatches().catch(() => []);
  const matches = raw
    .slice()
    .sort((a, b) =>
      a.category === "football" ? -1 : b.category === "football" ? 1 : 0,
    );
  if (!matches.length) return <EmptyState title="No popular matches" />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matches.slice(0, 6).map((m, i) => (
        <MatchCard key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function UpcomingSection() {
  const football = await getMatchesBySport("football").catch(() => []);
  const upcoming = football.filter(
    (m) => getMatchStatus(m.date) === "upcoming",
  );
  if (!upcoming.length) return <EmptyState title="No upcoming matches" />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {upcoming.slice(0, 6).map((m, i) => (
        <MatchCard key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function SportsSection() {
  const [sports, football, basketball, tennis] = await Promise.allSettled([
    getSports(),
    getMatchesBySport("football"),
    getMatchesBySport("basketball"),
    getMatchesBySport("tennis"),
  ]);

  const allSports = sports.status === "fulfilled" ? sports.value : [];
  const counts: Record<string, number> = {
    football: football.status === "fulfilled" ? football.value.length : 0,
    basketball: basketball.status === "fulfilled" ? basketball.value.length : 0,
    tennis: tennis.status === "fulfilled" ? tennis.value.length : 0,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {allSports.slice(0, 10).map((sport, i) => (
        <SportCard
          key={sport.id}
          sport={sport}
          matchCount={counts[sport.id]}
          index={i}
        />
      ))}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/60">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {subtitle && <p className="text-xs text-white/40">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="mt-8">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <div className="mt-12 space-y-16">
        <section>
          <SectionHeader
            icon={<Zap className="h-5 w-5" />}
            title="Live Now"
            subtitle="Matches happening right now"
          />
          <Suspense fallback={<GridSkeleton />}>
            <LiveSection />
          </Suspense>
        </section>

        <AdNativeBanner />

        <section>
          <SectionHeader
            icon={<TrendingUp className="h-5 w-5" />}
            title="Trending Matches"
            subtitle="Most watched events"
          />
          <Suspense fallback={<GridSkeleton />}>
            <PopularSection />
          </Suspense>
        </section>

        <div className="flex justify-center">
          <AdBanner size="300x250" />
        </div>

        <section>
          <SectionHeader
            icon={<Calendar className="h-5 w-5" />}
            title="Upcoming"
            subtitle="Don't miss these events"
          />
          <Suspense fallback={<GridSkeleton />}>
            <UpcomingSection />
          </Suspense>
        </section>

        <div className="hidden md:flex justify-center">
          <AdBanner size="728x90" />
        </div>

        <section>
          <SectionHeader
            icon={<Clock className="h-5 w-5" />}
            title="Sports Categories"
            subtitle="Browse by sport"
          />
          <Suspense fallback={<GridSkeleton count={10} />}>
            <SportsSection />
          </Suspense>
        </section>

        <AdNativeBanner />
      </div>
    </div>
  );
}
