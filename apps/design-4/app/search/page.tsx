import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";
import { ResponsiveAd } from "@/ads/AdBanner";

export const metadata: Metadata = {
  title: "Search Live Matches, Teams & Sports",
  description:
    "Search live sports matches, teams and channels on Live Score.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://livesofascore.online/search" },
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  return (
    <>
      <div className="mx-4 my-6 rounded-panel border border-line-2 bg-panel py-3 sm:mx-8 lg:mx-10">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
      <SearchClient initialQuery={q ?? ""} />
    </>
  );
}
