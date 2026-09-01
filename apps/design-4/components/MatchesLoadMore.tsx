"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { MatchTile } from "./MatchTile";
import { ResponsiveAd } from "@/ads/AdBanner";
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
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m, i) => {
          const injectAd =
            withAds && (i + 1) % AD_INTERVAL === 0 && i + 1 < shown.length;
          return (
            <Fragment key={m.id}>
              <MatchTile match={m} index={i} />
              {injectAd && (
                <div
                  data-ad-slot="in-feed"
                  className="col-span-full my-2 rounded-panel border border-line-2 bg-panel-2 py-3"
                >
                  <ResponsiveAd mobile="320x50" desktop="728x90" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
            {matches.length - visible} more in queue
          </span>
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="mono group inline-flex items-center gap-2 rounded-tag border border-neon bg-neon/10 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.22em] text-neon transition hover:bg-neon hover:text-void"
          >
            [ Load next batch ]
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
