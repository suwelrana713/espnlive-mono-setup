import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KickoffStreams — Every kickoff. Live. Free.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f7f4ee 0%, #ffffff 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "serif",
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
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "#00A651",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px -20px rgba(0, 166, 81, 0.55)",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 20 Q10 4 21 12"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="6" cy="19" r="2.6" fill="#ffffff" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: "#0b0b0b",
                letterSpacing: -1,
                display: "flex",
              }}
            >
              Kickoff<span style={{ color: "#00A651" }}>Streams</span>
            </div>
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 18,
                color: "#00A651",
                letterSpacing: 5,
                textTransform: "uppercase",
                fontWeight: 700,
                marginTop: 4,
                display: "flex",
              }}
            >
              kickoffstreams.online
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              color: "#0b0b0b",
              lineHeight: 0.95,
              letterSpacing: -4,
              display: "flex",
            }}
          >
            Every kickoff.
          </div>
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              color: "#00A651",
              lineHeight: 0.95,
              letterSpacing: -4,
              display: "flex",
            }}
          >
            Live. Free.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#666",
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
