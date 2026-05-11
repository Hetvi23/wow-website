import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auto Avengers | Premium Mobile Automotive Care",
  description:
    "Auto Avengers is an innovative mobile car repair and maintenance service. Expert automotive solutions delivered directly to your doorstep, 24/7.",
  keywords: "Auto Avengers, mobile car repair, doorstep car service, car maintenance, roadside assistance",
  openGraph: {
    title: "Auto Avengers | Mobile Car Care",
    description: "Professional mobile car repair & maintenance at your doorstep. Anytime. Anywhere.",
    url: "https://www.autoavengers.com",
    siteName: "Auto Avengers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
    </html>
  );
}
