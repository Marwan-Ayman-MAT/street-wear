import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "STREET WEAR | Premium Streetwear Clothing",
    template: "%s | STREET WEAR"
  },
  description:
    "Premium streetwear designed for everyday confidence. Shop hoodies, cargos, tees, outerwear, and modern luxury essentials.",
  keywords: [
    "streetwear",
    "premium clothing",
    "hoodies",
    "cargo trousers",
    "oversized tees",
    "urban fashion"
  ],
  openGraph: {
    title: "STREET WEAR",
    description: "Premium Streetwear Designed For Everyday Confidence",
    url: "/",
    siteName: "STREET WEAR",
    images: [
      {
        url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 1067,
        alt: "STREET WEAR premium streetwear editorial"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "STREET WEAR",
    description: "Premium Streetwear Designed For Everyday Confidence"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${archivo.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}