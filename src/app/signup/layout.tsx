import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Join TradyCall today and start converting missed phone calls into booked jobs automatically.",
  alternates: {
    canonical: "/signup",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
