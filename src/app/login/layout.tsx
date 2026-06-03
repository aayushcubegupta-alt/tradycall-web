import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Access your TradyCall dashboard to manage leads, view call history, and adjust your AI receptionist settings.",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
