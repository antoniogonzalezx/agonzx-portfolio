'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* Same {x} paths as FloatingPill, scaled to 18 px cap-height */
const SCALE = 18 / 22;
const W     = 32.91 * SCALE;
const H     = 22    * SCALE;

function LogoMark() {
  return (
    <svg
      width={W}
      height={H}
      viewBox="0 0 32.91 22"
      aria-hidden
      focusable="false"
      style={{ display: 'block' }}
    >
      <path d="M8.639 2.367H7.988Q6.958 2.367 6.467 2.923Q5.976 3.479 5.976 4.615V6.379Q5.976 7.024 5.864 7.627Q5.751 8.231 5.482 8.710Q5.213 9.189 4.766 9.506Q4.320 9.822 3.651 9.905Q4.331 9.982 4.778 10.293Q5.225 10.604 5.491 11.083Q5.757 11.562 5.867 12.169Q5.976 12.775 5.976 13.450V15.213Q5.976 16.320 6.470 16.876Q6.964 17.432 7.988 17.432H8.639V20.107H7.438Q4.970 20.107 3.728 18.879Q2.485 17.651 2.485 15.201V13.284Q2.485 12.781 2.396 12.420Q2.308 12.059 2.118 11.825Q1.929 11.592 1.636 11.482Q1.343 11.373 0.935 11.373H0.639V8.426H0.935Q1.349 8.426 1.642 8.320Q1.935 8.213 2.121 7.982Q2.308 7.751 2.396 7.388Q2.485 7.024 2.485 6.515V4.598Q2.485 2.124 3.716 0.908Q4.947 -0.308 7.438 -0.308H8.639Z" fill="#0B0F14" />
      <path d="M19.083 9.802L23.669 16.423H19.550L16.349 11.547L13.237 16.423H9.343L13.728 9.849L9.391 3.376H13.509L16.467 8.151L19.373 3.376H23.266Z" fill="#0B0F14" />
      <path d="M24.267 17.431H24.918Q25.947 17.431 26.438 16.875Q26.929 16.319 26.929 15.183V13.419Q26.929 12.775 27.042 12.171Q27.154 11.567 27.423 11.088Q27.693 10.609 28.139 10.292Q28.586 9.976 29.255 9.893Q28.574 9.816 28.128 9.505Q27.681 9.195 27.415 8.716Q27.148 8.236 27.039 7.630Q26.929 7.023 26.929 6.349V4.586Q26.929 3.479 26.435 2.923Q25.941 2.367 24.918 2.367H24.267V-0.308H25.468Q27.935 -0.308 29.178 0.920Q30.420 2.148 30.420 4.598V6.515Q30.420 7.017 30.509 7.378Q30.598 7.739 30.787 7.973Q30.976 8.207 31.269 8.316Q31.562 8.426 31.970 8.426H32.266V11.372H31.970Q31.556 11.372 31.263 11.479Q30.971 11.585 30.784 11.816Q30.598 12.047 30.509 12.411Q30.420 12.775 30.420 13.283V15.201Q30.420 17.674 29.190 18.890Q27.959 20.105 25.468 20.105H24.267Z" fill="#0B0F14" />
    </svg>
  );
}

interface Props { wa: string; }

export default function ServiciosNav({ wa }: Props) {
  const [visible, setVisible]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const reduceMotion            = useReducedMotion();

  /* Appear once the hero section leaves the viewport */
  useEffect(() => {
    const heroEl    = document.querySelector('[data-servicios-section="hero"]');
    const container = document.querySelector('.s-snap-container') as Element | null;
    if (!heroEl) return;

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
        <motion.nav
          aria-label="Navegación principal"
          initial={reduceMotion ? { opacity:0 } : { opacity:0, y:-16 }}
          animate={reduceMotion ? { opacity:1 } : { opacity:1, y:0   }}
          exit={reduceMotion    ? { opacity:0 } : { opacity:0, y:-16 }}
          transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
          style={{
            position:             'fixed',
            top:                  '1rem',
            left:                 '50%',
            transform:            'translateX(-50%)',
            zIndex:               1000,
            display:              'flex',
            justifyContent:       'space-between',
            alignItems:           'center',
            width:                'min(92vw, 820px)',
            padding:              '0.65rem 1rem 0.65rem 1.3rem',
            borderRadius:         9999,
            /* Light-mode glass — same system as dark nav, inverted */
            background:           'rgba(244,246,249,0.85)',
            backdropFilter:       'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            border:               '1px solid rgba(11,15,20,0.06)',
            boxShadow:            '0 8px 32px rgba(11,15,20,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Logo mark */}
          <a href="/" aria-label="Inicio — agonzx" style={{ lineHeight:0, textDecoration:'none' }}>
            <LogoMark />
          </a>

          {/* Right links */}
          <div style={{ display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <a
              href="/"
              style={{
                fontFamily:    'Nohemi, sans-serif',
                fontSize:      '0.78rem',
                fontWeight:    500,
                color:         '#4A556A',
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
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                fontFamily:    'Nohemi, sans-serif',
                fontSize:      '0.78rem',
                fontWeight:    600,
                color:         '#FFFFFF',
                background:    hovered ? '#1E2B3C' : '#0B0F14',
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
      )}
    </AnimatePresence>
  );
}
