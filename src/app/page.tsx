import React from "react";
import Navbar from "@/components/Navbar";
import HeroWrapper from "@/components/HeroWrapper";
import BackgroundVideo from "@/components/BackgroundVideo";
import Trust from "@/components/Trust";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TrustFeatureBar from "@/components/TrustFeatureBar";
import Pricing from "@/components/Pricing";
import RevenueCalculator from "@/components/RevenueCalculator";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BannerCTA from "@/components/BannerCTA";
import Footer from "@/components/Footer";

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is TradyCall?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TradyCall is an AI-powered receptionist built specifically for Australian tradies. It detects missed calls and instantly sends a professional, personalized SMS to secure the lead before they call a competitor."
      }
    },
    {
      "@type": "Question",
      "name": "How does the SMS auto-reply work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Within seconds of a missed call, TradyCall sends a customized text message asking the customer about their job requirements. The AI holds a smart, friendly conversation to qualify their request and capture key details."
      }
    },
    {
      "@type": "Question",
      "name": "Can I connect it to my existing CRM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! TradyCall integrates with popular trade management platforms like Jobber, ServiceM8, ServiceTitan, and standard CRM tools via webhooks or exports."
      }
    },
    {
      "@type": "Question",
      "name": "Can I keep my existing phone number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You don't need to change your number. We set up simple conditional call forwarding so that when you're busy, on a job, or call-waiting, TradyCall catches the missed call instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a setup fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The one-off setup fee covers custom AI message training, conditional forwarding configuration, integration testing, and hands-on onboarding support to guarantee 100% reliability."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      {/* Premium Header Navigation */}
      <Navbar />

      {/* Main content sections */}
      <main className="flex-grow">
        {/* ─── HERO with video background ─── */}
        <section className="relative min-h-screen overflow-hidden bg-[#FAF9F6] dark:bg-[#081225]">

          {/* 1. Video layer with Unmute Button */}
          <BackgroundVideo />

          {/* 2. Cinematic dark overlay + subtle blur for premium readability */}
          <div className="absolute inset-0 pointer-events-none" style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0, black 128px)', maskImage: 'linear-gradient(to top, transparent 0, black 128px)' }}>
            <div className="absolute inset-0 bg-[#081225]/70 backdrop-blur-[2px] pointer-events-none" />
            
            {/* 3. Vignette edges — adds depth */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
          </div>

          {/* 5. Hero content on top */}
          <div className="relative z-10">
            <HeroWrapper />
          </div>
        </section>

        {/* Rest of page sections */}
        <Trust />
        <HowItWorks />
        <Features />
        <TrustFeatureBar />
        <Pricing />
        <RevenueCalculator />
        <Testimonials />
        <FAQ />
        <BannerCTA />
      </main>

      {/* Comprehensive Site Footer */}
      <Footer />
    </>
  );
}
