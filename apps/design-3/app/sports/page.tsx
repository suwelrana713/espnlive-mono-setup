import type { Metadata } from "next";
import { Suspense } from "react";
import { getSports, getMatchesBySport } from "@/lib/api";
import { SportTile } from "@/components/SportTile";
import { SectionHead } from "@/components/Eyebrow";
import { SportGridSkeleton } from "@/components/Skeletons";
import { EmptyPanel } from "@/components/EmptyPanel";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

export const metadata: Metadata = {
  title: "Sports",
  description: "Browse all sports categories and watch live matches.",
};

export const revalidate = 300;

async function SportsIndex() {
  const sports = await getSports().catch(() => []);
  if (!sports.length) return <EmptyPanel title="No sports found" />;

  const countResults = await Promise.allSettled(
    sports.map((s) => getMatchesBySport(s.id)),
  );
  const counts: Record<string, number> = {};
  sports.forEach((s, i) => {
    const r = countResults[i];
    counts[s.id] = r.status === "fulfilled" ? r.value.length : 0;
  });

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {sports.map((sport, i) => (
        <SportTile
          key={sport.id}
          sport={sport}
          matchCount={counts[sport.id]}
          index={i}
        />
      ))}
    </div>
  );
}

export default function SportsPage() {
  return (
    <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
      <div className="border-b border-hairline py-10">
        <p className="eyebrow">Index</p>
        <h1 className="serif mt-3 text-2xl sm:text-3xl md:text-[44px] font-black leading-[0.95] tracking-tight text-ink sm:text-[64px]">
          Every sport we cover.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Fifteen categories, indexed nightly. Pick a sport to see live matches,
          upcoming fixtures and finished results.
        </p>
      </div>

      <div className="border-b border-hairline bg-panel-soft/60 py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="py-14">
        <SectionHead
          number="01"
          eyebrow="Catalog · A to Z"
          title="Categories"
        />
        <Suspense fallback={<SportGridSkeleton count={15} />}>
          <SportsIndex />
        </Suspense>
      </section>

      <AdNativeBanner />
    </div>
  );
}
