import type { Metadata } from 'next';

/* ─────────────────────────────────────────────────────────────────
 * /marketing — internal asset hub.
 *
 * Lists every brand asset shipped under /public/marketing/ with a
 * thumbnail and a direct download link.  Not in the sitemap, not
 * linked from anywhere public — only useful when uploading to
 * LinkedIn / Instagram / etc.
 *
 * SVG is the canonical format here: infinite scale, perfect
 * fidelity, tiny file size.  Most platforms accept SVG directly;
 * the few that don't (LinkedIn banners) just need a one-shot PNG
 * export from any browser or design tool.
 * ───────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:   'Brand assets · agonzx',
  robots:  { index: false, follow: false },
};

/* For every asset:
 *  - `preview` is the static SVG (fast in the browser, vector preview)
 *  - `png`     is the rasterised download served by the /marketing/[asset]
 *              route handler — clicking the card pushes the PNG straight
 *              to disk so you can upload to LinkedIn without conversions.
 *  - `size`    is the SVG's intrinsic dimension; the PNG comes back at
 *              2× that for retina sharpness (handler config).             */
const ASSETS = [
  {
    group: 'agonzx · iOS Engineer (dark)',
    items: [
      { name: 'LinkedIn personal banner',         slug: 'linkedin-banner-agonzx', size: '1584 × 396' },
      { name: 'Avatar (LinkedIn / GitHub / X)',   slug: 'avatar-agonzx',          size: '400 × 400'  },
      { name: 'Open Graph (link unfurl)',         slug: 'og-agonzx',              size: '1200 × 630' },
    ],
  },
  {
    group: 'axlab · Studio (light)',
    items: [
      { name: 'LinkedIn page banner',             slug: 'linkedin-banner-axlab',  size: '1584 × 396' },
      { name: 'Avatar (LinkedIn / Instagram)',    slug: 'avatar-axlab',           size: '400 × 400'  },
      { name: 'Open Graph (link unfurl)',         slug: 'og-axlab',               size: '1200 × 630' },
    ],
  },
];

export default function MarketingHub() {
  return (
    <main
      style={{
        minHeight:  '100dvh',
        background: '#0B0F1A',
        color:      '#E8ECF7',
        fontFamily: 'Safiro, -apple-system, BlinkMacSystemFont, sans-serif',
        padding:    'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontSize:      'clamp(2rem, 4vw, 3rem)',
            fontWeight:     600,
            letterSpacing: '-0.03em',
            margin:          0,
          }}
        >
          Brand assets
        </h1>
        <p style={{ color: '#A8B3D1', marginTop: '0.5rem', fontSize: '0.95rem', maxWidth: 640 }}>
          Assets internos para subir a LinkedIn / Instagram / X. Cada PNG se
          rasteriza al vuelo desde el SVG fuente al doble de resolución
          (retina), para subir directo sin pasar por convertidores.
        </p>

        {ASSETS.map((g) => (
          <section key={g.group} style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <h2
              style={{
                fontFamily:    'Nohemi, sans-serif',
                fontSize:       '1.1rem',
                fontWeight:      500,
                letterSpacing: -0.01,
                color:         '#A8B3D1',
                textTransform: 'uppercase',
                margin:          0,
                marginBottom:   '1rem',
              }}
            >
              {g.group}
            </h2>
            <div
              style={{
                display:               'grid',
                gridTemplateColumns:  'repeat(auto-fill, minmax(280px, 1fr))',
                gap:                   '1.25rem',
              }}
            >
              {g.items.map((item) => (
                <div
                  key={item.slug}
                  style={{
                    display:        'flex',
                    flexDirection:  'column',
                    gap:             '0.75rem',
                    padding:         '1rem',
                    background:     'rgba(255,255,255,0.03)',
                    border:         '1px solid rgba(255,255,255,0.08)',
                    borderRadius:    14,
                  }}
                >
                  <a
                    href={`/marketing/${item.slug}.png`}
                    style={{
                      display:    'block',
                      width:      '100%',
                      aspectRatio:'1584 / 396',
                      background: '#11182A',
                      borderRadius: 8,
                      overflow:   'hidden',
                      backgroundImage:    `url(/marketing/${item.slug}.svg)`,
                      backgroundSize:     'contain',
                      backgroundRepeat:   'no-repeat',
                      backgroundPosition: 'center',
                    }}
                    aria-label={`Download ${item.name} as PNG`}
                  />
                  <div>
                    <div style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500, fontSize: '0.9rem' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7599', marginTop: 2 }}>
                      {item.size}
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.55rem', fontFamily: 'Nohemi, sans-serif', fontSize: '0.78rem' }}>
                      <a
                        href={`/marketing/${item.slug}.png`}
                        style={{
                          display:        'inline-flex',
                          alignItems:     'center',
                          gap:            6,
                          padding:        '0.4rem 0.8rem',
                          background:     '#6B6BFF',
                          color:          '#FFFFFF',
                          borderRadius:    9999,
                          textDecoration: 'none',
                          fontWeight:      500,
                        }}
                      >
                        Download PNG ↓
                      </a>
                      <a
                        href={`/marketing/${item.slug}.svg`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display:        'inline-flex',
                          alignItems:     'center',
                          gap:            6,
                          padding:        '0.4rem 0.8rem',
                          background:     'rgba(255,255,255,0.05)',
                          border:         '1px solid rgba(255,255,255,0.1)',
                          color:          '#A8B3D1',
                          borderRadius:    9999,
                          textDecoration: 'none',
                          fontWeight:      500,
                        }}
                      >
                        SVG
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
