import type { Metadata } from 'next'
import { SearchClient } from './SearchClient'
import { ResponsiveAd } from '@/components/ads/AdBanner'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for matches, teams, and sports.',
  alternates: { canonical: 'https://sportpulsetv.online/search' },
  openGraph: {
    type: 'website',
    url: 'https://sportpulsetv.online/search',
    title: 'Search — SportPulseTV',
    description: 'Find any match, team or sport across the network.',
    siteName: 'SportPulseTV',
  },
}

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
      <SearchClient initialQuery={q ?? ''} />
    </>
  )
}
