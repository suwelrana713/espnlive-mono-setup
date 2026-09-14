import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SportPulseTV — Feel Every Play";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "radial-gradient(ellipse at top left, #1a0b2e 0%, #08060f 60%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "rgba(0, 229, 255, 0.12)",
              border: "2px solid #00E5FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(0, 229, 255, 0.4)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 12h4l2-6 4 12 3-9 2 3h5"
                stroke="#00E5FF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: "#f4f5f7",
                letterSpacing: -1,
                display: "flex",
              }}
            >
              SportPulse<span style={{ color: "#00E5FF" }}>TV</span>
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#00E5FF",
                letterSpacing: 6,
                textTransform: "uppercase",
                fontWeight: 700,
                marginTop: 2,
                display: "flex",
              }}
            >
              sportpulsetv.online · On air
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: "#f4f5f7",
              lineHeight: 0.95,
              letterSpacing: -6,
              display: "flex",
            }}
          >
            Feel every
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -6,
              display: "flex",
              background: "linear-gradient(90deg, #00E5FF 0%, #B026FF 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            play. Live.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#8b8fa3",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
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
