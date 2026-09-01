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
    <>
      <div className="mx-auto max-w-[1360px] border-b border-hairline bg-panel-soft/60 px-5 py-3 sm:px-8">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
      <ScheduleClient matches={sorted} />
      <div className="mx-auto max-w-[1360px] px-5 py-12 sm:px-8">
        <AdNativeBanner />
      </div>
    </>
  );
}
