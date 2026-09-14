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
          background: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)",
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
        V
      </div>
    ),
    size,
  );
}
