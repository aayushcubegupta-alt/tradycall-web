import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Confirmed",
  description: "Thank you for scheduling your demo. We look forward to showing you how TradyCall can unlock hidden revenue from missed jobs.",
  alternates: {
    canonical: "/demo-confirmed",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DemoConfirmedLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Demo Confirmed",
        "item": "https://tradycall.com/demo-confirmed"
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
