import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SideRailAds } from '@/components/ads/SideRailAds'
import { ClickGatedAds } from '@/components/ads/ClickGatedAds'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jet = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jet',
  display: 'swap',
})

const BASE_URL = 'https://sportpulsetv.online'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SportPulseTV — Feel Every Play. Live Sports Streaming Free.',
    template: '%s | SportPulseTV',
  },
  description:
    'Feel every play. Watch live football, basketball, tennis, cricket, F1, MMA and more in HD — free, no signup, no paywall. Live scores, match streams and fixtures on the pulse of sport.',
  keywords: [
    'sportpulsetv',
    'sport pulse tv',
    'live sports streaming free',
    'watch football live free',
    'free live football stream HD',
    'soccer live stream free',
    'watch match online free',
    'live sports online',
    'football match today live',
    'basketball live stream free',
    'cricket live stream',
    'F1 live stream free',
    'MMA live stream',
    'tennis live stream',
    'sports streaming site no signup',
    'live sports TV free',
  ],
  authors: [{ name: 'SportPulseTV', url: BASE_URL }],
  creator: 'SportPulseTV',
  publisher: 'SportPulseTV',
  category: 'Sports',
  applicationName: 'SportPulseTV',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'SportPulseTV',
    title: 'SportPulseTV — Feel Every Play. Live Sports Streaming Free.',
    description:
      'Live football, basketball, tennis, cricket and more in HD. Free, no signup.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SportPulseTV — Feel Every Play',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sportpulsetv',
    creator: '@sportpulsetv',
    title: 'SportPulseTV — Feel Every Play',
    description: 'Live football, basketball, cricket and more in HD — free.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#00E5FF',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SportPulseTV',
  alternateName: 'SportPulseTV.online',
  url: BASE_URL,
  description:
    'Free live sports streaming — football, basketball, tennis, cricket, F1, MMA and more in HD. Feel every play.',
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SportPulseTV',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  slogan: 'Feel every play.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: `${BASE_URL}/contact`,
    availableLanguage: ['English'],
  },
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jet.variable}`}>
      <head>
        <link rel="preconnect" href="https://streamed.pk" />
        <link rel="dns-prefetch" href="https://streamed.pk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[color:var(--color-canvas)] text-[color:var(--color-ink-1)] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-[color:var(--color-neon-cyan)] focus:px-3 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-black"
        >
          Skip to main
        </a>
        <Providers>
          <Navbar />
          <SideRailAds />
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        <ClickGatedAds />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P6B38HG3');`,
          }}
        />
      </body>
    </html>
  )
}
