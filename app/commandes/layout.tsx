import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-commandes" });

export const metadata: Metadata = {
  title: {
    default: "Centrale Commandes",
    template: "%s | Centrale Commandes",
    absolute: "Centrale Commandes",
  },
  description: "Back-office de centralisation des commandes clients.",
  robots: { index: false, follow: false },
};

export default function CommandesRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-commandes), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
