import type { Metadata } from "next";
import { AlertOctagon, MessageSquare, Scale } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
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
    desc: "Report a broken or missing feed.",
  },
  {
    icon: Scale,
    label: "DMCA · Copyright",
    desc: "Content removal within 24h.",
  },
  {
    icon: MessageSquare,
    label: "General inquiry",
    desc: "Any other questions or feedback.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
          Contact
        </span>
        <h1 className="display mt-3 text-[40px] font-extrabold leading-[1.05] text-ink sm:text-[52px]">
          Send us a message.
        </h1>
        <p className="mt-3 max-w-xl text-[14px] text-muted">
          We answer within a business day. For DMCA takedowns, include the
          offending URL and proof of rights.
        </p>
      </header>

      <div className="rounded-md border border-line bg-surface py-3">
        <ResponsiveAd mobile="320x50" desktop="728x90" />
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionTitle title="Reasons to write" accent="primary" />
          <ul className="space-y-3">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <li key={r.label} className="card flex items-start gap-3 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="display text-[14px] font-extrabold text-ink">
                      {r.label}
                    </p>
                    <p className="mt-1 text-[12px] text-muted">{r.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="card p-5">
            <p className="label !text-muted">Response window</p>
            <p className="numeric mt-2 text-[28px] font-extrabold text-ink">
              &lt; 24 hours
            </p>
            <p className="mt-2 text-[12px] text-muted">
              Weekdays, PST business hours. Copyright notices are prioritised.
            </p>
          </div>
        </div>

        <form
          action="https://formsubmit.co/subhoislam624@gmail.com"
          method="POST"
          className="card p-6"
        >
          <SectionTitle title="Send a message" accent="cool" />
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

          <div className="space-y-4">
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
                className="label mb-1.5 block !text-muted"
              >
                Reason
              </label>
              <select
                id="reason"
                name="reason"
                className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none transition focus:border-primary"
              >
                <option value="stream-issue">Stream not working</option>
                <option value="dmca">DMCA / Copyright removal</option>
                <option value="other">General inquiry</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="label mb-1.5 block !text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Describe the issue or question…"
                className="w-full resize-none rounded-md border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none transition placeholder:text-faint focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary py-3 text-[13px] font-bold text-white transition hover:bg-primary-2"
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
      <label htmlFor={name} className="label mb-1.5 block !text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-[14px] text-ink outline-none transition placeholder:text-faint focus:border-primary"
      />
    </div>
  );
}
