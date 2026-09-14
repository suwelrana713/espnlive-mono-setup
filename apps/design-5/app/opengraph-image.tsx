import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FanZoneLive — Where fans watch live";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "#FF6B00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 60px -20px rgba(255, 107, 0, 0.5)",
            }}
          >
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
              <circle cx="7" cy="8" r="2.2" fill="#ffffff" />
              <circle cx="12" cy="6.5" r="2.6" fill="#ffffff" />
              <circle cx="17" cy="8" r="2.2" fill="#ffffff" />
              <path
                d="M3 20 Q5 13 8 12.5 Q10 14 12 13.5 Q14 14 16 12.5 Q19 13 21 20 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                color: "#0a0e14",
                letterSpacing: -1,
                display: "flex",
              }}
            >
              FanZone<span style={{ color: "#FF6B00" }}>Live</span>
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#FF6B00",
                letterSpacing: 5,
                textTransform: "uppercase",
                fontWeight: 800,
                marginTop: 4,
                display: "flex",
              }}
            >
              fanzonelive.online
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 118,
              fontWeight: 900,
              color: "#0a0e14",
              lineHeight: 0.95,
              letterSpacing: -5,
              display: "flex",
            }}
          >
            Where fans
          </div>
          <div
            style={{
              fontSize: 118,
              fontWeight: 900,
              color: "#FF6B00",
              lineHeight: 0.95,
              letterSpacing: -5,
              display: "flex",
            }}
          >
            watch live.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#6b7280",
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
