"use client";

import { useState } from "react";
import type { Stream } from "@/lib/types";
import { VideoBoard } from "@/components/VideoBoard";
import { StreamOption } from "@/components/StreamOption";

interface MatchViewerProps {
  streams: Stream[];
  title: string;
}

export function MatchViewer({ streams, title }: MatchViewerProps) {
  const [selected, setSelected] = useState(0);
  const current = streams[selected];

  return (
    <div className="space-y-4">
      <VideoBoard embedUrl={current.embedUrl} title={title} />

      <div className="card p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <div>
            <p className="label !text-muted">
              Feeds · {streams.length} available
            </p>
            <p className="display mt-1 text-[16px] font-extrabold text-ink">
              Choose a mirror
            </p>
          </div>
          <span className="mono text-[11px] tabular-nums text-muted">
            Now: #{selected + 1}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {streams.map((stream, i) => (
            <StreamOption
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
