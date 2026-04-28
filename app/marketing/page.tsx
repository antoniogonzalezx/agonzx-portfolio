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

/* Each asset is a single SVG in /public/marketing/.  SVG is the
 * canonical format here: infinite scale, exact brand fidelity, tiny
 * file size.  Click a card to open the SVG; export to PNG from any
 * design tool (Figma) or online converter when the upload UI on
 * LinkedIn / Instagram demands raster.                              */
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
          Assets internos para subir a LinkedIn / Instagram / X. SVG fuente
          con tipografía Nohemi de la marca — abre cada card y conviértelo
          a PNG en Figma o cualquier convertidor online cuando lo necesites.
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
                <a
                  key={item.slug}
                  href={`/marketing/${item.slug}.svg`}
                  target="_blank"
                  rel="noreferrer"
                  download
                  style={{
                    display:        'flex',
                    flexDirection:  'column',
                    gap:             '0.75rem',
                    padding:         '1rem',
                    background:     'rgba(255,255,255,0.03)',
                    border:         '1px solid rgba(255,255,255,0.08)',
                    borderRadius:    14,
                    textDecoration: 'none',
                    color:          'inherit',
                  }}
                >
                  <div
                    style={{
                      width:          '100%',
                      aspectRatio:    '1584 / 396',
                      background:     '#11182A',
                      borderRadius:    8,
                      overflow:       'hidden',
                      backgroundImage:    `url(/marketing/${item.slug}.svg)`,
                      backgroundSize:     'contain',
                      backgroundRepeat:   'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500, fontSize: '0.9rem' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7599', marginTop: 2 }}>
                      {item.size} · click to open SVG
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
