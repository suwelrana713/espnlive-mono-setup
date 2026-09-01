'use client'

import { useEffect, useRef } from 'react'
import { ADS } from './adConfig'
import { cn } from '@/lib/utils'

interface AdNativeBannerProps {
  className?: string
}

export function AdNativeBanner({ className }: AdNativeBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current || !ref.current) return
    mounted.current = true

    const container = document.createElement('div')
    container.id = ADS.nativeBanner.containerId
    ref.current.appendChild(container)

    const script = document.createElement('script')
    script.async = true
    script.src = ADS.nativeBanner.src
    script.setAttribute('data-cfasync', 'false')
    ref.current.appendChild(script)

    return () => {
      mounted.current = false
      if (ref.current) ref.current.innerHTML = ''
    }
  }, [])

  return (
    <div
      aria-label="Sponsored content"
      role="complementary"
      className={cn('w-full my-6', className)}
    >
      <p className="mb-2 text-[10px] uppercase tracking-widest text-white/25">Sponsored</p>
      <div ref={ref} />
    </div>
  )
}
