'use client';

import { useState, useEffect, useRef } from 'react';
import { EXPERIENCE } from '@/components/data';

/* ─────────────────────────────────────────────────────────────────
 * /experience-mocks — internal page for comparing the 3 rail
 * concepts (A · architectural, B · headline year, C · spine).
 *
 * Not in the sitemap, not linked from anywhere public.  Each panel
 * is fully interactive (click any entry on the rail to switch role)
 * so the comparison is felt, not just read.  After picking, the
 * winning variant moves into components/Experience.tsx and this
 * page gets deleted.
 * ───────────────────────────────────────────────────────────────── */

export const dynamic = 'force-dynamic';

function shortName(name: string) { return name.split(' (')[0]; }

function yearRange(date: string): string {
  const parts = date.split('—').map(s => s.trim());
  const left  = parts[0]?.match(/\d{4}/)?.[0] ?? parts[0];
  const right = parts[1]?.match(/\d{4}/)?.[0]
             ?? (parts[1]?.toLowerCase().includes('present') ? 'Now' : parts[1])
             ?? '';
  return `${left} · ${right}`;
}

function clientFilter(c: any) {
  if (c.noFilter)        return 'none';
  if (c.alt === 'Sky')   return 'brightness(0) invert(1)';
  if (c.multiColor)      return 'grayscale(1) brightness(1.9) contrast(0.9)';
  return 'brightness(0) invert(1)';
}

function CompanyLogo({ exp, height }: { exp: typeof EXPERIENCE[number]; height: string }) {
  if (exp.logoType === 'text') {
    return (
      <span
        style={{
          fontFamily:    'Nohemi, sans-serif',
          fontWeight:     700,
          color:         '#E8ECF7',
          letterSpacing: -0.02 + 'em',
          lineHeight:     1,
          whiteSpace:    'nowrap',
          fontSize:       `calc(${height} * 0.78)`,
        }}
      >
        {exp.company}
      </span>
    );
  }
  return (
    <img
      src={exp.logoSrc}
      alt={exp.company}
      style={{
        height,
        width:     'auto',
        maxWidth:  '100%',
        objectFit: 'contain',
        filter:    (exp as any).logoFilter ?? 'brightness(0) invert(1)',
      }}
    />
  );
}

