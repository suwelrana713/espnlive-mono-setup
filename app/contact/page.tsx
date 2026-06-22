import type { Metadata } from 'next'
import { Mail, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact ESPN Live — Get in Touch',
  description:
    'Contact ESPN Live for support, DMCA notices, stream issues, or general inquiries. We respond within 24 hours.',
  alternates: { canonical: 'https://espnlive.online/contact' },
  openGraph: {
    type: 'website',
    url: 'https://espnlive.online/contact',
    title: 'Contact ESPN Live',
    description: 'Get in touch with ESPN Live for support or inquiries.',
    siteName: 'ESPN Live',
  },
}

const contactReasons = [
  { icon: MessageSquare, label: 'Stream not working', desc: 'Report a broken or missing stream link.' },
  { icon: Mail, label: 'DMCA / Copyright', desc: 'Content removal requests handled within 24h.' },
  { icon: MessageSquare, label: 'General inquiry', desc: 'Any other questions or feedback.' },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white">Contact Us</h1>
        <p className="mt-3 text-white/50">
          We aim to respond within 24 hours on business days.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {contactReasons.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="rounded-2xl border border-white/5 bg-white/2 p-4 text-center">
            <Icon className="mx-auto mb-2 h-5 w-5 text-red-400" />
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="mt-1 text-xs text-white/40">{desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
        <h2 className="mb-6 text-lg font-bold text-white">Send a Message</h2>
        <form
          action="https://formsubmit.co/teamrootdevs@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <input type="hidden" name="_subject" value="ESPN Live — Contact Form" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://espnlive.online/contact?sent=true" />

          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-white/60">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30"
            />
          </div>

          <div>
            <label htmlFor="reason" className="mb-1.5 block text-xs font-medium text-white/60">
              Reason
            </label>
            <select
              id="reason"
              name="reason"
              className="w-full rounded-xl border border-white/10 bg-[#080c14] px-4 py-3 text-sm text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30"
            >
              <option value="stream-issue">Stream not working</option>
              <option value="dmca">DMCA / Copyright removal</option>
              <option value="other">General inquiry</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-white/60">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Describe your issue or question..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/30 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-500 active:bg-red-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
