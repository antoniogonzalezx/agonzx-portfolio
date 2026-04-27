import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';

/* Detect whether the request hit axlab.es directly (Vercel rewrite) or
 * the legacy agonzx.dev/lab path so canonical / OG URL match the host
 * the visitor actually sees. axlab.es is the future-canonical home of
 * the studio brand. */
function resolveOrigin(): { origin: string; canonical: string } {
  const host = headers().get('host') ?? 'agonzx.dev';
  const isAxlab = host.includes('axlab.es');
  if (isAxlab) {
    return { origin: 'https://axlab.es', canonical: 'https://axlab.es' };
  }
  return { origin: 'https://agonzx.dev', canonical: 'https://agonzx.dev/lab' };
}

export async function generateMetadata(): Promise<Metadata> {
  const { canonical } = resolveOrigin();
  return {
    title:       'Software a medida y automatización con IA para PYMES | axlab',
    description: 'Automatización, IA y herramientas a medida para PYMES en España. Un único responsable técnico. Cada proyecto se presupuesta a medida.',
    alternates:  { canonical },
    openGraph: {
      title:       'Software a medida y automatización con IA para empresas | axlab',
      description: 'Automatización, IA y herramientas a medida para PYMES en España. Un único responsable técnico. Cada proyecto se presupuesta a medida.',
      url:         canonical,
      siteName:    'axlab',
      locale:      'es_ES',
      type:        'website',
    },
    twitter: { card: 'summary_large_image' },
    other: { 'hreflang': 'es-ES' },
  };
}

function buildJsonLd(canonical: string) {
  return {
    '@context': 'https://schema.org',
    '@type':    'ProfessionalService',
    name:        'axlab',
    description: 'Automatización, IA y herramientas a medida para PYMES en España.',
    url:         canonical,
    telephone:   '+34711514735',
    email:       'contacto@axlab.es',
    areaServed:  'ES',
    founder: {
      '@type': 'Person',
      name:    'Antonio González',
      jobTitle:'Senior iOS Engineer',
    },
    sameAs: [
      'https://instagram.com/agonzx',
      'https://www.linkedin.com/in/antoniogonzalezvaldepenas',
      'https://github.com/antoniogonzalezx',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'Servicios de software',
      itemListElement: [
        {
          '@type':       'Offer',
          itemOffered: { '@type':'Service', name:'Automatización interna', description:'Fichaje digital y procesos internos conformes al RD 8/2019 y Kit Digital.' },
        },
        {
          '@type':       'Offer',
          itemOffered: { '@type':'Service', name:'Atención al cliente con IA', description:'Chatbot propio integrado en web o WhatsApp Business para gestión de citas y precualificación.' },
        },
        {
          '@type':       'Offer',
          itemOffered: { '@type':'Service', name:'Herramientas a medida', description:'Digitalización de procesos manuales específicos del sector.' },
        },
      ],
    },
  };
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const { canonical } = resolveOrigin();
  const jsonLd = buildJsonLd(canonical);
  return (
    <>
      <Script
        id="lab-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
