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
    <div className="space-y-6">
      <div className="rounded-md border border-line bg-surface py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>
      <SearchClient initialQuery={q ?? ""} />
    </div>
  );
}
