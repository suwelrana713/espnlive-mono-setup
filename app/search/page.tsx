import type { Metadata } from 'next'
import { SearchClient } from './SearchClient'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search for matches, teams, and sports.',
}

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  return <SearchClient initialQuery={q ?? ''} />
}
