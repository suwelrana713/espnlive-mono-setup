import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Layers, Radio } from "lucide-react";
import { getMatchById, getStreams, getMatchesBySport } from "@/lib/api";
import {
  formatMatchDate,
  formatMatchTime,
  getMatchStatus,
} from "@/lib/types";
import { getBadgeUrl } from "@/lib/utils";
import { StatusPill, LiveDot } from "@/components/StatusPill";
import { MatchViewer } from "./MatchViewer";
import { ShareButton } from "./ShareButton";
import { ScoreRow } from "@/components/ScoreRow";
import { EmptyState } from "@/components/EmptyState";
import { SectionTitle } from "@/components/SectionTitle";
import { ResponsiveAd, AdBanner } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

export const revalidate = 30;

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cat?: string }>;
}

const BASE_URL = "https://espnlive.online";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const match = await getMatchById(id).catch(() => null);
  if (!match) return { title: "Match Not Found" };

  const homeTeam = match.teams?.home.name;
  const awayTeam = match.teams?.away.name;
  const title =
    homeTeam && awayTeam
      ? `${homeTeam} vs ${awayTeam} Live Stream`
      : `${match.title} Live Stream`;
  const sport = match.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const dateStr = new Date(match.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const description =
    homeTeam && awayTeam
      ? `Watch ${homeTeam} vs ${awayTeam} live stream free online in HD. ${sport} match on ${dateStr}. Multiple stream sources available.`
      : `Watch ${match.title} live stream free online in HD. ${sport} on ${dateStr}.`;
  const matchUrl = `${BASE_URL}/match/${id}`;

  return {
    title,
    description,
    alternates: { canonical: matchUrl },
    openGraph: {
      type: "website",
      url: matchUrl,
      title,
      description,
      siteName: "ESPN Live",
      images: match.poster
        ? [{ url: match.poster, alt: title }]
        : [
            {
              url: "/og-image.png",
              width: 1200,
              height: 630,
              alt: title,
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

export default async function MatchPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { cat } = await searchParams;
  const match = await getMatchById(id).catch(() => null);
  if (!match) notFound();

  const status = getMatchStatus(match.date);
  const isLive = status === "live";
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
  const relatedMatches = related.filter((m) => m.id !== match.id).slice(0, 6);

  const matchUrl = `${BASE_URL}/match/${id}`;
  const sportsEventJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: match.title,
    startDate: new Date(match.date).toISOString(),
    sport: match.category.replace(/-/g, " "),
    url: matchUrl,
    ...(match.teams && {
      homeTeam: { "@type": "SportsTeam", name: match.teams.home.name },
      awayTeam: { "@type": "SportsTeam", name: match.teams.away.name },
    }),
    location: { "@type": "VirtualLocation", url: matchUrl },
    organizer: {
      "@type": "Organization",
      name: "ESPN Live",
      url: BASE_URL,
    },
  };

  const home = match.teams?.home;
  const away = match.teams?.away;

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sportsEventJsonLd),
        }}
      />

      <Link
        href={cat ? `/sports/${cat}` : "/"}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary transition hover:text-primary-2"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      <header className="card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/70 px-5 py-2.5">
          <div className="flex items-center gap-2.5">
            <StatusPill status={status} />
            <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {match.category.replace(/-/g, " ")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="mono hidden text-[11px] text-muted sm:inline">
              {formatMatchDate(match.date)}
            </span>
            <ShareButton title={match.title} />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {home && away ? (
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <TeamPanel team={home} align="left" />
              <div className="flex flex-col items-center gap-2">
                {isLive ? (
                  <>
                    <span className="mono text-[10px] font-bold uppercase tracking-widest text-live">
                      In progress
                    </span>
                    <div className="numeric flex items-center gap-3 text-[52px] font-extrabold leading-none text-ink sm:text-[72px]">
                      <span>—</span>
                      <span className="text-faint">:</span>
                      <span>—</span>
                    </div>
                    <span className="mono flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-live">
                      <LiveDot />
                      Live
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mono text-[10px] font-bold uppercase tracking-widest text-muted">
                      Kick-off
                    </span>
                    <div className="numeric text-[52px] font-extrabold leading-none text-ink sm:text-[72px] tabular-nums">
                      {formatMatchTime(match.date)}
                    </div>
                    <span className="mono text-[11px] text-muted">
                      {formatMatchDate(match.date)}
                    </span>
                  </>
                )}
              </div>
              <TeamPanel team={away} align="right" />
            </div>
          ) : (
            <h1 className="display text-[36px] font-extrabold leading-[1.05] text-ink sm:text-[48px]">
              {match.title}
            </h1>
          )}
        </div>
      </header>

      <div className="rounded-md border border-line bg-surface py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-8">
          {streams.length > 0 ? (
            <MatchViewer streams={streams} title={match.title} />
          ) : (
            <EmptyState
              title="No live feeds"
              description={
                status === "upcoming"
                  ? "Mirrors will appear at kick-off."
                  : "No streams currently available for this fixture."
              }
            />
          )}

          <AdNativeBanner />

          <div className="hidden justify-center md:flex">
            <AdBanner size="728x90" />
          </div>

          {relatedMatches.length > 0 && (
            <section>
              <SectionTitle title="Related matches" accent="cool" />
              <div className="card divide-y divide-line/60">
                {relatedMatches.map((m, i) => (
                  <ScoreRow key={m.id} match={m} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="card p-5">
            <p className="label !text-muted">Match card</p>
            <dl className="mt-3 space-y-3">
              <Row
                label="Sport"
                value={match.category.replace(/-/g, " ")}
                icon={Layers}
              />
              <Row
                label="Date"
                value={formatMatchDate(match.date)}
                icon={Calendar}
              />
              <Row
                label="Kick-off"
                value={formatMatchTime(match.date)}
                icon={Clock}
                mono
              />
              <Row
                label="Feeds"
                value={String(streams.length).padStart(2, "0")}
                icon={Radio}
                mono
              />
              <Row
                label="Sources"
                value={String(match.sources.length).padStart(2, "0")}
                mono
              />
              <Row
                label="Status"
                value={
                  status === "live"
                    ? "In progress"
                    : status === "upcoming"
                      ? "Scheduled"
                      : "Full time"
                }
              />
            </dl>
          </div>

          <div className="flex justify-center">
            <AdBanner size="300x250" />
          </div>

          <div className="hidden justify-center xl:flex">
            <AdBanner size="160x600" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function TeamPanel({
  team,
  align,
}: {
  team: { name: string; badge: string };
  align: "left" | "right";
}) {
  return (
    <div
      className={
        align === "left"
          ? "flex items-center gap-4"
          : "flex items-center gap-4 sm:flex-row-reverse sm:text-right"
      }
    >
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-line bg-surface-2 sm:h-20 sm:w-20">
        <Image
          src={getBadgeUrl(team.badge)}
          alt={team.name}
          fill
          className="object-contain p-2"
          unoptimized
        />
      </span>
      <div>
        <span className="mono text-[10px] font-bold uppercase tracking-widest text-muted">
          {align === "left" ? "Home" : "Away"}
        </span>
        <p className="display mt-1 text-[24px] font-extrabold leading-tight text-ink sm:text-[28px]">
          {team.name}
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  icon: Icon,
  mono,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2 last:border-none last:pb-0">
      <dt className="flex items-center gap-2 text-[12px] text-muted">
        {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />}
        {label}
      </dt>
      <dd
        className={`${mono ? "mono tabular-nums text-primary" : "capitalize text-ink"} text-[13px] font-bold`}
      >
        {value}
      </dd>
    </div>
  );
}
