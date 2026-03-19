import type { Metadata } from 'next';
import '@/styles/globals.css';
export const metadata: Metadata = { title:'AGONZ[X] — iOS Engineer', description:'Antonio González · iOS Engineer · Code Vibing' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
