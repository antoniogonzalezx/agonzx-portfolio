'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const WA_URL = 'https://wa.me/34711514735';

/* ── Logo mark: {x} in Nohemi SemiBold, inline SVG ──────────────── */
function LogoMark({ tinted }: { tinted: boolean }) {
  return (
    <svg
      width="36"
      height="24"
      viewBox="0 0 48 32"
      aria-hidden
      focusable="false"
    >
      <text
        y="25"
        fontFamily="Nohemi, sans-serif"
        fontSize="26"
        fontWeight="600"
        letterSpacing="-0.8"
      >
        <tspan fill="#3DF2E0">{'{'}</tspan>
        <tspan
          style={{
            fill: tinted ? '#3DF2E0' : '#0B0F14',
            transition: 'fill 0.25s ease',
          }}
        >
          x
        </tspan>
        <tspan fill="#3DF2E0">{'}'}</tspan>
      </text>
    </svg>
  );
}

/* ── Floating pill ───────────────────────────────────────────────── */
export default function FloatingPill() {
  const [heroGone, setHeroGone]     = useState(false);
  const [footerNear, setFooterNear] = useState(false);
  const [hovered, setHovered]       = useState(false);
  const reduceMotion                = useReducedMotion();

  /* visible only when hero has left the viewport AND footer is not near */
  const visible = heroGone && !footerNear;

  useEffect(() => {
    const heroEl   = document.querySelector('[data-servicios-section="hero"]');
    const footerEl = document.querySelector('[data-servicios-section="footer"]');
    /* support both CSS snap container and the custom JS scroller */
    const container = document.querySelector('.s-snap-container') as Element | null;

    if (!heroEl || !footerEl) return;

    /* hero: show pill once hero is no longer visible */
    const heroObs = new IntersectionObserver(
      ([entry]) => setHeroGone(!entry.isIntersecting),
      { root: container, threshold: 0.5 },
    );
    /* footer: hide pill when CTA section fills 80 % of viewport */
    const footerObs = new IntersectionObserver(
      ([entry]) => setFooterNear(entry.isIntersecting),
      { root: container, threshold: 0.8 },
    );

    heroObs.observe(heroEl);
    footerObs.observe(footerEl);

    return () => {
      heroObs.disconnect();
      footerObs.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        /*
         * Outer div handles fixed + centering via CSS.
         * The motion element only animates y + opacity so there is no
         * conflict between CSS transform: translateX(-50%) and Framer Motion.
         */
        <div
          className="s-pill-positioner"
          style={{
            position:  'fixed',
            bottom:    24,
            left:      '50%',
            transform: 'translateX(-50%)',
            zIndex:    80,
          }}
        >
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablar por WhatsApp con Antonio"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion    ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display:             'flex',
              alignItems:          'center',
              gap:                 8,
              padding:             8,
              borderRadius:        9999,
              background:          'rgba(255, 255, 255, 0.88)',
              backdropFilter:      'blur(20px) saturate(180%)',
              WebkitBackdropFilter:'blur(20px) saturate(180%)',
              boxShadow:           '0 8px 32px rgba(11, 15, 20, 0.10)',
              textDecoration:      'none',
              cursor:              'pointer',
              userSelect:          'none',
              whiteSpace:          'nowrap',
            }}
          >
            {/* Logo mark container */}
            <div
              style={{
                width:          40,
                height:         40,
                borderRadius:   9999,
                background:     '#F4F6F9',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
              }}
            >
              <LogoMark tinted={hovered} />
            </div>

            {/* Dark inner pill */}
            <motion.span
              animate={reduceMotion ? {} : { scale: hovered ? 1.02 : 1 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                display:       'block',
                background:    '#0B0F14',
                color:         '#FFFFFF',
                borderRadius:  9999,
                padding:       '10px 20px',
                fontFamily:    'Safiro, sans-serif',
                fontSize:      15,
                fontWeight:    500,
                letterSpacing: '-0.01em',
              }}
            >
              Hablemos
            </motion.span>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
