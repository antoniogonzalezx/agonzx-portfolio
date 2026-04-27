'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CV } from '@/components/data';
import CVCursor from '@/components/cv/CVCursor';

const PDFDownload = dynamic(
  () => import('@/components/cv/CVDownloadLink').then((m) => m.default),
  { ssr: false, loading: () => <DownloadButtonSkeleton /> },
);

/* Splits a bullet on `**X**` markers and renders the wrapped runs in
 * Nohemi 600 / ink so metrics like "+120%" or "60% → 95%+" pop out of
 * the body copy without breaking the bullet's reading flow. Used by
 * the experience bullets — kept inline so the HTML preview and the
 * PDF (CVDocument) can each implement it in their own primitive. */
function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={i}
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontWeight:    600,
            color:         '#23335C',
            letterSpacing: '-0.01em',
          }}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function DownloadButtonSkeleton() {
  return (
    <span
      style={{
        display:        'inline-block',
        padding:        '11px 20px',
        borderRadius:    9999,
        background:     '#23335C',
        color:          '#FAFBFD',
        fontFamily:     'Nohemi, sans-serif',
        fontSize:       '0.82rem',
        fontWeight:     600,
        opacity:         0.5,
      }}
    >
      Preparing PDF…
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * /cv — agonzx personal-brand CV.
 *
 * Header band on navy ink (#23335C):
 *   - photo (transparent PNG cutout) anchored bottom-left of the band
 *   - name + role + location top-center
 *   - contact list stacked centre-right with breathing room
 *   - agonz{x} wordmark in white, top-right corner
 *
 * Body: paper-light. Sections: About, Experience (no logos),
 * Stack, Education + Languages.
 *
 * Tuned to fit a single A4 in the PDF where possible; senior CVs
 * with rich content are acceptable at 2 pages.
 * ───────────────────────────────────────────────────────────────── */

export default function CVPage() {
  return (
    <main
      style={{
        minHeight:    '100dvh',
        background:   '#F0F2F8',
        padding:      'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 4vw, 3rem)',
        fontFamily:   'Safiro, sans-serif',
      }}
    >
      <CVCursor />
      {/* Top bar */}
      <div
        style={{
          maxWidth:       880,
          margin:         '0 auto clamp(1rem, 2vw, 1.6rem)',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          gap:            '1rem',
        }}
      >
        <Link
          href="/"
          className="cv-back-link"
          style={{
            fontFamily:     'Nohemi, sans-serif',
            fontSize:       '0.78rem',
            fontWeight:     500,
            letterSpacing:  '-0.01em',
            textDecoration: 'none',
            color:          '#4E5C84',
            transition:     'color 0.2s ease',
          }}
        >
          ← agonzx.dev
        </Link>
        <PDFDownload />
      </div>

      {/* Paper sheet */}
      <article
        aria-label="CV preview"
        style={{
          maxWidth:     880,
          margin:       '0 auto',
          background:   '#FAFBFD',
          borderRadius: 18,
          overflow:     'hidden',
          boxShadow:    '0 30px 80px -30px rgba(35,51,92,0.25), 0 6px 18px -6px rgba(35,51,92,0.10)',
          color:        '#4E5C84',
        }}
      >
        {/* ── Hero band (navy) ── */}
        <div
          className="cv-hero-band"
          style={{
            background:   '#23335C',
            padding:      'clamp(1.4rem, 3vw, 2rem) clamp(1.8rem, 4vw, 3rem) 0',
            position:     'relative',
            color:        '#FAFBFD',
            overflow:     'hidden',
          }}
        >
          {/* agonz{x} wordmark — top-right */}
          <div
            style={{
              position:    'absolute',
              top:         'clamp(1.2rem, 2.4vw, 1.6rem)',
              right:       'clamp(1.8rem, 4vw, 3rem)',
              fontFamily: 'Nohemi, sans-serif',
              fontWeight: 600,
              fontSize:   'clamp(1.05rem, 1.6vw, 1.3rem)',
              letterSpacing: '-0.025em',
              color:       '#FAFBFD',
              userSelect: 'none',
            }}
          >
            agonz<span style={{ color: '#9999FF' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>
          </div>

          <div
            className="cv-hero-grid"
            style={{
              display:    'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap:        'clamp(1.4rem, 3vw, 2.4rem)',
              alignItems: 'end',
            }}
          >
            {/* Photo — transparent PNG, full image (no zoom, no crop),
                width-bounded; height follows natural aspect; anchored
                to the bottom of the band via grid alignment. */}
            <img
              src="/profile.png"
              alt="Antonio González Valdepeñas"
              style={{
                width:         'clamp(120px, 14vw, 170px)',
                height:        'auto',
                display:       'block',
                alignSelf:     'end',
                pointerEvents: 'none',
                userSelect:    'none',
              }}
            />

            {/* Center column — name / role / location, anchored to bottom */}
            <div
              style={{
                alignSelf:    'end',
                paddingBottom:'clamp(1rem, 2.4vw, 1.6rem)',
              }}
            >
              <h1
                style={{
                  fontFamily:    'Nohemi, sans-serif',
                  fontWeight:    600,
                  fontSize:      'clamp(1.55rem, 3vw, 2.05rem)',
                  letterSpacing: '-0.04em',
                  lineHeight:     1.05,
                  color:         '#FAFBFD',
                  margin:         0,
                  marginBottom:  6,
                }}
              >
                {CV.name}
              </h1>
              <p
                style={{
                  fontSize:    '0.95rem',
                  color:        'rgba(250,251,253,0.85)',
                  margin:        0,
                  marginBottom: 2,
                }}
              >
                {CV.role}
              </p>
              <p
                style={{
                  fontSize:    '0.82rem',
                  color:        'rgba(250,251,253,0.6)',
                  margin:        0,
                }}
              >
                {CV.location}
              </p>
            </div>

            {/* Right column — contact list, vertical stack, right-aligned.
                One per line so the long email never collides with phone. */}
            <ul
              className="cv-contact-list"
              style={{
                listStyle:    'none',
                margin:        0,
                padding:       0,
                display:      'flex',
                flexDirection:'column',
                gap:          '0.34rem',
                fontSize:     '0.82rem',
                color:         'rgba(250,251,253,0.85)',
                textAlign:    'right',
                alignSelf:    'end',
                paddingBottom:'clamp(1rem, 2.4vw, 1.6rem)',
                whiteSpace:   'nowrap',
              }}
            >
              <li>
                <a href={`mailto:${CV.contact.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {CV.contact.email}
                </a>
              </li>
              <li>{CV.contact.phone}</li>
              <li>
                <a href={`https://${CV.contact.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {CV.contact.linkedin}
                </a>
              </li>
              <li>
                <a href={`https://${CV.contact.github}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {CV.contact.github}
                </a>
              </li>
              <li>
                <a href={`https://${CV.contact.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#9999FF', textDecoration: 'none' }}>
                  {CV.contact.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: 'clamp(1.6rem, 3.5vw, 2.6rem) clamp(1.8rem, 4vw, 3rem)' }}>
          {/* Summary */}
          <SectionHeading>Summary</SectionHeading>
          <p
            style={{
              fontSize:    '0.95rem',
              lineHeight: 1.6,
              color:       '#4E5C84',
              margin:      '0 0 clamp(1.3rem, 2.5vw, 2rem)',
            }}
          >
            {CV.summary}
          </p>

          {/* Experience */}
          <SectionHeading>Experience</SectionHeading>

          {CV.experience.map((job) => (
            <div key={job.company} style={{ marginBottom: 'clamp(1rem, 2vw, 1.4rem)' }}>
              <div
                style={{
                  display:    'flex',
                  alignItems: 'baseline',
                  gap:        '1rem',
                  flexWrap:   'wrap',
                  marginBottom:'0.18rem',
                }}
              >
                <h3
                  style={{
                    fontFamily:    'Nohemi, sans-serif',
                    fontWeight:    600,
                    fontSize:      '1.12rem',
                    letterSpacing: '-0.025em',
                    color:         '#23335C',
                    margin:         0,
                    flex:           1,
                  }}
                >
                  {job.company}
                </h3>
                <span
                  style={{
                    fontFamily: 'Safiro, sans-serif',
                    fontSize:   '0.78rem',
                    color:      '#8590AB',
                    flexShrink: 0,
                  }}
                >
                  {job.date}
                </span>
              </div>
              <p
                style={{
                  fontSize:     '0.88rem',
                  color:         '#4E5C84',
                  margin:        '0 0 0.6rem',
                }}
              >
                {job.role}
              </p>
              <ul
                style={{
                  margin:      0,
                  paddingLeft: '0.9rem',
                  listStyle:   'none',
                }}
              >
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize:    '0.88rem',
                      lineHeight: 1.55,
                      color:       '#4E5C84',
                      marginBottom:'0.22rem',
                      position:   'relative',
                      paddingLeft:'0.85rem',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left:     0,
                        top:      0,
                        color:    '#4F4FFF',
                        fontWeight: 600,
                      }}
                    >
                      ·
                    </span>
                    {renderBold(b)}
                  </li>
                ))}
              </ul>
              {job.tech.length > 0 && (
                <p
                  style={{
                    margin:    '0.5rem 0 0',
                    fontSize: '0.8rem',
                    color:     '#4F4FFF',
                    fontFamily:'Safiro, sans-serif',
                  }}
                >
                  {job.tech.join('   ·   ')}
                </p>
              )}
            </div>
          ))}

          <hr style={hrStyle} />

          {/* Selected work — side projects, founder work, signature builds.
              Lives between Experience and Skills so a reviewer scanning
              top-down sees the apps you ship on your own before the
              tech checklist. */}
          <SectionHeading>Selected work</SectionHeading>
          <div style={{ marginBottom: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
            {CV.selectedWork.map((w) => (
              <div key={w.name} style={{ marginBottom: '0.7rem' }}>
                <div
                  style={{
                    display:    'flex',
                    alignItems: 'baseline',
                    gap:        '1rem',
                    flexWrap:   'wrap',
                    marginBottom:'0.18rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily:    'Nohemi, sans-serif',
                      fontWeight:    600,
                      fontSize:      '1.05rem',
                      letterSpacing: '-0.02em',
                      color:         '#23335C',
                      margin:         0,
                    }}
                  >
                    {w.name}
                  </h3>
                  <a
                    href={`https://${w.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily:    'Safiro, sans-serif',
                      fontSize:      '0.8rem',
                      color:         '#4F4FFF',
                      textDecoration:'none',
                      flexShrink:    0,
                    }}
                  >
                    {w.link}
                  </a>
                </div>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color:    '#4E5C84',
                    margin:   '0 0 0.3rem',
                  }}
                >
                  <span style={{ color: '#8590AB' }}>{w.role}</span> — {w.desc}
                </p>
                <p
                  style={{
                    margin:    0,
                    fontSize: '0.78rem',
                    color:     '#4F4FFF',
                    fontFamily:'Safiro, sans-serif',
                  }}
                >
                  {w.tech.join('   ·   ')}
                </p>
              </div>
            ))}
          </div>

          <hr style={hrStyle} />

          {/* Skills */}
          <SectionHeading>Skills</SectionHeading>
          <div style={{ marginBottom: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
            {CV.skills.map((s) => (
              <div
                key={s.label}
                style={{
                  display:            'grid',
                  gridTemplateColumns:'120px 1fr',
                  gap:                '0.7rem',
                  alignItems:         'baseline',
                  marginBottom:       '0.4rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Nohemi, sans-serif',
                    fontWeight: 600,
                    fontSize:   '0.86rem',
                    color:      '#23335C',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontSize:    '0.86rem',
                    color:        '#4E5C84',
                    lineHeight:  1.55,
                  }}
                >
                  {s.items.join('   ·   ')}
                </span>
              </div>
            ))}
          </div>

          <hr style={hrStyle} />

          {/* Education + Languages */}
          <div
            className="cv-edu-grid"
            style={{
              display:            'grid',
              gridTemplateColumns:'1fr 240px',
              gap:                '2rem',
              marginTop:          '0.5rem',
            }}
          >
            <div>
              <SectionHeading>Education</SectionHeading>
              {CV.education.map((e) => (
                <div key={e.school} style={{ marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      fontFamily:    'Nohemi, sans-serif',
                      fontWeight:    600,
                      fontSize:      '0.95rem',
                      color:         '#23335C',
                      letterSpacing: '-0.015em',
                      marginBottom:  2,
                    }}
                  >
                    {e.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#8590AB' }}>
                    {e.school} · {e.date}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <SectionHeading>Languages</SectionHeading>
              {CV.languages.map((l) => (
                <div
                  key={l.name}
                  style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    marginBottom:   '0.32rem',
                    fontSize:       '0.88rem',
                    color:          '#4E5C84',
                  }}
                >
                  <span style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 600, color: '#23335C' }}>
                    {l.name}
                  </span>
                  <span>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      <style suppressHydrationWarning>{`
        .cv-back-link:hover { color: #23335C; }

        @media (max-width: 860px) {
          .cv-hero-grid {
            grid-template-columns: auto 1fr !important;
          }
          .cv-contact-list {
            grid-column: 1 / -1 !important;
            text-align: left !important;
            padding-bottom: 0.6rem !important;
          }
        }
        @media (max-width: 540px) {
          .cv-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .cv-edu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily:    'Nohemi, sans-serif',
        fontWeight:    600,
        fontSize:      'clamp(1.1rem, 1.5vw, 1.32rem)',
        letterSpacing: '-0.02em',
        color:         '#23335C',
        margin:         0,
        marginBottom:  '0.75rem',
      }}
    >
      {children}
    </h2>
  );
}

const hrStyle: React.CSSProperties = {
  border:    'none',
  borderTop: '1px solid #E5E8F0',
  margin:    'clamp(1.3rem, 2.5vw, 2rem) 0',
};
