import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Canyon Squad – Runner',
  description:
    'Traverse le canyon, multiplie ton escouade aux portails x2, anéantis les ennemis et abats le scorpion doré.',
};

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${orbitron.variable} min-h-screen bg-black`}
      style={{ fontFamily: 'var(--font-orbitron), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
