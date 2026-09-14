import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FF6B00 0%, #FF3D00 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          borderRadius: 36,
        }}
      >
        <svg width="108" height="108" viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="8" r="2.2" fill="#ffffff" />
          <circle cx="12" cy="6.5" r="2.6" fill="#ffffff" />
          <circle cx="17" cy="8" r="2.2" fill="#ffffff" />
          <path
            d="M3 20 Q5 13 8 12.5 Q10 14 12 13.5 Q14 14 16 12.5 Q19 13 21 20 Z"
            fill="#ffffff"
          />
        </svg>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 20,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: 3,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Fan Zone
        </div>
      </div>
    ),
    size,
  );
}
