'use client';

import { useRef, useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────
 * ServiciosParaQuien — Bento light (imagen + título + pills)
 * ───────────────────────────────────────────────────────────────── */

interface Props { wa: string; }

type Tile = {
  id:       string;
  title:    string;
  subtitle: string;
  span:     1 | 2;
  image:    string;
  alt:      string;
};

const U = 'https://images.unsplash.com/photo-';
const Q = '?w=1400&q=85&auto=format&fit=crop';

const TILES: Tile[] = [
  {
    id:       'clinicas',
    title:    'Clínicas',
    subtitle: 'Médicos, dentistas, fisioterapeutas.',
    span:      2,
    image:    `${U}1576091160550-2173dba999ef${Q}`,
    alt:      'Clínica',
  },
  {
    id:       'clubs',
    title:    'Clubs',
    subtitle: 'Deportivos, sociales, federaciones.',
    span:      1,
    image:    `${U}1554774853-719586f82d77${Q}`,
    alt:      'Club',
  },
  {
    id:       'retail',
    title:    'Tiendas',
    subtitle: 'Físicas, online y omnicanal.',
    span:      1,
    image:    `${U}1555529669-e69e7aa0ba9a${Q}`,
    alt:      'Tienda',
  },
  {
    id:       'gestorias',
    title:    'Gestorías',
    subtitle: 'Asesorías fiscales, contables y laborales.',
    span:      2,
    image:    `${U}1497366216548-37526070297c${Q}`,
    alt:      'Gestoría',
  },
  {
    id:       'inmo',
    title:    'Inmobiliarias',
    subtitle: 'Agencias y promotoras.',
    span:      2,
    image:    `${U}1600607687939-ce8a6c25118c${Q}`,
    alt:      'Inmobiliaria',
  },
  {
    id:       'horeca',
    title:    'Hostelería',
    subtitle: 'Restaurantes, cafés y bares.',
    span:      1,
    image:    `${U}1414235077428-338989a2e8c0${Q}`,
    alt:      'Hostelería',
  },
];

/* ──────────────── Component ──────────────── */

export default function ServiciosParaQuien({ wa }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      data-servicios-section="para-quien"
      className="s-snap-section s-pq"
      style={{
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        'clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,5vw,5rem)',
        background:     'var(--s-bg)',
        overflow:       'hidden',
      }}
    >
      <div
        ref={sectionRef}
        className="s-pq-grid"
        style={{
          display:             'grid',
          gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.7fr)',
          gap:                 'clamp(2rem,5vw,5.5rem)',
          alignItems:          'start',
          opacity:              show ? 1 : 0,
          transform:            show ? 'none' : 'translateY(24px)',
          transition:          'opacity 0.7s var(--s-ease), transform 0.7s var(--s-ease)',
        }}
      >
        {/* ── LEFT · editorial headline ── */}
        <aside
          className="s-pq-left"
          style={{
            display:        'flex',
            flexDirection:  'column',
            gap:            'clamp(1.25rem,2vw,1.75rem)',
          }}
        >
          <h2 className="s-h2">
            <span className="s-h2-lead">¿Te reconoces</span>
            <span className="s-h2-muted">en alguna?</span>
          </h2>

          <p
            style={{
              fontFamily: 'Safiro, sans-serif',
              fontSize:   'clamp(0.95rem,1.1vw,1.05rem)',
              lineHeight:  1.55,
              color:      'var(--s-ink-2)',
              margin:      0,
              maxWidth:    340,
            }}
          >
            Seis tipos de negocio que conozco bien.
            Si te ves reflejado, hablamos.
          </p>
        </aside>

        {/* ── RIGHT · bento ── */}
        <div
          className="s-pq-mosaic"
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 'clamp(0.75rem,1vw,1rem)',
            gridAutoRows:        'clamp(200px, 23vh, 240px)',
          }}
        >
          {TILES.map((t, i) => (
            <article
              key={t.id}
              className="s-pq-tile"
              data-span={t.span}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
              style={{
                opacity:    show ? 1 : 0,
                transform:  show ? undefined : 'translateY(14px)',
                transitionDelay: `${0.12 + i * 0.05}s`,
              }}
            >
              <div
                className="s-pq-tile-media"
                role="img"
                aria-label={t.alt}
                style={{ backgroundImage: `url(${t.image})` }}
              />
              <div className="s-pq-tile-body">
                <h3 className="s-pq-tile-title">{t.title}</h3>
                <p  className="s-pq-tile-sub">{t.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
