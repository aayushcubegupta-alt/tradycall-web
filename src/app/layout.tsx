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
    default: "TradyCall | Turn Missed Calls Into Booked Jobs",
    template: "%s | TradyCall"
  },
  description: "Never lose another lead. TradyCall automatically responds to missed calls, captures customer details, and helps Australian tradies book more jobs 24/7.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "TradyCall | Turn Missed Calls Into Booked Jobs",
    description: "Never lose another lead. TradyCall automatically responds to missed calls, captures customer details, and helps Australian tradies book more jobs 24/7.",
    url: "https://tradycall.com",
    siteName: "TradyCall",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradyCall | Turn Missed Calls Into Booked Jobs",
    description: "Never lose another lead. TradyCall automatically responds to missed calls, captures customer details, and helps Australian tradies book more jobs 24/7.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
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
