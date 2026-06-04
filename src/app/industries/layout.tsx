import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description: "Missed call recovery built specifically for trade businesses. See how we help plumbers, sparkies, lockies, HVAC technicians, and builders win more jobs.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
