import type { Metadata } from "next";
import { Playfair_Display_SC, Karla } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pizzeria Loulou – Valras-Plage",
  description:
    "Pizzeria artisanale à Valras-Plage. Pâtes maison, ingrédients frais, saveurs italiennes authentiques depuis 1985.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${karla.variable} antialiased`}>
      <body className="min-h-screen bg-[#FEF2F2] text-[#450A0A]" style={{ fontFamily: "var(--font-body), Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
