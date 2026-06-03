import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tradycall.com"),
  title: {
    default: "TradyCall | Turn Missed Calls Into Booked Jobs | AI Receptionist for Tradies",
    template: "%s | TradyCall"
  },
  description: "TradyCall is your AI receptionist that texts missed callers instantly, captures leads, and helps you win more jobs 24/7. Trusted by Sparkies, Plumbers, and Aussie tradies.",
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
      <GoogleAnalytics gaId="G-MPPKFG8MQ3" />
    </html>
  );
}
