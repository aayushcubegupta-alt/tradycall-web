import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Watch our interactive 3D demonstration to see how TradyCall intercepts missed calls and instantly responds via automated text messaging to qualify leads.",
  alternates: {
    canonical: "/how-it-works-3d",
  },
};

export default function HowItWorks3DLayout({ children }: { children: React.ReactNode }) {
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
        "name": "How It Works",
        "item": "https://tradycall.com/how-it-works-3d"
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
