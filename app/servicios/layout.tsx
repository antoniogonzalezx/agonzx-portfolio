import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title:       'Desarrollo de software y automatización con IA para PYMES | agonzx',
  description: 'Automatización, IA y herramientas a medida para PYMES en España. Retainer mensual con un único responsable técnico. Diagnóstico gratuito por WhatsApp.',
  alternates:  { canonical: 'https://agonzx.dev/servicios' },
  openGraph: {
    title:       'Software a medida y automatización con IA para empresas | agonzx',
    description: 'Automatización, IA y herramientas a medida para PYMES en España. Retainer mensual con un único responsable técnico. Diagnóstico gratuito por WhatsApp.',
    url:         'https://agonzx.dev/servicios',
    siteName:    'agonzx',
    locale:      'es_ES',
    type:        'website',
  },
  twitter: { card: 'summary_large_image' },
  other: { 'hreflang': 'es-ES' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'ProfessionalService',
  name:        'agonzx',
  description: 'Automatización, IA y herramientas a medida para PYMES en España.',
  url:         'https://agonzx.dev/servicios',
  telephone:   '+34711514735',
  email:       'contacto@agonzx.dev',
  areaServed:  'ES',
  priceRange:  '€€',
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

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="servicios-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
