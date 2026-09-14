import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #00A651 0%, #00753A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          borderRadius: 36,
        }}
      >
        <svg width="108" height="108" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 20 Q10 4 21 12"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="6" cy="19" r="2.4" fill="#ffffff" />
        </svg>
        <div
          style={{
            fontFamily: "serif",
            fontSize: 20,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -0.5,
            display: "flex",
          }}
        >
          Kickoff
        </div>
      </div>
    ),
    size,
  );
}
