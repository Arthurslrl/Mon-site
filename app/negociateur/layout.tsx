import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-negociateur" });

export const metadata: Metadata = {
  title: {
    default: "Négociateur d'abonnements",
    template: "%s | Négociateur d'abonnements",
    absolute: "Négociateur d'abonnements",
  },
  description: "Suivi de tes abonnements et négociation automatisée (démo).",
  robots: { index: false, follow: false },
};

export default function NegociateurRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-negociateur), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
