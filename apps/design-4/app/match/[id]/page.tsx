import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Layers, Radio } from "lucide-react";
import { getMatchById, getStreams, getMatchesBySport } from "@/lib/api";
import {
  formatMatchDate,
  formatMatchTime,
  getMatchStatus,
} from "@/lib/types";
import { StatusChip } from "@/components/StatusChip";
import { MatchViewer } from "./MatchViewer";
import { ShareButton } from "./ShareButton";
import { MatchTile } from "@/components/MatchTile";
import { EmptyBlock } from "@/components/EmptyBlock";
import { SectionBar } from "@/components/SectionBar";
import { ResponsiveAd, AdBanner } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

export const revalidate = 30;

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cat?: string }>;
}

const BASE_URL = "https://sportvibehub.online";

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
      siteName: "SportVibeHub",
      images: match.poster
        ? [{ url: match.poster, alt: title }]
        : [
            {
              url: "/opengraph-image",
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
  const relatedMatches = related.filter((m) => m.id !== match.id).slice(0, 3);

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
      name: "SportVibeHub",
      url: BASE_URL,
    },
    isAccessibleForFree: true,
  };

  const sportSlug = match.category;
  const sportName = sportSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: sportName,
        item: `${BASE_URL}/sports/${sportSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: match.title,
        item: matchUrl,
      },
    ],
  };

  const homeTeam = match.teams?.home.name;
  const awayTeam = match.teams?.away.name;
  const headline =
    homeTeam && awayTeam ? `${homeTeam} vs ${awayTeam}` : match.title;

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sportsEventJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <Link
        href={cat ? `/sports/${cat}` : "/"}
        className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-dim transition hover:text-neon"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
        Back
      </Link>

      <header className="mt-6 border-b border-line pb-8">
        <div className="flex items-center gap-3">
          <StatusChip status={status} />
          <span className="mono text-[11px] uppercase tracking-[0.28em] text-neon">
            // CH · {match.category.replace(/-/g, " ")}
          </span>
        </div>
        <h1 className="display mt-6 text-[44px] font-bold leading-[0.95] text-fg sm:text-[72px] lg:text-[88px]">
          {headline}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Meta icon={Calendar} label={formatMatchDate(match.date)} />
          <Meta icon={Clock} label={formatMatchTime(match.date)} />
          <Meta
            icon={Radio}
            label={`${streams.length} feed${streams.length === 1 ? "" : "s"}`}
          />
          <Meta
            icon={Layers}
            label={`${match.sources.length} source${match.sources.length === 1 ? "" : "s"}`}
          />
          <div className="ml-auto">
            <ShareButton title={match.title} />
          </div>
        </div>
      </header>

      <div className="my-8 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-10">
          {streams.length > 0 ? (
            <MatchViewer streams={streams} title={match.title} />
          ) : (
            <EmptyBlock
              title="No live feeds"
              description={
                status === "upcoming"
                  ? "Mirrors come online at kick-off."
                  : "No streams currently available for this broadcast."
              }
            />
          )}

          <AdNativeBanner />

          <div className="hidden justify-center md:flex">
            <AdBanner size="728x90" />
          </div>

          {relatedMatches.length > 0 && (
            <section>
              <SectionBar
                code="R"
                eyebrow="Related · Same channel"
                title="Nearby broadcasts"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedMatches.map((m, i) => (
                  <MatchTile key={m.id} match={m} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-panel border border-line bg-panel p-5">
            <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
              // Broadcast card
            </p>
            <dl className="mt-4 space-y-3">
              <InfoRow
                label="Channel"
                value={match.category.replace(/-/g, " ")}
              />
              <InfoRow label="Date" value={formatMatchDate(match.date)} />
              <InfoRow
                label="Kick-off"
                value={formatMatchTime(match.date)}
                mono
              />
              <InfoRow
                label="Feeds"
                value={String(streams.length).padStart(2, "0")}
                mono
              />
              <InfoRow
                label="Sources"
                value={String(match.sources.length).padStart(2, "0")}
                mono
              />
              <InfoRow
                label="Status"
                value={
                  status === "live"
                    ? "On air"
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

function Meta({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="mono flex items-center gap-2 rounded-tag border border-line-2 bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-fg-mid">
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {label}
    </span>
  );
}

function InfoRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-none last:pb-0">
      <dt className="mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
        {label}
      </dt>
      <dd
        className={`${mono ? "mono tabular-nums text-neon" : "display capitalize"} text-right text-[14px] font-bold text-fg`}
      >
        {value}
      </dd>
    </div>
  );
}
