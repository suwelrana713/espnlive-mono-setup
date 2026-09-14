import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SportPulseTV — Feel Every Play'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'radial-gradient(ellipse at top left, #1a0b2e 0%, #08060f 60%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 20,
            color: '#00E5FF',
            letterSpacing: 6,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: '#FF3355',
              boxShadow: '0 0 24px #FF3355',
            }}
          />
          SportPulseTV · On Air
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              color: '#f4f5f7',
              lineHeight: 0.95,
              letterSpacing: -6,
              display: 'flex',
            }}
          >
            Feel every
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -6,
              display: 'flex',
              background:
                'linear-gradient(90deg, #00E5FF 0%, #B026FF 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            play. Live.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            color: '#8b8fa3',
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex' }}>sportpulsetv.online</div>
          <div style={{ display: 'flex' }}>Football · Basketball · F1 · MMA</div>
        </div>
      </div>
    ),
    size,
  )
}
