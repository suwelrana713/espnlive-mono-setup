'use client'

import { motion } from 'framer-motion'
import { Monitor, Wifi, Users } from 'lucide-react'
import type { Stream } from '@/lib/types'
import { cn } from '@/lib/utils'

interface StreamCardProps {
  stream: Stream
  selected?: boolean
  onClick?: () => void
  index?: number
}

export function StreamCard({ stream, selected, onClick, index = 0 }: StreamCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200',
        selected
          ? 'border-red-500/50 bg-red-500/10 shadow-md shadow-red-950/30'
          : 'border-white/5 bg-white/3 hover:border-white/15 hover:bg-white/6'
      )}
    >
      <div className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
        selected ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/40'
      )}>
        <Monitor className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{stream.language}</p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            {stream.hd ? 'HD' : 'SD'}
          </span>
          {stream.viewers > 0 && (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {stream.viewers.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      {selected && (
        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
      )}
    </motion.button>
  )
}
