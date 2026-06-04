"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Phone,
  PhoneOff,
  MessageSquare,
  Users,
  Shield,
  Lock,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Search,
  CheckCircle,
  FileText,
  CreditCard,
  Settings,
  Mail,
  Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { trackBookDemoClick } from "@/lib/analytics";

// Framer motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

interface FAQItem {
  q: string;
  a: string;
  category: "general" | "features" | "billing";
}

// ─── FAQ Hero Section — matches premium full-bleed design language ──────
function HeroSection() {
  return (
    <section className="relative bg-[#081225] text-white min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Dotted Grid Mesh */}
      <div className="absolute inset-0 dot-grid opacity-[0.16] pointer-events-none z-0" />

      {/* Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Desktop Cover Image */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[65%] pointer-events-none z-0">
        <Image
          src="/tradie_faq.webp"
          alt="FAQ background"
          fill
          className="object-cover object-center md:object-right"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 280px, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 280px, black 100%)'
          }}
          priority
        />
      </div>

      {/* Mobile Backdrop Image */}
      <div className="block md:hidden absolute inset-0 pointer-events-none z-0 opacity-35">
        <Image
          src="/tradie_faq.webp"
          alt="FAQ background"
          fill
          className="object-cover object-center"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 280px, black 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 280px, black 100%)'
          }}
          priority
        />
      </div>

      {/* Spectacular Blurry Frosted White Gradient Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/30 to-transparent pointer-events-none z-20 backdrop-blur-[2px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-8 relative z-30">
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] text-white"
            >
              Frequently asked<br />
              <span className="text-yellow-accent">questions.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-slate-300 text-sm sm:text-base font-semibold leading-relaxed max-w-xl"
            >
              Everything you need to know about TradyCall. Can&apos;t find the answer? We&apos;re here to help.
            </motion.p>

            {/* Trust badges — 3 columns horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md pt-2"
            >
              {[
                { icon: <Shield className="w-4 h-4 text-blue-300" />, label: "100% Aussie\nbased" },
                { icon: <Lock className="w-4 h-4 text-blue-300" />,   label: "Secure &\ncompliant" },
                { icon: <Users className="w-4 h-4 text-blue-300" />,  label: "No lock-in\ncontracts" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2.5 text-center sm:text-left sm:items-start">
                  <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <span className="text-[11px] font-black text-slate-300 leading-tight whitespace-pre-line">{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Spacer for desktop composition */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

        </div>
      </div>
    </section>
  );
}


