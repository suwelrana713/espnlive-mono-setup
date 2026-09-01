"use client";

import { useState } from "react";
import type { Stream } from "@/lib/types";
import { VideoStage } from "@/components/VideoStage";
import { StreamPill } from "@/components/StreamPill";

interface MatchViewerProps {
  streams: Stream[];
  title: string;
}

export function MatchViewer({ streams, title }: MatchViewerProps) {
  const [selected, setSelected] = useState(0);
  const current = streams[selected];

  return (
    <div className="space-y-6">
      <VideoStage embedUrl={current.embedUrl} title={title} />

      <div className="border-t border-hairline pt-6">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <p className="eyebrow">Feeds · {streams.length} available</p>
            <p className="serif mt-2 text-2xl font-black text-ink">
              Pick a mirror
            </p>
          </div>
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Now playing #{selected + 1}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {streams.map((stream, i) => (
            <StreamPill
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
