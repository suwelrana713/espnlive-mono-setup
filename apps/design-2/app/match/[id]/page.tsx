import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMatchById, getStreams, getMatchesBySport } from '@/lib/api'
import { getMatchStatus, formatMatchDate, formatMatchTime } from '@/lib/types'
import { LiveBadge, UpcomingBadge, FinishedBadge } from '@/components/LiveBadge'
import { MatchCard } from '@/components/MatchCard'
import { EmptyState } from '@/components/EmptyState'
import { MatchViewer } from './MatchViewer'
import { ShareButton } from './ShareButton'
import { ChevronLeft, Radio, CalendarClock, Wifi, Layers } from 'lucide-react'
import { ResponsiveAd, AdBanner } from '@/components/ads/AdBanner'
import { AdNativeBanner } from '@/components/ads/AdNativeBanner'

export const revalidate = 30

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ cat?: string }>
}

const BASE_URL = 'https://espnlive.online'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const match = await getMatchById(id).catch(() => null)
  if (!match) return { title: 'Match Not Found' }

  const homeTeam = match.teams?.home.name
  const awayTeam = match.teams?.away.name
  const title = homeTeam && awayTeam
    ? `${homeTeam} vs ${awayTeam} Live Stream`
    : `${match.title} Live Stream`
  const sport = match.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const dateStr = new Date(match.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const description = homeTeam && awayTeam
    ? `Watch ${homeTeam} vs ${awayTeam} live stream free online in HD. ${sport} match on ${dateStr}. Multiple stream sources available.`
    : `Watch ${match.title} live stream free online in HD. ${sport} on ${dateStr}.`

  const matchUrl = `${BASE_URL}/match/${id}`
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
      images: match.poster
        ? [{ url: match.poster, alt: title }]
        : [{ url: '/logo.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function MatchPage({ params, searchParams }: Props) {
  const { id } = await params
  const { cat } = await searchParams

  const match = await getMatchById(id).catch(() => null)
  if (!match) notFound()

  const status = getMatchStatus(match.date)
  const streamsResults = await Promise.allSettled(
    match.sources.map((s) => getStreams(s.source, s.id)),
  )
  const streams = streamsResults
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => (r as PromiseFulfilledResult<Awaited<ReturnType<typeof getStreams>>>).value)

  const related = await getMatchesBySport(match.category).catch(() => [])
  const relatedMatches = related.filter((m) => m.id !== match.id).slice(0, 4)

  const matchUrl = `${BASE_URL}/match/${id}`
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
    location: { '@type': 'VirtualLocation', url: matchUrl },
    organizer: { '@type': 'Organization', name: 'ESPN Live', url: BASE_URL },
  }

  const home = match.teams?.home.name
  const away = match.teams?.away.name

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventJsonLd) }}
      />

      <Link
        href={cat ? `/sports/${cat}` : '/'}
        className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)] transition hover:text-[color:var(--color-neon-cyan)]"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        {cat ? `Back to /${cat}` : 'Back home'}
      </Link>

      <div className="mb-6">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* MAIN */}
        <div className="space-y-6">
          {/* Match banner */}
          <div className="glass-strong relative overflow-hidden rounded-[32px] p-6 sm:p-8">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[color:var(--color-neon-cyan)]/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-[color:var(--color-neon-magenta)]/12 blur-[100px]" />

            <div className="relative flex items-center gap-3">
              {status === 'live' ? <LiveBadge /> : status === 'upcoming' ? <UpcomingBadge /> : <FinishedBadge />}
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
                /{match.category}
              </span>
              <span className="ml-auto">
                <ShareButton title={match.title} />
              </span>
            </div>

            {home && away ? (
              <div className="relative mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">Home</p>
                  <p className="mt-2 text-2xl font-bold leading-tight text-[color:var(--color-ink-1)] sm:text-4xl">{home}</p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-black/30 px-4 py-3 backdrop-blur">
                  {status === 'live' ? (
                    <>
                      <span className="signal-pulse flex h-2 w-2 rounded-full bg-[color:var(--color-signal)]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-signal)]">LIVE</span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-2xl font-bold text-[color:var(--color-neon-cyan)] tabular-nums sm:text-3xl">
                        {formatMatchTime(match.date)}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
                        {formatMatchDate(match.date)}
                      </span>
                    </>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">Away</p>
                  <p className="mt-2 text-2xl font-bold leading-tight text-[color:var(--color-ink-1)] sm:text-4xl">{away}</p>
                </div>
              </div>
            ) : (
              <h1 className="relative mt-6 text-2xl font-bold leading-tight text-[color:var(--color-ink-1)] sm:text-4xl">
                {match.title}
              </h1>
            )}

            <div className="relative mt-6 flex flex-wrap items-center gap-4 border-t border-white/6 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-3)]">
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="h-3 w-3" />
                {streams.length} feeds
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Radio className="h-3 w-3" />
                {match.sources.length} sources
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="h-3 w-3" />
                {formatMatchDate(match.date)} &middot; {formatMatchTime(match.date)}
              </span>
            </div>
          </div>

          {/* Viewer */}
          {streams.length > 0 ? (
            <MatchViewer streams={streams} title={match.title} />
          ) : (
            <div className="glass rounded-[22px] p-6">
              <EmptyState
                title="No feeds available"
                description={
                  status === 'upcoming'
                    ? 'Feeds appear when the broadcast starts.'
                    : 'No streams found for this fixture.'
                }
              />
            </div>
          )}

          <AdNativeBanner />

          <div className="hidden justify-center md:flex">
            <AdBanner size="728x90" />
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          <div className="flex justify-center">
            <AdBanner size="300x250" />
          </div>

          <div className="glass rounded-[22px] p-5">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
              &mdash;&nbsp; Broadcast Info
            </p>
            <dl className="space-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
              {[
                ['Sport', match.category.replace('-', ' ')],
                ['Date', formatMatchDate(match.date)],
                ['Time', formatMatchTime(match.date)],
                ['Feeds', streams.length.toString().padStart(2, '0')],
                ['Sources', match.sources.length.toString().padStart(2, '0')],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <dt className="text-[color:var(--color-ink-3)]">{k}</dt>
                  <dd className="text-[color:var(--color-ink-1)] tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {relatedMatches.length > 0 && (
            <div>
              <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
                <Layers className="h-3 w-3" />
                Related Feeds
              </p>
              <div className="space-y-3">
                {relatedMatches.map((m, i) => (
                  <MatchCard key={m.id} match={m} index={i} compact />
                ))}
              </div>
            </div>
          )}

          <div className="hidden justify-center xl:flex">
            <AdBanner size="160x600" />
          </div>
        </aside>
      </div>
    </div>
  )
}
