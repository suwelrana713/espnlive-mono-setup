import type { Metadata } from "next";
import { AlertOctagon, MessageSquare, Scale } from "lucide-react";
import { SectionBar } from "@/components/SectionBar";
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
    code: "01",
    label: "Stream not working",
    desc: "Report a broken or missing feed.",
  },
  {
    icon: Scale,
    code: "02",
    label: "DMCA · Copyright",
    desc: "Content removal within 24h.",
  },
  {
    icon: MessageSquare,
    code: "03",
    label: "General inquiry",
    desc: "Any other questions or feedback.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1160px] px-5 py-8 sm:px-8 lg:px-10">
      <div className="border-b border-line pb-14">
        <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
          // Contact · Direct line
        </p>
        <h1 className="display mt-3 text-3xl sm:text-4xl md:text-[52px] font-bold leading-[0.95] text-fg sm:text-[80px]">
          Open a channel.
        </h1>
        <p className="mt-4 max-w-xl text-fg-mid">
          We answer within a business day. For DMCA takedowns, include the
          offending URL and proof of rights.
        </p>
      </div>

      <div className="my-8 rounded-panel border border-line-2 bg-panel py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="grid gap-10 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionBar code="01" eyebrow="Reasons" title="Why write" />
          <ul className="space-y-3">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <li
                  key={r.label}
                  className="flex items-start gap-4 rounded-panel border border-line bg-panel p-4"
                >
                  <span className="mono flex h-9 w-9 shrink-0 items-center justify-center rounded-tag border border-neon/40 bg-neon/5 text-[10px] font-bold tracking-widest text-neon">
                    {r.code}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon
                        className="h-4 w-4 text-fg-mid"
                        strokeWidth={1.75}
                      />
                      <p className="display text-lg font-bold text-fg">
                        {r.label}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-fg-mid">{r.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 rounded-panel border border-neon/40 bg-neon/5 p-6">
            <p className="mono text-[10px] uppercase tracking-[0.28em] text-neon">
              // Response window
            </p>
            <p className="display mt-2 text-3xl font-bold text-fg">
              &lt; 24 hours
            </p>
            <p className="mt-2 text-sm text-fg-mid">
              Weekdays, PST business hours. Copyright notices are prioritised.
            </p>
          </div>
        </div>

        <form
          action="https://formsubmit.co/subhoislam624@gmail.com"
          method="POST"
          className="rounded-panel border border-line bg-panel p-8"
        >
          <SectionBar code="02" eyebrow="Compose" title="Send transmission" />
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

          <div className="space-y-5">
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
                className="mono block text-[10px] uppercase tracking-[0.22em] text-fg-dim"
              >
                Reason
              </label>
              <select
                id="reason"
                name="reason"
                className="mono mt-2 w-full rounded-tag border border-line-2 bg-panel-2 px-3 py-3 text-[14px] text-fg outline-none transition focus:border-neon"
              >
                <option value="stream-issue">Stream not working</option>
                <option value="dmca">DMCA / Copyright removal</option>
                <option value="other">General inquiry</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mono block text-[10px] uppercase tracking-[0.22em] text-fg-dim"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Describe the issue or question…"
                className="mono mt-2 w-full resize-none rounded-tag border border-line-2 bg-panel-2 px-3 py-3 text-[14px] text-fg outline-none placeholder-fg-faint transition focus:border-neon"
              />
            </div>

            <button
              type="submit"
              className="mono w-full rounded-tag border border-neon bg-neon py-4 text-[12px] font-bold uppercase tracking-[0.22em] text-void transition hover:bg-transparent hover:text-neon"
            >
              [ Transmit message ]
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
        className="mono block text-[10px] uppercase tracking-[0.22em] text-fg-dim"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mono mt-2 w-full rounded-tag border border-line-2 bg-panel-2 px-3 py-3 text-[14px] text-fg outline-none placeholder-fg-faint transition focus:border-neon"
      />
    </div>
  );
}
