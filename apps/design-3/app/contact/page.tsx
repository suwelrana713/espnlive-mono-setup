import type { Metadata } from "next";
import { AlertOctagon, MessageSquare, Scale } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";
import { ResponsiveAd } from "@/ads/AdBanner";

export const metadata: Metadata = {
  title: "Contact ESPN Live — Get in Touch",
  description:
    "Contact ESPN Live for support, DMCA notices, stream issues, or general inquiries. We respond within 24 hours.",
  alternates: { canonical: "https://espnlive.online/contact" },
  openGraph: {
    type: "website",
    url: "https://espnlive.online/contact",
    title: "Contact ESPN Live",
    description: "Get in touch with ESPN Live for support or inquiries.",
    siteName: "ESPN Live",
  },
};

const REASONS = [
  {
    icon: AlertOctagon,
    label: "Stream not working",
    desc: "Report a broken or missing stream link.",
  },
  {
    icon: Scale,
    label: "DMCA · Copyright",
    desc: "Content removal requests handled within 24h.",
  },
  {
    icon: MessageSquare,
    label: "General inquiry",
    desc: "Any other questions or feedback.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8">
      <div className="border-b border-hairline pb-14">
        <p className="eyebrow">Correspondence · Desk</p>
        <h1 className="serif mt-3 text-[52px] font-black leading-[0.95] tracking-tight text-ink sm:text-[88px]">
          Write to the desk.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          We answer within a business day. For DMCA takedowns, please include
          the offending URL and proof of rights.
        </p>
      </div>

      <div className="mt-8 border-b border-hairline bg-panel-soft/60 py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow number="01">Reasons to write</Eyebrow>
          <ul className="mt-6 space-y-4">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <li
                  key={r.label}
                  className="flex items-start gap-4 border-b border-hairline pb-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline text-accent">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="serif text-lg font-semibold text-ink">
                      {r.label}
                    </p>
                    <p className="mt-1 text-sm text-muted">{r.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 border border-hairline bg-panel p-6">
            <p className="eyebrow">Response window</p>
            <p className="serif mt-2 text-2xl font-black text-ink">
              Under 24 hours
            </p>
            <p className="mt-2 text-sm text-muted">
              Weekdays, PST business hours. Copyright notices are prioritised.
            </p>
          </div>
        </div>

        <form
          action="https://formsubmit.co/subhoislam624@gmail.com"
          method="POST"
          className="border border-hairline bg-panel p-8"
        >
          <Eyebrow number="02">Send a message</Eyebrow>
          <input
            type="hidden"
            name="_subject"
            value="ESPN Live — Contact Form"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://espnlive.online/contact?sent=true"
          />

          <div className="mt-6 space-y-6">
            <Field label="Name" name="name" required placeholder="Full name" />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
            <div>
              <label
                htmlFor="reason"
                className="mono block text-[10px] uppercase tracking-[0.22em] text-muted"
              >
                Reason
              </label>
              <select
                id="reason"
                name="reason"
                className="serif mt-2 w-full border-b border-ink bg-transparent py-2 text-[16px] font-semibold text-ink outline-none"
              >
                <option value="stream-issue">Stream not working</option>
                <option value="dmca">DMCA / Copyright removal</option>
                <option value="other">General inquiry</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mono block text-[10px] uppercase tracking-[0.22em] text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Describe the issue or question…"
                className="serif mt-2 w-full resize-none border-b border-ink bg-transparent py-2 text-[16px] text-ink outline-none placeholder-faint"
              />
            </div>

            <button
              type="submit"
              className="mono w-full rounded-sm bg-ink py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-paper transition hover:bg-accent"
            >
              Send message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mono block text-[10px] uppercase tracking-[0.22em] text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="serif mt-2 w-full border-b border-ink bg-transparent py-2 text-[16px] font-semibold text-ink outline-none placeholder-faint"
      />
    </div>
  );
}
