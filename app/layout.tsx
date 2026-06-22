import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: { default: 'ES Soccer Sports — Live Sports Streaming', template: '%s | ES Soccer Sports' },
  description: 'Watch live sports online. Football, basketball, tennis, and more — premium HD streaming free.',
  keywords: ['live sports', 'football streaming', 'soccer live', 'sports stream', 'free sports TV'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://essoccersports.com',
    siteName: 'ES Soccer Sports',
    title: 'ES Soccer Sports — Live Sports Streaming',
    description: 'Premium live sports streaming platform',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#080c14',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="flex min-h-dvh flex-col bg-[#080c14] text-white antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
