import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Privacidad — axlab',
  description: 'Cómo trata axlab tus datos. Versión corta: no los trata.',
  alternates:  { canonical: 'https://agonzx.dev/privacidad' },
  other:       { 'hreflang': 'es-ES' },
};

/* ─────────────────────────────────────────────────────────────────
 * /privacidad — política de privacidad de axlab.
 *
 * Light editorial palette (mirror of /lab tokens). Voz "tú",
 * directa, sin jerga legal infumable. Cuando exista un cliente
 * facturado se actualiza con NIF + Aviso Legal completo.
 * ───────────────────────────────────────────────────────────────── */

export default function PrivacidadPage() {
  return (
    <main
      style={{
        minHeight:    '100dvh',
        background:   '#FAFBFD',
        color:        '#4E5C84',
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
          <a
            href="https://axlab.es"
            style={{
              fontFamily:     'Nohemi, sans-serif',
              fontSize:       '0.78rem',
              fontWeight:     500,
              letterSpacing:  '-0.01em',
              textDecoration: 'none',
              color:          '#4E5C84',
            }}
          >
            ← axlab
          </a>
          <span
            style={{
              fontFamily:    'Nohemi, sans-serif',
              fontWeight:    600,
              fontSize:      '1rem',
              letterSpacing: '-0.025em',
              color:         '#23335C',
            }}
          >
            a<span style={{ color: '#4F4FFF' }}>{'{'}<span style={{ position:'relative', top:'-0.046em' }}>x</span>{'}'}</span>lab
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
            color:         '#23335C',
            margin:         0,
            marginBottom:  '0.6rem',
          }}
        >
          Privacidad.
        </h1>
        <p
          style={{
            fontFamily:    'Nohemi, sans-serif',
            fontSize:      'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight:    400,
            letterSpacing: '-0.025em',
            lineHeight:    1.2,
            color:         '#8590AB',
            margin:         0,
            marginBottom:  'clamp(2rem, 4vw, 3rem)',
          }}
        >
          Versión corta.
        </p>

        <p style={pStyle}>
          Esta web no usa cookies de seguimiento. No hay analytics, no
          hay fingerprinting, no hay píxeles de terceros. Si abres las
          herramientas de desarrollo y miras, no encontrarás nada.
        </p>

        <h2 style={h2Style}>El formulario de contacto</h2>
        <p style={pStyle}>
          Cuando me escribes por WhatsApp o por email, ese mensaje
          llega directamente a mi bandeja en{' '}
          <a href="mailto:contacto@axlab.es" style={linkStyle}>
            contacto@axlab.es
          </a>
          . Lo leo, te respondo cuando pueda, y ahí queda. No guardo
          nada en una base de datos. No comparto nada con terceros.
          Cuando cerramos un proyecto firmamos un contrato concreto y
          ahí está todo el detalle del tratamiento de datos.
        </p>

        <h2 style={h2Style}>Analytics futuros</h2>
        <p style={pStyle}>
          Si en algún momento añado métricas de uso, será con una
          herramienta sin cookies (Vercel Web Analytics o Plausible).
          Sin banners, sin diálogos de consentimiento, sin agregar tu
          comportamiento al modelo publicitario de nadie. Si esto
          cambia, esta página cambia primero.
        </p>

        <h2 style={h2Style}>Tus derechos</h2>
        <p style={pStyle}>
          Bajo el RGPD europeo puedes pedirme acceder a, rectificar o
          borrar cualquier dato tuyo que tenga. Como hoy lo único que
          tengo son los emails que me has mandado, esto suele
          significar pedirme que borre un hilo de email. Me escribes
          y lo hago.
        </p>

        <h2 style={h2Style}>Estado legal</h2>
        <p style={pStyle}>
          axlab es hoy una marca informativa. Cuando facture al primer
          cliente formalizaré la actividad como autónomo y añadiré el
          Aviso Legal con NIF y dirección fiscal completos en esta
          misma página.
        </p>

        <h2 style={h2Style}>Contacto</h2>
        <p style={pStyle}>
          Antonio González Valdepeñas ·{' '}
          <a href="mailto:contacto@axlab.es" style={linkStyle}>
            contacto@axlab.es
          </a>
        </p>

        <p
          style={{
            ...pStyle,
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            color:      '#8590AB',
            fontSize:  '0.85rem',
          }}
        >
          Última actualización: abril 2026.
        </p>
      </article>
    </main>
  );
}

const pStyle: React.CSSProperties = {
  fontSize:    '1rem',
  lineHeight: 1.65,
  color:       '#4E5C84',
  margin:      '0 0 1.4rem',
};

const h2Style: React.CSSProperties = {
  fontFamily:    'Nohemi, sans-serif',
  fontSize:      'clamp(1.05rem, 1.6vw, 1.25rem)',
  fontWeight:    600,
  letterSpacing: '-0.02em',
  color:         '#23335C',
  margin:        '2.2rem 0 0.7rem',
};

const linkStyle: React.CSSProperties = {
  color:                 '#4F4FFF',
  textDecoration:        'underline',
  textDecorationColor:   'rgba(79,79,255,0.4)',
  textUnderlineOffset:    '3px',
};
