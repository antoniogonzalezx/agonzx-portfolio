import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const font = await readFile(join(process.cwd(), 'public/fonts/MartianGrotesk-StdBl.woff2'));

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
            fontSize: 88,
            fontWeight: 900,
            fontFamily: 'Martian Grotesk',
            letterSpacing: '-4px',
          }}
        >
          {'{x}'}
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Martian Grotesk', data: font, weight: 900 }],
    }
  );
}
