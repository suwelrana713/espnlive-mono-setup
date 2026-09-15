'use client'

import Script from 'next/script'
import { ADS } from './adConfig'

export function AdSocialBar() {
  return (
    <Script
      id="ads-social-bar"
      src={ADS.socialBarSrc}
      strategy="lazyOnload"
      data-cfasync="false"
    />
  )
}
