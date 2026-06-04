import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Watch our interactive 3D demonstration to see how TradyCall intercepts missed calls and instantly responds via automated text messaging to qualify leads.",
  alternates: {
    canonical: "/how-it-works-3d",
  },
};

export default function HowItWorks3DLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
