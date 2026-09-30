import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Live Sport — Free Live Streams & Scores";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { sport: string };
}

export default async function SportOgImage({ params }: Props) {
  const sport = params.sport;
  const name = sport
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "rgba(124, 58, 237, 0.14)",
              border: "2px solid #7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 60px rgba(124, 58, 237, 0.5)",
              color: "#7C3AED",
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            LS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "#f3f4f6",
                letterSpacing: -1,
                display: "flex",
              }}
            >
              Live<span style={{ color: "#7C3AED" }}>Score</span>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#A78BFA",
                letterSpacing: 5,
                textTransform: "uppercase",
                fontWeight: 700,
                marginTop: 4,
                display: "flex",
              }}
            >
              // livesofascore.online
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#A78BFA",
              letterSpacing: 8,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Channel · {sport.toUpperCase()}
          </div>
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
            {name}
          </div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -1,
              display: "flex",
              background: "linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Live Scores & Free HD Streams
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#9ca3af",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex" }}>Free · HD · No signup</div>
          <div style={{ display: "flex" }}>
            Multiple mirrors · Updated every minute
          </div>
        </div>
      </div>
    ),
    size,
  );
}
