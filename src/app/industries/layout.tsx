import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description: "Missed call recovery built specifically for trade businesses. See how we help plumbers, sparkies, lockies, HVAC technicians, and builders win more jobs.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Industries",
        "item": "https://tradycall.com/industries"
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
