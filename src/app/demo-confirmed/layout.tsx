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
  return <>{children}</>;
}
