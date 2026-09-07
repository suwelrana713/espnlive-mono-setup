import { Suspense } from 'react'
import {
  getLiveMatches,
  getPopularMatches,
  getSports,
  getMatchesBySport,
} from '@/lib/api'
import { getMatchStatus } from '@/lib/types'
import { HeroBanner } from '@/components/HeroBanner'
import { MatchCard } from '@/components/MatchCard'
import { SportCard } from '@/components/SportCard'
import { HeroSkeleton, GridSkeleton, SportCardSkeleton } from '@/components/LoadingSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { SectionHeader } from '@/components/SectionHeader'
import { ResponsiveAd, AdBanner } from '@/components/ads/AdBanner'
import { AdNativeBanner } from '@/components/ads/AdNativeBanner'

export const revalidate = 60

async function HeroSection() {
  const [live, popular] = await Promise.allSettled([
    getLiveMatches(),
    getPopularMatches(),
  ])
  const liveMatches = live.status === 'fulfilled' ? live.value : []
  const popularMatches = popular.status === 'fulfilled' ? popular.value : []
  const seen = new Set<string>()
  const featured = [...liveMatches, ...popularMatches].filter((m) => {
    if (seen.has(m.id)) return false
    seen.add(m.id)
    return true
  })
  if (!featured.length) return null
  return <HeroBanner match={featured.slice(0, 8)} />
}

async function LiveSection() {
  let matches = await getLiveMatches().catch(() => [])
  if (!matches.length) {
    const football = await getMatchesBySport('football').catch(() => [])
    matches = football.filter((m) => getMatchStatus(m.date) === 'live')
  }
  matches = matches
    .slice()
    .sort((a, b) => (a.category === 'football' ? -1 : b.category === 'football' ? 1 : 0))
  if (!matches.length)
    return (
      <EmptyState
        title="No live matches right now"
        description="The studio is dark — check back in a few minutes."
      />
    )
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {matches.slice(0, 6).map((m, i) => (
        <MatchCard key={m.id} match={m} index={i} />
      ))}
    </div>
  )
}

async function PopularSection() {
  const raw = await getPopularMatches().catch(() => [])
  const matches = raw
    .slice()
    .sort((a, b) => (a.category === 'football' ? -1 : b.category === 'football' ? 1 : 0))
  if (!matches.length) return <EmptyState title="Nothing trending" />
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {matches.slice(0, 6).map((m, i) => (
        <MatchCard key={m.id} match={m} index={i} />
      ))}
    </div>
  )
}

async function UpcomingSection() {
  const football = await getMatchesBySport('football').catch(() => [])
  const upcoming = football.filter((m) => getMatchStatus(m.date) === 'upcoming')
  if (!upcoming.length) return <EmptyState title="No upcoming football" />
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {upcoming.slice(0, 6).map((m, i) => (
        <MatchCard key={m.id} match={m} index={i} />
      ))}
    </div>
  )
}

async function SportsSection() {
  const [sports, football, basketball, tennis] = await Promise.allSettled([
    getSports(),
    getMatchesBySport('football'),
    getMatchesBySport('basketball'),
    getMatchesBySport('tennis'),
  ])

  const allSports = sports.status === 'fulfilled' ? sports.value : []
  const counts: Record<string, number> = {
    football: football.status === 'fulfilled' ? football.value.length : 0,
    basketball: basketball.status === 'fulfilled' ? basketball.value.length : 0,
    tennis: tennis.status === 'fulfilled' ? tennis.value.length : 0,
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {allSports.slice(0, 10).map((sport, i) => (
        <SportCard key={sport.id} sport={sport} matchCount={counts[sport.id]} index={i} />
      ))}
    </div>
  )
}

function SportsFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <SportCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="mt-6">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <div className="mt-14 space-y-16">
        <section>
          <SectionHeader
            code="01"
            eyebrow="On Air Now"
            title="Live Feeds"
            meta="Broadcasting in real time"
          />
          <Suspense fallback={<GridSkeleton />}>
            <LiveSection />
          </Suspense>
        </section>

        <AdNativeBanner />

        <section>
          <SectionHeader
            code="02"
            eyebrow="Most Tuned In"
            title="Trending"
            meta="Highest viewership right now"
          />
          <Suspense fallback={<GridSkeleton />}>
            <PopularSection />
          </Suspense>
        </section>

        <div className="flex justify-center">
          <AdBanner size="300x250" />
        </div>

        <section>
          <SectionHeader
            code="03"
            eyebrow="Coming Up"
            title="Scheduled"
            meta="Football fixtures on the horizon"
          />
          <Suspense fallback={<GridSkeleton />}>
            <UpcomingSection />
          </Suspense>
        </section>

        <div className="hidden justify-center md:flex">
          <AdBanner size="728x90" />
        </div>

        <section>
          <SectionHeader
            code="04"
            eyebrow="Directory"
            title="All Channels"
            meta="Browse the full sport catalogue"
          />
          <Suspense fallback={<SportsFallback />}>
            <SportsSection />
          </Suspense>
        </section>

        <AdNativeBanner />
      </div>
    </div>
  )
}
