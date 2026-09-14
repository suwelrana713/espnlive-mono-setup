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
          background:
            "radial-gradient(ellipse at top right, #4C1D95 0%, #07080b 60%)",
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
            gap: 14,
            fontSize: 20,
            color: "#A78BFA",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#7C3AED",
              boxShadow: "0 0 24px #7C3AED",
            }}
          />
          // SportVibeHub · On air
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              color: "#f3f4f6",
              lineHeight: 0.95,
              letterSpacing: -5,
              display: "flex",
            }}
          >
            Catch the
          </div>
          <div
            style={{
              fontSize: 128,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -5,
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
          <div style={{ display: "flex" }}>sportvibehub.online</div>
          <div style={{ display: "flex" }}>Free · HD · No signup</div>
        </div>
      </div>
    ),
    size,
  );
}
