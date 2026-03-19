import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F14',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            color: '#3DF2E0',
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: '-2px',
          }}
        >
          {'{x}'}
        </span>
      </div>
    ),
    { ...size }
  );
}
