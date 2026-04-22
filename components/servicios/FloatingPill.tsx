'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const WA_URL = 'https://wa.me/34711514735';

/* ─────────────────────────────────────────────────────────────────────────
 * SVG paths from Nohemi-SemiBold.woff2 (fontTools), cap-height = 22 px.
 * The lowercase 'x' is shifted upward by (brace_center − x_center) so all
 * three glyphs share the same optical vertical centre at y ≈ 9.9 px.
 * viewBox: "0 0 32.91 22"
 * ───────────────────────────────────────────────────────────────────────── */
const D_OPEN =
  'M8.639 2.367H7.988Q6.958 2.367 6.467 2.923Q5.976 3.479 5.976 4.615V6.379Q5.976 7.024 5.864 7.627Q5.751 8.231 5.482 8.710Q5.213 9.189 4.766 9.506Q4.320 9.822 3.651 9.905Q4.331 9.982 4.778 10.293Q5.225 10.604 5.491 11.083Q5.757 11.562 5.867 12.169Q5.976 12.775 5.976 13.450V15.213Q5.976 16.320 6.470 16.876Q6.964 17.432 7.988 17.432H8.639V20.107H7.438Q4.970 20.107 3.728 18.879Q2.485 17.651 2.485 15.201V13.284Q2.485 12.781 2.396 12.420Q2.308 12.059 2.118 11.825Q1.929 11.592 1.636 11.482Q1.343 11.373 0.935 11.373H0.639V8.426H0.935Q1.349 8.426 1.642 8.320Q1.935 8.213 2.121 7.982Q2.308 7.751 2.396 7.388Q2.485 7.024 2.485 6.515V4.598Q2.485 2.124 3.716 0.908Q4.947 -0.308 7.438 -0.308H8.639Z';

const D_X =
  'M19.083 9.802L23.669 16.423H19.550L16.349 11.547L13.237 16.423H9.343L13.728 9.849L9.391 3.376H13.509L16.467 8.151L19.373 3.376H23.266Z';

const D_CLOSE =
  'M24.267 17.431H24.918Q25.947 17.431 26.438 16.875Q26.929 16.319 26.929 15.183V13.419Q26.929 12.775 27.042 12.171Q27.154 11.567 27.423 11.088Q27.693 10.609 28.139 10.292Q28.586 9.976 29.255 9.893Q28.574 9.816 28.128 9.505Q27.681 9.195 27.415 8.716Q27.148 8.236 27.039 7.630Q26.929 7.023 26.929 6.349V4.586Q26.929 3.479 26.435 2.923Q25.941 2.367 24.918 2.367H24.267V-0.308H25.468Q27.935 -0.308 29.178 0.920Q30.420 2.148 30.420 4.598V6.515Q30.420 7.017 30.509 7.378Q30.598 7.739 30.787 7.973Q30.976 8.207 31.269 8.316Q31.562 8.426 31.970 8.426H32.266V11.372H31.970Q31.556 11.372 31.263 11.479Q30.971 11.585 30.784 11.816Q30.598 12.047 30.509 12.411Q30.420 12.775 30.420 13.283V15.201Q30.420 17.674 29.190 18.890Q27.959 20.105 25.468 20.105H24.267Z';

function LogoMark() {
  return (
    <svg
      width="33"
      height="22"
      viewBox="0 0 32.91 22"
      aria-hidden
      focusable="false"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d={D_OPEN}  fill="#0B0F14" />
      <path d={D_X}     fill="#0B0F14" />
      <path d={D_CLOSE} fill="#0B0F14" />
    </svg>
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
            <div style={{ pointerEvents:'none', userSelect:'none', lineHeight:0 }}>
              <LogoMark />
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
                background:     hovered ? '#1E2B3C' : '#0B0F14',
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
