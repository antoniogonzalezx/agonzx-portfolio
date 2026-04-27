'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* Full wordmark: Nohemi text, x optically lifted to align with brace centers */
function Wordmark() {
  return (
    <span
      style={{
        display:       'inline-block',
        fontFamily:    'Nohemi, sans-serif',
        fontWeight:    600,
        fontSize:      '1.02rem',
        letterSpacing: '-0.03em',
        lineHeight:    1,
        color:         '#23335C',
        userSelect:    'none',
        whiteSpace:    'nowrap',
      }}
    >
      a<span style={{ color: '#4F4FFF' }}>{'{'}<span style={{ position: 'relative', top: '-0.046em' }}>x</span>{'}'}</span>lab
    </span>
  );
}

interface Props { wa: string; }

export default function ServiciosNav({ wa }: Props) {
  const [visible, setVisible]   = useState(false);
  const reduceMotion            = useReducedMotion();

  /* Appear once the hero section leaves the viewport */
  useEffect(() => {
    const heroEl = document.querySelector('[data-servicios-section="hero"]');
    if (!heroEl) return;

    /* Desktop uses the snap container as IO root; mobile has overflow:visible there,
       so fall back to the viewport (root: null). */
    const isMobile  = window.matchMedia('(max-width: 768px)').matches;
    const container = isMobile ? null : (document.querySelector('.s-snap-container') as Element | null);

    const obs = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { root: container, threshold: 0.5 },
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        /* Static wrapper handles centering so framer-motion's y doesn't conflict with translateX */
        <div style={{ position:'fixed', top:'1rem', left:'50%', transform:'translateX(-50%)', zIndex:1000, width:'min(92vw, 820px)' }}>
        <motion.nav
          aria-label="Navegación principal"
          initial={reduceMotion ? { opacity:0 } : { opacity:0, y:-16 }}
          animate={reduceMotion ? { opacity:1 } : { opacity:1, y:0   }}
          exit={reduceMotion    ? { opacity:0 } : { opacity:0, y:-16 }}
          transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
          style={{
            display:              'flex',
            justifyContent:       'space-between',
            alignItems:           'center',
            width:                '100%',
            padding:              '0.65rem 1rem 0.65rem 1.3rem',
            borderRadius:         9999,
            /* Light-mode glass — same system as dark nav, inverted */
            background:           'rgba(250,251,253,0.85)',
            backdropFilter:       'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            border:               '1px solid rgba(35,51,92,0.06)',
            boxShadow:            '0 8px 32px rgba(35,51,92,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Full wordmark */}
          <a href="/" aria-label="Inicio — agonzx" style={{ lineHeight:0, textDecoration:'none' }}>
            <Wordmark />
          </a>

          {/* Right links */}
          <div style={{ display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <a
              href="/"
              style={{
                fontFamily:    'Nohemi, sans-serif',
                fontSize:      '0.78rem',
                fontWeight:    500,
                color:         '#4E5C84',
                textDecoration:'none',
                letterSpacing: '-0.01em',
              }}
            >
              ← Portfolio
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="s-nav-contact"
              style={{
                fontFamily:    'Nohemi, sans-serif',
                fontSize:      '0.78rem',
                fontWeight:    600,
                color:         '#FFFFFF',
                padding:       '0.45rem 1.1rem',
                borderRadius:  9999,
                textDecoration:'none',
                letterSpacing: '-0.01em',
                transition:    'background 0.2s ease',
              }}
            >
              Contacto
            </a>
          </div>
        </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
