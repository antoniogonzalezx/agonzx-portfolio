'use client';

/* ─────────────────────────────────────────────────────────────────
 * /servicios/palettes — comparativa de variaciones sobre C
 * Anchor C (Mercury Electric) + 4 variantes con inks más ligeros
 * y accents no-azules. Wordmark aplicado en cada paleta para
 * evaluar fit con la marca personal (iOS engineer + IA/automation).
 * ───────────────────────────────────────────────────────────────── */

import Wordmark from '@/components/servicios/Wordmark';

type Palette = {
  id:       string;
  name:     string;
  vibe:     string;
  bg:       string;
  bgBlob:   string;
  ink:      string;
  ink2:     string;
  ink3:     string;
  line:     string;
  accent:   string;
  accentSoft: string;
};

const PALETTES: Palette[] = [
  {
    id:         'C',
    name:       'Mercury Electric (anchor)',
    vibe:       '#14213D — el ink original, máximo peso',
    bg:         '#FAFBFD',
    bgBlob:     '#F0F2F8',
    ink:        '#14213D',
    ink2:       '#3F4A6B',
    ink3:       '#7A839E',
    line:       '#E5E8F0',
    accent:     '#4F4FFF',
    accentSoft: '#ECECFF',
  },
  {
    id:         'C-1',
    name:       'Mercury · ink +1',
    vibe:       '#1A2A4D — un paso más claro, sigue siendo navy denso',
    bg:         '#FAFBFD',
    bgBlob:     '#F0F2F8',
    ink:        '#1A2A4D',
    ink2:       '#46527A',
    ink3:       '#808AA6',
    line:       '#E5E8F0',
    accent:     '#4F4FFF',
    accentSoft: '#ECECFF',
  },
  {
    id:         'C-2',
    name:       'Mercury · ink +2',
    vibe:       '#23335C — empieza a respirar, más legible en bloques largos',
    bg:         '#FAFBFD',
    bgBlob:     '#F0F2F8',
    ink:        '#23335C',
    ink2:       '#4E5C84',
    ink3:       '#8590AB',
    line:       '#E5E8F0',
    accent:     '#4F4FFF',
    accentSoft: '#ECECFF',
  },
  {
    id:         'C-3',
    name:       'Mercury · ink +3',
    vibe:       '#2D3D6B — slate-blue claro, sensación más editorial/airy',
    bg:         '#FAFBFD',
    bgBlob:     '#F0F2F8',
    ink:        '#2D3D6B',
    ink2:       '#56648C',
    ink3:       '#8B95B0',
    line:       '#E5E8F0',
    accent:     '#4F4FFF',
    accentSoft: '#ECECFF',
  },
  {
    id:         'C-4',
    name:       'Mercury · ink +4',
    vibe:       '#37487A — máxima ligereza sin perder contraste AA en cuerpo',
    bg:         '#FAFBFD',
    bgBlob:     '#F0F2F8',
    ink:        '#37487A',
    ink2:       '#5E6D95',
    ink3:       '#919BB5',
    line:       '#E5E8F0',
    accent:     '#4F4FFF',
    accentSoft: '#ECECFF',
  },
];

const INDUSTRIES = [
  'Clínicas y consultas',
  'Clubs y asociaciones deportivas',
  'Tiendas y e-commerce',
  'Gestorías y asesorías',
  'Inmobiliarias',
  'Hostelería y restauración',
];

function ColorChip({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width:        18,
          height:       18,
          borderRadius: 4,
          background:   value,
          border:       '1px solid rgba(0,0,0,0.08)',
        }}
      />
      <code style={{ fontFamily: 'Martian Mono, ui-monospace, monospace', fontSize: 10, opacity: 0.7 }}>
        {label}: {value}
      </code>
    </div>
  );
}

