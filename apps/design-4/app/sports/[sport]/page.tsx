import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getMatchesBySport, getSports } from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import { MatchTile } from "@/components/MatchTile";
import { MatchesLoadMore } from "@/components/MatchesLoadMore";
import { SectionBar } from "@/components/SectionBar";
import { TileGridSkeleton } from "@/components/Skeletons";
import { EmptyBlock } from "@/components/EmptyBlock";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

interface Props {
  params: Promise<{ sport: string }>;
}

const BASE_URL = "https://sportvibehub.online";

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
      siteName: "SportVibeHub",
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
      <EmptyBlock
        title="Channel offline"
        description={`No ${sport.replace("-", " ")} broadcasts scheduled right now.`}
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
    <div className="space-y-16">
      {live.length > 0 && (
        <section>
          <SectionBar
            code="A"
            eyebrow={`On air · ${live.length} broadcast${live.length === 1 ? "" : "s"}`}
            title="Live now"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((m, i) => (
              <MatchTile key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}

      {live.length > 0 && upcoming.length > 0 && (
        <div className="rounded-panel border border-line-2 bg-panel py-3">
          <ResponsiveAd mobile="320x50" desktop="468x60" />
        </div>
      )}

      {upcoming.length > 0 && (
        <section>
          <SectionBar
            code="B"
            eyebrow={`Scheduled · ${upcoming.length} broadcast${upcoming.length === 1 ? "" : "s"}`}
            title="On deck"
          />
          <MatchesLoadMore matches={upcoming} step={12} />
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <SectionBar
            code="C"
            eyebrow="Archive · Full time"
            title="Recent broadcasts"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finished.slice(0, 6).map((m, i) => (
              <MatchTile key={m.id} match={m} index={i} />
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
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="border-b border-line pb-8">
        <Link
          href="/sports"
          className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim transition hover:text-neon"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Back to channels
        </Link>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
              // Channel · {sport}
            </p>
            <h1 className="display mt-3 text-3xl sm:text-4xl md:text-[52px] font-bold leading-[0.95] text-fg sm:text-[80px]">
              {name}
            </h1>
          </div>
          <p className="max-w-sm text-fg-mid lg:text-right">
            Live and scheduled {name.toLowerCase()} broadcasts — every mirror,
            one signal.
          </p>
        </div>
      </div>

      <div className="my-10 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <Suspense fallback={<TileGridSkeleton count={6} />}>
        <ChannelListing sport={sport} />
      </Suspense>

      <div className="mt-14">
        <AdNativeBanner />
      </div>
    </div>
  );
}
