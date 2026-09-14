import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Calendar, CheckCircle2, Zap } from "lucide-react";
import { getMatchesBySport, getSports } from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import { ScoreRow } from "@/components/ScoreRow";
import { MatchesLoadMore } from "@/components/MatchesLoadMore";
import { SectionTitle } from "@/components/SectionTitle";
import { ScoreListSkeleton } from "@/components/Skeletons";
import { EmptyState } from "@/components/EmptyState";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

interface Props {
  params: Promise<{ sport: string }>;
}

const BASE_URL = "https://fanzonelive.online";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport } = await params;
  const name = sport
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const sportUrl = `${BASE_URL}/sports/${sport}`;
  const title = `Watch Live ${name} Streams Online Free`;
  const description = `Watch live ${name.toLowerCase()} matches and streams online free in HD. Live scores, upcoming fixtures, and multiple stream sources.`;
  return {
    title,
    description,
    alternates: { canonical: sportUrl },
    openGraph: {
      type: "website",
      url: sportUrl,
      title,
      description,
      siteName: "FanZoneLive",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `Live ${name} Streams`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const revalidate = 60;
export const dynamicParams = true;

const PRERENDER_SPORTS = [
  "football",
  "basketball",
  "american-football",
  "hockey",
  "baseball",
  "motor-sports",
  "fight",
  "tennis",
  "cricket",
  "rugby",
  "golf",
  "darts",
];

export function generateStaticParams() {
  return PRERENDER_SPORTS.map((sport) => ({ sport }));
}

async function ChannelListing({ sport }: { sport: string }) {
  const matches = await getMatchesBySport(sport).catch(() => []);
  if (!matches.length) {
    return (
      <EmptyState
        title="No matches"
        description={`No ${sport.replace("-", " ")} matches scheduled right now.`}
      />
    );
  }

  const live = matches.filter((m) => getMatchStatus(m.date) === "live");
  const upcoming = matches.filter(
    (m) => getMatchStatus(m.date) === "upcoming",
  );
  const finished = matches.filter(
    (m) => getMatchStatus(m.date) === "finished",
  );

  return (
    <div className="space-y-10">
      {live.length > 0 && (
        <section>
          <SectionTitle
            title={`Live now · ${live.length}`}
            accent="live"
            icon={<Zap className="h-4 w-4" fill="currentColor" strokeWidth={2} />}
          />
          <div className="card divide-y divide-line/60">
            {live.map((m, i) => (
              <ScoreRow key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}

      {live.length > 0 && upcoming.length > 0 && (
        <div className="rounded-md border border-line bg-surface py-3">
          <ResponsiveAd mobile="320x50" desktop="468x60" />
        </div>
      )}

      {upcoming.length > 0 && (
        <section>
          <SectionTitle
            title={`Upcoming · ${upcoming.length}`}
            accent="primary"
            icon={<Calendar className="h-4 w-4" strokeWidth={2} />}
          />
          <MatchesLoadMore matches={upcoming} step={12} />
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <SectionTitle
            title={`Recent results · ${finished.length}`}
            accent="cool"
            icon={<CheckCircle2 className="h-4 w-4" strokeWidth={2} />}
          />
          <div className="card divide-y divide-line/60">
            {finished.slice(0, 8).map((m, i) => (
              <ScoreRow key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default async function SportPage({ params }: Props) {
  const { sport } = await params;
  const sports = await getSports().catch(() => []);
  const sportData = sports.find((s) => s.id === sport);
  if (!sportData && !sports.length) notFound();
  const name =
    sportData?.name ??
    sport.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: `${BASE_URL}/sports/${sport}`,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div>
        <Link
          href="/sports"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary transition hover:text-primary-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All sports
        </Link>
        <div className="mt-4">
          <span className="mono text-[11px] uppercase tracking-widest text-muted">
            Channel · {sport}
          </span>
          <h1 className="display mt-2 text-[26px] font-extrabold leading-[1.05] text-ink sm:text-[36px] md:text-[52px]">
            {name}
          </h1>
          <p className="mt-2 max-w-xl text-[14px] text-muted">
            Live and upcoming {name.toLowerCase()} matches. Every mirror, one
            index.
          </p>
        </div>
      </div>

      <div className="rounded-md border border-line bg-surface py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <Suspense fallback={<ScoreListSkeleton count={8} />}>
        <ChannelListing sport={sport} />
      </Suspense>

      <AdNativeBanner />
    </div>
  );
}
