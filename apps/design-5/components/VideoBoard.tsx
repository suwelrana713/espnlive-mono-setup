"use client";

import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoBoardProps {
  embedUrl: string;
  title?: string;
}

export function VideoBoard({ embedUrl, title }: VideoBoardProps) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-line bg-black shadow-card",
        fullscreen ? "fixed inset-0 z-50 rounded-none border-0" : "aspect-video w-full rounded-lg",
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
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-live live-dot" />
          Live feed
        </div>
        <button
          type="button"
          onClick={() => setFullscreen((f) => !f)}
          aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-md bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/85"
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
          className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition hover:bg-black/85"
        >
          Exit fullscreen
        </button>
      )}
    </div>
  );
}
