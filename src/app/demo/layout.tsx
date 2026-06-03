import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Schedule a live demo session with our team to see how TradyCall can automate your lead recovery and add thousands in extra revenue.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
