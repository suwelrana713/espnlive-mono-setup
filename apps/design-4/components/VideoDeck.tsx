"use client";

import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoDeckProps {
  embedUrl: string;
  title?: string;
}

export function VideoDeck({ embedUrl, title }: VideoDeckProps) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-line bg-black",
        fullscreen ? "fixed inset-0 z-50 border-0" : "aspect-video w-full rounded-panel",
      )}
    >
      <iframe
        src={embedUrl}
        title={title ?? "Live Stream"}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
        referrerPolicy="no-referrer"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="mono pointer-events-auto flex items-center gap-2 rounded-tag border border-neon/40 bg-void/80 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-neon backdrop-blur-sm">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
          Broadcast
        </div>
        <button
          type="button"
          onClick={() => setFullscreen((f) => !f)}
          aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-tag border border-line-2 bg-void/80 text-fg-mid backdrop-blur-sm transition hover:border-neon hover:text-neon"
        >
          {fullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
      </div>

      {fullscreen && (
        <button
          type="button"
          onClick={() => setFullscreen(false)}
          className="mono absolute left-4 top-4 rounded-tag border border-neon/50 bg-void/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-neon backdrop-blur-sm transition hover:bg-neon hover:text-void"
        >
          [ Exit ]
        </button>
      )}
    </div>
  );
}