function PaletteColumn({ p }: { p: Palette }) {
  return (
    <div
      style={{
        background:   p.bg,
        color:        p.ink,
        borderRadius: 24,
        overflow:     'hidden',
        boxShadow:    '0 30px 60px -30px rgba(0,0,0,0.15)',
        border:       `1px solid ${p.line}`,
        display:      'flex',
        flexDirection:'column',
      }}
    >
      {/* ── Header con nombre y vibe ── */}
      <div
        style={{
          padding:    '20px 24px',
          background: p.bgBlob,
          borderBottom: `1px solid ${p.line}`,
        }}
      >
        <div style={{ display:'flex', alignItems:'baseline', gap: 12, marginBottom: 6 }}>
          <span
            style={{
              fontFamily:   'Nohemi, sans-serif',
              fontSize:     22,
              fontWeight:    600,
              letterSpacing:'-0.02em',
              color:         p.ink,
            }}
          >
            {p.id}
          </span>
          <span
            style={{
              fontFamily:   'Nohemi, sans-serif',
              fontSize:     14,
              fontWeight:    500,
              letterSpacing:'-0.01em',
              color:         p.ink,
            }}
          >
            {p.name}
          </span>
        </div>
        <p
          style={{
            fontFamily: 'Safiro, sans-serif',
            fontSize:    12,
            color:       p.ink2,
            margin:      0,
          }}
        >
          {p.vibe}
        </p>
      </div>

      {/* ── Wordmark aplicado a la paleta ── */}
      <div
        style={{
          padding:      '32px 28px 24px',
          borderBottom: `1px solid ${p.line}`,
        }}
      >
        <span
          style={{
            fontFamily:   'Nohemi, sans-serif',
            fontSize:      10,
            color:         p.ink3,
            display:       'block',
            marginBottom:  14,
          }}
        >
          Wordmark
        </span>
        <Wordmark main={p.ink} accent={p.accent} width="100%" />
      </div>

      {/* ── Mock Diagnóstico ── */}
      <div style={{ padding: '32px 28px 28px', display:'flex', flexDirection:'column', gap: 22 }}>
        {/* Headline */}
        <div>
          <h2
            style={{
              fontFamily:   'Nohemi, sans-serif',
              fontSize:      36,
              fontWeight:    600,
              letterSpacing:'-0.03em',
              lineHeight:    1.0,
              color:         p.ink,
              margin:        0,
            }}
          >
            Diagnóstico.
          </h2>
          <p
            style={{
              fontFamily: 'Safiro, sans-serif',
              fontSize:   14,
              lineHeight: 1.55,
              color:      p.ink2,
              margin:     '10px 0 0',
            }}
          >
            Tres preguntas. Una propuesta concreta.
          </p>
        </div>

        {/* CTA primario (default) */}
        <a
          href="#"
          onClick={e => e.preventDefault()}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:            8,
            alignSelf:     'flex-start',
            fontFamily:    'Safiro, sans-serif',
            fontSize:       14,
            fontWeight:     500,
            letterSpacing: '-0.01em',
            color:         '#FFFFFF',
            background:     p.ink,
            padding:       '12px 22px',
            borderRadius:  9999,
            textDecoration:'none',
            border:        `1px solid ${p.ink}`,
          }}
        >
          Empezar <span aria-hidden>→</span>
        </a>

        {/* CTA hover preview (accent) */}
        <a
          href="#"
          onClick={e => e.preventDefault()}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:            8,
            alignSelf:     'flex-start',
            fontFamily:    'Safiro, sans-serif',
            fontSize:       14,
            fontWeight:     500,
            letterSpacing: '-0.01em',
            color:         '#FFFFFF',
            background:     p.accent,
            padding:       '12px 22px',
            borderRadius:  9999,
            textDecoration:'none',
            border:        `1px solid ${p.accent}`,
            transform:     'translateY(-2px)',
            boxShadow:     `0 10px 24px ${p.accent}40`,
          }}
        >
          Empezar <span aria-hidden>→</span>
          <span style={{ fontSize: 10, marginLeft: 6, opacity: 0.7 }}>· hover</span>
        </a>

        {/* Step indicator */}
        <div>
          <span
            style={{
              fontFamily: 'Nohemi, sans-serif',
              fontSize:    10,
              color:       p.ink3,
              display:     'block',
              marginBottom: 10,
            }}
          >
            Step indicator
          </span>
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            {[0, 1, 2].map(i => {
              const active = i === 1;
              const done   = i < 1;
              return (
                <div key={i} style={{ display:'flex', alignItems:'center', gap: 10 }}>
                  <div
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      width:           28,
                      height:          28,
                      borderRadius:    9999,
                      fontFamily:     'Nohemi, sans-serif',
                      fontSize:        12,
                      fontWeight:      500,
                      color:           active ? p.accent : (done ? p.ink : p.ink3),
                      background:      active ? p.accentSoft : 'transparent',
                      border:          `1px solid ${active ? p.accent : (done ? p.ink : p.line)}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div style={{ width: 24, height: 1, background: i < 1 ? p.ink : p.line }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry list (3 rows con uno seleccionado) */}
        <div>
          <span
            style={{
              fontFamily: 'Nohemi, sans-serif',
              fontSize:    10,
              color:       p.ink3,
              display:     'block',
              marginBottom: 10,
            }}
          >
            Industry list (selected = Tiendas)
          </span>
          <ul style={{ listStyle:'none', margin:0, padding:0, borderTop: `1px solid ${p.line}` }}>
            {INDUSTRIES.slice(0, 4).map((label, i) => {
              const selected = label === 'Tiendas y e-commerce';
              return (
                <li
                  key={label}
                  style={{
                    borderBottom: `1px solid ${p.line}`,
                    background:    selected ? p.accentSoft : 'transparent',
                  }}
                >
                  <div
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'space-between',
                      padding:        '12px 14px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:   'Nohemi, sans-serif',
                        fontSize:      14,
                        fontWeight:    500,
                        letterSpacing:'-0.015em',
                        color:         selected ? p.accent : p.ink,
                      }}
                    >
                      {label}
                    </span>
                    <span style={{ color: selected ? p.accent : p.ink3, fontSize: 14 }}>→</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pain checkbox preview */}
        <div>
          <span
            style={{
              fontFamily: 'Nohemi, sans-serif',
              fontSize:    10,
              color:       p.ink3,
              display:     'block',
              marginBottom: 10,
            }}
          >
            Checkbox states
          </span>
          <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
            {[true, false].map(on => (
              <div key={String(on)} style={{ display:'flex', alignItems:'center', gap: 12 }}>
                <span
                  style={{
                    flexShrink:     0,
                    display:        'inline-flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    width:           20,
                    height:          20,
                    borderRadius:    5,
                    background:      on ? p.accent : 'transparent',
                    border:          `1.5px solid ${on ? p.accent : p.line}`,
                    color:           '#FFFFFF',
                  }}
                >
                  {on && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span
                  style={{
                    fontFamily:   'Safiro, sans-serif',
                    fontSize:      13,
                    color:         on ? p.ink : p.ink2,
                    letterSpacing:'-0.01em',
                  }}
                >
                  {on ? 'La ficha del paciente vive en papel' : 'Los pacientes repiten datos en cada visita'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="#"
          onClick={e => e.preventDefault()}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:            8,
            alignSelf:     'flex-start',
            fontFamily:    'Safiro, sans-serif',
            fontSize:       14,
            fontWeight:     500,
            letterSpacing: '-0.01em',
            color:         '#FFFFFF',
            background:     p.ink,
            padding:       '12px 22px',
            borderRadius:  9999,
            textDecoration:'none',
            border:        `1px solid ${p.ink}`,
            marginTop:      4,
          }}
        >
          Hablemos por WhatsApp <span aria-hidden>→</span>
        </a>
      </div>

      {/* ── Color tokens al final ── */}
      <div
        style={{
          padding:      '18px 24px',
          background:    p.bgBlob,
          borderTop:    `1px solid ${p.line}`,
          display:      'flex',
          flexDirection:'column',
          gap:           6,
        }}
      >
        <ColorChip label="bg"     value={p.bg}     />
        <ColorChip label="ink"    value={p.ink}    />
        <ColorChip label="ink-2"  value={p.ink2}   />
        <ColorChip label="line"   value={p.line}   />
        <ColorChip label="accent" value={p.accent} />
        <ColorChip label="soft"   value={p.accentSoft} />
      </div>
    </div>
  );
}

export default function PalettesPreview() {
  return (
    <main
      style={{
        minHeight:  '100dvh',
        background: '#0E1014',
        padding:    'clamp(24px, 4vw, 48px)',
      }}
    >
      {/* ── Encabezado ── */}
      <header style={{ maxWidth: 1400, margin: '0 auto 32px' }}>
        <h1
          style={{
            fontFamily:   'Nohemi, sans-serif',
            fontSize:     'clamp(1.5rem, 2.5vw, 2.2rem)',
            fontWeight:    600,
            letterSpacing:'-0.02em',
            color:        '#FAFAF7',
            margin:        0,
          }}
        >
          Paletas /servicios — variaciones sobre C
        </h1>
        <p
          style={{
            fontFamily: 'Safiro, sans-serif',
            fontSize:   14,
            color:      '#888B96',
            margin:     '8px 0 0',
            maxWidth:   720,
          }}
        >
          Solo C — anchor + 4 escalones de ink progresivamente más claro. Mismo bg, mismo accent ({'#4F4FFF'}). Mira cuándo deja de sentirse premium y empieza a sentirse ligero.
        </p>
      </header>

      {/* ── Grid de paletas ── */}
      <div
        style={{
          maxWidth:           1400,
          margin:             '0 auto',
          display:            'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(360px, 1fr))',
          gap:                 24,
        }}
      >
        {PALETTES.map(p => <PaletteColumn key={p.id} p={p} />)}
      </div>

      {/* ── Footer link ── */}
      <footer style={{ maxWidth: 1400, margin: '32px auto 0' }}>
        <a
          href="/servicios"
          style={{
            fontFamily:   'Safiro, sans-serif',
            fontSize:      13,
            color:        '#888B96',
            textDecoration:'underline',
            textUnderlineOffset: 3,
          }}
        >
          ← volver a /servicios
        </a>
      </footer>
    </main>
  );
}
