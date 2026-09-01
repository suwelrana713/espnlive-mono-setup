import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { getMatchesBySport, getSports } from '@/lib/api'
import { getMatchStatus } from '@/lib/types'
import { MatchCard } from '@/components/MatchCard'
import { GridSkeleton } from '@/components/LoadingSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { SectionHeader } from '@/components/SectionHeader'
import { MatchesLoadMore } from '@/components/MatchesLoadMore'
import { ResponsiveAd } from '@/components/ads/AdBanner'
import { AdNativeBanner } from '@/components/ads/AdNativeBanner'
import { Radio, CalendarClock, History } from 'lucide-react'

interface Props {
  params: Promise<{ sport: string }>
}

const BASE_URL = 'https://espnlive.online'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport } = await params
  const name = sport.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const sportUrl = `${BASE_URL}/sports/${sport}`
  const title = `Watch Live ${name} Streams Online Free`
  const description = `Watch live ${name.toLowerCase()} matches and streams online free in HD. Live scores, upcoming fixtures, and multiple stream sources.`
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
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: `Live ${name} Streams` }],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export const revalidate = 60

async function MatchesList({ sport }: { sport: string }) {
  const matches = await getMatchesBySport(sport).catch(() => [])
  if (!matches.length) {
    return (
      <EmptyState
        title="Channel is dark"
        description={`No ${sport.replace(/-/g, ' ')} feeds scheduled.`}
      />
    )
  }

  const live = matches.filter((m) => getMatchStatus(m.date) === 'live')
  const upcoming = matches.filter((m) => getMatchStatus(m.date) === 'upcoming')
  const finished = matches.filter((m) => getMatchStatus(m.date) === 'finished')

  return (
    <div className="space-y-14">
      {live.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[color:var(--color-signal)]/12 text-[color:var(--color-signal)]">
              <Radio className="h-3.5 w-3.5" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-2)]">
              Live Now
            </p>
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)] tabular-nums">
              {live.length.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {live.map((m, i) => (
              <MatchCard key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}

      {live.length > 0 && upcoming.length > 0 && (
        <div>
          <ResponsiveAd mobile="320x50" desktop="468x60" />
        </div>
      )}

      {upcoming.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[color:var(--color-neon-cyan)]/12 text-[color:var(--color-neon-cyan)]">
              <CalendarClock className="h-3.5 w-3.5" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-2)]">
              Upcoming
            </p>
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)] tabular-nums">
              {upcoming.length.toString().padStart(2, '0')}
            </span>
          </div>
          <MatchesLoadMore matches={upcoming} step={12} />
        </section>
      )}

      {finished.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/6 text-[color:var(--color-ink-3)]">
              <History className="h-3.5 w-3.5" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]">
              Replays
            </p>
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-4)] tabular-nums">
              {finished.length.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {finished.slice(0, 6).map((m, i) => (
              <MatchCard key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default async function SportPage({ params }: Props) {
  const { sport } = await params
  const sports = await getSports().catch(() => [])
  const sportData = sports.find((s) => s.id === sport)
  if (!sportData && !sports.length) notFound()

  const name =
    sportData?.name ??
    sport.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]"
      >
        <Link href="/" className="hover:text-[color:var(--color-ink-1)] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/sports" className="hover:text-[color:var(--color-ink-1)] transition">
          Channels
        </Link>
        <span>/</span>
        <span className="text-[color:var(--color-neon-cyan)]">{sport}</span>
      </nav>

      <SectionHeader
        code={`//${sport}`}
        eyebrow="Channel"
        title={name}
        meta={`Live and scheduled ${name.toLowerCase()} feeds`}
      />

      <div className="mb-8">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <MatchesList sport={sport} />
      </Suspense>

      <div className="mt-14">
        <AdNativeBanner />
      </div>
    </div>
  )
}
