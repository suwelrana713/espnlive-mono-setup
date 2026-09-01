'use client'

import Script from 'next/script'
import { ADS } from './adConfig'

export function AdPopunder() {
  return (
    <Script
      id="ads-popunder"
      src={ADS.popunderSrc}
      strategy="lazyOnload"
      data-cfasync="false"
    />
  )
}
