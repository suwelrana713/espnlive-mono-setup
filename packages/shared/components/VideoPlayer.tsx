"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  embedUrl: string;
  title?: string;
}

export function VideoPlayer({ embedUrl, title }: VideoPlayerProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <AnimatePresence>
      <motion.div
        key={fullscreen ? "full" : "normal"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-black",
          fullscreen
            ? "fixed inset-0 z-50 rounded-none"
            : "aspect-video w-full max-w-full",
        )}
      >
        <iframe
          key={key}
          src={embedUrl}
          title={title ?? "Live Stream"}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          referrerPolicy="no-referrer"
        />

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-auto">
          <div className="absolute right-3 top-3 flex gap-2">
            {/* <button
              onClick={() => setKey(k => k + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white/80 backdrop-blur-sm transition hover:bg-black/80"
              title="Reload"
            >
              <RefreshCw className="h-4 w-4" />
            </button> */}
            <button
              onClick={() => setFullscreen((f) => !f)}
              className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-black/60 text-white/80 backdrop-blur-sm transition hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white"
              title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {fullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {fullscreen && (
          <button
            onClick={() => setFullscreen(false)}
            className="absolute left-4 top-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm transition hover:bg-black/80"
          >
            Exit fullscreen
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
