import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alix Pond | Pet Services in Anchorage",
  description: "Professional pet sitting services in Anchorage, Alaska. Offering dog walking, cat sitting, and overnight pet care with Texas warmth.",
  keywords: "pet sitting, dog walking, cat sitting, Anchorage, Alaska, pet care",
  openGraph: {
    title: "Alix Pond | Pet Services in Anchorage",
    description: "Professional pet sitting services in Anchorage, Alaska. Offering dog walking, cat sitting, and overnight pet care with Texas warmth.",
    url: "https://alixpond.com",
    siteName: "Alix Pond Pet Services",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
