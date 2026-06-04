import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Schedule a live demo session with our team to see how TradyCall can automate your lead recovery and add thousands in extra revenue.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Book a Demo",
        "item": "https://tradycall.com/demo"
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