const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a new phone number to use TradyCall?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. TradyCall works with your existing Australian business number. We don't change your number or disrupt your current setup. Calls are briefly forwarded only when missed."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly does the SMS get sent after a missed call?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TradyCall sends the SMS reply within 15 seconds of detecting a missed call, ensuring you catch the customer while they are still actively searching for assistance."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if the customer replies to the SMS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a customer replies, their text is captured instantly. We forward it to your phone via SMS/email and log it on your dashboard, allowing you to reply immediately."
      }
    },
    {
      "@type": "Question",
      "name": "Can my whole team see the leads and replies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You can add multiple team members to your account, and set up notifications so that specific staff are alerted when new opportunities are recovered."
      }
    },
    {
      "@type": "Question",
      "name": "Is TradyCall available after hours and on weekends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. TradyCall is active 24/7. You can set specific custom business-hours and after-hours text responses depending on when the call is missed."
      }
    },
    {
      "@type": "Question",
      "name": "How does TradyCall capture missed calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use conditional call forwarding (busy, unanswered, unreachable). If you can't pick up, the carrier routes the call to our secure system for a split-second to capture the number."
      }
    },
    {
      "@type": "Question",
      "name": "What information is included in the lead?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each lead contains the phone number, date/time, and the user's text reply. Our system uses AI to summarize their request (name, address, job type) into a neat brief."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customise the SMS message?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You have full control over the wording, brand name, and qualifying questions. You can customize the templates directly inside your settings panel."
      }
    },
    {
      "@type": "Question",
      "name": "How do notifications work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can choose to get real-time alerts via SMS, email, or webhook. We can also sync leads directly into your job management tools."
      }
    },
    {
      "@type": "Question",
      "name": "Can I integrate TradyCall with other tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! TradyCall integrates with popular industry apps like ServiceM8, Fergus, AroFlo, HubSpot, Google Calendar, and Zapier."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in the setup fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The setup fee covers full custom onboarding. Our team handles template configuration, number forwarding, CRM syncing, and live call tests to ensure a smooth launch."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a lock-in contract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No lock-in contracts. All of our plans operate on a flexible month-to-month subscription, giving you the freedom to adjust tiers or cancel at any time."
      }
    },
    {
      "@type": "Question",
      "name": "Can I change or cancel my plan later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your billing settings panel without any extra fees."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer multi-location pricing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! For franchises or trade firms operating across multiple branches, we offer customized Pro packages with multi-location routing and volume discounts."
      }
    }
  ]
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  // Track open state for individual FAQ indices
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    // General
    {
      category: "general",
      q: "Do I need a new phone number to use TradyCall?",
      a: "No. TradyCall works with your existing Australian business number. We don't change your number or disrupt your current setup. Calls are briefly forwarded only when missed."
    },
    {
      category: "general",
      q: "How quickly does the SMS get sent after a missed call?",
      a: "TradyCall sends the SMS reply within 15 seconds of detecting a missed call, ensuring you catch the customer while they are still actively searching for assistance."
    },
    {
      category: "general",
      q: "What happens if the customer replies to the SMS?",
      a: "When a customer replies, their text is captured instantly. We forward it to your phone via SMS/email and log it on your dashboard, allowing you to reply immediately."
    },
    {
      category: "general",
      q: "Can my whole team see the leads and replies?",
      a: "Yes! You can add multiple team members to your account, and set up notifications so that specific staff are alerted when new opportunities are recovered."
    },
    {
      category: "general",
      q: "Is TradyCall available after hours and on weekends?",
      a: "Absolutely. TradyCall is active 24/7. You can set specific custom business-hours and after-hours text responses depending on when the call is missed."
    },
    // Features & How It Works
    {
      category: "features",
      q: "How does TradyCall capture missed calls?",
      a: "We use conditional call forwarding (busy, unanswered, unreachable). If you can't pick up, the carrier routes the call to our secure system for a split-second to capture the number."
    },
    {
      category: "features",
      q: "What information is included in the lead?",
      a: "Each lead contains the phone number, date/time, and the user's text reply. Our system uses AI to summarize their request (name, address, job type) into a neat brief."
    },
    {
      category: "features",
      q: "Can I customise the SMS message?",
      a: "Yes! You have full control over the wording, brand name, and qualifying questions. You can customize the templates directly inside your settings panel."
    },
    {
      category: "features",
      q: "How do notifications work?",
      a: "You can choose to get real-time alerts via SMS, email, or webhook. We can also sync leads directly into your job management tools."
    },
    {
      category: "features",
      q: "Can I integrate TradyCall with other tools?",
      a: "Yes! TradyCall integrates with popular industry apps like ServiceM8, Fergus, AroFlo, HubSpot, Google Calendar, and Zapier."
    },
    // Billing & Plans
    {
      category: "billing",
      q: "What's included in the setup fee?",
      a: "The setup fee covers full custom onboarding. Our team handles template configuration, number forwarding, CRM syncing, and live call tests to ensure a smooth launch."
    },
    {
      category: "billing",
      q: "Is there a lock-in contract?",
      a: "No lock-in contracts. All of our plans operate on a flexible month-to-month subscription, giving you the freedom to adjust tiers or cancel at any time."
    },
    {
      category: "billing",
      q: "Can I change or cancel my plan later?",
      a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your billing settings panel without any extra fees."
    },
    {
      category: "billing",
      q: "Do you offer multi-location pricing?",
      a: "Yes! For franchises or trade firms operating across multiple branches, we offer customized Pro packages with multi-location routing and volume discounts."
    }
  ];

  const handleToggle = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    const query = searchQuery.toLowerCase();
    return faqData.filter(
      (item) =>
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group filtered FAQs by category
  const generalFAQs = filteredFAQs.filter((f) => f.category === "general");
  const featuresFAQs = filteredFAQs.filter((f) => f.category === "features");
  const billingFAQs = filteredFAQs.filter((f) => f.category === "billing");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <Navbar />

      <main className="flex-grow">
        {/* ─── HERO SECTION (Premium Dark — Phone + Live Notifications + Stats) ─── */}
        <HeroSection />

        {/* ─── MAIN FAQ GRID (SIDEBAR + ACCORDIONS WITH SEARCH) ─── */}
        <section className="bg-[#FAF9F6] py-12 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-dark opacity-[0.05] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

              {/* LEFT COLUMN: SIDEBAR BOXES — appears below accordions on mobile, left on desktop */}
              <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">

                {/* Sidebar Box 1: Still have questions? */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left flex flex-col items-center sm:items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 w-full">
                    <h4 className="text-sm sm:text-base font-black text-navy-base">
                      Still have questions?
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Our team is here to help you get the most out of TradyCall.
                    </p>
                  </div>
                  <div className="pt-2 w-full flex flex-col sm:flex-row items-center gap-4">
                    <Link href="/demo" className="w-full sm:w-auto" onClick={() => trackBookDemoClick("faq")}>
                      <Button variant="primary" className="w-full justify-center flex items-center gap-2 text-xs font-black py-3 px-5 rounded-lg uppercase tracking-wider">
                        Book a Demo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                  <Link href="/#contact" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 group/link">
                    Contact Us
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Sidebar Box 2: Secure. Reliable. Australian. */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-black text-navy-base leading-tight">
                      Secure. Reliable.<br />Australian.
                    </h4>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-2.5 font-semibold text-slate-500 text-xs sm:text-sm">
                    {[
                      "100% Australian based",
                      "Your data is safe with us",
                      "No lock-in contracts"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* SVG Map of Australia with dynamic gradient flag design */}
                  <div className="pt-4 border-t border-slate-100 flex justify-center opacity-85">
                    <svg viewBox="0 0 100 100" className="w-[140px] h-[100px] text-blue-100 fill-current overflow-visible">
                      <defs>
                        <linearGradient id="ausFlag" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="#2563eb" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      <path d="M12,48 C16,46 22,46 25,43 C28,40 32,42 35,40 C38,38 41,32 46,32 C51,32 55,34 59,31 C63,28 66,24 72,25 C78,26 84,21 88,24 C92,27 94,32 95,37 C96,42 90,44 88,48 C86,52 89,57 87,62 C85,67 80,72 78,77 C76,82 70,83 67,81 C64,79 61,74 57,75 C53,76 49,81 44,80 C39,79 37,73 34,71 C31,69 26,67 22,69 C18,71 14,75 11,70 C8,65 11,59 10,54 C9,49 8,50 12,48 Z" fill="url(#ausFlag)" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="2,2" />

                      {/* Mini flag overlay graphic */}
                      <circle cx="28" cy="46" r="3" fill="#3b82f6" opacity="0.3" />
                      <circle cx="70" cy="45" r="2" fill="#3b82f6" opacity="0.3" />
                    </svg>
                  </div>
                </motion.div>

              </div>

              {/* RIGHT COLUMN: SEARCH BAR AND CATEGORY ACCORDIONS */}
              <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">

                {/* Real-time search bar */}
                <div className="relative rounded-xl shadow-sm border border-slate-200/80 bg-white">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 rounded-xl text-xs sm:text-sm font-semibold text-navy-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* ACCORDION BLOCKS */}
                <div className="space-y-8">

                  {/* Category 1: General */}
                  {generalFAQs.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-sm">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-navy-base uppercase tracking-wider">General</h3>
                      </div>

                      <div className="space-y-3">
                        {generalFAQs.map((faq, idx) => {
                          const faqId = `gen-${idx}`;
                          const isOpened = openFaq === faqId;
                          return (
                            <div
                              key={faqId}
                              className="bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                            >
                              <button
                                onClick={() => handleToggle(faqId)}
                                className="w-full p-4 flex items-center justify-between text-left font-black text-navy-base gap-4 cursor-pointer"
                              >
                                <span className="text-xs sm:text-sm font-black">{faq.q}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpened ? "rotate-180 text-yellow-accent" : ""}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpened && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="px-4 pb-4 text-xs sm:text-sm font-semibold text-slate-500 border-t border-slate-50/80 pt-3 leading-relaxed">
                                      {faq.a}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Category 2: Features & How It Works */}
                  {featuresFAQs.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-sm">
                          <Settings className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-navy-base uppercase tracking-wider">Features & How It Works</h3>
                      </div>

                      <div className="space-y-3">
                        {featuresFAQs.map((faq, idx) => {
                          const faqId = `feat-${idx}`;
                          const isOpened = openFaq === faqId;
                          return (
                            <div
                              key={faqId}
                              className="bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                            >
                              <button
                                onClick={() => handleToggle(faqId)}
                                className="w-full p-4 flex items-center justify-between text-left font-black text-navy-base gap-4 cursor-pointer"
                              >
                                <span className="text-xs sm:text-sm font-black">{faq.q}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpened ? "rotate-180 text-yellow-accent" : ""}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpened && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="px-4 pb-4 text-xs sm:text-sm font-semibold text-slate-500 border-t border-slate-50/80 pt-3 leading-relaxed">
                                      {faq.a}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Category 3: Billing & Plans */}
                  {billingFAQs.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-sm">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-navy-base uppercase tracking-wider">Billing & Plans</h3>
                      </div>

                      <div className="space-y-3">
                        {billingFAQs.map((faq, idx) => {
                          const faqId = `bill-${idx}`;
                          const isOpened = openFaq === faqId;
                          return (
                            <div
                              key={faqId}
                              className="bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                            >
                              <button
                                onClick={() => handleToggle(faqId)}
                                className="w-full p-4 flex items-center justify-between text-left font-black text-navy-base gap-4 cursor-pointer"
                              >
                                <span className="text-xs sm:text-sm font-black">{faq.q}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpened ? "rotate-180 text-yellow-accent" : ""}`} />
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpened && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="px-4 pb-4 text-xs sm:text-sm font-semibold text-slate-500 border-t border-slate-50/80 pt-3 leading-relaxed">
                                      {faq.a}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Empty state when query matches nothing */}
                  {filteredFAQs.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3"
                    >
                      <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                      <h4 className="text-sm font-black text-navy-base">No questions found</h4>
                      <p className="text-xs font-semibold text-slate-500">
                        Try adjusting your keywords or clearing the search box to find what you're looking for.
                      </p>
                    </motion.div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── READY TO STOP MISSING JOBS (CTA BANNER WITH VAN PIC) ─── */}
        <section className="bg-[#FAF9F6] pb-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0b1f4d] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/5"
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* Left content block */}
                <div className="space-y-5 max-w-xl text-center lg:text-left flex-grow">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Ready to <span className="text-yellow-accent">stop missing jobs?</span>
                  </h3>
                  <p className="text-slate-300 text-sm font-semibold leading-relaxed">
                    Book a free 15-minute demo and see how TradyCall can help your business grow.
                  </p>

                  {/* Three mini ticks */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-1 font-bold text-slate-300 text-xs sm:text-sm">
                    {[
                      "15-min demo",
                      "No obligations",
                      "Setup in minutes"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5 text-blue-400 fill-blue-500/15 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social proof */}
                  <div className="flex items-center justify-center lg:justify-start gap-3 pt-3 border-t border-white/10 w-full sm:w-auto">
                    <div className="flex -space-x-1.5">
                      {[
                        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60&q=80"
                      ].map((url, idx) => (
                        <Image
                          key={idx}
                          src={url}
                          alt="Tradie avatar"
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full border border-[#0b1f4d] object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wide">
                      120+ Australian tradies trust TradyCall
                    </span>
                  </div>
                </div>

                {/* Right button & tradie portrait overlay details */}
                <div className="shrink-0 flex flex-col lg:flex-row items-center gap-8 w-full lg:w-auto">
                  <Link href="/demo" className="w-full sm:w-auto shrink-0 z-10" onClick={() => trackBookDemoClick("faq")}>
                    <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 font-black">
                      Book Your Free Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  {/* Tradie folding arms backdrop */}
                  <div className="hidden lg:block w-[180px] rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0 relative mt-4">
                    <Image
                      src="/tradie_hero.webp"
                      alt="Tradie portrait"
                      width={200}
                      height={200}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
