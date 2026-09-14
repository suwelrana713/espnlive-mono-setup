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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#FF6B00",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 800,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#FF6B00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            F
          </div>
          FanZoneLive
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 116,
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
              fontSize: 116,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -5,
              display: "flex",
              color: "#FF6B00",
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
          <div style={{ display: "flex" }}>fanzonelive.online</div>
          <div style={{ display: "flex" }}>Free · HD · No signup</div>
        </div>
      </div>
    ),
    size,
  );
}
