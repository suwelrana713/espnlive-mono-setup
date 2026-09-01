import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";
import { ResponsiveAd } from "@/ads/AdBanner";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for matches, teams, and sports.",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  return (
    <>
      <div className="mx-auto max-w-[1360px] border-b border-hairline bg-panel-soft/60 px-5 py-3 sm:px-8">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
      <SearchClient initialQuery={q ?? ""} />
    </>
  );
}
