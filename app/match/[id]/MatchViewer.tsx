'use client'

import { useState } from 'react'
import type { Stream } from '@/lib/types'
import { VideoPlayer } from '@/components/VideoPlayer'
import { StreamCard } from '@/components/StreamCard'

interface MatchViewerProps {
  streams: Stream[]
  title: string
}

export function MatchViewer({ streams, title }: MatchViewerProps) {
  const [selected, setSelected] = useState(0)
  const current = streams[selected]

  return (
    <div className="space-y-4">
      <VideoPlayer embedUrl={current.embedUrl} title={title} />

      <div className="rounded-2xl border border-white/5 bg-white/2 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
          Select Stream · {streams.length} available
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {streams.map((stream, i) => (
            <StreamCard
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
  )
}
