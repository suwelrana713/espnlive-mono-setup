import type { Metadata } from "next";
import { ScheduleClient } from "./ScheduleClient";
import { getMatchesBySport } from "@/lib/api";
import type { Match } from "@/lib/types";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

const BASE_URL = "https://livesofascore.online";

export const metadata: Metadata = {
  title: "Live Sports Schedule — Fixtures, Kick-off Times & Live Streams",
  description:
    "Full live sports schedule with kick-off times, live scores and free HD streams. Football, basketball, cricket, tennis, F1, MMA, NFL and more — sorted by date.",
  keywords: [
    "sports schedule",
    "live sports fixtures",
    "today's matches",
    "tomorrow's fixtures",
    "live football schedule",
    "nba schedule",
    "cricket schedule",
    "live sports today",
  ],
  alternates: { canonical: `${BASE_URL}/schedule` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/schedule`,
    siteName: "Live Score",
    title: "Live Sports Schedule — Fixtures & Free Streams",
    description:
      "See every upcoming and live match, with free HD streams and real-time live scores.",
  },
};

export const revalidate = 60;

const SPORTS = [
  "football",
  "basketball",
  "american-football",
  "hockey",
  "baseball",
  "tennis",
  "cricket",
];

export default async function SchedulePage() {
  const results = await Promise.allSettled(
    SPORTS.map((s) => getMatchesBySport(s)),
  );
  const allMatches: Match[] = results
    .filter(
      (r): r is PromiseFulfilledResult<Match[]> => r.status === "fulfilled",
    )
    .flatMap((r) => r.value);

  const deduped = Array.from(
    new Map(allMatches.map((m) => [m.id, m])).values(),
  );
  const sorted = deduped.sort((a, b) => a.date - b.date);

  return (
    <>
      <div className="mx-4 my-6 rounded-panel border border-line-2 bg-panel py-3 sm:mx-8 lg:mx-10">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
      <ScheduleClient matches={sorted} />
      <div className="px-5 pb-14 sm:px-8 lg:px-10">
        <AdNativeBanner />
      </div>
    </>
  );
}
