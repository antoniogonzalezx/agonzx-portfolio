import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software y automatización para pymes | agonzx',
  description:
    'Construyo herramientas internas, automatizaciones de procesos y software a medida para pequeñas y medianas empresas en España. Digitaliza tu operativa interna sin agencias de por medio.',
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
