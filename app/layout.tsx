import type { Metadata } from 'next';
import '@/styles/globals.css';
export const metadata: Metadata = { title:'agonz{x} - iOS Engineer', description:'Antonio González · iOS Engineer' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
