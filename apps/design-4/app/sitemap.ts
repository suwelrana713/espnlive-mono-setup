import type { MetadataRoute } from "next";
import { getLiveMatches, getPopularMatches } from "@/lib/api";

const BASE_URL = "https://espnlive.online";

const SPORTS = [
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
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sports`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/schedule`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const sportRoutes: MetadataRoute.Sitemap = SPORTS.map((sport) => ({
    url: `${BASE_URL}/sports/${sport}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const [liveResult, popularResult] = await Promise.allSettled([
    getLiveMatches(),
    getPopularMatches(),
  ]);

  const live = liveResult.status === "fulfilled" ? liveResult.value : [];
  const popular = popularResult.status === "fulfilled" ? popularResult.value : [];
  const dedupedMatches = [
    ...new Map([...live, ...popular].map((m) => [m.id, m])).values(),
  ];

  const matchRoutes: MetadataRoute.Sitemap = dedupedMatches.map((match) => ({
    url: `${BASE_URL}/match/${match.id}`,
    lastModified: new Date(match.date),
    changeFrequency: "hourly" as const,
    priority: match.popular ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...sportRoutes, ...matchRoutes];
}
