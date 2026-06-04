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

export default function Home() {
  return (
    <>
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
