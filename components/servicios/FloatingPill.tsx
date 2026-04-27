'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const WA_URL = 'https://wa.me/34711514735';

/* axlab wordmark — same trick as hero/footer: `a` + brace-x text +
 * `lab`, all in Nohemi 600. The lowercase x is optically lifted to
 * sit on the brace centreline. Text-only render keeps the kerning
 * tight and avoids the SVG/text size mismatch at this scale. */
function AxLabLockup() {
  return (
    <span
      style={{
        fontFamily:    'Nohemi, sans-serif',
        fontWeight:    600,
        fontSize:      15,
        letterSpacing: '-0.025em',
        color:         '#23335C',
        lineHeight:    1,
        userSelect:    'none',
      }}
      aria-label="axlab"
    >
      a<span style={{ color: '#4F4FFF' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>lab
    </span>
  );
}

export default function FloatingPill() {
  const [heroGone,   setHeroGone]   = useState(false);
  const [footerNear, setFooterNear] = useState(false);
  const [hovered,    setHovered]    = useState(false);
  const reduceMotion                = useReducedMotion();

  const visible = heroGone && !footerNear;

  useEffect(() => {
    const heroEl   = document.querySelector('[data-servicios-section="hero"]');
    const footerEl = document.querySelector('[data-servicios-section="footer"]');
    if (!heroEl || !footerEl) return;

    /* Desktop: snap container is the scroller. Mobile: viewport (root:null). */
    const isMobile  = window.matchMedia('(max-width: 768px)').matches;
    const container = isMobile ? null : (document.querySelector('.s-snap-container') as Element | null);

    const heroObs = new IntersectionObserver(
      ([e]) => setHeroGone(!e.isIntersecting),
      { root: container, threshold: 0.5 },
    );
    const footerObs = new IntersectionObserver(
      ([e]) => setFooterNear(e.isIntersecting),
      { root: container, threshold: 0.8 },
    );
    heroObs.observe(heroEl);
    footerObs.observe(footerEl);
    return () => { heroObs.disconnect(); footerObs.disconnect(); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div style={{ position:'fixed', bottom:28, left:'50%', transform:'translateX(-50%)', zIndex:80 }}>
          <motion.div
            role="none"
            initial={reduceMotion ? { opacity:0 } : { opacity:0, y:20 }}
            animate={reduceMotion ? { opacity:1 } : { opacity:1, y:0  }}
            exit={reduceMotion    ? { opacity:0 } : { opacity:0, y:20 }}
            transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
            style={{
              display:              'flex',
              alignItems:           'center',
              gap:                  10,
              padding:              '7px 7px 7px 18px',
              borderRadius:         9999,
              /* Same glass system as navbar: blur(32px) saturate(200%)
                 Lower opacity so the blur is actually visible            */
              background:            'rgba(255,255,255,0.68)',
              backdropFilter:        'blur(32px) saturate(200%)',
              WebkitBackdropFilter:  'blur(32px) saturate(200%)',
              border:                '1px solid rgba(255,255,255,0.60)',
              boxShadow:             '0 8px 32px rgba(11,15,20,0.09), inset 0 1px 0 rgba(255,255,255,0.85)',
              whiteSpace:            'nowrap',
            }}
          >
            <div style={{ pointerEvents:'none', userSelect:'none', lineHeight:0, padding:'0 4px' }}>
              <AxLabLockup />
            </div>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablar por WhatsApp con Antonio"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display:        'block',
                background:     hovered ? '#4F4FFF' : '#23335C',
                color:          '#FFFFFF',
                borderRadius:   9999,
                padding:        '11px 20px',
                fontFamily:     'Safiro, sans-serif',
                fontSize:       14,
                fontWeight:     500,
                letterSpacing:  '-0.01em',
                lineHeight:     1,
                textDecoration: 'none',
                cursor:         'pointer',
                userSelect:     'none',
                transition:     reduceMotion ? 'none' : 'background 0.2s ease, box-shadow 0.2s ease',
                boxShadow:      hovered ? '0 4px 20px rgba(11,15,20,0.28)' : 'none',
              }}
            >
              Hablemos
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
