import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your TradyCall dashboard to manage leads, view call history, and adjust your AI receptionist settings.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Login",
        "item": "https://tradycall.com/login"
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
