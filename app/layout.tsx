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

const siteUrl = "https://pizza-sergio-valras.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pizza Sergio – Pizzas livrées à Valras-Plage",
    template: "%s | Pizza Sergio Valras-Plage",
  },
  description:
    "Pizza Sergio à Valras-Plage – Pizzas artisanales à pâte fine et croustillante, ingrédients frais du jour. Livraison soir toute l'année, midi et soir en juillet-août. 5/5 sur TripAdvisor. Commandez au 04 67 32 32 64.",
  keywords: [
    "pizza Sergio Valras-Plage",
    "livraison pizza Valras",
    "pizza à emporter Valras-Plage",
    "pizzeria Valras Hérault",
    "pizza jardins de Sérignan",
    "pizza artisanale Valras",
    "meilleure pizza Valras",
    "pizza 34350",
    "livraison pizza Sérignan",
    "pizza pâte fine Valras",
  ],
  authors: [{ name: "Pizza Sergio" }],
  creator: "Pizza Sergio",
  publisher: "Pizza Sergio",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Pizza Sergio",
    title: "Pizza Sergio – Pizzas artisanales livrées à Valras-Plage",
    description:
      "Pâte fine et croustillante, ingrédients frais chaque jour. Livraison à Valras-Plage et jardins de Sérignan. Note 5/5 sur TripAdvisor.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Sergio – Valras-Plage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Sergio – Pizzas livrées à Valras-Plage",
    description: "Pâte fine croustillante, ingrédients frais. Livraison soir toute l'année. 5/5 TripAdvisor.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Pizza Sergio",
  description: "Pizzas artisanales à pâte fine et croustillante, ingrédients frais du jour. Livraison à Valras-Plage et jardins de Sérignan.",
  url: siteUrl,
  telephone: "+33467323264",
  servesCuisine: ["Italian", "Pizza"],
  priceRange: "€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Boulevard Gambetta",
    addressLocality: "Valras-Plage",
    postalCode: "34350",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 43.2395, longitude: 3.2921 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "11:00", closes: "13:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "18:00", closes: "21:00" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "30",
  },
  sameAs: ["https://www.facebook.com/PIZZA-Sergio-737785756303587"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${karla.variable} antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body
        className="min-h-screen bg-[#FFFBF5] text-[#1C0800]"
        style={{ fontFamily: "var(--font-body), Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
