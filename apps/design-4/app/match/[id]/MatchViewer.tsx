"use client";

import { useState } from "react";
import type { Stream } from "@/lib/types";
import { VideoDeck } from "@/components/VideoDeck";
import { StreamButton } from "@/components/StreamButton";

interface MatchViewerProps {
  streams: Stream[];
  title: string;
}

export function MatchViewer({ streams, title }: MatchViewerProps) {
  const [selected, setSelected] = useState(0);
  const current = streams[selected];

  return (
    <div className="space-y-6">
      <VideoDeck embedUrl={current.embedUrl} title={title} />

      <div className="rounded-panel border border-line bg-panel p-5">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
              // Mirrors · {streams.length} available
            </p>
            <p className="display mt-2 text-xl font-bold text-fg">
              Select a feed
            </p>
          </div>
          <p className="mono text-[11px] tabular-nums text-fg-dim">
            NOW · #{String(selected + 1).padStart(2, "0")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {streams.map((stream, i) => (
            <StreamButton
              key={`${stream.id}-${stream.streamNo}`}
              stream={stream}
              selected={selected === i}
              onClick={() => setSelected(i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
