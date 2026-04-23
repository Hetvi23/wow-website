import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workshop on Wheels | Your Car Our Care Anytime Anywhere",
  description:
    "WOW - Workshop on Wheels is an innovative mobile car repair and maintenance service. Expert automotive solutions delivered directly to your doorstep, 24/7.",
  keywords: "mobile car repair, doorstep car service, WOW workshop, car maintenance, roadside assistance",
  openGraph: {
    title: "Workshop on Wheels | Mobile Car Care",
    description: "Professional mobile car repair & maintenance at your doorstep. Anytime. Anywhere.",
    url: "https://www.drivewithwow.com",
    siteName: "Workshop on Wheels",
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
      <body className={plusJakarta.className}>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
    </html>
  );
}
