'use client';
import { useState } from 'react';
import { SITE } from './data';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const send = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: 14,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--white)', fontFamily: 'Safiro,sans-serif', fontSize: '0.88rem', outline: 'none',
    backdropFilter: 'blur(10px)',
  };

  const links = [
    { label: 'LinkedIn', href: SITE.linkedin, d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { label: 'GitHub', href: SITE.github, d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  ];

  return (
    <section id="contact" className="sec-pad snap-section" style={{ background: 'var(--bg)', padding: '8rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginTop: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Nohemi,sans-serif', fontSize: 'clamp(2.5rem,5.5vw,4.5rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>LET'S <span style={{ color: 'var(--accent)' }}>CONNECT</span></h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--t2)', marginTop: '1.5rem' }}>Feel free to drop a message — I'm always open to interesting projects and new connections.</p>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
              {links.map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '0.85rem', fontWeight: 600, color: 'var(--white)', padding: '0.85rem 1.2rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: '0.6rem', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.04)', transition: 'background 0.2s ease, border-color 0.2s ease', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                  <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: 'var(--accent)', flexShrink: 0 }}><path d={l.d} /></svg>
                  {l.label}
                  <span style={{ marginLeft: 'auto', color: 'var(--t2)', fontSize: '1rem', fontWeight: 700, fontFamily: 'Nohemi,sans-serif' }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(11,15,20,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 30, padding: '2rem', backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', boxShadow: '0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)' }}>Message sent!</p>
                <p style={{ color: 'var(--t2)', fontSize: '0.85rem', marginTop: '0.5rem' }}>I'll get back to you soon.</p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }} style={{ marginTop: '1.5rem', background: 'none', border: '1px solid var(--brd)', color: 'var(--t2)', padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                  Send another
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inp} />
                <input type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inp} />
                <textarea placeholder="What is on your mind?" value={form.message} rows={4} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inp, resize: 'vertical' as const, minHeight: 100 }} />
                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ff6b6b' }}>Something went wrong. Please try again.</p>
                )}
                <button
                  onClick={send}
                  disabled={status === 'loading'}
                  style={{ fontFamily: 'Nohemi,sans-serif', fontSize: '0.92rem', fontWeight: 700, padding: '0.9rem 2rem', borderRadius: 100, border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', background: 'var(--accent)', color: '#000', boxShadow: '0 4px 20px rgba(61,242,224,0.25)', opacity: status === 'loading' ? 0.7 : 1 }}
                >
                  {status === 'loading' ? 'Sending...' : 'Send message →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
