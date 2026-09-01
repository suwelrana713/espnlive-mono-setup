import type { Metadata } from "next";
import { Suspense } from "react";
import { getSports, getMatchesBySport } from "@/lib/api";
import { SportBrick } from "@/components/SportBrick";
import { SectionBar } from "@/components/SectionBar";
import { BrickGridSkeleton } from "@/components/Skeletons";
import { EmptyBlock } from "@/components/EmptyBlock";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

export const metadata: Metadata = {
  title: "Sports",
  description: "Browse all sports categories and watch live matches.",
};

export const revalidate = 300;

async function SportsIndex() {
  const sports = await getSports().catch(() => []);
  if (!sports.length) return <EmptyBlock title="No channels found" />;

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
        <SportBrick
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
    <div className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-10 border-b border-line pb-8">
        <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
          // Channels · Full index
        </p>
        <h1 className="display mt-3 text-[44px] font-bold leading-[0.98] text-fg sm:text-[64px]">
          Every sport we cover.
        </h1>
        <p className="mt-4 max-w-xl text-fg-mid">
          Fifteen categories, indexed and refreshed nightly. Pick a channel to
          jump into live and scheduled broadcasts.
        </p>
      </div>

      <div className="mb-10 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="mb-14">
        <SectionBar code="01" eyebrow="Catalog · A to Z" title="Channels" />
        <Suspense fallback={<BrickGridSkeleton count={15} />}>
          <SportsIndex />
        </Suspense>
      </section>

      <AdNativeBanner />
    </div>
  );
}
