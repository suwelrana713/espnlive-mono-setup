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
import { ScoreHero } from "@/components/ScoreHero";
import { MatchTile } from "@/components/MatchTile";
import { SportBrick } from "@/components/SportBrick";
import { SectionBar } from "@/components/SectionBar";
import {
  HeroSkeleton,
  TileGridSkeleton,
  BrickGridSkeleton,
} from "@/components/Skeletons";
import { EmptyBlock } from "@/components/EmptyBlock";
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
  return <ScoreHero matches={featured.slice(0, 8)} />;
}

async function LiveDeck() {
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
      <EmptyBlock
        title="No live signal"
        description="The wire is quiet. Check back for a fresh broadcast."
      />
    );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matches.slice(0, 6).map((m, i) => (
        <MatchTile key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function TrendingDeck() {
  const raw = await getPopularMatches().catch(() => []);
  const matches = raw
    .slice()
    .sort((a, b) =>
      a.category === "football" ? -1 : b.category === "football" ? 1 : 0,
    );
  if (!matches.length) return <EmptyBlock title="No trending broadcasts" />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matches.slice(0, 6).map((m, i) => (
        <MatchTile key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function UpcomingDeck() {
  const football = await getMatchesBySport("football").catch(() => []);
  const upcoming = football.filter(
    (m) => getMatchStatus(m.date) === "upcoming",
  );
  if (!upcoming.length) return <EmptyBlock title="No upcoming broadcasts" />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {upcoming.slice(0, 6).map((m, i) => (
        <MatchTile key={m.id} match={m} index={i} />
      ))}
    </div>
  );
}

async function ChannelDeck() {
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
        <SportBrick
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
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
            // Broadcast center · Live feed
          </p>
          <h1 className="display mt-3 text-[44px] font-bold leading-[0.98] text-fg sm:text-[68px]">
            Every match, one signal.
          </h1>
        </div>
        <p className="max-w-sm text-sm text-fg-mid lg:text-right">
          Fifteen sports, multiple mirrors per fixture. Free, HD, no
          registration. Refreshed every minute.
        </p>
      </div>

      <Suspense fallback={<HeroSkeleton />}>
        <Feature />
      </Suspense>

      <div className="my-10 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="mb-14">
        <SectionBar
          code="02"
          eyebrow="Live desk"
          title="On air now"
          aside={
            <Link
              href="/schedule"
              className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neon hover:text-fg"
            >
              Full schedule
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <Suspense fallback={<TileGridSkeleton count={6} />}>
          <LiveDeck />
        </Suspense>
      </section>

      <AdNativeBanner />

      <section className="mb-14">
        <SectionBar
          code="03"
          eyebrow="Trending · Most watched"
          title="Prime channels"
        />
        <Suspense fallback={<TileGridSkeleton count={6} />}>
          <TrendingDeck />
        </Suspense>
      </section>

      <div className="my-10 flex justify-center">
        <AdBanner size="300x250" />
      </div>

      <section className="mb-14">
        <SectionBar
          code="04"
          eyebrow="On deck · Coming up"
          title="Scheduled broadcasts"
        />
        <Suspense fallback={<TileGridSkeleton count={6} />}>
          <UpcomingDeck />
        </Suspense>
      </section>

      <div className="my-10 hidden justify-center md:flex">
        <AdBanner size="728x90" />
      </div>

      <section className="mb-14">
        <SectionBar
          code="05"
          eyebrow="Channel index · 15 categories"
          title="Browse channels"
          aside={
            <Link
              href="/sports"
              className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neon hover:text-fg"
            >
              Full index
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <Suspense fallback={<BrickGridSkeleton count={10} />}>
          <ChannelDeck />
        </Suspense>
      </section>

      <AdNativeBanner />
    </div>
  );
}
