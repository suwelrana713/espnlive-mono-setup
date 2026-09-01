'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllMatches, getLiveMatches, getMatchesBySport, getMatchById, getPopularMatches } from '@/lib/api'

export function useLiveMatches() {
  return useQuery({
    queryKey: ['matches', 'live'],
    queryFn: getLiveMatches,
    refetchInterval: 30_000,
  })
}

export function usePopularMatches() {
  return useQuery({
    queryKey: ['matches', 'popular'],
    queryFn: getPopularMatches,
    staleTime: 5 * 60 * 1000,
  })
}

export function useMatchesBySport(sport: string) {
  return useQuery({
    queryKey: ['matches', 'sport', sport],
    queryFn: () => getMatchesBySport(sport),
    enabled: !!sport,
  })
}

export function useAllMatches() {
  return useQuery({
    queryKey: ['matches', 'all'],
    queryFn: getAllMatches,
    staleTime: 2 * 60 * 1000,
  })
}

export function useMatchById(id: string) {
  return useQuery({
    queryKey: ['match', id],
    queryFn: () => getMatchById(id),
    enabled: !!id,
  })
}
