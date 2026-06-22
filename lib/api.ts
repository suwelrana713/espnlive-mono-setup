import type { Match, Sport, Stream } from "./types";

const BASE = "https://streamed.pk/api";

async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 },
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

export async function getSports(): Promise<Sport[]> {
  return fetcher<Sport[]>("/sports");
}

export async function getMatchesBySport(sport: string): Promise<Match[]> {
  // e.g. "football", "basketball" all live
  return fetcher<Match[]>(`/matches/${sport}`);
}

export async function getLiveMatches(): Promise<Match[]> {
  return fetcher<Match[]>("/matches/live");
}

export async function getPopularMatches(): Promise<Match[]> {
  return fetcher<Match[]>("/matches/all/popular");
}

export async function getAllMatches(): Promise<Match[]> {
  const sports = [
    "football",
    "basketball",
    "american-football",
    "hockey",
    "baseball",
    "motor-sports",
    "fight",
    "tennis",
    "cricket",
  ];
  const results = await Promise.allSettled(
    sports.map((s) => getMatchesBySport(s)),
  );
  return results
    .filter(
      (r): r is PromiseFulfilledResult<Match[]> => r.status === "fulfilled",
    )
    .flatMap((r) => r.value);
}

export async function getStreams(
  source: string,
  id: string,
): Promise<Stream[]> {
  return fetcher<Stream[]>(`/stream/${source}/${id}`);
}

export async function getMatchById(id: string): Promise<Match | null> {
  const sports = [
    "football",
    "basketball",
    "american-football",
    "hockey",
    "baseball",
    "motor-sports",
    "fight",
    "tennis",
    "cricket",
    "rugby",
    "golf",
    "darts",
    "afl",
    "billiards",
    "other",
  ];
  const results = await Promise.allSettled(
    sports.map((s) => getMatchesBySport(s)),
  );
  for (const result of results) {
    if (result.status === "fulfilled") {
      const match = result.value.find((m) => m.id === id);
      if (match) return match;
    }
  }
  return null;
}
