import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMatchesBySport, getSports } from "@/lib/api";
import { getMatchStatus } from "@/lib/types";
import { MatchCard } from "@/components/MatchCard";
import { GridSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Zap, Calendar } from "lucide-react";
import Link from "next/link";
import { ResponsiveAd } from "@/components/ads/AdBanner";
import { AdNativeBanner } from "@/components/ads/AdNativeBanner";

interface Props {
  params: Promise<{ sport: string }>;
}

const BASE_URL = 'https://espnlive.online'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport } = await params;
  const name = sport.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const sportUrl = `${BASE_URL}/sports/${sport}`;
  const title = `Watch Live ${name} Streams Online Free`;
  const description = `Watch live ${name.toLowerCase()} matches and streams online free in HD. Live scores, upcoming fixtures, and multiple stream sources.`;
  return {
    title,
    description,
    alternates: { canonical: sportUrl },
    openGraph: {
      type: 'website',
      url: sportUrl,
      title,
      description,
      siteName: 'ESPN Live',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `Live ${name} Streams` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const revalidate = 60;

async function MatchesList({ sport }: { sport: string }) {
  const matches = await getMatchesBySport(sport).catch(() => []);
  if (!matches.length) {
    return (
      <EmptyState
        title="No matches found"
        description={`No ${sport.replace("-", " ")} matches scheduled.`}
      />
    );
  }

  const live = matches.filter((m) => getMatchStatus(m.date) === "live");
  const upcoming = matches.filter((m) => getMatchStatus(m.date) === "upcoming");
  const finished = matches.filter((m) => getMatchStatus(m.date) === "finished");
  return (
    <div className="space-y-12">
      {live.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-2">
            <Zap className="h-4 w-4 text-red-400" />
            <h2 className="text-base font-bold text-white">
              Live Now{" "}
              <span className="ml-2 text-sm font-normal text-white/40">
                ({live.length})
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((m, i) => (
              <MatchCard key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white">
              Upcoming{" "}
              <span className="ml-2 text-sm font-normal text-white/40">
                ({upcoming.length})
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((m, i) => (
              <MatchCard key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <div className="mb-5">
            <h2 className="text-base font-bold text-white/50">
              Recent{" "}
              <span className="ml-2 text-sm font-normal text-white/30">
                ({finished.length})
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {finished.slice(0, 6).map((m, i) => (
              <MatchCard key={m.id} match={m} index={i} />
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex items-center gap-2 text-sm text-white/40">
        <Link href="/sports" className="transition hover:text-white">
          Sports
        </Link>
        <span>/</span>
        <span className="text-white">{name}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">{name}</h1>
        <p className="mt-1 text-sm text-white/40">
          Live & upcoming {name.toLowerCase()} matches
        </p>
      </div>

      <div className="mb-8">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <MatchesList sport={sport} />
      </Suspense>

      <div className="mt-12">
        <AdNativeBanner />
      </div>
    </div>
  );
}
