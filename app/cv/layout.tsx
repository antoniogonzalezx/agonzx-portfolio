import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Antonio González Valdepeñas — Senior iOS Engineer · CV',
  description: 'Senior iOS engineer shipping product apps to millions of users. Six years across consumer apps, jobs marketplaces and video SDKs.',
  alternates:  { canonical: 'https://agonzx.dev/cv' },
  openGraph: {
    title:       'Antonio González Valdepeñas — Senior iOS Engineer · CV',
    description: 'Senior iOS engineer shipping product apps to millions of users.',
    url:         'https://agonzx.dev/cv',
    siteName:    'agonzx',
    type:        'profile',
  },
  twitter: { card: 'summary' },
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return children;
}
