import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/context/ToastProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://armorik-diagnostics.fr"),
  title: "Armorik Diagnostics – Diagnostiqueur immobilier dans le Trégor",
  description: "Armorik Diagnostics : diagnostiqueur immobilier basé à Louannec, intervenant à Lannion, Perros-Guirec et sur tout le Trégor. Rapide, fiable et certifié.",
  keywords: "Louannec - 22700, diagnostic immobilier, amiante, gaz, expertise plomb, électricité, loi Carrez, termites, perfomance énergétique, dpe, loi Robien, risques naturels, tarifs, devis, contrôle amiante, expertises, diagnostiqueur, recherche, préfecture, plan des risques, liste commune",
  openGraph: {
    title: "Armorik Diagnostics - Expert en diagnostics immobiliers",
    description: "Découvrez nos services de diagnostics immobiliers obligatoires et certifié. Contactez-nous pour un devis rapide.",
    url: "https://armorik-diagnostics.fr",
    siteName: "Armorik Diagnostics",
    images: [
      {
        url: "/assets/img/logo1.png",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="shortcut icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Armorik Diagnostics",
              "image": "/assets/img/logo1.png",
              "url": "https://armorik-diagnostics.fr",
              "telephone": "02 96 13 27 79",
              "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "4 Route de Tréguier",
                  "addressLocality": "Louannec",
                  "postalCode": "22700",
                  "addressCountry": "FR"
              },
              "areaServed": [
                  { "@type": "City", "name": "Louannec" },
                  { "@type": "City", "name": "Lannion" },
                  { "@type": "City", "name": "Perros-Guirec" },
                  { "@type": "City", "name": "Trébeurden" },
                  { "@type": "City", "name": "Trégastel" },
                  { "@type": "City", "name": "Tonquédec" },
                  { "@type": "City", "name": "Cavan" },
                  { "@type": "City", "name": "Rospez" },
                  { "@type": "City", "name": "Quemperven" },
                  { "@type": "City", "name": "Lanvellec" },
                  { "@type": "City", "name": "Locquirec" },
                  { "@type": "City", "name": "Pleumeur-Bodou" },
                  { "@type": "City", "name": "Pleubian" },
                  { "@type": "City", "name": "Pleudaniel" },
                  { "@type": "City", "name": "Ploulec'h" },
                  { "@type": "City", "name": "Saint-Quay-Perros" },
                  { "@type": "City", "name": "Penvénan" },
                  { "@type": "City", "name": "Trélévern" },
                  { "@type": "City", "name": "Bégard" },
                  { "@type": "City", "name": "Plestin-les-Grèves" },
                  { "@type": "City", "name": "Ploumilliau" },
                  { "@type": "City", "name": "Morlaix" },
                  { "@type": "Place", "name": "Trégor" }
              ]
            })
          }}
        />
      </head>
      <body className={roboto.className}>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
