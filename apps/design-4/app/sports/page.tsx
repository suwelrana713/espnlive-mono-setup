import type { Metadata } from "next";
import { Suspense } from "react";
import { getSports, getMatchesBySport } from "@/lib/api";
import { SportBrick } from "@/components/SportBrick";
import { SectionBar } from "@/components/SectionBar";
import { BrickGridSkeleton } from "@/components/Skeletons";
import { EmptyBlock } from "@/components/EmptyBlock";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

const BASE_URL = "https://livesofascore.online";

export const metadata: Metadata = {
  title: "All Sports — Live Scores & Free Live Streams",
  description:
    "Browse every sport we cover — football, basketball, tennis, cricket, F1, MMA, NFL, hockey, baseball, rugby, golf and darts. Live scores and free HD streams for every fixture.",
  keywords: [
    "all sports live",
    "live sports categories",
    "live sports index",
    "live scores all sports",
    "watch live sports free",
  ],
  alternates: { canonical: `${BASE_URL}/sports` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/sports`,
    siteName: "Live Score",
    title: "All Sports — Live Scores & Free Live Streams",
    description:
      "Every sport covered on Live Score. Live scores and free HD streams, refreshed every minute.",
  },
};

export const revalidate = 300;

async function SportsIndex() {
  const sports = await getSports().catch(() => []);
  if (!sports.length) return <EmptyBlock title="No channels found" />;

  const countResults = await Promise.allSettled(
    sports.map((s) => getMatchesBySport(s.id)),
  );
  const counts: Record<string, number> = {};
  sports.forEach((s, i) => {
    const r = countResults[i];
    counts[s.id] = r.status === "fulfilled" ? r.value.length : 0;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {sports.map((sport, i) => (
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

const SPORTS_FAQ = [
  {
    q: "Which sports does Live Score cover?",
    a: "Football, basketball, American football (NFL), ice hockey, baseball, motor sports (F1, MotoGP), MMA/UFC, tennis, cricket, rugby, golf and darts — with more added as they appear on the wire.",
  },
  {
    q: "Are all live streams free on Live Score?",
    a: "Yes. Every sport channel, every fixture and every mirror is free. No signup, no subscription.",
  },
  {
    q: "How often are live scores refreshed?",
    a: "Live scores and fixtures update every minute from the source.",
  },
];

export default function SportsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sports",
        item: `${BASE_URL}/sports`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SPORTS_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mb-10 border-b border-line pb-8">
        <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
          // Channels · Full index
        </p>
        <h1 className="display mt-3 text-[44px] font-bold leading-[0.98] text-fg sm:text-[64px]">
          All Sports — Live Scores &amp; Free Live Streams
        </h1>
        <p className="mt-4 max-w-2xl text-fg-mid">
          Every sport we index — football, basketball, cricket, tennis, F1, MMA,
          NFL, hockey, baseball, rugby, golf and darts. Real-time live scores
          and free HD streams for each fixture, refreshed every minute.
        </p>
      </div>

      <div className="mb-10 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="mb-14">
        <SectionBar code="01" eyebrow="Catalog · A to Z" title="Channels" />
        <Suspense fallback={<BrickGridSkeleton count={15} />}>
          <SportsIndex />
        </Suspense>
      </section>

      <AdNativeBanner />

      <section className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
        <div>
          <h2 className="display text-2xl font-bold text-fg">
            One index for every live sport
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-fg-mid">
            Live Score aggregates every major sport in one place. Pick a
            channel above to see today’s fixtures with real-time live scores
            and free HD live streams. Whether you want Premier League football,
            NBA basketball, IPL cricket, ATP tennis, F1 timing or a UFC PPV,
            you’ll find the fixture, the score and the stream — no signup, no
            paywall.
          </p>
        </div>
        <div className="rounded-panel border border-line bg-panel p-6">
          <h2 className="display text-xl font-bold text-fg">FAQ</h2>
          <dl className="mt-4 space-y-4">
            {SPORTS_FAQ.map((f) => (
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