function Stage({ exp }: { exp: typeof EXPERIENCE[number] }) {
  return (
    <div className="mock-stage">
      <div className="mock-stage-logo" key={`logo-${exp.company}`}>
        <CompanyLogo exp={exp} height="clamp(80px, 9vw, 130px)" />
      </div>
      <h3 className="mock-stage-role" key={`role-${exp.company}`}>{exp.role}</h3>
      <div className="mock-stage-meta">
        <span>{exp.date}</span>
        {exp.badge && <span className="mock-stage-badge">{exp.badge}</span>}
      </div>
      <p className="mock-stage-context">{exp.context}</p>
      <p className="mock-stage-desc">{exp.desc}</p>
      {exp.clients && exp.clients.length > 0 && (
        <div className="mock-stage-clients">
          <span className="mock-stage-clients-label">Clients</span>
          {exp.clients.map((c: any, k: number) => (
            <img key={k} src={c.src} alt={c.alt}
              style={{ height: c.height ?? 22, filter: clientFilter(c), width: 'auto', opacity: 0.7 }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Alt A · Architectural · hairline spine + pulsing marker ── */
function AltA() {
  const [idx, setIdx] = useState(0);
  return (
    <section className="mock-panel">
      <header className="mock-header">
        <span className="mock-header-tag">Alt A</span>
        <span className="mock-header-name">Architectural</span>
        <span className="mock-header-note">Hairline spine · pulsing marker · zero instructional copy</span>
      </header>
      <div className="mock-grid">
        <aside className="mock-rail-a">
          <div className="mock-rail-a-spine" />
          <span className="mock-rail-a-marker" style={{ '--idx': idx } as any} />
          <ol className="mock-rail-a-list">
            {EXPERIENCE.map((s, i) => (
              <li
                key={i}
                className="mock-rail-a-row"
                data-state={i === idx ? 'active' : i < idx ? 'past' : 'todo'}
                onClick={() => setIdx(i)}
              >
                <span className="mock-rail-a-year">{yearRange(s.date)}</span>
                <span className="mock-rail-a-name">{shortName(s.company)}</span>
              </li>
            ))}
          </ol>
        </aside>
        <Stage exp={EXPERIENCE[idx]} />
      </div>
    </section>
  );
}

/* ── Alt B · Headline year · big display animates per role ── */
function AltB() {
  const [idx, setIdx] = useState(0);
  return (
    <section className="mock-panel">
      <header className="mock-header">
        <span className="mock-header-tag">Alt B</span>
        <span className="mock-header-name">Headline year</span>
        <span className="mock-header-note">Year is the visual anchor · cross-fades between roles</span>
      </header>
      <div className="mock-grid">
        <aside className="mock-rail-b">
          <span className="mock-rail-b-year" key={idx}>
            {yearRange(EXPERIENCE[idx].date)}
          </span>
          <ol className="mock-rail-b-list">
            {EXPERIENCE.map((s, i) => (
              <li
                key={i}
                className="mock-rail-b-row"
                data-state={i === idx ? 'active' : i < idx ? 'past' : 'todo'}
                onClick={() => setIdx(i)}
              >
                <span className="mock-rail-b-dot" />
                <span className="mock-rail-b-name">{shortName(s.company)}</span>
              </li>
            ))}
          </ol>
        </aside>
        <Stage exp={EXPERIENCE[idx]} />
      </div>
    </section>
  );
}

/* ── Alt C · Spine · paint-stroke vertical bar ── */
function AltC() {
  const [idx, setIdx] = useState(0);
  return (
    <section className="mock-panel">
      <header className="mock-header">
        <span className="mock-header-tag">Alt C</span>
        <span className="mock-header-name">Spine</span>
        <span className="mock-header-note">Paint-stroke segment · architectural · most experimental</span>
      </header>
      <div className="mock-grid">
        <aside className="mock-rail-c">
          <div className="mock-rail-c-bar">
            {EXPERIENCE.map((_, i) => (
              <span key={i} className="mock-rail-c-seg" data-state={i === idx ? 'active' : i < idx ? 'past' : 'todo'} />
            ))}
          </div>
          <ol className="mock-rail-c-list">
            {EXPERIENCE.map((s, i) => (
              <li
                key={i}
                className="mock-rail-c-row"
                data-state={i === idx ? 'active' : i < idx ? 'past' : 'todo'}
                onClick={() => setIdx(i)}
              >
                <span className="mock-rail-c-name">{shortName(s.company)}</span>
                <span className="mock-rail-c-year">{yearRange(s.date)}</span>
              </li>
            ))}
          </ol>
        </aside>
        <Stage exp={EXPERIENCE[idx]} />
      </div>
    </section>
  );
}

export default function ExperienceMocks() {
  return (
    <main className="mock-page">
      <header className="mock-page-header">
        <h1 className="mock-page-title">Experience · 3 rail concepts</h1>
        <p className="mock-page-sub">
          Click any timeline entry to feel the transition.  Pick one → I move it into the real component, this page gets deleted.
        </p>
      </header>

      <AltA />
      <AltB />
      <AltC />

      <style>{`
        .mock-page {
          min-height: 100dvh;
          background: var(--bg);
          color: var(--white);
          font-family: 'Safiro', sans-serif;
          padding: 0 0 6rem;
        }
        .mock-page-header {
          padding: clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem) clamp(1.5rem, 3vw, 2rem);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mock-page-title {
          font-family: 'Nohemi', sans-serif;
          font-size:    clamp(2rem, 4vw, 3rem);
          font-weight:   600;
          letter-spacing:-0.03em;
          margin:         0 0 0.6rem;
          color:         var(--white);
        }
        .mock-page-sub {
          color:    var(--t2);
          margin:   0;
          font-size: 0.95rem;
          max-width: 720px;
        }

        /* ── Panel wrapper · one alt per panel ── */
        .mock-panel {
          background: var(--bg2);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 5rem);
        }
        .mock-header {
          display: flex;
          align-items: baseline;
          gap: 1.2rem;
          flex-wrap: wrap;
          margin-bottom: clamp(2rem, 4vw, 3rem);
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .mock-header-tag {
          font-family: 'Nohemi', sans-serif;
          font-size:    0.7rem;
          font-weight:   600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color:        var(--accent);
          padding:      0.3rem 0.6rem;
          border:       1px solid rgba(107,107,255,0.3);
          border-radius: 9999px;
        }
        .mock-header-name {
          font-family: 'Nohemi', sans-serif;
          font-size:    clamp(1.4rem, 2.4vw, 1.8rem);
          font-weight:   600;
          letter-spacing:-0.025em;
          color:        var(--white);
        }
        .mock-header-note {
          color:    var(--t3);
          font-size: 0.88rem;
        }

        .mock-grid {
          display: grid;
          grid-template-columns: clamp(260px, 24vw, 360px) 1fr;
          gap: clamp(2rem, 5vw, 4rem);
          align-items: center;
          min-height: 60vh;
        }

        /* ── Shared stage ── */
        .mock-stage {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(0.8rem, 1.2vw, 1.2rem);
          max-width: 720px;
        }
        .mock-stage-logo {
          display: flex;
          align-items: center;
          height: clamp(80px, 9vw, 130px);
          margin-bottom: 0.4rem;
        }
        .mock-stage-role {
          font-family: 'Nohemi', sans-serif;
          font-size: clamp(2rem, 3.6vw, 3rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--accent);
          margin: 0;
        }
        .mock-stage-meta {
          display: flex;
          gap: 0.7rem;
          align-items: center;
          font-size: 0.85rem;
          color: var(--t3);
          font-weight: 500;
        }
        .mock-stage-badge {
          padding: 0.2rem 0.65rem;
          background: var(--accent-s);
          color: var(--accent);
          border: 1px solid rgba(107,107,255,0.22);
          border-radius: 20px;
          font-family: 'Nohemi', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
        }
        .mock-stage-context {
          font-size: clamp(0.9rem, 1.1vw, 0.98rem);
          color: var(--t2);
          line-height: 1.6;
          margin: 0;
          max-width: 520px;
          font-weight: 500;
        }
        .mock-stage-desc {
          font-size: clamp(0.93rem, 1.1vw, 1rem);
          color: var(--t2);
          line-height: 1.7;
          margin: 0;
          max-width: 620px;
        }
        .mock-stage-clients {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.3rem;
          margin-top: 0.4rem;
          padding-top: 1.1rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .mock-stage-clients-label {
          font-family: 'Nohemi', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--t3);
          margin-right: 0.3rem;
        }

        /* ── Alt A · Architectural ── */
        .mock-rail-a {
          position: relative;
          padding-left: 24px;
        }
        .mock-rail-a-spine {
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 1px;
          background: rgba(255,255,255,0.06);
        }
        .mock-rail-a-marker {
          position: absolute;
          left: -1px;
          top: calc(var(--idx, 0) * (1.4rem + clamp(0.9rem, 1.2vw, 1.1rem)) + 4px);
          width: 3px;
          height: 1.4rem;
          background: var(--accent);
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(107,107,255,0.55), 0 0 24px rgba(107,107,255,0.22);
          transition: top 0.7s cubic-bezier(0.16,1,0.3,1);
          animation: mockPulseA 2.4s ease-in-out infinite;
        }
        @keyframes mockPulseA {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1;    box-shadow: 0 0 18px rgba(107,107,255,0.75), 0 0 30px rgba(107,107,255,0.3); }
        }
        .mock-rail-a-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(0.9rem, 1.2vw, 1.1rem);
        }
        .mock-rail-a-row {
          display: flex;
          flex-direction: column;
          gap: 1px;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .mock-rail-a-row:hover { transform: translateX(2px); }
        .mock-rail-a-row[data-state='active'] .mock-rail-a-name { color: var(--white); }
        .mock-rail-a-row[data-state='active'] .mock-rail-a-year { color: var(--accent); }
        .mock-rail-a-year {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--t3);
          transition: color 0.5s ease;
        }
        .mock-rail-a-name {
          font-family: 'Nohemi', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--t3);
          transition: color 0.5s ease;
          height: 1.4rem;
          line-height: 1.4rem;
        }
        .mock-rail-a-row[data-state='past'] .mock-rail-a-name { color: var(--t2); }

        /* ── Alt B · Headline year ── */
        .mock-rail-b {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .mock-rail-b-year {
          display: block;
          font-family: 'Nohemi', sans-serif;
          font-size: clamp(2.6rem, 4.6vw, 4rem);
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: var(--white);
          animation: mockYearIn 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes mockYearIn {
          from { opacity: 0; transform: translateY(8px); filter: blur(2px); }
          to   { opacity: 1; transform: translateY(0);  filter: blur(0);   }
        }
        .mock-rail-b-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .mock-rail-b-row {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .mock-rail-b-row:hover { transform: translateX(2px); }
        .mock-rail-b-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }
        .mock-rail-b-row[data-state='active'] .mock-rail-b-dot {
          width: 10px;
          height: 10px;
          background: var(--accent);
          box-shadow: 0 0 12px rgba(107,107,255,0.6);
        }
        .mock-rail-b-row[data-state='past'] .mock-rail-b-dot {
          background: rgba(255,255,255,0.45);
        }
        .mock-rail-b-name {
          font-family: 'Nohemi', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--t3);
          transition: color 0.5s ease;
        }
        .mock-rail-b-row[data-state='active'] .mock-rail-b-name { color: var(--white); }
        .mock-rail-b-row[data-state='past']   .mock-rail-b-name { color: var(--t2); }

        /* ── Alt C · Spine paint-stroke ── */
        .mock-rail-c {
          display: flex;
          gap: 24px;
        }
        .mock-rail-c-bar {
          display: flex;
          flex-direction: column;
          width: 4px;
          gap: 4px;
        }
        .mock-rail-c-seg {
          flex: 1;
          width: 1px;
          background: rgba(255,255,255,0.10);
          align-self: center;
          transition: width 0.7s cubic-bezier(0.16,1,0.3,1), background 0.5s ease;
          border-radius: 2px;
        }
        .mock-rail-c-seg[data-state='past']   { width: 1px; background: rgba(255,255,255,0.30); }
        .mock-rail-c-seg[data-state='active'] {
          width: 4px;
          background: var(--accent);
          box-shadow: 0 0 12px rgba(107,107,255,0.5);
        }
        .mock-rail-c-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
          justify-content: space-between;
        }
        .mock-rail-c-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
          cursor: pointer;
          padding: 4px 0;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .mock-rail-c-row:hover { transform: translateX(2px); }
        .mock-rail-c-name {
          font-family: 'Nohemi', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--t3);
          transition: color 0.5s ease;
        }
        .mock-rail-c-year {
          font-size: 0.7rem;
          color: var(--t3);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.5s ease;
        }
        .mock-rail-c-row[data-state='active'] .mock-rail-c-name { color: var(--white); }
        .mock-rail-c-row[data-state='active'] .mock-rail-c-year { color: var(--accent); }
        .mock-rail-c-row[data-state='past']   .mock-rail-c-name { color: var(--t2); }
      `}</style>
    </main>
  );
}
