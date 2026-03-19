'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { ROTATING_WORDS } from './data';

const LiquidEther  = dynamic(() => import('./reactbits/LiquidEther/LiquidEther'),  { ssr: false });
const RotatingText = dynamic(() => import('./reactbits/RotatingText/RotatingText'), { ssr: false }) as any;

const SWIFT_KEYWORDS: { text: string; color: string }[] = [
  // Attributes — pink
  { text: '@State',        color: '#FC5FA3' },
  { text: '@Binding',      color: '#FC5FA3' },
  { text: '@Observable',   color: '#FC5FA3' },
  { text: '@MainActor',    color: '#FC5FA3' },
  { text: '@Environment',  color: '#FC5FA3' },
  { text: '@Published',    color: '#FC5FA3' },
  { text: '@ViewBuilder',  color: '#FC5FA3' },
  // Macros — orange
  { text: '#Preview',      color: '#FFA14F' },
  { text: '#available',    color: '#FFA14F' },
  // Keywords — pink
  { text: 'async',         color: '#FC5FA3' },
  { text: 'await',         color: '#FC5FA3' },
  { text: 'guard',         color: '#FC5FA3' },
  { text: 'throws',        color: '#FC5FA3' },
  { text: 'struct',        color: '#FC5FA3' },
  { text: 'protocol',      color: '#FC5FA3' },
  { text: 'actor',         color: '#FC5FA3' },
  { text: 'some',          color: '#FC5FA3' },
  { text: 'let',           color: '#FC5FA3' },
  { text: 'var',           color: '#FC5FA3' },
  { text: 'return',        color: '#FC5FA3' },
  { text: 'nil',           color: '#FC5FA3' },
  { text: 'try',           color: '#FC5FA3' },
  { text: 'catch',         color: '#FC5FA3' },
  { text: 'import',        color: '#FC5FA3' },
  { text: 'extension',     color: '#FC5FA3' },
  { text: 'override',      color: '#FC5FA3' },
  { text: 'static',        color: '#FC5FA3' },
  // Types — cyan
  { text: 'Task',          color: '#5DD8FF' },
  { text: 'View',          color: '#5DD8FF' },
  { text: 'String',        color: '#5DD8FF' },
  { text: 'Bool',          color: '#5DD8FF' },
  { text: 'Int',           color: '#5DD8FF' },
  { text: 'Double',        color: '#5DD8FF' },
  { text: 'Optional',      color: '#5DD8FF' },
  { text: 'Never',         color: '#5DD8FF' },
  { text: 'Self',          color: '#5DD8FF' },
  { text: 'URLSession',    color: '#5DD8FF' },
  // Functions — teal
  { text: 'withAnimation', color: '#67B7A4' },
  { text: '.sink',         color: '#67B7A4' },
  { text: '.map',          color: '#67B7A4' },
  { text: '.filter',       color: '#67B7A4' },
  { text: '.store',        color: '#67B7A4' },
  // Symbols / operators — dim white
  { text: '->',            color: '#A3B1C2' },
  { text: '{ }',           color: '#A3B1C2' },
  { text: '[ ]',           color: '#A3B1C2' },
  { text: '??',            color: '#A3B1C2' },
  { text: '...',           color: '#A3B1C2' },
];

