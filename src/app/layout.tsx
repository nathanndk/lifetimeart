import type { Metadata, Viewport } from "next";
import "./../styles/globals.css";
import { Inter } from "next/font/google";
// import { SiteHeader } from "@/components/layout/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lifetimeart.example.com"),
  title: "LifetimeArt — Creative Studio Landing",
  description:
    "A pixel-perfect landing page boilerplate powered by Next.js, TailwindCSS, and shadcn/ui.",
  openGraph: {
    title: "LifetimeArt",
    description: "Pixel-perfect landing template.",
    url: "https://lifetimeart.example.com",
    siteName: "LifetimeArt",
    images: [
      { url: "/images/hero.jpg", width: 1200, height: 630, alt: "LifetimeArt" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifetimeArt",
    description: "Pixel-perfect landing template.",
    images: ["/images/hero.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {/* <SiteHeader /> */}
        {children}
      </body>
    </html>
  );
}
