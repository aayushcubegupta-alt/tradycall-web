import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore TradyCall features: instant text-backs, AI lead qualification, CRM integrations, and 24/7 missed-call recovery tailored for tradies.",
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tradycall.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Features",
        "item": "https://tradycall.com/features"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