function useSwiftCursorTrail(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    let lastX = 0, lastY = 0, lastTime = 0, idx = 0;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 55 || now - lastTime < 100) return;
      lastX = e.clientX; lastY = e.clientY; lastTime = now;

      const { text, color } = SWIFT_KEYWORDS[idx % SWIFT_KEYWORDS.length];
      idx++;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top + (Math.random() - 0.5) * 24;

      const el = document.createElement('span');
      el.textContent = text;
      el.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        font-family: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;
        font-size: 0.68rem;
        font-weight: 500;
        color: ${color};
        pointer-events: none;
        z-index: 3;
        white-space: nowrap;
        animation: swiftKw 1.6s ease forwards;
      `;
      container.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };

    container.addEventListener('mousemove', onMove);
    return () => container.removeEventListener('mousemove', onMove);
  }, [containerRef]);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  useSwiftCursorTrail(heroRef);

  return (
    <section ref={heroRef} id="hero" className="snap-section" style={{ minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center',position:'relative',overflow:'hidden',background:'var(--bg)' }}>

      {/* Animated gradient blobs */}
      <div aria-hidden style={{ position:'absolute',inset:0,zIndex:0,pointerEvents:'none',filter:'blur(90px)' }}>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-blob hero-blob-4" />
      </div>

      {/* LiquidEther — interactive, screened so dark areas are transparent */}
      <div data-parallax-bg aria-hidden style={{ position:'absolute',inset:'-5%',zIndex:1,mixBlendMode:'screen',opacity:0.75,willChange:'transform',pointerEvents:'none' }}>
        <LiquidEther colors={['#030d0c', '#0a2420', '#1a5048', '#030d0c']} />
      </div>

      {/* Film grain — div with SVG data-URL background, overlay blend */}
      <div aria-hidden className="hero-grain" style={{ position:'absolute',inset:0,zIndex:2,pointerEvents:'none',opacity:0.09,mixBlendMode:'overlay',backgroundRepeat:'repeat',backgroundSize:'180px 180px',backgroundImage:'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* Name + pill */}
      <div style={{ position:'relative', zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', width:'100%' }}>
        <h1 style={{ animation:'fadeUp 1s 0.2s both var(--ease)', lineHeight:0.9 }}>
          <span style={{ display:'block',fontFamily:'Nohemi,sans-serif',fontSize:'clamp(3.5rem,12vw,10.5rem)',fontWeight:900,textTransform:'uppercase',letterSpacing:'-0.03em',color:'#E8ECF0' }}>ANTONIO</span>
          <span style={{ display:'block',fontFamily:'Nohemi,sans-serif',fontSize:'clamp(3.5rem,12vw,10.5rem)',fontWeight:900,textTransform:'uppercase',letterSpacing:'-0.03em',color:'#E8ECF0' }}>GONZÁLEZ</span>
        </h1>

        <div style={{ display:'flex',alignItems:'center',gap:'1rem',marginTop:'2rem',animation:'fadeUp 1s 0.4s both var(--ease)',background:'rgba(255,255,255,0.04)',backdropFilter:'blur(12px)',padding:'0.6rem 1.5rem',borderRadius:100,border:'1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontFamily:'Nohemi,sans-serif',fontSize:'0.85rem',fontWeight:600,letterSpacing:'0.1em',color:'var(--white)' }}>iOS ENGINEER</span>
          <span style={{ width:1,height:16,background:'rgba(255,255,255,0.15)' }} />
          <RotatingText texts={ROTATING_WORDS} mainClassName="rotating-hero" staggerFrom="last" staggerDuration={0.025} rotationInterval={3000} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute',bottom:'2.5rem',left:'50%',transform:'translateX(-50%)',zIndex:5,animation:'fadeUp 1s 0.7s both var(--ease)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.6rem' }}>
        <div style={{ width:20,height:32,borderRadius:12,border:'1px solid rgba(255,255,255,0.15)',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:4,left:'50%',transform:'translateX(-50%)',width:3,height:8,borderRadius:2,background:'var(--accent)',animation:'scrollDot 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .rotating-hero{font-family:Nohemi,sans-serif;font-size:0.85rem;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:0.08em}
        @keyframes scrollDot{0%,100%{transform:translateX(-50%) translateY(0);opacity:1}50%{transform:translateX(-50%) translateY(12px);opacity:0.3}}

        .hero-blob { position:absolute; border-radius:50%; mix-blend-mode:screen; will-change:transform; }
        .hero-blob-1 {
          width:65vw; height:65vw; top:-15%; left:-15%;
          background: radial-gradient(circle, rgba(61,242,224,0.42) 0%, transparent 70%);
          animation: blob1 18s ease-in-out infinite;
        }
        .hero-blob-2 {
          width:55vw; height:55vw; bottom:-20%; right:-10%;
          background: radial-gradient(circle, rgba(61,242,224,0.32) 0%, transparent 70%);
          animation: blob2 22s ease-in-out infinite;
        }
        .hero-blob-3 {
          width:45vw; height:45vw; top:25%; left:35%;
          background: radial-gradient(circle, rgba(17,43,42,0.55) 0%, transparent 70%);
          animation: blob3 16s ease-in-out infinite;
        }
        .hero-blob-4 {
          width:38vw; height:38vw; top:5%; right:15%;
          background: radial-gradient(circle, rgba(61,242,224,0.22) 0%, transparent 70%);
          animation: blob4 26s ease-in-out infinite;
        }

        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(8vw,6vh) scale(1.08)} 66%{transform:translate(-4vw,10vh) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-10vw,-8vh) scale(1.1)} 66%{transform:translate(5vw,-4vh) scale(0.92)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-8vw,6vh) scale(1.15)} }
        @keyframes blob4 { 0%,100%{transform:translate(0,0) scale(1)} 25%{transform:translate(-6vw,8vh) scale(0.9)} 75%{transform:translate(10vw,-5vh) scale(1.12)} }

        @media (max-width: 700px) {
          .hero-grain { opacity: 0.16 !important; }
          .hero-blob-1 {
            width: 140vw; height: 140vw; top: -30%; left: -20%;
            background: radial-gradient(circle, rgba(61,242,224,0.55) 0%, transparent 65%);
          }
          .hero-blob-2 {
            width: 120vw; height: 120vw; bottom: -25%; right: -20%;
            background: radial-gradient(circle, rgba(61,242,224,0.45) 0%, transparent 65%);
          }
          .hero-blob-3 {
            width: 90vw; height: 90vw; top: 35%; left: 20%;
            background: radial-gradient(circle, rgba(17,43,42,0.5) 0%, transparent 65%);
          }
          .hero-blob-4 {
            width: 80vw; height: 80vw; top: 5%; right: 5%;
            background: radial-gradient(circle, rgba(61,242,224,0.35) 0%, transparent 65%);
          }
        }
      `}</style>
    </section>
  );
}
