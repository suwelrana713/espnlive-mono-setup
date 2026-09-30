import { Suspense } from "react";
import type { Metadata } from "next";
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

const BASE_URL = "https://livesofascore.online";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Live Score — Live Scores, Fixtures & Free Sports Streams",
  description:
    "Real-time live scores and free HD live sports streams. Football, basketball, cricket, tennis, F1, MMA, NFL and more — refreshed every minute. A fast, free SofaScore-style alternative.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Live Score",
    title: "Live Score — Free Live Sports Streams & Live Scores",
    description:
      "Free live scores and HD live streams for football, basketball, cricket, tennis, F1, MMA, NFL and more.",
  },
};

const HOME_FAQS = [
  {
    q: "What is Live Score?",
    a: "Live Score (livesofascore.online) is a free live sports score and streaming index. Watch live football, basketball, cricket, tennis, F1, MMA and more in HD, and follow real-time live scores updated every minute.",
  },
  {
    q: "Is Live Score a SofaScore alternative?",
    a: "Yes. Live Score offers a fast, ad-supported alternative to SofaScore with live scores, fixtures, and, in addition, free HD live streams for major sports.",
  },
  {
    q: "How much does it cost to watch live sports on Live Score?",
    a: "Nothing. All live scores and live streams are free. No signup, no subscription, no credit card.",
  },
  {
    q: "Which sports have live scores and streams?",
    a: "Football (soccer), basketball, tennis, cricket, American football (NFL), ice hockey, baseball, motor sports (F1, MotoGP), MMA/UFC, rugby, golf and darts.",
  },
];

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

export default async function HomePage() {
  const liveForSchema = await getLiveMatches().catch(() => []);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Live sports events — on air now",
    itemListElement: liveForSchema.slice(0, 10).map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/match/${encodeURIComponent(m.id)}`,
      name: m.title,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mb-10 flex flex-col gap-4 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
            // Broadcast center · Live feed
          </p>
          <h1 className="display mt-3 text-2xl sm:text-3xl md:text-[44px] font-bold leading-[0.98] text-fg sm:text-[68px]">
            Live Scores &amp; Free Live Sports Streams.
          </h1>
        </div>
        <p className="max-w-sm text-sm text-fg-mid lg:text-right">
          Live scores, fixtures and free HD streams for football, basketball,
          cricket, tennis, F1, MMA and more — multiple mirrors per match,
          refreshed every minute.
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

      <section className="mt-16 grid gap-10 border-t border-line pt-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 text-fg-mid">
          <h2 className="display text-2xl font-bold text-fg sm:text-3xl">
            Live scores and free live sports streams, all in one place
          </h2>
          <p className="text-sm leading-relaxed">
            Live Score (livesofascore.online) is a free live sports index built
            for fans who want <strong>real-time live scores</strong> and
            <strong> HD live streams</strong> in the same place. Follow live
            football scores, NBA scores, cricket scores, tennis scores, NFL
            scores, F1 timing, MMA/UFC results and more — updated every minute
            from the source.
          </p>
          <p className="text-sm leading-relaxed">
            Looking for a <strong>SofaScore alternative</strong>? Live Score
            covers the same fixtures and results — with the added bonus of free
            HD live streams for every major sport. No signup, no paywall, no
            credit card. Pick a match, choose a mirror, watch.
          </p>
          <h3 className="display text-xl font-bold text-fg">
            Sports covered with live scores &amp; streams
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
            <li>Football / soccer live score</li>
            <li>Basketball / NBA live score</li>
            <li>Cricket live score</li>
            <li>Tennis live score</li>
            <li>American football / NFL</li>
            <li>Ice hockey / NHL</li>
            <li>Baseball / MLB</li>
            <li>Motor sports — F1, MotoGP</li>
            <li>MMA / UFC live results</li>
            <li>Rugby live score</li>
            <li>Golf leaderboard</li>
            <li>Darts live score</li>
          </ul>
        </div>
        <div className="rounded-panel border border-line bg-panel p-6">
          <h2 className="display text-xl font-bold text-fg">FAQ</h2>
          <dl className="mt-4 space-y-4">
            {HOME_FAQS.map((f) => (
              <div key={f.q}>
                <dt className="display text-[15px] font-bold text-fg">{f.q}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-fg-mid">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
