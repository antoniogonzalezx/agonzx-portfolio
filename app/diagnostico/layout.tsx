import type { Metadata, Viewport } from 'next';

/* The /diagnostico route is the standalone, mobile-first variant
 * of the axlab diagnóstico wizard.  It re-uses the studio styling
 * (servicios.css imported in the page itself) and lives on the
 * agonzx.dev domain — visitors arriving from the /lab CTA on phones
 * land here for a focused full-screen flow. */
export const metadata: Metadata = {
  title:       'Diagnóstico express · axlab',
  description: 'Tres preguntas para descubrir cómo puedo ayudarte a ganar tiempo y clientes.',
};

export const viewport: Viewport = {
  themeColor:        '#FAFBFD',
  viewportFit:       'cover',
  interactiveWidget: 'resizes-content',
};

export default function DiagnosticoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
