import { ImageResponse } from 'next/og';

export const runtime  = 'edge';
export const size     = { width: 180, height: 180 };
export const contentType = 'image/png';

/* Apple-touch-icon for the axlab studio brand — light surface,
 * indigo glyph, mirrors `app/lab/icon.svg` so iOS home-screen
 * matches the Safari tab once Apple invalidates its cache.        */
export default function AppleIconLab() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          background:      '#FAFBFD',
          color:           '#4F4FFF',
          fontFamily:      'sans-serif',
          fontSize:         110,
          fontWeight:       700,
          letterSpacing:   -4,
          borderRadius:     38,
          border:          '2px solid #E5E8F0',
        }}
      >
        {'{x}'}
      </div>
    ),
    { ...size },
  );
}
