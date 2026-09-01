import type { Metadata } from "next";
import { ScheduleClient } from "./ScheduleClient";
import { getMatchesBySport } from "@/lib/api";
import type { Match } from "@/lib/types";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Full sports match schedule. See upcoming and live events by date.",
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
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-surface py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
      <ScheduleClient matches={sorted} />
      <AdNativeBanner />
    </div>
  );
}
