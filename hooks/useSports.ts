'use client'

import { useQuery } from '@tanstack/react-query'
import { getSports } from '@/lib/api'

export function useSports() {
  return useQuery({
    queryKey: ['sports'],
    queryFn: getSports,
    staleTime: 10 * 60 * 1000,
  })
}
