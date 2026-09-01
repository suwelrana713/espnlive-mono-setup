import type { Metadata } from 'next'
import { SearchClient } from './SearchClient'
import { ResponsiveAd } from '@/components/ads/AdBanner'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for matches, teams, and sports.',
  alternates: { canonical: 'https://espnlive.online/search' },
  openGraph: {
    type: 'website',
    url: 'https://espnlive.online/search',
    title: 'Search — ESPN Live',
    description: 'Find any match, team or sport across the network.',
    siteName: 'ESPN Live',
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
