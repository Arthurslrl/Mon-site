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

const siteUrl = "https://pizzeria-loulou.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pizzeria Loulou – Pizza artisanale à Valras-Plage",
    template: "%s | Pizzeria Loulou Valras-Plage",
  },
  description:
    "Pizzeria artisanale à Valras-Plage depuis 1985. Pâtes maison, four à bois, ingrédients frais du terroir héraultais. Note 4.5/5 sur 382 avis. Réservation au 04 67 XX XX XX.",
  keywords: [
    "pizzeria Valras-Plage",
    "pizza Valras",
    "restaurant pizzeria Hérault",
    "pizza four à bois Valras-Plage",
    "pizza artisanale Valras",
    "meilleure pizza Valras-Plage",
    "pizzeria Loulou",
    "restaurant italien Valras-Plage",
    "pizza à emporter Valras",
    "pizzeria 34350",
  ],
  authors: [{ name: "Pizzeria Loulou" }],
  creator: "Pizzeria Loulou",
  publisher: "Pizzeria Loulou",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Pizzeria Loulou",
    title: "Pizzeria Loulou – Pizza artisanale à Valras-Plage depuis 1985",
    description:
      "L'authenticité italienne au bord de la Méditerranée. Four à bois, pâtes maison, ingrédients frais. 4.5/5 sur 382 avis Google.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pizzeria Loulou – Pizza artisanale four à bois à Valras-Plage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizzeria Loulou – Pizza artisanale à Valras-Plage",
    description:
      "L'authenticité italienne au bord de la Méditerranée. Four à bois, pâtes maison, 4.5/5 sur Google.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-token",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Pizzeria Loulou",
  image: `${siteUrl}/og-image.jpg`,
  description:
    "Pizzeria artisanale à Valras-Plage depuis 1985. Four à bois, pâtes maison, ingrédients frais du terroir.",
  url: siteUrl,
  telephone: "+33467000000",
  servesCuisine: ["Italian", "Pizza"],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "35 Avenue Charles Cauquil",
    addressLocality: "Valras-Plage",
    postalCode: "34350",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.2389,
    longitude: 3.2903,
  },
  hasMap: "https://maps.google.com/?q=35+Avenue+Charles+Cauquil+Valras-Plage",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "11:30",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "18:30",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "11:30",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "18:30",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "11:30",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "11:30",
      closes: "22:30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "382",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      author: { "@type": "Person", name: "Marie T." },
      reviewBody:
        "Excellente pâte (sûrement de la farine 00), ingrédients de qualité, cuisson parfaite. Vraiment dans le style italien authentique.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      author: { "@type": "Person", name: "Laurent B." },
      reviewBody:
        "Toujours ravis à chaque passage. Les pizzas sont top, service rapide et le personnel très sympathique.",
    },
  ],
  menu: `${siteUrl}/#menu`,
  acceptsReservations: "True",
  foundingDate: "1985",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${karla.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-[#FEF2F2] text-[#450A0A]"
        style={{ fontFamily: "var(--font-body), Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
