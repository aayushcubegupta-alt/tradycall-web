import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore TradyCall features: instant text-backs, AI lead qualification, CRM integrations, and 24/7 missed-call recovery tailored for tradies.",
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
