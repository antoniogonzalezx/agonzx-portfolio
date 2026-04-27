'use client';
import { useEffect, useRef, useState } from 'react';
import { SITE } from './data';

type Status = 'idle' | 'loading' | 'success' | 'error';

/* Auto-fit monumental wordmark — text scales so it spans the full
 * width of its container at all times. Same trick /lab footer uses,
 * adapted to the dark home palette. */
function MonumentalWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fit = () => {
      const c = containerRef.current;
      const t = textRef.current;
      if (!c || !t) return;
      t.style.fontSize = '18vw';
      requestAnimationFrame(() => {
        if (!c || !t) return;
        const ratio = c.clientWidth / t.scrollWidth;
        t.style.fontSize = `${18 * Math.min(ratio, 1.08)}vw`;
      });
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden', lineHeight: 0.8, width: '100%' }}>
      <span
        ref={textRef}
        style={{
          display:       'inline-block',
          fontFamily:    'Nohemi, sans-serif',
          fontWeight:    600,
          fontSize:      '18vw',
          letterSpacing: '-0.04em',
          lineHeight:    0.8,
          color:         'var(--white)',
          userSelect:    'none',
          whiteSpace:    'nowrap',
        }}
      >
        agonz<span style={{ color: 'var(--accent)' }}>{'{'}<span style={{ position: 'relative', top: '-0.046em' }}>x</span>{'}'}</span>
      </span>
    </div>
  );
}

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const send = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.78rem 1rem', borderRadius: 14,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--white)', fontFamily: 'Safiro,sans-serif', fontSize: '0.88rem', outline: 'none',
    backdropFilter: 'blur(10px)',
  };

  const links = [
    { label: 'LinkedIn', href: SITE.linkedin, d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { label: 'GitHub', href: SITE.github, d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  ];

  // Footer secondary links — keep tone editorial, mirror /lab
  const footerLinks = [
    { label: 'About',    href: '#about'  },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack',    href: '#stack' },
    { label: 'Lab',      href: 'https://axlab.es', external: true },
    { label: 'CV',       href: '/cv'     },
    { label: 'Privacy',  href: '/privacy' },
    { label: '@agonzx',  href: SITE.instagram, external: true },
  ];

  return (
    <section
      id="contact"
      className="snap-section"
      style={{
        background:    'var(--bg)',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
        overflow:      'hidden',
      }}
    >
      {/* ── Top — CTA + form area ─────────────────────────────────────── */}
      <div
        style={{
          flex:           1,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        'clamp(3rem,6vh,5rem) clamp(1.5rem,4vw,3.5rem) clamp(1.5rem,3vh,2.5rem)',
          minHeight:      0,
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', width: '100%' }}>
          <div
            className="contact-grid"
            style={{
              display:            'grid',
              gridTemplateColumns:'1fr 1fr',
              gap:                'clamp(2rem, 4vw, 4rem)',
              alignItems:         'start',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily:    'Nohemi,sans-serif',
                  fontSize:      'clamp(2rem, 5vw, 3.8rem)',
                  fontWeight:    600,
                  letterSpacing: '-0.035em',
                  lineHeight:    0.98,
                  color:         'var(--white)',
                  margin:         0,
                }}
              >
                Get in touch.
                <br />
                <span style={{ color: 'var(--t3)', fontWeight: 400 }}>
                  Email&apos;s fastest.
                </span>
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--t2)', marginTop: '1.2rem', maxWidth: 360 }}>
                Drop a line — I check it most days. Hiring, collaboration,
                questions about anything you saw on this site.
              </p>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                {links.map((l, i) => (
                  <a
                    key={i}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily:     'Nohemi,sans-serif',
                      fontSize:       '0.85rem',
                      fontWeight:     500,
                      color:          'var(--white)',
                      padding:        '0.7rem 1.1rem',
                      border:         '1px solid rgba(255,255,255,0.08)',
                      borderRadius:    100,
                      display:        'inline-flex',
                      alignItems:     'center',
                      gap:            '0.55rem',
                      backdropFilter: 'blur(10px)',
                      background:     'rgba(255,255,255,0.04)',
                      transition:     'background 0.2s ease, border-color 0.2s ease',
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: 'var(--accent)', flexShrink: 0 }}>
                      <path d={l.d} />
                    </svg>
                    {l.label}
                    <span style={{ color: 'var(--t3)', fontSize: '0.95rem' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div
              style={{
                background:           'rgba(11,15,26,0.6)',
                border:               '1px solid rgba(255,255,255,0.08)',
                borderRadius:          24,
                padding:              'clamp(1.4rem, 2vw, 1.8rem)',
                backdropFilter:       'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                boxShadow:            '0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <p style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent)' }}>Sent.</p>
                  <p style={{ color: 'var(--t2)', fontSize: '0.85rem', marginTop: '0.4rem' }}>I&apos;ll reply in a day or two.</p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                    style={{
                      marginTop: '1.2rem',
                      background:'none',
                      border:    '1px solid var(--brd)',
                      color:     'var(--t2)',
                      padding:   '0.5rem 1rem',
                      borderRadius: 8,
                      cursor:    'pointer',
                      fontFamily:'var(--font-mono)',
                      fontSize:  '0.7rem',
                    }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  <input type="text"  placeholder="Your name"  value={form.name}  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}  style={inp} />
                  <input type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inp} />
                  <textarea
                    placeholder="What is on your mind?"
                    value={form.message}
                    rows={3}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inp, resize: 'vertical' as const, minHeight: 88 }}
                  />
                  {status === 'error' && (
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ff6b6b' }}>
                      Couldn&apos;t send. Try again, or email me directly.
                    </p>
                  )}
                  <button
                    onClick={send}
                    disabled={status === 'loading'}
                    style={{
                      fontFamily:    'Nohemi,sans-serif',
                      fontSize:      '0.9rem',
                      fontWeight:    600,
                      padding:       '0.85rem 1.8rem',
                      borderRadius:   100,
                      border:        'none',
                      cursor:         status === 'loading' ? 'not-allowed' : 'pointer',
                      background:    'var(--accent)',
                      color:         '#fff',
                      boxShadow:     '0 4px 20px rgba(107,107,255,0.30)',
                      opacity:        status === 'loading' ? 0.7 : 1,
                      transition:    'transform 0.2s var(--ease)',
                    }}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send message →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer — links row + monumental wordmark ────────────────────── */}
      <footer style={{ position: 'relative', zIndex: 1, flex: 'none' }}>
        {/* Links + copyright */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-end',
            paddingBottom:  '0.7rem',
            borderTop:      '1px solid rgba(255,255,255,0.06)',
            paddingTop:     '0.85rem',
            margin:         '0 clamp(1.5rem,4vw,3.5rem)',
            flexWrap:       'wrap',
            gap:            '0.4rem 1.5rem',
          }}
        >
          <nav aria-label="Footer" style={{ display: 'flex', gap: '1.1rem', flexWrap: 'wrap' }}>
            {footerLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily:     'Nohemi, sans-serif',
                  fontSize:       '0.78rem',
                  fontWeight:     500,
                  color:          'var(--t3)',
                  letterSpacing:  '-0.01em',
                  textDecoration: 'none',
                  transition:     'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--t3)')}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <span
            style={{
              fontFamily:    'Nohemi, sans-serif',
              fontSize:      '0.7rem',
              fontWeight:    500,
              color:         'var(--t3)',
              letterSpacing: '-0.005em',
            }}
          >
            Antonio González · 2026
          </span>
        </div>

        {/* Monumental wordmark — sits flush to the bottom of the section */}
        <div
          style={{
            padding:    '0.2rem clamp(1.5rem,4vw,3.5rem) 0',
            lineHeight: 0.8,
          }}
        >
          <MonumentalWordmark />
        </div>
      </footer>
    </section>
  );
}
