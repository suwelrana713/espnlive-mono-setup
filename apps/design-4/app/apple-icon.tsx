import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a0b2e 0%, #07080b 100%)",
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
        <svg width="112" height="112" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3.4" fill="#7C3AED" />
          <circle cx="12" cy="12" r="8" stroke="#7C3AED" strokeWidth="1.6" fill="none" />
          <path
            d="M12 4v3 M12 17v3 M4 12h3 M17 12h3"
            stroke="#7C3AED"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M6.3 6.3l1.6 1.6 M16.1 16.1l1.6 1.6 M6.3 17.7l1.6-1.6 M16.1 7.9l1.6-1.6"
            stroke="#EC4899"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: "#A78BFA",
            letterSpacing: 3,
            textTransform: "uppercase",
            marginTop: 2,
            display: "flex",
          }}
        >
          Hub
        </div>
      </div>
    ),
    size,
  );
}
