'use client';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from './data';

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Auto-close on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 700) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const close = () => setOpen(false);

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
    zIndex: 1000, padding: '0.7rem 1.8rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: 'min(90vw, 800px)',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(32px) saturate(200%)',
    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 100,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
  };

  return (
    <>
      <nav style={navStyle}>
        <a href="#" onClick={close} style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '1.05rem', fontWeight: 600, display: 'flex' }}>
          <span style={{ color: 'var(--white)' }}>agonz</span>
          <span style={{ color: 'var(--accent)' }}>{'{x}'}</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {NAV_LINKS.map(l => (
            <a key={l} href={'#' + l.toLowerCase()} style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '0.78rem', fontWeight: 500, color: 'var(--t2)', transition: 'color 0.3s' }}>
              {l}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="nav-menu-btn"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            fontFamily: 'Nohemi,sans-serif', fontSize: '0.78rem', fontWeight: 600,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--white)', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.4rem',
          }}
        >
          <span style={{ color: 'var(--accent)', fontSize: '1rem', lineHeight: 1 }}>{open ? '×' : '+'}</span>
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </nav>

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
        </div>
      </div>
    </>
  );
}
