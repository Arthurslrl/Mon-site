import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Flow – Work at the speed of thought',
  description: 'The productivity platform that keeps your team in flow. Smart inbox, focus mode, and real-time collaboration — all in one place.',
};

export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${jakarta.variable}`}
      style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
