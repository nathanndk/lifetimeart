import type { Metadata, Viewport } from "next";
import "./../styles/globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  preload: true,
  // Tambahkan bobot yang Anda pakai di proyek
  weight: ["300", "400", "600", "700"],
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
      {/* Pakai variable Manrope + jadikan default sans */}
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
