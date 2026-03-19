import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
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
        }}
      >
        <span
          style={{
            color: '#3DF2E0',
            fontSize: 16,
            fontWeight: 900,
            fontFamily: 'Martian Grotesk',
            letterSpacing: '-1px',
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
