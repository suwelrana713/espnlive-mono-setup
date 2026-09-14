import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 118,
          background: "linear-gradient(135deg, #FF6B00 0%, #FF3D00 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: -4,
          borderRadius: 36,
        }}
      >
        F
      </div>
    ),
    size,
  );
}
