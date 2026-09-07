import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getLiveMatches,
  getPopularMatches,
  getSports,
  getMatchesBySport,
} from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import { HeroFeature } from "@/components/HeroFeature";
import { MatchRow } from "@/components/MatchRow";
import { SportTile } from "@/components/SportTile";
import { SectionHead } from "@/components/Eyebrow";
import {
  HeroSkeleton,
  MatchListSkeleton,
  SportGridSkeleton,
} from "@/components/Skeletons";
import { EmptyPanel } from "@/components/EmptyPanel";
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
  const featured = [...(liveMatches || []), ...(popularMatches || [])];
  if (!featured.length) return null;
  return <HeroFeature matches={featured.slice(0, 8)} />;
}

async function LiveDesk() {
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
      <EmptyPanel
        title="No live matches"
        description="The wire is quiet. Check back soon for live events."
      />
    );
  return (
    <div className="border-t border-hairline">
      {matches.slice(0, 6).map((m, i) => (
        <MatchRow key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function TrendingDesk() {
  const raw = await getPopularMatches().catch(() => []);
  const matches = raw
    .slice()
    .sort((a, b) =>
      a.category === "football" ? -1 : b.category === "football" ? 1 : 0,
    );
  if (!matches.length)
    return <EmptyPanel title="No popular matches" />;
  return (
    <div className="border-t border-hairline">
      {matches.slice(0, 6).map((m, i) => (
        <MatchRow key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function UpcomingDesk() {
  const football = await getMatchesBySport("football").catch(() => []);
  const upcoming = football.filter(
    (m) => getMatchStatus(m.date) === "upcoming",
  );
  if (!upcoming.length)
    return <EmptyPanel title="No upcoming matches" />;
  return (
    <div className="border-t border-hairline">
      {upcoming.slice(0, 6).map((m, i) => (
        <MatchRow key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function CategoriesDesk() {
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
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {allSports.slice(0, 10).map((sport, i) => (
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

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
      <div className="border-b border-hairline py-8">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="eyebrow">Volume 01 · Sports desk · Today</p>
            <h1 className="serif mt-3 text-2xl sm:text-3xl md:text-[44px] font-black leading-[0.95] tracking-tight text-ink sm:text-[68px]">
              The daily wire on live sport.
            </h1>
          </div>
          <p className="max-w-sm text-sm text-muted sm:text-right">
            Fifteen sports. Multiple mirrors per match. Free, in HD, no
            registration — refreshed every minute from the source.
          </p>
        </div>
      </div>

      <section className="py-10 sm:py-14">
        <Suspense fallback={<HeroSkeleton />}>
          <Feature />
        </Suspense>
      </section>

      <div className="border-y border-hairline bg-panel-soft/60 py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="py-14">
        <SectionHead
          number="02"
          eyebrow="Live desk · Updating"
          title="Live now"
          aside={
            <Link
              href="/schedule"
              className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink transition hover:text-accent"
            >
              Full schedule
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <Suspense fallback={<MatchListSkeleton count={4} />}>
          <LiveDesk />
        </Suspense>
      </section>

      <AdNativeBanner />

      <section className="py-14">
        <SectionHead
          number="03"
          eyebrow="Trending · Most watched"
          title="What everyone’s tuning in for"
        />
        <Suspense fallback={<MatchListSkeleton count={4} />}>
          <TrendingDesk />
        </Suspense>
      </section>

      <div className="my-8 flex justify-center">
        <AdBanner size="300x250" />
      </div>

      <section className="py-14">
        <SectionHead
          number="04"
          eyebrow="Fixture list · Coming up"
          title="On the horizon"
        />
        <Suspense fallback={<MatchListSkeleton count={4} />}>
          <UpcomingDesk />
        </Suspense>
      </section>

      <div className="my-8 hidden justify-center md:flex">
        <AdBanner size="728x90" />
      </div>

      <section className="py-14">
        <SectionHead
          number="05"
          eyebrow="Categories · Full index"
          title="Browse by sport"
          aside={
            <Link
              href="/sports"
              className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink transition hover:text-accent"
            >
              All 15 categories
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <Suspense fallback={<SportGridSkeleton count={10} />}>
          <CategoriesDesk />
        </Suspense>
      </section>

      <AdNativeBanner />
    </div>
  );
}
