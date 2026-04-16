'use client';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ROTATING_WORDS } from './data';

const LiquidEther  = dynamic(() => import('./reactbits/LiquidEther/LiquidEther'),  { ssr: false });
const RotatingText = dynamic(() => import('./reactbits/RotatingText/RotatingText'), { ssr: false }) as any;
const HeroModel    = dynamic(() => import('./HeroModel'), { ssr: false });

const SWIFT_KEYWORDS: { text: string; color: string }[] = [
  { text: '@State',        color: '#FC5FA3' },
  { text: '@Binding',      color: '#FC5FA3' },
  { text: '@Observable',   color: '#FC5FA3' },
  { text: '@MainActor',    color: '#FC5FA3' },
  { text: '@Environment',  color: '#FC5FA3' },
  { text: '@Published',    color: '#FC5FA3' },
  { text: '@ViewBuilder',  color: '#FC5FA3' },
  { text: '#Preview',      color: '#FFA14F' },
  { text: '#available',    color: '#FFA14F' },
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
  { text: 'withAnimation', color: '#67B7A4' },
  { text: '.sink',         color: '#67B7A4' },
  { text: '.map',          color: '#67B7A4' },
  { text: '.filter',       color: '#67B7A4' },
  { text: '.store',        color: '#67B7A4' },
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

const STATS = [
  { value: '5+',   label: 'years exp.' },
  { value: '22M+', label: 'users reached' },
  { value: '4',    label: 'apps shipped' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  useSwiftCursorTrail(heroRef);

  // GSAP character stagger — premium letter reveal
  useEffect(() => {
    if (!nameRef.current) return;
    const chars = nameRef.current.querySelectorAll<HTMLElement>('.hc');
    gsap.fromTo(
      chars,
      { y: 90, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.032, ease: 'power4.out', delay: 0.15 },
    );
  }, []);

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
      <div style={{ position:'relative', zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', width:'100%', paddingBottom:'clamp(4rem, 9vh, 6rem)' }}>

        {/* 3D {x} model */}
        <div style={{ animation:'fadeUp 1s 0.05s both var(--ease)', width:'100%', maxWidth:'clamp(220px,40vw,480px)' }}>
          <HeroModel />
        </div>

        {/* Letter-stagger name — GSAP reveals chars from below overflow clip */}
        <div ref={nameRef}>
          <h1 className="hero-name" style={{ lineHeight: 0.9 }}>
            {['ANTONIO', 'GONZALEZ'].map(word => (
              <span
                key={word}
                style={{
                  display: 'block', overflow: 'hidden',
                  fontFamily: '"Martian Grotesk",sans-serif',
                  fontSize: 'clamp(3.5rem,12vw,10.5rem)', fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: '-0.03em', color: '#E8ECF0',
                }}
              >
                {word.split('').map((c, i) => (
                  <span key={i} className="hc" style={{ display: 'inline-block', opacity: 0 }}>{c}</span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Role pill */}
        <div style={{ display:'flex',alignItems:'center',gap:'1rem',marginTop:'2rem',animation:'fadeUp 1s 0.55s both var(--ease)',background:'rgba(255,255,255,0.04)',backdropFilter:'blur(12px)',padding:'0.6rem 1.5rem',borderRadius:100,border:'1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontFamily:'Safiro,sans-serif',fontSize:'0.9rem',fontWeight:700,letterSpacing:'0.02em',color:'var(--white)' }}>iOS Engineer</span>
          <span style={{ width:1,height:16,background:'rgba(255,255,255,0.15)' }} />
          <RotatingText texts={ROTATING_WORDS} mainClassName="rotating-hero" staggerFrom="last" staggerDuration={0.025} rotationInterval={3000} />
        </div>

        {/* Stats bar */}
        <div style={{ display:'flex', alignItems:'center', marginTop:'2rem', animation:'fadeUp 1s 0.72s both var(--ease)' }}>
          {STATS.map(({ value, label }, i) => (
            <Fragment key={label}>
              {i > 0 && <div style={{ width:1, height:36, background:'rgba(255,255,255,0.08)', margin:'0 2rem' }} />}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.25rem' }}>
                <span style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.3rem,2.2vw,1.7rem)', fontWeight:800, color:'var(--white)', letterSpacing:'-0.025em', lineHeight:1 }}>
                  {value}
                </span>
                <span style={{ fontFamily:'Safiro,sans-serif', fontSize:'0.6rem', fontWeight:500, color:'var(--t3)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  {label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute',bottom:'2.5rem',left:0,right:0,margin:'0 auto',width:'fit-content',zIndex:10,animation:'fadeUp 1s 0.7s both var(--ease)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem' }}>
        <div className="scroll-mouse">
          <div className="scroll-mouse-dot" />
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .rotating-hero{font-family:Safiro,sans-serif;font-size:0.85rem;font-weight:400;color:var(--t2);text-transform:none;letter-spacing:0.01em}
        .hero-name{margin-top:-5.5rem}
        @media(max-width:700px){.hero-name{margin-top:-1rem}}
        .scroll-mouse{
          width:28px;height:46px;border-radius:14px;
          border:2px solid var(--accent);
          box-shadow:0 0 10px rgba(61,242,224,0.25), inset 0 0 8px rgba(61,242,224,0.06);
          position:relative;overflow:hidden;
          opacity:0.85;
        }
        .scroll-mouse:hover{opacity:1;box-shadow:0 0 16px rgba(61,242,224,0.45), inset 0 0 10px rgba(61,242,224,0.1);}
        .scroll-mouse-dot{
          position:absolute;top:7px;left:50%;
          transform:translateX(-50%);
          width:4px;height:8px;border-radius:2px;
          background:var(--accent);
          box-shadow:0 0 6px var(--accent);
          animation:scrollDot 2s ease-in-out infinite;
        }
        @keyframes scrollDot{
          0%{transform:translateX(-50%) translateY(0);opacity:1}
          60%{transform:translateX(-50%) translateY(18px);opacity:0}
          61%{transform:translateX(-50%) translateY(0);opacity:0}
          100%{transform:translateX(-50%) translateY(0);opacity:1}
        }

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
