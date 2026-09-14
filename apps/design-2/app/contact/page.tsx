import type { Metadata } from "next";
import { Mail, MessageSquare, Radio, ShieldAlert } from "lucide-react";
import { ResponsiveAd } from "@/components/ads/AdBanner";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Contact SportPulseTV — Get in Touch",
  description:
    "Contact SportPulseTV for support, DMCA notices, stream issues, or general inquiries. We respond within 24 hours.",
  alternates: { canonical: "https://sportpulsetv.online/contact" },
  openGraph: {
    type: "website",
    url: "https://sportpulsetv.online/contact",
    title: "Contact SportPulseTV",
    description: "Get in touch with SportPulseTV for support or inquiries.",
    siteName: "SportPulseTV",
  },
};

const REASONS = [
  {
    icon: Radio,
    code: "01",
    label: "Feed Not Working",
    desc: "Report a broken or missing stream.",
  },
  {
    icon: ShieldAlert,
    code: "02",
    label: "DMCA / Copyright",
    desc: "Content removal — handled within 24h.",
  },
  {
    icon: MessageSquare,
    code: "03",
    label: "General Enquiry",
    desc: "Feature requests, feedback, anything else.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeader
        code="//"
        eyebrow="Get in touch"
        title="Contact channel open"
        meta="Response within 24h on business days"
      />

      <div className="mb-8">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <div className="mb-8 grid gap-3 grid-cols-1 md:grid-cols-3">
        {REASONS.map(({ icon: Icon, code, label, desc }) => (
          <div key={label} className="glass rounded-[22px] p-4">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-[color:var(--color-neon-cyan)]/10 text-[color:var(--color-neon-cyan)]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-4)] tabular-nums">
                {code}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-[color:var(--color-ink-1)]">
              {label}
            </p>
            <p className="mt-1 text-xs text-[color:var(--color-ink-3)]">
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-strong overflow-hidden rounded-[22px]">
        <div className="flex items-center gap-2 border-b border-white/6 px-6 py-4">
          <Mail className="h-4 w-4 text-[color:var(--color-neon-cyan)]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-2)]">
            &mdash;&nbsp; Transmit&nbsp;Message
          </p>
        </div>
        <form
          action="https://formsubmit.co/subhoislam624@gmail.com"
          method="POST"
          className="space-y-5 p-6 sm:p-8"
        >
          <input
            type="hidden"
            name="_subject"
            value="SportPulseTV — Contact Form"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://sportpulsetv.online/contact?sent=true"
          />

          <Field label="Name" name="name" placeholder="Your name" />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />

          <div>
            <FieldLabel htmlFor="reason">Reason</FieldLabel>
            <select
              id="reason"
              name="reason"
              className="w-full rounded-[14px] border border-white/8 bg-[color:var(--color-panel)] px-4 py-3 text-sm text-[color:var(--color-ink-1)] outline-none transition focus:border-[color:var(--color-neon-cyan)]/45 focus:shadow-[0_0_0_4px_rgba(34,228,255,0.08)]"
            >
              <option value="stream-issue">Stream not working</option>
              <option value="dmca">DMCA / Copyright removal</option>
              <option value="other">General enquiry</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Describe your issue or question…"
              className="w-full resize-none rounded-[14px] border border-white/8 bg-white/3 px-4 py-3 text-sm text-[color:var(--color-ink-1)] placeholder:text-[color:var(--color-ink-3)] outline-none transition focus:border-[color:var(--color-neon-cyan)]/45 focus:bg-white/6 focus:shadow-[0_0_0_4px_rgba(34,228,255,0.08)]"
            />
          </div>

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-[14px] bg-[color:var(--color-signal)] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white transition hover:brightness-110 shadow-[0_0_0_1px_rgba(255,51,85,0.35),0_10px_28px_-10px_rgba(255,51,85,0.55)]"
          >
            Transmit &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-3)]"
    >
      &mdash;&nbsp; {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-[14px] border border-white/8 bg-white/3 px-4 py-3 text-sm text-[color:var(--color-ink-1)] placeholder:text-[color:var(--color-ink-3)] outline-none transition focus:border-[color:var(--color-neon-cyan)]/45 focus:bg-white/6 focus:shadow-[0_0_0_4px_rgba(34,228,255,0.08)]"
      />
    </div>
  );
}
