import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Got questions about TradyCall's AI receptionist? Find answers about setup, pricing, phone numbers, and how SMS recovery works for your trade business.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
