'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
  placeholder?: string
  autoFocus?: boolean
  defaultValue?: string
  onSearch?: (value: string) => void
}

export function SearchBar({ className, placeholder = 'Search matches, teams, sports…', autoFocus, defaultValue = '', onSearch }: SearchBarProps) {
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
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-white/8 bg-white/5 pl-10 pr-10 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/20 focus:bg-white/8 focus:ring-1 focus:ring-white/10"
      />
      {value && (
        <button
          type="button"
          onClick={() => { setValue(''); onSearch?.('') }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-white/30 transition hover:text-white/60"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  )
}
