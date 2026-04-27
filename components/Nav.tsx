'use client';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from './data';

/* ─────────────────────────────────────────────────────────────────
 * Main portfolio nav.
 *
 * Hidden while the hero is in view; reveals when the hero exits.
 * The right-most item is the `{x}lab` mark, linking to /lab — no
 * "Lab" word, just the mark, so it reads as a sub-brand gesture.
 *
 * The mobile floating menu button (+) follows the same visibility
 * gate so the hero stays clean on phones too.
 * ───────────────────────────────────────────────────────────────── */

export default function Nav() {
  const [open,    setOpen]    = useState(false);
  const [visible, setVisible] = useState(false);

  // Reveal the nav once we leave the hero
  useEffect(() => {
    const heroEl = document.querySelector('[data-home-section="hero"]');
    if (!heroEl) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0.5 },
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 700) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const close = () => setOpen(false);

  const navStyle: React.CSSProperties = {
    position:             'fixed',
    top:                  '1rem',
    left:                 '50%',
    transform:            visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-120%)',
    zIndex:                1000,
    padding:              '0.7rem 1.8rem',
    display:              'flex',
    justifyContent:       'space-between',
    alignItems:           'center',
    width:                'min(90vw, 800px)',
    background:           'rgba(255,255,255,0.04)',
    backdropFilter:       'blur(32px) saturate(200%)',
    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
    border:               '1px solid rgba(255,255,255,0.08)',
    borderRadius:          100,
    boxShadow:            '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
    opacity:               visible ? 1 : 0,
    pointerEvents:         visible ? 'auto' : 'none',
    transition:           'transform 0.5s var(--ease), opacity 0.4s var(--ease)',
  };

  const mobileBtnStyle: React.CSSProperties = {
    position:             'fixed',
    top:                  '1rem',
    right:                '1rem',
    zIndex:                1001,
    width:                '2.66rem',
    height:               '2.66rem',
    padding:               0,
    borderRadius:         '50%',
    border:               '1px solid rgba(255,255,255,0.08)',
    background:           'rgba(255,255,255,0.04)',
    backdropFilter:       'blur(32px) saturate(200%)',
    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
    boxShadow:            '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
    cursor:               'pointer',
    alignItems:           'center',
    justifyContent:       'center',
    opacity:               visible ? 1 : 0,
    transform:             visible ? 'scale(1)' : 'scale(0.8)',
    pointerEvents:         visible ? 'auto' : 'none',
    transition:           'transform 0.4s var(--ease), opacity 0.4s var(--ease)',
  };

  return (
    <>
      <nav className="main-nav" style={navStyle}>
        <a
          href="#"
          onClick={close}
          data-magnetic
          aria-label="agonzx — top of page"
          style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '1.05rem', fontWeight: 600, display: 'flex' }}
        >
          <span style={{ color: 'var(--white)' }}>agonz</span>
          <span style={{ color: 'var(--accent)' }}>{'{x}'}</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ alignItems: 'center' }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={'#' + l.toLowerCase()} style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '0.78rem', fontWeight: 500, color: 'var(--t2)', transition: 'color 0.3s' }}>
              {l}
            </a>
          ))}
          <a
            href="/cv"
            aria-label="View CV"
            style={{
              fontFamily:     'Nohemi, sans-serif',
              fontSize:       '0.78rem',
              fontWeight:     500,
              color:          'var(--t2)',
              transition:     'color 0.3s',
              textDecoration: 'none',
            }}
          >
            CV
          </a>
          <a
            href="https://axlab.es"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit axlab — automation studio"
            style={{
              fontFamily:     'Nohemi,sans-serif',
              fontSize:       '0.78rem',
              fontWeight:     500,
              color:          'var(--t2)',
              transition:     'color 0.3s',
              textDecoration: 'none',
            }}
          >
            Lab
          </a>
        </div>

      </nav>

      {/* Mobile floating menu button — separate from navbar */}
      <button
        className="nav-menu-btn"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        style={mobileBtnStyle}
      >
        <span style={{
          color: 'var(--accent)',
          fontSize: '1.3rem',
          lineHeight: 1,
          display: 'block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}>+</span>
      </button>

      {/* Mobile fullscreen glass overlay */}
      <div
        className={`mobile-nav-overlay${open ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="mobile-nav-links">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l}
              href={'#' + l.toLowerCase()}
              className="mobile-nav-link"
              style={{ transitionDelay: open ? `${i * 0.055}s` : '0s' }}
              onClick={close}
            >
              <span className="link-idx">0{i + 1}</span>
              {l}
            </a>
          ))}
          <a
            href="https://axlab.es"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link"
            style={{
              transitionDelay: open ? `${NAV_LINKS.length * 0.055}s` : '0s',
              alignItems:      'center',
              gap:             '0.7rem',
            }}
            onClick={close}
          >
            <span className="link-idx">0{NAV_LINKS.length + 1}</span>
            Lab
          </a>
        </div>
      </div>
    </>
  );
}
