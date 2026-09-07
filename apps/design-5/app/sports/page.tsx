import type { Metadata } from "next";
import { Suspense } from "react";
import { getSports, getMatchesBySport } from "@/lib/api";
import { SportTile } from "@/components/SportGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { SportGridSkeleton } from "@/components/Skeletons";
import { EmptyState } from "@/components/EmptyState";
import { ResponsiveAd } from "@/ads/AdBanner";
import { AdNativeBanner } from "@/ads/AdNativeBanner";

export const metadata: Metadata = {
  title: "Sports",
  description: "Browse all sports categories and watch live matches.",
};

export const revalidate = 300;

async function SportsIndex() {
  const sports = await getSports().catch(() => []);
  if (!sports.length) return <EmptyState title="No sports found" />;
  const countResults = await Promise.allSettled(
    sports.map((s) => getMatchesBySport(s.id)),
  );
  const counts: Record<string, number> = {};
  sports.forEach((s, i) => {
    const r = countResults[i];
    counts[s.id] = r.status === "fulfilled" ? r.value.length : 0;
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    <div className="space-y-8">
      <div>
        <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
          Catalog
        </span>
        <h1 className="display mt-3 text-[24px] font-extrabold leading-[1.05] text-ink sm:text-[32px] md:text-[42px]">
          All sports we cover.
        </h1>
        <p className="mt-2 max-w-xl text-[14px] text-muted">
          Fifteen categories indexed and refreshed nightly. Pick any sport to
          see live and upcoming matches.
        </p>
      </div>

      <div className="rounded-md border border-line bg-surface py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section>
        <SectionTitle
          title="Categories"
          subtitle="A–Z index"
          accent="primary"
        />
        <Suspense fallback={<SportGridSkeleton count={15} />}>
          <SportsIndex />
        </Suspense>
      </section>

      <AdNativeBanner />
    </div>
  );
}
