'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
  placeholder?: string
  autoFocus?: boolean
  defaultValue?: string
  onSearch?: (value: string) => void
  compact?: boolean
}

export function SearchBar({
  className,
  placeholder = 'Search feeds, teams, sports…',
  autoFocus,
  defaultValue = '',
  onSearch,
  compact,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    if (!onSearch) return
    const t = setTimeout(() => onSearch(value), 300)
    return () => clearTimeout(t)
  }, [value, onSearch])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative group', className)}>
      <div
        className={cn(
          'flex items-center gap-2 rounded-[14px] border border-white/8 bg-white/3 pl-3 pr-2 sm:pl-4 transition',
          'group-focus-within:border-[color:var(--color-neon-cyan)]/50 group-focus-within:bg-white/6',
          'group-focus-within:shadow-[0_0_0_4px_rgba(34,228,255,0.08)]',
          compact ? 'h-9' : 'h-12'
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-[color:var(--color-ink-3)] group-focus-within:text-[color:var(--color-neon-cyan)]" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          className={cn(
            'w-full bg-transparent text-[color:var(--color-ink-1)] placeholder:text-[color:var(--color-ink-3)] outline-none',
            compact ? 'text-xs' : 'text-sm'
          )}
        />
        {value ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue('')
              onSearch?.('')
            }}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[color:var(--color-ink-3)] transition hover:bg-white/6 hover:text-[color:var(--color-ink-1)]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <kbd className="hidden items-center gap-1 rounded-md border border-white/8 bg-white/3 px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--color-ink-3)] md:inline-flex">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        )}
      </div>
    </form>
  )
}
