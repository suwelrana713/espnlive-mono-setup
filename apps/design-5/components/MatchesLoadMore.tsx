"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScoreRow } from "./ScoreRow";
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
      <div className="card divide-y divide-line/60">
        {shown.map((m, i) => {
          const injectAd =
            withAds && (i + 1) % AD_INTERVAL === 0 && i + 1 < shown.length;
          return (
            <Fragment key={m.id}>
              <ScoreRow match={m} index={i} />
              {injectAd && (
                <div
                  data-ad-slot="in-feed"
                  className="bg-surface-2/50 px-3 py-3"
                >
                  <ResponsiveAd mobile="320x50" desktop="728x90" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="mono text-[11px] text-muted">
            {matches.length - visible} more matches
          </span>
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="group inline-flex items-center gap-2 rounded-md border border-primary bg-primary-tint px-5 py-2 text-[13px] font-bold text-primary transition hover:bg-primary hover:text-white"
          >
            Load more
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
