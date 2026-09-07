import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSports, getMatchesBySport } from '@/lib/api'
import { SportCard } from '@/components/SportCard'
import { SportCardSkeleton } from '@/components/LoadingSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { SectionHeader } from '@/components/SectionHeader'
import { ResponsiveAd } from '@/components/ads/AdBanner'
import { AdNativeBanner } from '@/components/ads/AdNativeBanner'

export const metadata: Metadata = {
  title: 'Channels',
  description: 'Browse all sport channels and watch live matches.',
  alternates: { canonical: 'https://espnlive.online/sports' },
  openGraph: {
    type: 'website',
    url: 'https://espnlive.online/sports',
    title: 'All Channels — ESPN Live',
    description: 'The full sport catalogue with live match counts.',
    siteName: 'ESPN Live',
  },
}

export const revalidate = 300

async function SportsGrid() {
  const sports = await getSports().catch(() => [])
  if (!sports.length) return <EmptyState title="No channels found" />

  const countResults = await Promise.allSettled(sports.map((s) => getMatchesBySport(s.id)))
  const counts: Record<string, number> = {}
  sports.forEach((s, i) => {
    const r = countResults[i]
    counts[s.id] = r.status === 'fulfilled' ? r.value.length : 0
  })

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
      {sports.map((sport, i) => (
        <SportCard key={sport.id} sport={sport} matchCount={counts[sport.id]} index={i} />
      ))}
    </div>
  )
}

function Fallback() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 15 }).map((_, i) => (
        <SportCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function SportsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
      <div className="mb-6">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <SectionHeader
        code="//"
        eyebrow="Directory"
        title="All Channels"
        meta="Every sport on the network"
      />

      <Suspense fallback={<Fallback />}>
        <SportsGrid />
      </Suspense>

      <div className="mt-14">
        <AdNativeBanner />
      </div>
    </div>
  )
}
