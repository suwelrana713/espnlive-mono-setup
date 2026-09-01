"use client";

import { Fragment, useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { ResponsiveAd } from "@/components/ads/AdBanner";
import type { Match } from "@/lib/types";

const AD_THRESHOLD = 50;
const AD_INTERVAL = 10;

interface Props {
  matches: Match[];
  step?: number;
}

export function MatchesLoadMore({ matches, step = 12 }: Props) {
  const [visible, setVisible] = useState(step);
  const shown = matches.slice(0, visible);
  const hasMore = visible < matches.length;
  const withAds = matches.length >= AD_THRESHOLD;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m, i) => {
          const injectAd =
            withAds && (i + 1) % AD_INTERVAL === 0 && i + 1 < shown.length;
          return (
            <Fragment key={m.id}>
              <MatchCard match={m} index={i} />
              {injectAd && (
                <div data-ad-slot="in-feed" className="col-span-full my-2">
                  <ResponsiveAd mobile="320x50" desktop="728x90" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            Load more ({matches.length - visible} left)
          </button>
        </div>
      )}
    </>
  );
}
