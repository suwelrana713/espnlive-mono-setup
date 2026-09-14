import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #08060f 0%, #1a0b2e 100%)",
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
        <svg
          width="110"
          height="110"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12h4l2-6 4 12 3-9 2 3h5"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: "#00E5FF",
            letterSpacing: 3,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Pulse
        </div>
      </div>
    ),
    size,
  );
}
