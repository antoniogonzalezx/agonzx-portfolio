'use client';
import { SITE } from './data';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width:14, height:14, fill:'currentColor' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const PhotoCard = ({ size = 'desktop' }: { size?: 'desktop' | 'mobile' }) => (
  <div
    className="about-photo-card"
    style={{
      borderRadius: 28,
      overflow: 'hidden',
      position: 'relative',
      width: size === 'mobile' ? 'min(300px, 82vw)' : undefined,
      aspectRatio: size === 'mobile' ? '3/4' : '3/4',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
    }}
  >
    <img src="/profile.jpg" alt="Antonio González" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(0.75)' }} />
    {/* Name at top */}
    <div style={{ position:'absolute', top:0, left:0, right:0, padding:'1.5rem', background:'linear-gradient(rgba(11,15,20,0.7), transparent)' }}>
      <h3 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'1.3rem', fontWeight:800, textTransform:'uppercase' }}>
        Antonio <span style={{ color:'var(--accent)' }}>González</span>
      </h3>
      <p style={{ fontFamily:'Nohemi,sans-serif', fontSize:'0.7rem', fontWeight:500, color:'var(--t2)', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:'0.15rem' }}>iOS Engineer</p>
    </div>
    {/* Instagram pill */}
    <div style={{ position:'absolute', bottom:'0.8rem', left:'0.8rem', right:'0.8rem' }}>
      <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:'0.4rem',
        fontFamily:'Nohemi,sans-serif', fontSize:'0.75rem', fontWeight:600, color:'var(--white)',
        padding:'0.7rem', borderRadius:20,
        background:'rgba(255,255,255,0.08)', backdropFilter:'blur(20px)',
        border:'1px solid rgba(255,255,255,0.12)',
      }}>
        <InstagramIcon />
        @antoniogonzx
      </a>
    </div>
  </div>
);

const AboutText = () => (
  <div className="about-text" style={{ fontSize:'1rem', lineHeight:1.8, color:'var(--t2)' }}>
    <h3 style={{ fontFamily:'Nohemi,sans-serif', fontSize:'clamp(1.6rem,3.5vw,2.5rem)', fontWeight:800, textTransform:'uppercase', lineHeight:1.15, marginBottom:'2rem', color:'var(--white)' }}>
      Hey, I'm Antonio —<br />I like to <span style={{ color:'var(--accent)' }}>build things.</span>
    </h3>
    <p style={{ marginBottom:'1.3rem' }}>iOS engineer with a thing for clean architecture, Swift concurrency, and products that actually make sense. I don't just write code — I care about what I'm building and why.</p>
    <p style={{ marginBottom:'1.3rem' }}>At XING I owned the job application flow end-to-end — the core revenue driver of a 20M+ user jobs marketplace, serving both candidates and recruiters. Close collaboration with product and design wasn't just part of the job, it was how I liked to work: shaping decisions, running A/B tests, and pushing <strong style={{ color:'var(--white)', fontWeight:600 }}>120%</strong> improvement in apply rates while taking test coverage above <strong style={{ color:'var(--white)', fontWeight:600 }}>90%</strong>.</p>
    <p style={{ marginBottom:'1.3rem' }}>Now at UserTesting I own the B2C iOS experience — building the tests participants run on their devices, setting up the component infrastructure, and taking the product from decisions to App Store. Same mindset: engineer who thinks like a PM.</p>
    <p>On the side I've gone deep on <strong style={{ color:'var(--accent)', fontWeight:600 }}>agentic programming</strong> — building workflows with Claude Code and OpenAI Codex that have fundamentally changed how I ship. Tooling that automates the boring parts so the interesting parts get more attention.</p>
  </div>
);

export default function About() {
  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .about-text h3 { font-size: 1.4rem !important; margin-bottom: 1.2rem !important; }
          .about-text p  { font-size: 0.82rem !important; line-height: 1.7 !important; }
        }
      `}</style>
      {/* ── Desktop: single snap section (hidden on mobile via CSS) ─────── */}
      <section
        id="about"
        className="about-desktop sec-pad snap-section"
        style={{ background:'var(--bg)', display:'flex', flexDirection:'column', justifyContent:'center' }}
      >
        <div
          className="about-grid"
          style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:'4rem', alignItems:'start' }}
        >
          <PhotoCard size="desktop" />
          <AboutText />
        </div>
      </section>

      {/* ── Mobile step 1: big profile card (hidden on desktop via CSS) ─── */}
      <section
        data-nav-id="about"
        className="about-mobile-1 snap-section"
        style={{ background:'var(--bg)', alignItems:'center', justifyContent:'center' }}
      >
        <PhotoCard size="mobile" />
      </section>

      {/* ── Mobile step 2: about text (hidden on desktop via CSS) ────────── */}
      <section
        className="about-mobile-2 snap-section"
        style={{ background:'var(--bg)', flexDirection:'column', justifyContent:'center', padding:'2.5rem 1.5rem' }}
      >
        <AboutText />
      </section>
    </>
  );
}
