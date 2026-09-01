import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Flame, Layers, Zap } from "lucide-react";
import {
  getLiveMatches,
  getPopularMatches,
  getSports,
  getMatchesBySport,
} from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import type { Match } from "@/lib/types";
import { ScoreCardHero } from "@/components/ScoreCardHero";
import { CompetitionGroup } from "@/components/CompetitionGroup";
import { ScoreRow } from "@/components/ScoreRow";
import { SportTile } from "@/components/SportGrid";
import { SectionTitle } from "@/components/SectionTitle";
import {
  HeroSkeleton,
  ScoreListSkeleton,
  SportGridSkeleton,
} from "@/components/Skeletons";
import { EmptyState } from "@/components/EmptyState";
import { ResponsiveAd, AdBanner } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

export const revalidate = 60;

async function Feature() {
  const [live, popular] = await Promise.allSettled([
    getLiveMatches(),
    getPopularMatches(),
  ]);
  const liveMatches = live.status === "fulfilled" ? live.value : [];
  const popularMatches = popular.status === "fulfilled" ? popular.value : [];
  const featured = [...liveMatches, ...popularMatches];
  if (!featured.length) return null;
  return <ScoreCardHero matches={featured.slice(0, 8)} />;
}

async function LiveBoard() {
  let matches = await getLiveMatches().catch(() => []);
  if (!matches.length) {
    const football = await getMatchesBySport("football").catch(() => []);
    matches = football.filter((m) => getMatchStatus(m.date) === "live");
  }
  if (!matches.length)
    return (
      <EmptyState
        title="No live matches"
        description="Check back once broadcasts open."
      />
    );

  const grouped = groupByCategory(matches).slice(0, 4);
  return (
    <div className="space-y-4">
      {grouped.map(([cat, list]) => (
        <CompetitionGroup key={cat} category={cat} matches={list.slice(0, 5)} />
      ))}
    </div>
  );
}

async function TrendingBoard() {
  const raw = await getPopularMatches().catch(() => []);
  const matches = raw
    .slice()
    .sort((a, b) =>
      a.category === "football" ? -1 : b.category === "football" ? 1 : 0,
    );
  if (!matches.length) return <EmptyState title="No trending matches" />;
  return (
    <div className="card divide-y divide-line/60">
      {matches.slice(0, 8).map((m, i) => (
        <ScoreRow key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function UpcomingBoard() {
  const football = await getMatchesBySport("football").catch(() => []);
  const upcoming = football.filter(
    (m) => getMatchStatus(m.date) === "upcoming",
  );
  if (!upcoming.length) return <EmptyState title="No upcoming matches" />;
  return (
    <div className="card divide-y divide-line/60">
      {upcoming.slice(0, 8).map((m, i) => (
        <ScoreRow key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function ChannelBoard() {
  const [sports, football, basketball, tennis] = await Promise.allSettled([
    getSports(),
    getMatchesBySport("football"),
    getMatchesBySport("basketball"),
    getMatchesBySport("tennis"),
  ]);
  const allSports = sports.status === "fulfilled" ? sports.value : [];
  const counts: Record<string, number> = {
    football: football.status === "fulfilled" ? football.value.length : 0,
    basketball:
      basketball.status === "fulfilled" ? basketball.value.length : 0,
    tennis: tennis.status === "fulfilled" ? tennis.value.length : 0,
  };
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allSports.slice(0, 9).map((sport, i) => (
        <SportTile
          key={sport.id}
          sport={sport}
          matchCount={counts[sport.id]}
          index={i}
        />
      ))}
    </div>
  );
}

function groupByCategory(matches: Match[]) {
  const map: Record<string, Match[]> = {};
  for (const m of matches) {
    (map[m.category] ??= []).push(m);
  }
  return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
}

export default function HomePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-8">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              Today
            </span>
            <span className="mono text-[11px] text-muted">
              Sports desk · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="display text-[32px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[40px]">
            Live scores &amp; free streams.
          </h1>
          <p className="mt-2 max-w-xl text-[14px] text-muted">
            Real-time scores across football, basketball, tennis, cricket and
            more. Multiple HD mirrors per match, refreshed every minute.
          </p>
        </div>

        <Suspense fallback={<HeroSkeleton />}>
          <Feature />
        </Suspense>

        <div className="rounded-md border border-line bg-surface py-3">
          <ResponsiveAd mobile="320x50" desktop="728x90" />
        </div>

        <section>
          <SectionTitle
            title="Live now"
            subtitle="Matches in progress across every competition"
            accent="live"
            icon={<Zap className="h-4 w-4" strokeWidth={2} fill="currentColor" />}
            aside={
              <Link
                href="/schedule"
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:text-primary-2"
              >
                Full schedule
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <Suspense fallback={<ScoreListSkeleton count={5} />}>
            <LiveBoard />
          </Suspense>
        </section>

        <AdNativeBanner />

        <section>
          <SectionTitle
            title="Trending matches"
            subtitle="Most watched fixtures right now"
            accent="cool"
            icon={<Flame className="h-4 w-4" strokeWidth={2} />}
          />
          <Suspense fallback={<ScoreListSkeleton count={6} />}>
            <TrendingBoard />
          </Suspense>
        </section>
      </div>

      <aside className="min-w-0 space-y-8">
        <div className="flex justify-center">
          <AdBanner size="300x250" />
        </div>

        <section>
          <SectionTitle
            title="Upcoming"
            subtitle="Next kick-offs"
            accent="primary"
            icon={<Calendar className="h-4 w-4" strokeWidth={2} />}
          />
          <Suspense fallback={<ScoreListSkeleton count={4} />}>
            <UpcomingBoard />
          </Suspense>
        </section>

        <section>
          <SectionTitle
            title="Browse sports"
            subtitle="All available channels"
            accent="warn"
            icon={<Layers className="h-4 w-4" strokeWidth={2} />}
            aside={
              <Link
                href="/sports"
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:text-primary-2"
              >
                See all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <Suspense fallback={<SportGridSkeleton count={6} />}>
            <ChannelBoard />
          </Suspense>
        </section>
      </aside>
    </div>
  );
}
