"use client";

import { supabase } from "@/lib/supabase";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  ArrowRight,
  Shield,
  Lock,
  ChevronLeft,
  Zap,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export default function BookDemoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Form Fields State
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [missedCalls, setMissedCalls] = useState("");
  const [staffCount, setStaffCount] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com" || e.origin.endsWith("calendly.com")) {
        if (e.data && e.data.event === "calendly.event_scheduled") {
          console.log("Calendly schedule confirmed. Redirecting...");
          router.push("/demo-confirmed");
        }
      }
    };
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [router]);

  // Prefill details if user is already authenticated
  useEffect(() => {
    const prefillUserSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (user.email) setEmailAddress(user.email);
          if (user.user_metadata?.full_name) setFullName(user.user_metadata.full_name);
          if (user.user_metadata?.business_name) setBusinessName(user.user_metadata.business_name);

          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

          if (profile) {
            if (profile.full_name) setFullName(profile.full_name);
            if (profile.business_name) setBusinessName(profile.business_name);
            if (profile.email) setEmailAddress(profile.email);
            if (profile.phone) setPhoneNumber(profile.phone);
          }
        }
      } catch (err) {
        console.error("Error prefilling user session:", err);
      }
    };
    prefillUserSession();
  }, []);

  const saveLead = async () => {
    const { error } = await supabase
      .from("demo_requests")
      .insert([
        {
          full_name: fullName,
          business_name: businessName,
          phone: phoneNumber,
          email: emailAddress,
          trade_type: tradeType,
          missed_calls_per_week: missedCalls,
          team_size: staffCount,
          notes: additionalInfo,
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      return false;
    }

    return true;
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fullName ||
      !businessName ||
      !phoneNumber ||
      !emailAddress ||
      !tradeType ||
      !missedCalls ||
      !staffCount
    ) {
      alert("Please fill out all required fields marked with *");
      return;
    }

    setIsSavingLead(true);
    const success = await saveLead();
    setIsSavingLead(false);

    if (success) {
      setStep(2);
    } else {
      alert("Failed to save booking request. Please check your connection and try again.");
    }
  };

  // 6 unique demo-page-only testimonials (different from homepage)
  const demoReviews = [
    {
      name: "Jarred T.",
      trade: "JT Electrical Services",
      location: "Melbourne, VIC",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "TradyCall got me out of a massive hole. I was working on a switchboard upgrade, missed a call, and the auto-reply secured a $680 safety switch installation before I even packed up my tools.",
      stars: 5
    },
    {
      name: "Nate M.",
      trade: "Nate M. Plumbing",
      location: "Brisbane, QLD",
      avatar: "https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "Insane ROI. We had 4 leads recovered in our first week alone. The Aussie-based routing is super quick and the text templates sound 100% professional and local.",
      stars: 5
    },
    {
      name: "Cooper B.",
      trade: "True Blue Air & Electrical",
      location: "Sydney, NSW",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "We've tried other automated booking systems, but they all felt too bot-like. TradyCall is organic, responsive, and handles after-hours emergency calls perfectly.",
      stars: 5
    },
    {
      name: "Mitch S.",
      trade: "MS Carpentry",
      location: "Perth, WA",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "I'm always on the roof or cutting timber. Answering calls is impossible. Having this intercept missed calls and reply in 5 seconds flat has saved my sanity and grew my pipeline by 30%.",
      stars: 5
    },
    {
      name: "Belinda R.",
      trade: "BR Roofing & Guttering",
      location: "Adelaide, SA",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "Our clients love the quick SMS. They tell us they booked with us just because we replied instantly while other local roofers took two days to get back to them.",
      stars: 5
    },
    {
      name: "Alex G.",
      trade: "Elite Painting Services",
      location: "Gold Coast, QLD",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "Setup was a breeze. Aussie team configured conditional forwarding on our landline and set up custom templates. Best business decision we've made this year.",
      stars: 5
    }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow">

        {/* ─── HERO SECTION ─── */}
        <section className="relative bg-[#081225] text-white min-h-[75vh] sm:min-h-[90vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 pb-24 sm:pb-32 overflow-hidden">

          {/* Dotted Grid Overlay */}
          <div className="absolute inset-0 dot-grid opacity-[0.16] pointer-events-none z-0" />

          {/* Ambient Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[110px] pointer-events-none z-0" />

          {/* Desktop Cover Image — right side, fades in from left */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-[62%] pointer-events-none z-0">
            <Image
              src="/demo_page_top_image.png"
              alt="Demo background"
              fill
              sizes="62vw"
              className="object-cover object-right"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 260px, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 260px, black 100%)'
              }}
              priority
            />
          </div>

          {/* Mobile Backdrop Image */}
          <div className="block md:hidden absolute inset-0 pointer-events-none z-0 opacity-30">
            <Image
              src="/demo_page_top_image.png"
              alt="Demo background"
              fill
              sizes="100vw"
              className="object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 260px, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 260px, black 100%)'
              }}
              priority
            />
          </div>

          {/* Blurry Frosted White Gradient — bottom transition */}
          <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/40 to-transparent pointer-events-none z-20 backdrop-blur-[2px]" />

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full">
            <div className="max-w-2xl space-y-7">

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-[64px] font-black tracking-tight-heading leading-[1.06]"
              >
                See How TradyCall Recovers Missed Calls &amp; Turns Them Into{" "}
                <span className="text-yellow-accent">Booked Jobs.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22 }}
                className="text-slate-300 text-base sm:text-lg font-semibold leading-relaxed max-w-xl"
              >
                Book a free 15-minute demo and see how our AI instantly replies to missed calls, captures leads and fills your calendar.
              </motion.p>

              {/* CTA Button — scrolls to booking form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34 }}
              >
                <a href="#booking" className="block sm:inline-block">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center gap-2.5 font-black text-base px-8 py-4 shadow-xl shadow-yellow-accent/15 hover:shadow-yellow-accent/30 transition-shadow">
                    <span>Book Your Free Demo</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── BOOKING FORM SECTION (Below the Fold) ─── */}
        <section id="booking" className="relative bg-[#FAF9F6] py-28">
          <div className="absolute inset-0 dot-grid-dark opacity-[0.05] pointer-events-none z-0" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Section Heading */}
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50/80 border border-blue-100/50 px-3.5 py-1.5 rounded-full inline-block shadow-sm mb-4">
                Secure Your Spot
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-base tracking-tight-heading">
                Book your free demo
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed mt-3">
                Choose a time that works for you. Our Australian setup experts will walk you through the system and configure it for your trade.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0b1f4d] border border-white/10 rounded-[32px] shadow-2xl p-6 sm:p-10 relative text-white"
            >

              {/* Step Tracker */}
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-md ${step >= 1 ? "bg-blue-600 text-white" : "bg-white/10 text-slate-400"}`}>
                    1
                  </div>
                  <span className={`text-xs font-black uppercase tracking-wider ${step >= 1 ? "text-white" : "text-slate-400"}`}>
                    Your Details
                  </span>
                </div>
                <div className="w-8 border-t-2 border-dashed border-white/10" />
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-md ${step >= 2 ? "bg-blue-600 text-white" : "bg-white/10 text-slate-400"}`}>
                    2
                  </div>
                  <span className={`text-xs font-black uppercase tracking-wider ${step >= 2 ? "text-white" : "text-slate-400"}`}>
                    Choose a Time
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* ── STEP 1: YOUR DETAILS ── */
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleNextStep}
                    className="space-y-5"
                  >
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 border-b border-white/5 pb-2">
                      Tell us about your business
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Smith"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wide">Business Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ABC Plumbing"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wide">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0412 345 678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-wide">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. john@abcplumbing.com.au"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-wide">What type of work do you do? *</label>
                      <select
                        required
                        value={tradeType}
                        onChange={(e) => setTradeType(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500 font-semibold"
                      >
                        <option value="" disabled className="bg-navy-dark text-slate-400">Select your trade</option>
                        <option value="Plumbing" className="bg-navy-dark text-white font-semibold">Plumbing</option>
                        <option value="Electrical" className="bg-navy-dark text-white font-semibold">Electrical</option>
                        <option value="HVAC" className="bg-navy-dark text-white font-semibold">HVAC &amp; Cooling</option>
                        <option value="Roofing" className="bg-navy-dark text-white font-semibold">Roofing</option>
                        <option value="Carpentry" className="bg-navy-dark text-white font-semibold">Carpentry &amp; Building</option>
                        <option value="Landscaping" className="bg-navy-dark text-white font-semibold">Landscaping &amp; Gardening</option>
                        <option value="Locksmith" className="bg-navy-dark text-white font-semibold">Locksmith</option>
                        <option value="Pest Control" className="bg-navy-dark text-white font-semibold">Pest Control</option>
                        <option value="Other" className="bg-navy-dark text-white font-semibold">Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-300 uppercase tracking-wide">How many missed calls/week? *</label>
                        <select
                          required
                          value={missedCalls}
                          onChange={(e) => setMissedCalls(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500 font-semibold"
                        >
                          <option value="" disabled className="bg-navy-dark text-slate-400">Select an option</option>
                          <option value="1-5" className="bg-navy-dark text-white font-semibold">1-5 missed calls</option>
                          <option value="6-10" className="bg-navy-dark text-white font-semibold">6-10 missed calls</option>
                          <option value="11-20" className="bg-navy-dark text-white font-semibold">11-20 missed calls</option>
                          <option value="20+" className="bg-navy-dark text-white font-semibold">20+ missed calls</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-slate-300 uppercase tracking-wide">How many staff in team? *</label>
                        <select
                          required
                          value={staffCount}
                          onChange={(e) => setStaffCount(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500 font-semibold"
                        >
                          <option value="" disabled className="bg-navy-dark text-slate-400">Select an option</option>
                          <option value="Solo" className="bg-navy-dark text-white font-semibold">Solo operator</option>
                          <option value="2-5" className="bg-navy-dark text-white font-semibold">2-5 staff</option>
                          <option value="6-10" className="bg-navy-dark text-white font-semibold">6-10 staff</option>
                          <option value="11+" className="bg-navy-dark text-white font-semibold">11+ staff</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-wide">Anything else you&apos;d like us to know?</label>
                      <textarea
                        rows={2}
                        placeholder="Optional"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-semibold resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={isSavingLead}
                        className="w-full justify-center flex items-center gap-2 font-black py-3.5 rounded-lg text-xs uppercase tracking-widest"
                      >
                        {isSavingLead ? (
                          <>
                            <div className="w-4 h-4 border-2 border-navy-base border-t-transparent rounded-full animate-spin" />
                            <span>Saving details...</span>
                          </>
                        ) : (
                          <>
                            <span>Next: Choose a Time</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  /* ── STEP 2: CALENDAR ── */
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Select date &amp; time</h3>
                      <button 
                        onClick={() => { setStep(1); setIframeLoading(true); }} 
                        className="text-[10px] font-black uppercase text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer bg-transparent border-none"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> Back
                      </button>
                    </div>

                    <div className="w-full min-h-[700px] rounded-2xl overflow-hidden bg-[#0b1f4d] relative">
                      {iframeLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b1f4d] text-slate-400 font-bold text-xs uppercase tracking-widest gap-3 z-10">
                          <div className="w-8 h-8 border-4 border-white/10 border-t-yellow-accent rounded-full animate-spin" />
                          <span>Loading Calendar...</span>
                        </div>
                      )}
                      <iframe
                        src={`https://calendly.com/aayushcubegupta/tradycall-demo?background_color=0b1f4d&text_color=ffffff&primary_color=facc15&hide_landing_page_details=1&hide_gdpr_banner=1&name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(emailAddress)}&phone_number=${encodeURIComponent(phoneNumber)}&embed_domain=${typeof window !== "undefined" ? window.location.hostname : ""}&embed_type=Inline`}
                        width="100%"
                        height="700"
                        frameBorder="0"
                        onLoad={() => setIframeLoading(false)}
                        style={{ minWidth: "320px", minHeight: "700px" }}
                        className="w-full h-[700px] border-0"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Trust Footer */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-5 mt-6 text-center text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <div className="flex flex-col items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Your info is secure</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>15-min demo</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>No lock-in</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── WHAT TO EXPECT ─── */}
        <section className="bg-white py-20 border-t border-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 bg-blue-600/10 text-blue-600 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                  What to Expect
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight-heading leading-[1.1] text-navy-base">
                  Your 15-minute demo is built for you.
                </h2>
                <ul className="space-y-4 font-bold text-slate-600 text-xs sm:text-sm">
                  {[
                    "Quick walkthrough of TradyCall",
                    "See real results from other tradies",
                    "Answers to your questions",
                    "Tailored advice for your business"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 fill-blue-600/10 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dashboard Preview Mockup */}
              <div className="lg:col-span-7 relative">
                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden w-full text-white text-left">
                  <div className="flex gap-2 pb-3 mb-3 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-[9px] font-mono text-slate-500 ml-4">app.tradycall.com/demo</span>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 border-r border-white/5 pr-3 space-y-2">
                      <div className="h-7 bg-blue-600/15 rounded border border-blue-500/20 text-[9px] font-black text-blue-400 flex items-center px-2.5 gap-2">
                        <Zap className="w-3.5 h-3.5" /> Dashboard
                      </div>
                      <div className="h-7 rounded text-[9px] font-semibold text-slate-400 flex items-center px-2.5">Missed Calls</div>
                      <div className="h-7 rounded text-[9px] font-semibold text-slate-400 flex items-center px-2.5">Settings</div>
                    </div>
                    <div className="col-span-9 space-y-4">
                      <div className="flex justify-between items-start pb-2 border-b border-white/5">
                        <div>
                          <h4 className="text-[11px] font-black text-white">Good morning, John! 👋</h4>
                          <span className="text-[8px] text-slate-400 font-semibold">Here&apos;s your lead recovery overview</span>
                        </div>
                        <div className="flex items-center gap-2 border border-white/5 bg-white/5 rounded-lg px-2 py-1 shadow-sm shrink-0">
                          <div className="relative w-8 h-8 flex items-center justify-center font-black text-[9px]">
                            <svg viewBox="0 0 36 36" className="w-full h-full text-blue-500 transform rotate-[-90deg] overflow-visible absolute inset-0">
                              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                              <circle cx="18" cy="18" r="16" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="92,100" />
                            </svg>
                            <span className="relative z-10 text-[8px] text-white">92%</span>
                          </div>
                          <div className="text-left shrink-0">
                            <span className="text-[7px] font-black text-slate-400 block leading-tight">Recovery Rate</span>
                            <span className="text-[6px] text-emerald-400 font-extrabold leading-none">+18% vs last month</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-left">
                        {[
                          { val: "134", label: "Missed Calls" },
                          { val: "132", label: "Replies Sent" },
                          { val: "98", label: "Leads Captured" },
                          { val: "27", label: "Jobs Recovered", cl: "text-emerald-400" }
                        ].map((stat, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/5 rounded p-2">
                            <span className="text-[6px] font-black uppercase text-slate-400 block mb-0.5 leading-tight">{stat.label}</span>
                            <span className={`text-xs font-black ${stat.cl || "text-white"}`}>{stat.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── MOVING TESTIMONIALS ─── */}
        <section className="bg-[#FAF9F6] py-24 border-t border-slate-200/50 relative overflow-hidden">

          {/* Section Heading */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
            <div className="space-y-3 mb-4">
              <p className="text-blue-600 text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
                Real Proof from the Tools
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-base tracking-tight-heading">
                Loved by Australian tradies
              </h2>
            </div>
            <div className="flex items-center justify-center gap-1 text-yellow-accent mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-accent text-yellow-accent" />
              ))}
            </div>
            <div className="w-12 h-1 bg-yellow-accent mx-auto rounded-full" />
          </div>

          {/* Scrolling Marquee */}
          <div className="relative w-full overflow-hidden flex whitespace-nowrap select-none">
            <div className="flex animate-marquee-fast md:animate-marquee gap-6 min-w-full items-stretch py-4">
              {[...demoReviews, ...demoReviews].map((review, i) => (
                <div
                  key={i}
                  className="w-[300px] md:w-[390px] flex-shrink-0 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between whitespace-normal text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-yellow-accent gap-0.5">
                        {[...Array(review.stars)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-yellow-accent text-yellow-accent" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <CheckCircle className="w-3 h-3" />
                        Verified Tradie
                      </span>
                    </div>
                    <p className="text-slate-600 text-[13px] sm:text-[14px] font-medium leading-relaxed mb-6 italic">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-yellow-accent">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-navy-base text-sm leading-tight">{review.name}</h4>
                      <p className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wide truncate">{review.trade}</p>
                      <p className="text-[9px] text-blue-500 font-bold uppercase tracking-wider mt-0.5">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fade edge overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF9F6] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF9F6] to-transparent pointer-events-none z-10" />
        </section>

      </main>

      <Footer />
    </>
  );
}
