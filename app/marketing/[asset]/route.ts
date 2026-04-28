import { readFile } from 'fs/promises';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

/* ─────────────────────────────────────────────────────────────────
 * /marketing/<asset>.png — direct PNG download.
 *
 * The SVG files in /public/marketing/ are the canonical source.
 * This route reads each one off disk, rasterises it via @resvg/resvg-js
 * (Rust SVG renderer, faster + smaller than sharp for this single
 * job), and returns a PNG with Content-Disposition: attachment so the
 * browser saves the file straight to disk instead of opening it.
 *
 * Inter font is bundled with the renderer — the wordmark text uses
 * Inter via system-font fallback, so the output matches what you see
 * when opening the SVG in a browser.
 *
 * URL pattern (only `.png` triggers rasterisation):
 *   /marketing/linkedin-banner-agonzx.png
 *   /marketing/avatar-axlab.png
 *   /marketing/og-axlab.png
 * ───────────────────────────────────────────────────────────────── */

export const runtime = 'nodejs';

const ALLOWED = new Set([
  'linkedin-banner-agonzx',
  'linkedin-banner-axlab',
  'avatar-agonzx',
  'avatar-axlab',
  'og-agonzx',
  'og-axlab',
]);

export async function GET(
  _req: Request,
  { params }: { params: { asset: string } },
) {
  const raw = params.asset;

  if (!raw.endsWith('.png')) {
    return new Response('Not found', { status: 404 });
  }
  const slug = raw.replace(/\.png$/, '');
  if (!ALLOWED.has(slug)) {
    return new Response('Not found', { status: 404 });
  }

  const svgPath = path.join(process.cwd(), 'public', 'marketing', `${slug}.svg`);
  let svg: Buffer;
  try {
    svg = await readFile(svgPath);
  } catch {
    return new Response('Not found', { status: 404 });
  }

  /* Render at 2× the SVG's intrinsic size so social-platform downscale
   * still leaves crisp edges.  For LinkedIn (1584×396) that lands at
   * 3168×792, well above retina + within LinkedIn's 8 MB upload cap. */
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'zoom', value: 2 },
    font:  {
      loadSystemFonts: true,
      defaultFontFamily: 'Inter',
    },
  });
  const pngBuffer = resvg.render().asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type':         'image/png',
      'Content-Disposition':  `attachment; filename="${slug}.png"`,
      'Cache-Control':        'public, max-age=3600, s-maxage=86400',
    },
  });
}
