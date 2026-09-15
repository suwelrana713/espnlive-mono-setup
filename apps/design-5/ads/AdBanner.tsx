'use client'

import { useEffect, useRef } from 'react'
import { ADS, type BannerSize } from './adConfig'
import { cn } from '@/lib/utils'
import { adsEnabled } from '@espnlive/shared/lib/ads-config'

interface AdBannerProps {
  size: BannerSize
  className?: string
}

export function AdBanner({ size, className }: AdBannerProps) {
  const ref = useRef<HTMLIFrameElement>(null)
  const cfg = ADS.banners[size]

  useEffect(() => {
    if (!adsEnabled) return
    const iframe = ref.current
    if (!iframe) return
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body><script type="text/javascript">atOptions={'key':'${cfg.key}','format':'iframe','height':${cfg.h},'width':${cfg.w},'params':{}};</script><script async src="${ADS.invokeBase}/${cfg.key}/invoke.js"></script></body></html>`
    iframe.srcdoc = html
  }, [cfg.key, cfg.w, cfg.h])

  if (!adsEnabled) return null

  return (
    <div
      aria-label="Advertisement"
      role="complementary"
      data-ad-slot="banner"
      className={cn('flex justify-center max-w-full overflow-hidden', className)}
    >
      <iframe
        ref={ref}
        title="Advertisement"
        width={cfg.w}
        height={cfg.h}
        scrolling="no"
        frameBorder={0}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer-when-downgrade"
        loading="lazy"
        style={{ width: cfg.w, height: cfg.h, border: 0, display: 'block', maxWidth: '100%' }}
      />
    </div>
  )
}

interface ResponsiveAdProps {
  mobile: BannerSize
  desktop: BannerSize
  breakpoint?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveAd({ mobile, desktop, breakpoint = 'md', className }: ResponsiveAdProps) {
  if (!adsEnabled) return null
  const showMobile = {
    sm: 'block sm:hidden',
    md: 'block md:hidden',
    lg: 'block lg:hidden',
  }[breakpoint]
  const showDesktop = {
    sm: 'hidden sm:block',
    md: 'hidden md:block',
    lg: 'hidden lg:block',
  }[breakpoint]
  return (
    <>
      <div className={cn(showMobile, className)}>
        <AdBanner size={mobile} />
      </div>
      <div className={cn(showDesktop, className)}>
        <AdBanner size={desktop} />
      </div>
    </>
  )
}
