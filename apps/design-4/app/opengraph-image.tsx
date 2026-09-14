import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SportVibeHub — Catch the vibe. Live.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "radial-gradient(ellipse at top right, #4C1D95 0%, #07080b 60%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 18,
              background: "rgba(124, 58, 237, 0.14)",
              border: "2px solid #7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 60px rgba(124, 58, 237, 0.5)",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3.4" fill="#7C3AED" />
              <circle cx="12" cy="12" r="8" stroke="#7C3AED" strokeWidth="1.8" fill="none" />
              <path
                d="M12 4v3 M12 17v3 M4 12h3 M17 12h3"
                stroke="#7C3AED"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M6.3 6.3l1.6 1.6 M16.1 16.1l1.6 1.6 M6.3 17.7l1.6-1.6 M16.1 7.9l1.6-1.6"
                stroke="#EC4899"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: "#f3f4f6",
                letterSpacing: -1,
                display: "flex",
              }}
            >
              SportVibe<span style={{ color: "#7C3AED" }}>Hub</span>
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#A78BFA",
                letterSpacing: 6,
                textTransform: "uppercase",
                fontWeight: 700,
                marginTop: 4,
                display: "flex",
              }}
            >
              // sportvibehub.online · On air
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: "#f3f4f6",
              lineHeight: 0.95,
              letterSpacing: -6,
              display: "flex",
            }}
          >
            Catch the
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -6,
              display: "flex",
              background: "linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            vibe. Live.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#9ca3af",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex" }}>Free · HD · No signup</div>
          <div style={{ display: "flex" }}>Football · NBA · F1 · MMA</div>
        </div>
      </div>
    ),
    size,
  );
}
