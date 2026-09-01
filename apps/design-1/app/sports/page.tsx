import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getSports, getMatchesBySport } from '@/lib/api'
import { SportCard } from '@/components/SportCard'
import { GridSkeleton } from '@/components/LoadingSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { Layers } from 'lucide-react'
import { ResponsiveAd } from '@/components/ads/AdBanner'
import { AdNativeBanner } from '@/components/ads/AdNativeBanner'

export const metadata: Metadata = {
  title: 'Sports',
  description: 'Browse all sports categories and watch live matches.',
}

export const revalidate = 300

async function SportsGrid() {
  const sports = await getSports().catch(() => [])
  if (!sports.length) return <EmptyState title="No sports found" />

  const countResults = await Promise.allSettled(sports.map(s => getMatchesBySport(s.id)))
  const counts: Record<string, number> = {}
  sports.forEach((s, i) => {
    const r = countResults[i]
    counts[s.id] = r.status === 'fulfilled' ? r.value.length : 0
  })

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {sports.map((sport, i) => (
        <SportCard key={sport.id} sport={sport} matchCount={counts[sport.id]} index={i} />
      ))}
    </div>
  )
}

export default function SportsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
            <Layers className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Sports</h1>
            <p className="text-sm text-white/40">All sports categories</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <Suspense fallback={<GridSkeleton count={15} />}>
        <SportsGrid />
      </Suspense>

      <div className="mt-12">
        <AdNativeBanner />
      </div>
    </div>
  )
}
