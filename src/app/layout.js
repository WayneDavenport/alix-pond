import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alix Pond | Pet Services Fairbanks",
  description: "Professional pet sitting services in Fairbanks, Alaska. Offering dog walking, cat sitting, and overnight pet care with Texas warmth.",
  keywords: "pet sitting, dog walking, cat sitting, Fairbanks, Alaska, pet care",
  openGraph: {
    title: "Alix Pond | Pet Services in Fairbanks",
    description: "Professional pet sitting services in Fairbanks, Alaska. Offering dog walking, cat sitting, and overnight pet care.",
    url: "https://alixpond.netlify.app",
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
