'use client'

import { useState } from 'react'
import type { Stream } from '@/lib/types'
import { VideoPlayer } from '@/components/VideoPlayer'
import { StreamCard } from '@/components/StreamCard'

interface Props {
  streams: Stream[]
  title: string
}

export function MatchViewer({ streams, title }: Props) {
  const [selected, setSelected] = useState(0)
  const current = streams[selected]

  return (
    <div className="space-y-4">
      <VideoPlayer embedUrl={current.embedUrl} title={title} />

      <div className="glass overflow-hidden rounded-[22px]">
        <div className="flex items-center justify-between border-b border-white/6 px-5 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-2)]">
            &mdash;&nbsp; Feed Selector
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)] tabular-nums">
            {(selected + 1).toString().padStart(2, '0')} <span className="text-[color:var(--color-ink-4)]">/</span>{' '}
            {streams.length.toString().padStart(2, '0')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2">
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
