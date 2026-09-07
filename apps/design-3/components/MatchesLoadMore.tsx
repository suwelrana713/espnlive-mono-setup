"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import { MatchRow } from "./MatchRow";
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
      <div className="border-t border-hairline">
        {shown.map((m, i) => {
          const injectAd =
            withAds && (i + 1) % AD_INTERVAL === 0 && i + 1 < shown.length;
          return (
            <Fragment key={m.id}>
              <MatchRow match={m} index={i} />
              {injectAd && (
                <div
                  data-ad-slot="in-feed"
                  className="my-4 border-y border-hairline bg-panel-soft/60 py-3"
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
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-faint">
            {matches.length - visible} more listings
          </span>
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="mono group inline-flex items-center gap-2 rounded-sm border border-ink px-6 py-3 text-[13px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-ink hover:text-paper"
          >
            Load more
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
