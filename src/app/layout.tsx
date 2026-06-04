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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TradyCall",
  "url": "https://tradycall.com",
  "logo": "https://tradycall.com/tradycall_logo_v2.png",
  "sameAs": [
    "https://www.linkedin.com/company/tradycall"
  ]
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TradyCall",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "AI-powered missed call recovery platform for Australian trades businesses.",
  "url": "https://tradycall.com",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "AUD",
    "lowPrice": "199",
    "highPrice": "499",
    "offerCount": "3",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter Plan",
        "price": "199",
        "priceCurrency": "AUD",
        "url": "https://tradycall.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Growth Plan",
        "price": "249",
        "priceCurrency": "AUD",
        "url": "https://tradycall.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "499",
        "priceCurrency": "AUD",
        "url": "https://tradycall.com/pricing"
      }
    ]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TradyCall",
  "url": "https://tradycall.com"
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
      <head>
        <link rel="preload" href="/marketing_poster.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body">{children}</body>
      <GoogleAnalytics gaId="G-MPPKFG8MQ3" />
    </html>
  );
}
