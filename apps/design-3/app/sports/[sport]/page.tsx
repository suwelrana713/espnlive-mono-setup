import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getMatchesBySport, getSports } from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import { MatchRow } from "@/components/MatchRow";
import { MatchesLoadMore } from "@/components/MatchesLoadMore";
import { SectionHead, Eyebrow } from "@/components/Eyebrow";
import { MatchListSkeleton } from "@/components/Skeletons";
import { EmptyPanel } from "@/components/EmptyPanel";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

interface Props {
  params: Promise<{ sport: string }>;
}

const BASE_URL = "https://espnlive.online";

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
      siteName: "ESPN Live",
      images: [
        {
          url: "/og-image.png",
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

async function SportListing({ sport }: { sport: string }) {
  const matches = await getMatchesBySport(sport).catch(() => []);
  if (!matches.length) {
    return (
      <EmptyPanel
        title="No matches scheduled"
        description={`Nothing on the wire for ${sport.replace("-", " ")} right now.`}
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
          <Eyebrow number="A">Live now · {live.length} listing{live.length === 1 ? "" : "s"}</Eyebrow>
          <div className="mt-4 border-t border-hairline">
            {live.map((m, i) => (
              <MatchRow key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}

      {live.length > 0 && upcoming.length > 0 && (
        <div className="border-y border-hairline bg-panel-soft/60 py-3">
          <ResponsiveAd mobile="320x50" desktop="468x60" />
        </div>
      )}

      {upcoming.length > 0 && (
        <section>
          <Eyebrow number="B">
            Upcoming · {upcoming.length} listing{upcoming.length === 1 ? "" : "s"}
          </Eyebrow>
          <div className="mt-4">
            <MatchesLoadMore matches={upcoming} step={12} />
          </div>
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <Eyebrow number="C">Full time · Recent</Eyebrow>
          <div className="mt-4 border-t border-hairline">
            {finished.slice(0, 6).map((m, i) => (
              <MatchRow key={m.id} match={m} index={i} />
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

  return (
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
      <div className="border-b border-hairline py-8">
        <Link
          href="/sports"
          className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted transition hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Back to index
        </Link>
        <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="eyebrow">Sport · {sport}</p>
            <h1 className="serif mt-3 text-[52px] font-black leading-[0.95] tracking-tight text-ink sm:text-[80px]">
              {name}
            </h1>
          </div>
          <p className="max-w-sm text-muted sm:text-right">
            Live and upcoming {name.toLowerCase()} matches — every mirror, one
            index.
          </p>
        </div>
      </div>

      <div className="border-b border-hairline bg-panel-soft/60 py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="py-14">
        <Suspense fallback={<MatchListSkeleton count={8} />}>
          <SportListing sport={sport} />
        </Suspense>
      </section>

      <AdNativeBanner />
    </div>
  );
}
