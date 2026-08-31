import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMatchById, getStreams, getMatchesBySport } from "@/lib/api";
import { getMatchStatus, formatMatchDate, formatMatchTime } from "@/lib/types";
import { getBadgeUrl } from "@/lib/utils";
import { LiveBadge, UpcomingBadge } from "@/components/LiveBadge";
import { MatchCard } from "@/components/MatchCard";
import { EmptyState } from "@/components/EmptyState";
import { MatchViewer } from "./MatchViewer";
import { ShareButton } from "./ShareButton";
import { Calendar, ChevronLeft, Users, Activity } from "lucide-react";
import { ResponsiveAd, AdBanner } from "@/components/ads/AdBanner";
import { AdNativeBanner } from "@/components/ads/AdNativeBanner";

export const revalidate = 30;

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cat?: string }>;
}

const BASE_URL = 'https://espnlive.online'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const match = await getMatchById(id).catch(() => null);
  if (!match) return { title: "Match Not Found" };

  const homeTeam = match.teams?.home.name;
  const awayTeam = match.teams?.away.name;
  const title = homeTeam && awayTeam
    ? `${homeTeam} vs ${awayTeam} Live Stream`
    : `${match.title} Live Stream`;
  const sport = match.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const dateStr = new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const description = homeTeam && awayTeam
    ? `Watch ${homeTeam} vs ${awayTeam} live stream free online in HD. ${sport} match on ${dateStr}. Multiple stream sources available.`
    : `Watch ${match.title} live stream free online in HD. ${sport} on ${dateStr}.`;

  const matchUrl = `${BASE_URL}/match/${id}`;

  return {
    title,
    description,
    alternates: { canonical: matchUrl },
    openGraph: {
      type: 'website',
      url: matchUrl,
      title,
      description,
      siteName: 'ESPN Live',
      images: match.poster ? [{ url: match.poster, alt: title }] : [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function MatchPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { cat } = await searchParams;

  const match = await getMatchById(id).catch(() => null);
  if (!match) notFound();

  const status = getMatchStatus(match.date);

  const streamsResults = await Promise.allSettled(
    match.sources.map((s) => getStreams(s.source, s.id)),
  );
  const streams = streamsResults
    .filter((r) => r.status === "fulfilled")
    .flatMap(
      (r) =>
        (r as PromiseFulfilledResult<Awaited<ReturnType<typeof getStreams>>>)
          .value,
    );

  const related = await getMatchesBySport(match.category).catch(() => []);
  const relatedMatches = related.filter((m) => m.id !== match.id).slice(0, 4);

  const matchUrl = `${BASE_URL}/match/${id}`;
  const sportsEventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: match.title,
    startDate: new Date(match.date).toISOString(),
    sport: match.category.replace(/-/g, ' '),
    url: matchUrl,
    ...(match.teams && {
      homeTeam: { '@type': 'SportsTeam', name: match.teams.home.name },
      awayTeam: { '@type': 'SportsTeam', name: match.teams.away.name },
    }),
    location: {
      '@type': 'VirtualLocation',
      url: matchUrl,
    },
    organizer: {
      '@type': 'Organization',
      name: 'ESPN Live',
      url: BASE_URL,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventJsonLd) }}
      />
      <Link
        href={cat ? `/sports/${cat}` : "/"}
        className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-6">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
            <div className="mb-4 flex items-center gap-3">
              {status === "live" ? (
                <LiveBadge />
              ) : status === "upcoming" ? (
                <UpcomingBadge />
              ) : (
                <span className="text-xs text-white/30 uppercase">
                  Finished
                </span>
              )}
              <span className="text-sm capitalize text-white/40">
                {match.category.replace("-", " ")}
              </span>
            </div>

            {match.teams ? (
              <div className="flex items-center justify-center gap-6 sm:gap-12">
                <TeamDisplay
                  name={match.teams.home.name}
                  badge={match.teams.home.badge}
                />
                <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 px-6 py-4">
                  {status === "live" ? (
                    <div className="flex items-center gap-2 text-white/60 text-sm font-bold">
                      <Activity className="h-4 w-4 text-red-400" />
                      LIVE
                    </div>
                  ) : (
                    <>
                      <span className="text-2xl font-black text-white">VS</span>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-white/40">
                        <Calendar className="h-3 w-3" />
                        {formatMatchDate(match.date)}
                      </div>
                      <span className="text-sm font-semibold text-white/60">
                        {formatMatchTime(match.date)}
                      </span>
                    </>
                  )}
                </div>
                <TeamDisplay
                  name={match.teams.away.name}
                  badge={match.teams.away.badge}
                />
              </div>
            ) : (
              <h1 className="text-2xl font-black text-white">{match.title}</h1>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
              <div className="flex items-center gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {streams.length} streams available
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatMatchDate(match.date)} · {formatMatchTime(match.date)}
                </span>
              </div>
              <ShareButton title={match.title} />
            </div>
          </div>

          {streams.length > 0 ? (
            <MatchViewer streams={streams} title={match.title} />
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/2 p-8">
              <EmptyState
                title="No streams available"
                description={
                  status === "upcoming"
                    ? "Streams will appear when the match starts."
                    : "No streams found for this match."
                }
              />
            </div>
          )}

          <AdNativeBanner />

          <div className="hidden md:flex justify-center">
            <AdBanner size="728x90" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <AdBanner size="300x250" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/2 p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              Match Info
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-white/40">Sport</dt>
                <dd className="font-medium capitalize text-white">
                  {match.category.replace("-", " ")}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/40">Date</dt>
                <dd className="font-medium text-white">
                  {formatMatchDate(match.date)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/40">Time</dt>
                <dd className="font-medium text-white">
                  {formatMatchTime(match.date)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/40">Streams</dt>
                <dd className="font-medium text-white">{streams.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/40">Sources</dt>
                <dd className="font-medium text-white">
                  {match.sources.length}
                </dd>
              </div>
            </dl>
          </div>

          {relatedMatches.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                Related Matches
              </h3>
              <div className="space-y-3">
                {relatedMatches.map((m, i) => (
                  <MatchCard key={m.id} match={m} index={i} compact />
                ))}
              </div>
            </div>
          )}

          <div className="hidden xl:flex justify-center">
            <AdBanner size="160x600" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamDisplay({ name, badge }: { name: string; badge: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* <div className="relative h-16 w-16 sm:h-24 sm:w-24">
        <Image
          src={getBadgeUrl(badge)}
          alt={name}
          fill
          className="object-contain"
          unoptimized
        />
      </div> */}
      <span className="text-center text-base font-bold text-white sm:text-xl">
        {name}
      </span>
    </div>
  );
}
