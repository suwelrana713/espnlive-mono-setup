import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          background: 'linear-gradient(135deg, #08060f 0%, #1a0b2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00E5FF',
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: -4,
          borderRadius: 36,
        }}
      >
        S
      </div>
    ),
    size,
  )
}
