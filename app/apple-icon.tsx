import { ImageResponse } from 'next/og';

export const runtime  = 'edge';
export const size     = { width: 180, height: 180 };
export const contentType = 'image/png';

/* Apple-touch-icon for iOS home-screen + Safari tab.
 * Static SVG (`app/icon.svg`) is enough for modern Chrome / Firefox,
 * but iOS Safari still demands a 180×180 PNG and aggressively caches
 * it.  Rendering this via ImageResponse keeps the source of truth in
 * one place: edit the {x} below and both icons stay in sync.        */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          background:      '#0B0F1A',
          color:           '#6B6BFF',
          fontFamily:      'sans-serif',
          fontSize:         110,
          fontWeight:       700,
          letterSpacing:   -4,
          borderRadius:     38,
        }}
      >
        {'{x}'}
      </div>
    ),
    { ...size },
  );
}
