import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:       'Privacy — agonzx',
  description: 'How agonzx.dev handles your data. The short version: it doesn\'t.',
  alternates:  { canonical: 'https://agonzx.dev/privacy' },
};

export default function PrivacyPage() {
  return (
    <main
      style={{
        minHeight:    '100dvh',
        background:   'var(--bg)',
        color:        'var(--white)',
        fontFamily:   'Safiro, sans-serif',
        padding:      'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
      }}
    >
      <article
        style={{
          maxWidth:   640,
          margin:     '0 auto',
          lineHeight: 1.65,
        }}
      >
        {/* Top — back link + brand mark */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginBottom:   'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily:     'Nohemi, sans-serif',
              fontSize:       '0.78rem',
              fontWeight:     500,
              letterSpacing:  '-0.01em',
              textDecoration: 'none',
              color:          'var(--t2)',
            }}
          >
            ← agonzx.dev
          </Link>
          <span
            style={{
              fontFamily:    'Nohemi, sans-serif',
              fontWeight:    600,
              fontSize:      '1rem',
              letterSpacing: '-0.025em',
              color:         'var(--white)',
            }}
          >
            agonz<span style={{ color: 'var(--accent)' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontSize:      'clamp(2.4rem, 5.5vw, 4rem)',
            fontWeight:    600,
            letterSpacing: '-0.04em',
            lineHeight:    0.98,
            color:         'var(--white)',
            margin:         0,
            marginBottom:  '0.6rem',
          }}
        >
          Privacy.
        </h1>
        <p
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontSize:      'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight:    400,
            letterSpacing: '-0.025em',
            lineHeight:    1.2,
            color:         'var(--t3)',
            margin:         0,
            marginBottom:  'clamp(2rem, 4vw, 3rem)',
          }}
        >
          The short version.
        </p>

        <p style={pStyle}>
          This site doesn&apos;t use tracking cookies. There are no analytics,
          no fingerprinting, no third-party pixels. Open the developer
          tools and look — there&apos;s nothing there.
        </p>

        <h2 style={h2Style}>The contact form</h2>
        <p style={pStyle}>
          When you submit the contact form, your name, email and message
          are sent directly to my inbox at{' '}
          <a href="mailto:contacto@agonzx.dev" style={linkStyle}>
            contacto@agonzx.dev
          </a>
          . I read it, reply when I can, and that&apos;s it. Nothing
          stored in a database. Nothing shared with third parties.
        </p>

        <h2 style={h2Style}>Future analytics</h2>
        <p style={pStyle}>
          If I ever add usage metrics, I&apos;ll use a cookieless tool
          (Vercel Web Analytics or Plausible). No banners, no consent
          dialogs, no aggregating your behaviour for someone else&apos;s
          ad model. If that ever changes, this page changes first.
        </p>

        <h2 style={h2Style}>Your rights</h2>
        <p style={pStyle}>
          Under EU GDPR you can ask me to access, rectify or delete any
          data I hold about you. Since I don&apos;t hold any data
          beyond the emails you&apos;ve sent me, this usually means
          asking me to delete an email thread. Email me and I&apos;ll
          do it.
        </p>

        <h2 style={h2Style}>Contact</h2>
        <p style={pStyle}>
          Antonio González Valdepeñas ·{' '}
          <a href="mailto:contacto@agonzx.dev" style={linkStyle}>
            contacto@agonzx.dev
          </a>
        </p>

        <p
          style={{
            ...pStyle,
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            color:      'var(--t3)',
            fontSize:  '0.85rem',
          }}
        >
          Last updated: April 2026.
        </p>
      </article>
    </main>
  );
}

const pStyle: React.CSSProperties = {
  fontSize:    '1rem',
  lineHeight: 1.65,
  color:       'var(--t2)',
  margin:      '0 0 1.4rem',
};

const h2Style: React.CSSProperties = {
  fontFamily:    'Nohemi, sans-serif',
  fontSize:      'clamp(1.05rem, 1.6vw, 1.25rem)',
  fontWeight:    600,
  letterSpacing: '-0.02em',
  color:         'var(--white)',
  margin:        '2.2rem 0 0.7rem',
};

const linkStyle: React.CSSProperties = {
  color:                 'var(--accent)',
  textDecoration:        'underline',
  textDecorationColor:   'rgba(107,107,255,0.4)',
  textUnderlineOffset:    '3px',
};
