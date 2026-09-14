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
            gap: 16,
            fontSize: 22,
            color: "#00A651",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#e10600",
            }}
          />
          KickoffStreams · Live
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
            fontSize: 24,
            color: "#666",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>kickoffstreams.online</div>
          <div style={{ display: "flex" }}>Football · Basketball · F1 · MMA</div>
        </div>
      </div>
    ),
    size,
  );
}
