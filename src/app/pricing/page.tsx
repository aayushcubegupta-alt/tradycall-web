"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Settings,
  Headphones,
  Check,
  Calendar,
  CheckCircle,
  HelpCircle,
  Phone,
  Users,
  CreditCard,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Award
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
      staggerChildren: 0.1
    }
  }
};

export default function PricingPage() {
  // FAQ accordion open states (1-indexed matching questions)
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const starterFeatures = [
    "Australian business number",
    "Missed-call detection",
    "Instant SMS replies",
    "Up to 100 lead recoveries / month",
    "Basic lead dashboard",
    "Email + SMS notifications",
    "Business-hours workflows"
  ];

  const growthFeatures = [
    "Up to 300 lead recoveries / month",
    "AI-generated lead summaries",
    "Smart lead categorization",
    "Multiple staff notifications",
    "After-hours automations",
    "Priority support",
    "CRM exports",
    "Team workflows"
  ];

  const proFeatures = [
    "Up to 750 lead recoveries / month",
    "Multi-location setup",
    "Advanced automations",
    "AI lead qualification",
    "Booking integrations",
    "Analytics dashboard",
    "Dedicated onboarding",
    "Custom workflows"
  ];

  const comparisonRows = [
    { name: "Missed-call detection", starter: true, growth: true, pro: true },
    { name: "Instant SMS replies", starter: true, growth: true, pro: true },
    { name: "Monthly lead recoveries", starter: "Up to 100", growth: "Up to 300", pro: "Up to 750" },
    { name: "AI-generated summaries", starter: false, growth: true, pro: true },
    { name: "After-hours automations", starter: false, growth: true, pro: true },
    { name: "Multi-location support", starter: false, growth: false, pro: true },
    { name: "Analytics dashboard", starter: false, growth: "Basic", pro: "Advanced" },
    { name: "Dedicated onboarding", starter: false, growth: false, pro: true },
    { name: "Priority support", starter: false, growth: true, pro: true }
  ];

  const faqs = [
    {
      q: "Do I need a new phone number?",
      a: "No. TradyCall works with your existing Australian business number. We configure call forwarding so that only missed calls are routed through our smart auto-reply system.",
      icon: <Phone className="w-5 h-5 text-emerald-600" />,
      bgColor: "bg-emerald-50"
    },
    {
      q: "Is there a lock-in contract?",
      a: "No lock-in contracts. All of our plans operate on a flexible month-to-month subscription. You are free to cancel or adjust your tier at any time.",
      icon: <Calendar className="w-5 h-5 text-purple-600" />,
      bgColor: "bg-purple-50"
    },
    {
      q: "How quickly can I get started?",
      a: "Setup is typically completed within 1-2 business days. Our Australian setup experts will configure your workflow, sync your number, and perform full diagnostics for you.",
      icon: <Users className="w-5 h-5 text-amber-600" />,
      bgColor: "bg-amber-50"
    },
    {
      q: "What's included in the setup fee?",
      a: "We handle the complete setup, configuration, and testing for you. This includes setting up your custom templates, connecting calendars, loading ABN data, and doing live call testing.",
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* ─── HERO SECTION ─── */}
        <section className="relative bg-[#081225] text-white min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen flex items-center pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
          {/* Dotted Grid Mesh */}
          <div className="absolute inset-0 dot-grid opacity-[0.16] pointer-events-none z-0" />

          {/* Ambient Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[110px] pointer-events-none z-0" />

          {/* Desktop Cover Image */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-[65%] pointer-events-none z-0">
            <Image
              src="/pricing_page_top_image.png"
              alt="Pricing background"
              fill
              className="object-cover object-right"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 280px, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 280px, black 100%)'
              }}
              priority
            />
          </div>

          {/* Mobile Backdrop Image */}
          <div className="block md:hidden absolute inset-0 pointer-events-none z-0 opacity-25">
            <Image
              src="/pricing_page_top_image.png"
              alt="Pricing background"
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

          {/* Spectacular Blurry Frosted White Gradient Mask */}
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/30 to-transparent pointer-events-none z-20 backdrop-blur-[2px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column Content */}
              <div className="lg:col-span-7 space-y-6 relative z-30">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08]"
                >
                  Simple pricing.<br />
                  <span className="text-yellow-accent">Win more jobs.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-slate-300 text-sm sm:text-base font-semibold leading-relaxed max-w-xl"
                >
                  Choose the month-to-month plan that fits your business. Start recovering lost leads with zero lock-in contracts. Cancel anytime.
                </motion.p>
              </div>

              {/* Spacer for desktop composition */}
              <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

            </div>
          </div>
        </section>

        {/* ─── PRICING PLANS 3-COLUMN CARDS ─── */}
        <section id="plans" className="bg-[#FAF9F6] py-14 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid-dark opacity-[0.05] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

              {/* STARTER CARD */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative"
              >
                <div className="space-y-6">
                  <div className="text-center space-y-1 pb-4 border-b border-slate-100">
                    <h4 className="text-sm font-black tracking-widest text-navy-base uppercase">Starter</h4>
                    <p className="text-xs text-slate-400 font-semibold">For solo tradies & owner-operators</p>
                  </div>

                  {/* Price */}
                  <div className="text-center space-y-1 py-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-navy-base">$199</span>
                      <span className="text-sm font-bold text-slate-400">/month</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold block">Setup Fee $299</span>
                  </div>

                  {/* Checklist features */}
                  <ul className="space-y-3 font-semibold text-slate-500 text-xs sm:text-sm">
                    {starterFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link href="/demo" className="w-full" onClick={() => trackBookDemoClick("pricing")}>
                    <Button variant="outline" className="w-full border-yellow-accent text-navy-base hover:bg-yellow-accent/10 hover:border-yellow-accent font-black py-3 rounded-lg text-xs tracking-wider uppercase">
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* GROWTH CARD (MOST POPULAR - HIGHLIGHTED) */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border-2 border-yellow-accent rounded-3xl p-8 flex flex-col justify-between shadow-xl relative scale-100 lg:scale-[1.03] z-20"
              >
                {/* Yellow ribbon top highlight banner */}
                <div className="absolute top-0 left-0 right-0 bg-yellow-accent text-navy-base font-black text-[10px] tracking-widest uppercase text-center py-2 rounded-t-2xl">
                  Most Popular
                </div>

                <div className="space-y-6 pt-4">
                  <div className="text-center space-y-1 pb-4 border-b border-slate-100">
                    <h4 className="text-sm font-black tracking-widest text-navy-base uppercase">Growth</h4>
                    <p className="text-xs text-slate-400 font-semibold">For growing teams & businesses</p>
                  </div>

                  {/* Price */}
                  <div className="text-center space-y-1 py-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-navy-base">$249</span>
                      <span className="text-sm font-bold text-slate-400">/month</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold block">Setup Fee $499</span>
                  </div>

                  {/* Checklist heading */}
                  <p className="text-xs font-black uppercase text-navy-base tracking-wider pb-1">
                    Everything in Starter, plus:
                  </p>

                  {/* Checklist features */}
                  <ul className="space-y-3 font-semibold text-slate-500 text-xs sm:text-sm">
                    {growthFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-navy-base/90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link href="/demo" className="w-full" onClick={() => trackBookDemoClick("pricing")}>
                    <Button variant="primary" className="w-full font-black py-3.5 rounded-lg text-xs tracking-wider uppercase">
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* PRO CARD */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative"
              >
                <div className="space-y-6">
                  <div className="text-center space-y-1 pb-4 border-b border-slate-100">
                    <h4 className="text-sm font-black tracking-widest text-navy-base uppercase">Pro</h4>
                    <p className="text-xs text-slate-400 font-semibold">For larger teams & multi-location businesses</p>
                  </div>

                  {/* Price */}
                  <div className="text-center space-y-1 py-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-navy-base">$499</span>
                      <span className="text-sm font-bold text-slate-400">/month</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold block">Setup Fee $999</span>
                  </div>

                  {/* Checklist heading */}
                  <p className="text-xs font-black uppercase text-navy-base tracking-wider pb-1">
                    Everything in Growth, plus:
                  </p>

                  {/* Checklist features */}
                  <ul className="space-y-3 font-semibold text-slate-500 text-xs sm:text-sm">
                    {proFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link href="/demo" className="w-full" onClick={() => trackBookDemoClick("pricing")}>
                    <Button variant="outline" className="w-full border-yellow-accent text-navy-base hover:bg-yellow-accent/10 hover:border-yellow-accent font-black py-3 rounded-lg text-xs tracking-wider uppercase">
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── COMPARE PLANS SECTION (TABLE) ─── */}
        <section id="compare" className="bg-[#FAF9F6] pb-24 border-t border-slate-200/60 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-navy-base tracking-tight-heading">
                Compare Plans
              </h2>
            </div>

            {/* Compare Table Grid container */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/80 text-navy-base font-black">
                    <th className="p-5 font-black uppercase tracking-wider w-1/3">Feature</th>
                    <th className="p-5 text-center font-black uppercase tracking-wider">Starter</th>
                    <th className="p-5 text-center font-black uppercase tracking-wider relative">
                      Growth
                      <span className="absolute top-1 right-2 bg-yellow-accent text-navy-base font-black text-[8px] tracking-wider px-1.5 py-0.5 rounded">Most Popular</span>
                    </th>
                    <th className="p-5 text-center font-black uppercase tracking-wider">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-5 text-navy-base font-black">{row.name}</td>

                      {/* Starter Value */}
                      <td className="p-5 text-center">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <CheckCircle className="w-5 h-5 text-yellow-accent fill-yellow-accent/15 mx-auto" />
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="font-extrabold text-navy-base">{row.starter}</span>
                        )}
                      </td>

                      {/* Growth Value */}
                      <td className="p-5 text-center bg-yellow-accent/5">
                        {typeof row.growth === "boolean" ? (
                          row.growth ? (
                            <CheckCircle className="w-5 h-5 text-yellow-accent fill-yellow-accent/15 mx-auto" />
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="font-black text-navy-base">{row.growth}</span>
                        )}
                      </td>

                      {/* Pro Value */}
                      <td className="p-5 text-center">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <CheckCircle className="w-5 h-5 text-yellow-accent fill-yellow-accent/15 mx-auto" />
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="font-extrabold text-navy-base">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Support Badge */}
            <div className="flex items-center justify-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mt-8">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>All plans include secure Australian hosting, 24/7 system monitoring and regular updates.</span>
            </div>

          </div>
        </section>

        {/* ─── NOT SEEING RESULTS GUARANTEES BANNER ─── */}
        <section className="bg-[#FAF9F6] pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#081225] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/5"
            >
              {/* Glow spots */}
              <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* Left side Phone screen graphic */}
                <div className="relative w-full lg:w-1/3 flex justify-center shrink-0">
                  <div className="w-[180px] bg-[#0c0d12] border-4 border-slate-700 rounded-3xl p-2.5 shadow-2xl relative">
                    <div className="w-12 h-2.5 bg-black rounded-full mx-auto mb-1.5" />
                    <div className="space-y-3 text-[7px] font-semibold text-slate-300">
                      <div className="bg-white/10 rounded p-2 border border-white/10">
                        <span className="text-white font-extrabold block mb-0.5">TradyCall</span>
                        Hi! Thanks for calling ABC Plumbing. We missed your call...
                      </div>
                      <div className="bg-blue-600 text-white rounded p-1.5 w-[85%] ml-auto text-right">
                        Job from Brighton Plumbing request
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center text details */}
                <div className="flex-grow space-y-4 text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Not seeing results?<br />We'll help you change that.
                  </h3>
                  <p className="text-slate-300 text-sm font-semibold leading-relaxed max-w-xl">
                    If TradyCall doesn't help you recover more leads in the first 30 days,
                    we'll work with you to make it right.
                  </p>
                </div>

                {/* Right CTA Button & Social Proof */}
                <div className="shrink-0 flex flex-col items-center lg:items-end gap-4 w-full sm:w-auto">
                  <Link href="/demo" className="w-full sm:w-auto" onClick={() => trackBookDemoClick("pricing")}>
                    <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 font-black">
                      Book Your Free Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      {[
                        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60&q=80"
                      ].map((url, idx) => (
                        <Image
                          key={idx}
                          src={url}
                          alt="Tradie portrait"
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full border border-[#081225] object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-300 font-extrabold uppercase tracking-wide">
                      Trusted by 120+ Australian businesses
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        </section>

        {/* ─── FREQUENTLY ASKED PRICING QUESTIONS (ACCORDION) ─── */}
        <section id="faq-accordions" className="bg-[#FAF9F6] pb-24 relative border-t border-slate-200/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 pt-16">
              <h2 className="text-3xl sm:text-4xl font-black text-navy-base tracking-tight-heading">
                Frequently asked pricing questions
              </h2>
            </div>

            {/* Grid of 4 FAQ accordion cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {faqs.map((faq, idx) => {
                const isOpened = openFaq === idx + 1;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFaq(idx + 1)}
                      className="w-full p-5 flex items-center justify-between text-left font-black text-navy-base gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-lg ${faq.bgColor} flex items-center justify-center shrink-0 shadow-sm`}>
                          {faq.icon}
                        </div>
                        <span className="text-xs sm:text-sm font-black">{faq.q}</span>
                      </div>
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
                          <div className="px-5 pb-5 pl-[54px] text-xs sm:text-sm font-semibold text-slate-500 border-t border-slate-50/80 pt-3 leading-relaxed">
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
        </section>

      </main>

      <Footer />
    </>
  );
}
