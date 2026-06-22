'use client'

import { useQuery } from '@tanstack/react-query'
import { getStreams } from '@/lib/api'
import type { MatchSource, Stream } from '@/lib/types'

export function useStreams(sources: MatchSource[]) {
  return useQuery<Stream[]>({
    queryKey: ['streams', sources.map(s => `${s.source}:${s.id}`).join(',')],
    queryFn: async () => {
      const results = await Promise.allSettled(
        sources.map(s => getStreams(s.source, s.id))
      )
      return results
        .filter((r): r is PromiseFulfilledResult<Stream[]> => r.status === 'fulfilled')
        .flatMap(r => r.value)
    },
    enabled: sources.length > 0,
    refetchInterval: 60_000,
  })
}
