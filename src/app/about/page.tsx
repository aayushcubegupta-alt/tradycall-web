"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Target,
  Phone,
  PhoneOff,
  MessageSquare,
  TrendingUp,
  Users,
  ShieldCheck,
  Settings,
  Heart,
  Check,
  ArrowRight,
  Shield,
  Zap,
  Hammer,
  Droplet,
  Flame,
  Wrench,
  Sun,
  Scissors
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { trackBookDemoClick } from "@/lib/analytics";

// Framer motion variants for scroll animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function AboutUsPage() {
  // Sticky Timeline Scroll Ref & Scroll Progress Hooks
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = React.useState(0);

  // ── RAF-driven marquee: runs every frame, never pauses during scroll ──
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueePosRef = React.useRef(0);
  const marqueeRafRef = React.useRef<number>(0);
  React.useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const SPEED = 0.6; // px per frame — adjust for faster/slower
    const step = () => {
      marqueePosRef.current += SPEED;
      // Seamless reset when we've scrolled exactly half (list is duplicated)
      if (marqueePosRef.current >= el.scrollWidth / 2) {
        marqueePosRef.current = 0;
      }
      el.style.transform = `translate3d(-${marqueePosRef.current}px, 0, 0)`;
      marqueeRafRef.current = requestAnimationFrame(step);
    };
    marqueeRafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(marqueeRafRef.current);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveStep(0);
    } else if (latest < 0.66) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'missed' | 'replies' | 'settings'>('dashboard');
  const [autoSms, setAutoSms] = React.useState(true);
  const [qualify, setQualify] = React.useState(true);
  const [emailNotif, setEmailNotif] = React.useState(true);

  // Live metrics states (Starting from zero for active count-up effect)
  const [missedCallsCount, setMissedCallsCount] = React.useState(0);
  const [repliesSentCount, setRepliesSentCount] = React.useState(0);
  const [jobsRecoveredCount, setJobsRecoveredCount] = React.useState(0);
  const [revenueWonCount, setRevenueWonCount] = React.useState(0);

  // Storing chart data with active state
  const [chartData, setChartData] = React.useState([
    { day: 'Mon', val: 35 },
    { day: 'Tue', val: 55 },
    { day: 'Wed', val: 80 },
    { day: 'Thu', val: 65 },
    { day: 'Fri', val: 95 },
    { day: 'Sat', val: 20 },
    { day: 'Sun', val: 15 }
  ]);

  // Phone conversation loop - double-speed (1.3s) for constant fast sliding message movement!
  const [phoneStep, setPhoneStep] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPhoneStep((prev) => (prev + 1) % 5);
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  // 1. Double-speed Mount Count-up: satisfying rapid benchmark spin from 0 to targets in 700ms
  React.useEffect(() => {
    const targetMissed = 134;
    const targetReplies = 132;
    const targetJobs = 27;
    const targetRevenue = 18450;

    const duration = 700; 
    const steps = 20;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setMissedCallsCount(Math.min(targetMissed, Math.floor((targetMissed / steps) * currentStep)));
      setRepliesSentCount(Math.min(targetReplies, Math.floor((targetReplies / steps) * currentStep)));
      setJobsRecoveredCount(Math.min(targetJobs, Math.floor((targetJobs / steps) * currentStep)));
      setRevenueWonCount(Math.min(targetRevenue, Math.floor((targetRevenue / steps) * currentStep)));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // 2. High-frequency 250ms real-time equalizer wave fluctuation (lines go up and down continuously)
  React.useEffect(() => {
    const chartInterval = setInterval(() => {
      setChartData(prev => 
        prev.map(item => {
          const change = Math.floor(Math.random() * 15) - 7; // +/- 7% fluctuation
          const newVal = Math.max(15, Math.min(95, item.val + change));
          return { ...item, val: newVal };
        })
      );
    }, 250);
    return () => clearInterval(chartInterval);
  }, []);

  // 3. Continuous 250ms rolling telemetry increments (constantly rolling up live traffic)
  React.useEffect(() => {
    const counterInterval = setInterval(() => {
      // 30% chance of new missed call every 0.25 seconds
      if (Math.random() < 0.3) {
        setMissedCallsCount(prev => prev + 1);
        setRepliesSentCount(prev => prev + (Math.random() < 0.9 ? 1 : 0));
      }
      
      // 10% chance of qualified lead every 0.25 seconds
      if (Math.random() < 0.1) {
        setJobsRecoveredCount(prev => prev + 1);
        setRevenueWonCount(prev => prev + Math.floor(Math.random() * 250) + 200); // add $200-$450
      }
    }, 250);
    return () => clearInterval(counterInterval);
  }, []);

  // 4. Instant SMS win increments (coupled with the conversation completion, registers instantly in 400ms)
  React.useEffect(() => {
    if (phoneStep === 4) {
      const timer = setTimeout(() => {
        setMissedCallsCount(prev => prev + 1);
        setRepliesSentCount(prev => prev + 1);
        setJobsRecoveredCount(prev => prev + 1);
        setRevenueWonCount(prev => prev + 450);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phoneStep]);

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* ─── HERO SECTION (Dark Premium Theme with Right-Aligned Full-Bleed Background Image) ─── */}
        <section className="relative bg-[#081225] text-white pt-40 pb-32 lg:py-0 min-h-screen flex items-center overflow-hidden">
          {/* Dotted Grid Mesh Overlay */}
          <div className="absolute inset-0 dot-grid opacity-[0.15] pointer-events-none z-10" />

          {/* Ambient Glow Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

          {/* Right-aligned Background Image covering the entire right half of the screen (Bleeds to top, bottom, and right edges on desktop) */}
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[48%] xl:w-[50%] z-0 h-full hidden lg:block">
            <Image
              src="/tradie_hero_v2.png"
              alt="Australian tradesmen background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Seamless fade to blend the image's left edge into the dark navy #081225 background over a wider flow */}
            <div className="absolute inset-y-0 left-0 w-96 bg-gradient-to-r from-[#081225] via-[#081225]/90 via-[#081225]/60 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#081225] to-transparent pointer-events-none z-10" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[60vh] lg:min-h-[70vh]">

              {/* Left Content (Left 6 Columns) */}
              <div className="lg:col-span-6 space-y-6 relative z-10">

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight-heading leading-[1.1] text-white"
                >
                  We built TradyCall <br className="hidden sm:inline" />
                  for <span className="text-yellow-accent">tradies</span>, like you.
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-semibold max-w-xl"
                >
                  <p>
                    We know how frustrating it is to miss a call and realise it
                    was a customer who needed you now.
                  </p>
                  <p>
                    That's why we created TradyCall — to make sure every missed
                    call becomes another opportunity.
                  </p>
                </motion.div>

                {/* Australian Support Badge (Replacing Our Mission statement space) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-start gap-4 pt-4 max-w-xl"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                    <Phone className="w-5.5 h-5.5 fill-current" />
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-white leading-relaxed">
                    <span className="text-blue-400 font-extrabold block mb-1">Built in Australia. Backed by real experience.</span>
                    <span className="text-slate-300">Proudly supporting Australian tradies and service businesses.</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column Spacer (Desktop) / Mobile Hero Image Container */}
              <div className="lg:col-span-6 relative h-full flex flex-col justify-end pb-12 lg:pb-0 z-20 w-full">
                
                {/* Mobile-only inline blended image (hidden on desktop) */}
                <div className="lg:hidden w-full relative pb-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10 w-full overflow-hidden rounded-2xl"
                  >
                    <Image
                      src="/tradie_hero_v2.png"
                      alt="Australian tradesmen smiling"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover min-h-[300px]"
                      priority
                    />
                    {/* Bottom fade for mobile view */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#081225] via-[#081225]/40 to-transparent pointer-events-none z-10" />
                  </motion.div>
                </div>

                {/* Desktop-only visual spacer to allow fullscreen right aligned image to breathe */}
                <div className="hidden lg:block h-32" />
              </div>

            </div>
          </div>

          {/* Smooth bottom edge blend to transition seamlessly into the #FAF9F6 section below with no visible separation line (moved further down to h-14 height, z-20 to overlay dot-grid) */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/95 to-[#FAF9F6]/0 pointer-events-none z-20" />
        </section>

        {/* ─── OUR STORY SECTION (Cinematic Full-Bleed Sticky Scroll — 400vh travel) ─── */}
        <section id="our-story" ref={timelineRef} className="relative bg-[#FAF9F6] text-navy-base h-[400vh]">

          {/* Sticky full-viewport window — content never moves, only scroll position changes */}
          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {/* ── Ambient background that subtly shifts per step ── */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: activeStep === 0
                  ? "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(239,246,255,0.9) 0%, rgba(250,249,246,1) 70%)"
                  : activeStep === 1
                  ? "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(219,234,254,0.8) 0%, rgba(250,249,246,1) 70%)"
                  : "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(191,219,254,0.7) 0%, rgba(250,249,246,1) 70%)"
              }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />

            {/* ── Step progress indicator (top-left) ── */}
            <div className="absolute top-8 left-8 lg:top-12 lg:left-16 z-20 flex items-center gap-4">
              {[0, 1, 2].map(i => (
                <button
                  key={i}
                  onClick={() => {
                    if (timelineRef.current) {
                      const rect = timelineRef.current.getBoundingClientRect();
                      const scrollStart = window.scrollY + rect.top;
                      const fractions = [0.08, 0.42, 0.76];
                      window.scrollTo({ top: scrollStart + timelineRef.current.scrollHeight * fractions[i], behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center gap-2 group"
                >
                  <motion.div
                    animate={{
                      width: activeStep === i ? 40 : 16,
                      backgroundColor: activeStep === i ? "#2563eb" : "#cbd5e1"
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-[3px] rounded-full"
                  />
                </button>
              ))}
              <span className="text-[11px] font-black text-slate-400 tracking-widest ml-1">
                0{activeStep + 1} / 03
              </span>
            </div>

            {/* ── Scroll cue arrow (bottom-center, fades out on last step) ── */}
            <motion.div
              animate={{ opacity: activeStep === 2 ? 0 : 1, y: activeStep === 2 ? 10 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="w-5 h-5 border-2 border-slate-300 rounded-full flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-slate-400 rounded-full" />
              </motion.div>
            </motion.div>

            {/* ── Three full-screen step panels stacked, shown one at a time ── */}
            {[
              {
                label: "THE PROBLEM",
                headline: ["Missed calls.", "Missed money."],
                sub: "Every unanswered call is a job handed to your competitor.",
                keyword: "of calls",
                stat: "1 in 3",
                statLabel: "go unanswered",
                icon: <PhoneOff className="w-8 h-8" />,
                accentColor: "#ef4444",
                accentBg: "rgba(239,68,68,0.06)"
              },
              {
                label: "THE SOLUTION",
                headline: ["A receptionist", "that never sleeps."],
                sub: "TradyCall replies in under 30 seconds — every time, automatically.",
                keyword: "coverage",
                stat: "24/7",
                statLabel: "automated & instant",
                icon: <MessageSquare className="w-8 h-8" />,
                accentColor: "#2563eb",
                accentBg: "rgba(37,99,235,0.06)"
              },
              {
                label: "THE IMPACT",
                headline: ["More jobs.", "Zero extra effort."],
                sub: "Tradies recover thousands in revenue every week without lifting a finger.",
                keyword: "avg / month",
                stat: "$18k",
                statLabel: "revenue recovered",
                icon: <TrendingUp className="w-8 h-8" />,
                accentColor: "#16a34a",
                accentBg: "rgba(22,163,74,0.06)"
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                animate={{
                  opacity: activeStep === idx ? 1 : 0,
                  y: activeStep === idx ? 0 : activeStep > idx ? -40 : 40,
                  pointerEvents: activeStep === idx ? "auto" : "none"
                }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 xl:px-28">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">

                    {/* Left — Giant headline */}
                    <div className="space-y-6 lg:space-y-8">
                      {/* Label pill */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: activeStep === idx ? 1 : 0, x: activeStep === idx ? 0 : -20 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="inline-flex items-center gap-3"
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: step.accentBg, color: step.accentColor }}
                        >
                          {step.icon}
                        </div>
                        <span
                          className="text-[11px] font-black tracking-[0.2em] uppercase"
                          style={{ color: step.accentColor }}
                        >
                          {step.label}
                        </span>
                      </motion.div>

                      {/* Giant headline */}
                      <div className="space-y-1">
                        {step.headline.map((line, li) => (
                          <motion.h2
                            key={li}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: activeStep === idx ? 1 : 0, y: activeStep === idx ? 0 : 30 }}
                            transition={{ duration: 0.6, delay: 0.2 + li * 0.1 }}
                            className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.95] tracking-tight text-navy-base"
                          >
                            {line}
                          </motion.h2>
                        ))}
                      </div>

                      {/* Single-line sub */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: activeStep === idx ? 1 : 0, y: activeStep === idx ? 0 : 20 }}
                        transition={{ duration: 0.55, delay: 0.38 }}
                        className="text-lg lg:text-xl font-semibold text-slate-500 max-w-lg leading-relaxed"
                      >
                        {step.sub}
                      </motion.p>
                    </div>

                    {/* Right — Massive stat reveal */}
                    <div className="flex items-center justify-center lg:justify-end">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: activeStep === idx ? 1 : 0, scale: activeStep === idx ? 1 : 0.88 }}
                        transition={{ duration: 0.65, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative flex flex-col items-center justify-center text-center"
                        style={{
                          width: "clamp(260px, 30vw, 420px)",
                          height: "clamp(260px, 30vw, 420px)",
                          borderRadius: "50%",
                          background: step.accentBg,
                          border: `2px solid ${step.accentColor}18`
                        }}
                      >
                        {/* Outer pulse ring */}
                        <motion.div
                          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1.5px solid ${step.accentColor}` }}
                        />

                        {/* Big STAT number — always the headline */}
                        <div
                          className="text-[clamp(3.5rem,8vw,7rem)] font-black leading-none tracking-tight"
                          style={{ color: step.accentColor }}
                        >
                          {step.stat}
                        </div>
                        {/* keyword — medium descriptor below the number */}
                        <div
                          className="mt-2 text-lg font-black tracking-tight"
                          style={{ color: step.accentColor, opacity: 0.7 }}
                        >
                          {step.keyword}
                        </div>
                        {/* Caption */}
                        <div className="mt-3 text-xs font-black text-slate-400 uppercase tracking-widest px-6">
                          {step.statLabel}
                        </div>
                      </motion.div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </section>

        {/* ─── OUR VALUES SECTION (RAF-driven Infinite Marquee — never pauses) ─── */}
        <section id="our-values" className="bg-white py-24 border-t border-slate-100 overflow-hidden">

          {/* Section header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight-heading text-navy-base">
                What we stand for
              </h2>
              <p className="text-slate-500 font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
                We didn&apos;t build TradyCall to be another SaaS product. We built it because we believe every tradie deserves a fair shot — and missing a call should never cost you a job.
              </p>
            </motion.div>
          </div>

          {/* Marquee row — driven by RAF, runs every frame regardless of scroll */}
          <div className="relative">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-56 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-56 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling track — ref driven by requestAnimationFrame */}
            <div
              ref={marqueeRef}
              className="flex gap-8"
              style={{ width: "max-content", willChange: "transform" }}
            >
              {[
                { title: "Customer First",       tag: "Real solutions for real problems",   icon: <Users className="w-8 h-8" /> },
                { title: "Always On — 24/7",     tag: "No call goes unanswered, ever",       icon: <Phone className="w-8 h-8" /> },
                { title: "Speed is Everything",  tag: "Reply in under 30 seconds",           icon: <Zap className="w-8 h-8" /> },
                { title: "Proudly Australian",   tag: "Local team. Local knowledge.",        icon: <Heart className="w-8 h-8" /> },
                { title: "No Lock-In Contracts", tag: "Month-to-month, cancel anytime",     icon: <Shield className="w-8 h-8" /> },
                { title: "Built for Tradies",    tag: "Purpose-built, not retrofitted",     icon: <Hammer className="w-8 h-8" /> },
                { title: "Fully Transparent",    tag: "Every lead tracked in real time",    icon: <ShieldCheck className="w-8 h-8" /> },
                { title: "Privacy First",        tag: "Your data is never sold. Ever.",     icon: <Target className="w-8 h-8" /> },
                { title: "Results-Driven",       tag: "Leads captured, jobs won",           icon: <TrendingUp className="w-8 h-8" /> },
                { title: "Simple & Powerful",    tag: "No jargon, no complexity",           icon: <Settings className="w-8 h-8" /> },
                // ── Exact duplicate set for seamless RAF loop reset ──
                { title: "Customer First",       tag: "Real solutions for real problems",   icon: <Users className="w-8 h-8" /> },
                { title: "Always On — 24/7",     tag: "No call goes unanswered, ever",       icon: <Phone className="w-8 h-8" /> },
                { title: "Speed is Everything",  tag: "Reply in under 30 seconds",           icon: <Zap className="w-8 h-8" /> },
                { title: "Proudly Australian",   tag: "Local team. Local knowledge.",        icon: <Heart className="w-8 h-8" /> },
                { title: "No Lock-In Contracts", tag: "Month-to-month, cancel anytime",     icon: <Shield className="w-8 h-8" /> },
                { title: "Built for Tradies",    tag: "Purpose-built, not retrofitted",     icon: <Hammer className="w-8 h-8" /> },
                { title: "Fully Transparent",    tag: "Every lead tracked in real time",    icon: <ShieldCheck className="w-8 h-8" /> },
                { title: "Privacy First",        tag: "Your data is never sold. Ever.",     icon: <Target className="w-8 h-8" /> },
                { title: "Results-Driven",       tag: "Leads captured, jobs won",           icon: <TrendingUp className="w-8 h-8" /> },
                { title: "Simple & Powerful",    tag: "No jargon, no complexity",           icon: <Settings className="w-8 h-8" /> },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-6 bg-[#FAF9F6] border border-slate-200/60 rounded-2xl px-10 py-8 group hover:border-blue-300 hover:shadow-md transition-colors duration-200 cursor-default"
                >
                  {/* Icon circle */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors duration-200">
                    {item.icon}
                  </div>
                  {/* Text */}
                  <div>
                    <h4 className="text-xl font-black text-navy-base whitespace-nowrap">{item.title}</h4>
                    <p className="text-sm font-semibold text-slate-400 whitespace-nowrap mt-1">{item.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ─── BUILT FOR EVERY TRADE SECTION (Grids with Hover Zooms) ─── */}
        <section id="trades" className="bg-[#FAF9F6] py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column Copy & CTA */}
              <div className="lg:col-span-4 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight-heading leading-[1.1] text-navy-base">
                  Helping tradies across Australia win more work.
                </h2>

                <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                  TradyCall is trusted by businesses in every trade. No matter your
                  industry, we help you capture more leads and convert them into jobs.
                </p>

                <div className="pt-2">
                  <Link href="/demo" onClick={() => trackBookDemoClick("about")}>
                    <Button variant="primary" className="flex items-center gap-2 group">
                      Book Your Free Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column 3x2 Grid */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                  {/* Trade 1: Plumbing */}
                  <div className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white">
                    <Image
                      src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&h=300&q=80"
                      alt="Plumbing trade"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-navy-base/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 flex items-center justify-center shrink-0">
                        <Droplet className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-black tracking-wide">Plumbing</span>
                    </div>
                  </div>

                  {/* Trade 2: Electrical */}
                  <div className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white">
                    <Image
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&h=300&q=80"
                      alt="Electrical trade"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-navy-base/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-black tracking-wide">Electrical</span>
                    </div>
                  </div>

                  {/* Trade 3: Roofing */}
                  <div className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white">
                    <Image
                      src="https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=400&h=300&q=80"
                      alt="Roofing trade"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-navy-base/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 flex items-center justify-center shrink-0">
                        <Hammer className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-black tracking-wide">Roofing</span>
                    </div>
                  </div>

                  {/* Trade 4: HVAC */}
                  <div className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white">
                    <Image
                      src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=400&h=300&q=80"
                      alt="HVAC trade"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-navy-base/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 flex items-center justify-center shrink-0">
                        <Sun className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-black tracking-wide">HVAC</span>
                    </div>
                  </div>

                  {/* Trade 5: Carpentry */}
                  <div className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white">
                    <Image
                      src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&h=300&q=80"
                      alt="Carpentry trade"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-navy-base/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 flex items-center justify-center shrink-0">
                        <Wrench className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-black tracking-wide">Carpentry</span>
                    </div>
                  </div>

                  {/* Trade 6: Landscaping */}
                  <div className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 bg-white">
                    <Image
                      src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&h=300&q=80"
                      alt="Landscaping trade"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-navy-base/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/90 flex items-center justify-center shrink-0">
                        <Scissors className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-black tracking-wide">Landscaping</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── INSIDE THE PLATFORM SECTION (Clean SaaS Light-Theme with Interactive Toggles & Apple-Style iMessage Mockup) ─── */}
        <section className="relative bg-[#FAF9F6] text-navy-base py-24 overflow-hidden border-t border-slate-200/60">
          {/* Subtle Light Dotted Mesh */}
          <div className="absolute inset-0 dot-grid-dark opacity-[0.03] pointer-events-none z-0" />

          {/* Soft, High-End Warm Ambient Glow Accent */}
          <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left text column */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight-heading leading-[1.1] text-navy-base">
                  How TradyCall secures <br />
                  your incoming jobs.
                </h2>

                <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed">
                  While you are busy on-site, in a roof, or with a client, TradyCall immediately responds, qualifies, and logs the opportunity.
                </p>

                {/* Interactive Checklist Cards (Refined to feel authentic and highly custom-built) */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Instant SMS replies to missed calls",
                      desc: "Sends a polite, automated text message within 30 seconds to capture the customer before they dial a competitor.",
                      color: "text-blue-600",
                      bgColor: "border-slate-200/85 hover:border-blue-500 hover:shadow-blue-500/5"
                    },
                    {
                      title: "Capture leads and qualify enquiries",
                      desc: "Collects their job description, location, and urgency status automatically through a smart text flow.",
                      color: "text-yellow-600",
                      bgColor: "border-slate-200/85 hover:border-yellow-500 hover:shadow-yellow-500/5"
                    },
                    {
                      title: "Real-time notifications by SMS & email",
                      desc: "Alerts you and your team instantly once a lead is qualified so you can review details and lock in the booking.",
                      color: "text-emerald-600",
                      bgColor: "border-slate-200/85 hover:border-emerald-500 hover:shadow-emerald-500/5"
                    },
                    {
                      title: "Track jobs recovered and revenue won",
                      desc: "Visualise exact earnings, conversion rates, and volume through a clean, intuitive, mobile-friendly dashboard.",
                      color: "text-purple-600",
                      bgColor: "border-slate-200/85 hover:border-purple-500 hover:shadow-purple-500/5"
                    }
                  ].map((card, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 6 }}
                      className={`flex gap-3.5 p-4 rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${card.bgColor} group cursor-pointer`}
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all duration-300">
                        <Check className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-black text-navy-base group-hover:text-blue-600 transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-[11px] font-semibold text-slate-500 leading-normal">
                          {card.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Mockup Display Column (Aesthetic Upgrades: clean, premium light grid design) */}
              <div className="lg:col-span-7 relative">

                {/* 3 mini stats cards floated behind (Light Mode Glassmorphism) */}
                <div className="hidden md:grid grid-cols-3 gap-4 absolute top-[-60px] left-0 right-0 z-0">

                  {/* Card 1 */}
                  <div className="bg-white/95 border border-slate-200/80 rounded-xl p-4 shadow-md hover:border-blue-500/50 hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 group-hover:text-blue-600 transition-colors">Missed Calls</span>
                      <PhoneOff className="w-4 h-4 text-slate-400 animate-pulse" />
                    </div>
                    <div className="text-2xl font-black text-navy-base">{missedCallsCount}</div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white/95 border border-slate-200/80 rounded-xl p-4 shadow-md hover:border-blue-500/50 hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 group-hover:text-blue-600 transition-colors">Jobs Recovered</span>
                      <div className="text-slate-400 font-extrabold text-sm animate-pulse">$</div>
                    </div>
                    <div className="text-2xl font-black text-navy-base">{jobsRecoveredCount}</div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white/95 border border-slate-200/80 rounded-xl p-4 shadow-md hover:border-blue-500/50 hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 group-hover:text-blue-600 transition-colors">Revenue Won</span>
                      <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-2xl font-black text-emerald-600">${revenueWonCount.toLocaleString()}</div>
                  </div>

                </div>

                {/* Dashboard & Phone Layout Container */}
                <div className="relative mt-8 md:mt-16 flex flex-col md:flex-row gap-6 items-end z-10">

                  {/* Laptop Mockup Box (Light modern SaaS theme) */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xl flex-grow w-full md:w-2/3">
                    {/* Top window dots */}
                    <div className="flex gap-1.5 pb-2.5 mb-2.5 border-b border-slate-100">
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <span className="text-[9px] text-slate-400 ml-4 font-semibold font-mono">dashboard.tradycall.com</span>
                    </div>

                    {/* Dashboard body grid */}
                    <div className="grid grid-cols-12 gap-3 min-h-[220px]">
                      {/* Side panel mockup (Clickable interactive tabs) */}
                      <div className="col-span-3 border-r border-slate-100 pr-2 space-y-1.5">
                        {[
                          { id: 'dashboard', label: 'Dashboard' },
                          { id: 'missed', label: 'Missed Calls' },
                          { id: 'replies', label: 'Replies Sent' },
                          { id: 'settings', label: 'Settings' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full text-left h-6 rounded px-2 text-[9px] font-extrabold transition-all duration-200 ${
                              activeTab === tab.id
                                ? 'bg-blue-600 border border-blue-500 text-white shadow-sm shadow-blue-500/15'
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-navy-base'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Main dashboard body */}
                      <div className="col-span-9 space-y-3">
                        {activeTab === 'dashboard' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-slate-50 rounded p-2 border border-slate-100 text-left">
                                <span className="text-[7px] font-black uppercase text-slate-400 block mb-0.5">Missed Calls</span>
                                <span className="text-xs font-black text-navy-base">{missedCallsCount} 📞</span>
                              </div>
                              <div className="bg-slate-50 rounded p-2 border border-slate-100 text-left">
                                <span className="text-[7px] font-black uppercase text-slate-400 block mb-0.5">Replies Sent</span>
                                <span className="text-xs font-black text-navy-base">{repliesSentCount} 💬</span>
                              </div>
                              <div className="bg-slate-50 rounded p-2 border border-slate-100 text-left">
                                <span className="text-[7px] font-black uppercase text-slate-400 block mb-0.5">Leads Qualified</span>
                                <span className="text-xs font-black text-navy-base">{jobsRecoveredCount} 👤</span>
                              </div>
                            </div>

                            {/* Realistic Animated Mockup Bar Chart (Much more premium and less 'AI wave-like') */}
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 h-28 flex items-end justify-around relative">
                              {chartData.map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-1 group/bar w-6">
                                  <div className="w-2 bg-slate-200 group-hover/bar:bg-blue-600 rounded-full h-16 flex items-end overflow-hidden transition-all duration-300">
                                    <motion.div 
                                      initial={{ height: 0 }}
                                      animate={{ height: `${item.val}%` }}
                                      transition={{ duration: 0.8, delay: i * 0.05 }}
                                      className="w-full bg-blue-500 rounded-full"
                                    />
                                  </div>
                                  <span className="text-[7px] font-bold text-slate-400 group-hover/bar:text-navy-base transition-colors">{item.day}</span>
                                </div>
                              ))}
                              <div className="absolute top-2 left-2 flex gap-1 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[7px] font-black text-slate-500 uppercase tracking-wider">SMS Responses Dispatched</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'missed' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2 text-left"
                          >
                            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div>
                                <span className="text-[8px] font-black text-navy-base block">John Carter — Kew, VIC</span>
                                <span className="text-[7px] text-slate-500">Blocked Drain Enquiry • 10:42 AM</span>
                              </div>
                              <span className="text-[7px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">Replied & Qualified</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div>
                                <span className="text-[8px] font-black text-navy-base block">Sarah Miller — Richmond, VIC</span>
                                <span className="text-[7px] text-slate-500">Hot Water Leak • 09:16 AM</span>
                              </div>
                              <span className="text-[7px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">Replied & Qualified</span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div>
                                <span className="text-[8px] font-black text-navy-base block">Dave Thompson — Hawthorn, VIC</span>
                                <span className="text-[7px] text-slate-500">Emergency Roof Leak • Yesterday</span>
                              </div>
                              <span className="text-[7px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">Replied & Qualified</span>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'replies' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2 text-left"
                          >
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[7px] font-black text-blue-600">To: John Carter (0412 *** 892)</span>
                                <span className="text-[6px] text-slate-400">10:42 AM • Sent Instantly</span>
                              </div>
                              <p className="text-[8px] text-slate-600 font-semibold leading-normal italic">"Hi John! We missed your call. How can we help you today?"</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[7px] font-black text-blue-600">To: Sarah Miller (0488 *** 124)</span>
                                <span className="text-[6px] text-slate-400">09:16 AM • Sent Instantly</span>
                              </div>
                              <p className="text-[8px] text-slate-600 font-semibold leading-normal italic">"Hi Sarah! Sorry we missed your call. We're on a job, how can we help?"</p>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'settings' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2 text-left"
                          >
                            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div>
                                <span className="text-[8px] font-black text-navy-base block">Auto-SMS Response Delay</span>
                                <span className="text-[7px] text-slate-500">Wait 30s before text reply to feel organic</span>
                              </div>
                              <button 
                                onClick={() => setAutoSms(!autoSms)}
                                className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${autoSms ? 'bg-blue-600' : 'bg-slate-300'} flex items-center`}
                              >
                                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform duration-200 ${autoSms ? 'translate-x-3.5' : 'translate-x-0'}`} />
                              </button>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div>
                                <span className="text-[8px] font-black text-navy-base block">Intelligent Qualification</span>
                                <span className="text-[7px] text-slate-500">Automatically qualify location & urgency</span>
                              </div>
                              <button 
                                onClick={() => setQualify(!qualify)}
                                className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${qualify ? 'bg-blue-600' : 'bg-slate-300'} flex items-center`}
                              >
                                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform duration-200 ${qualify ? 'translate-x-3.5' : 'translate-x-0'}`} />
                              </button>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-2">
                              <div>
                                <span className="text-[8px] font-black text-navy-base block">Instant Push Notifications</span>
                                <span className="text-[7px] text-slate-500">Send direct lead alerts via email & SMS</span>
                              </div>
                              <button 
                                onClick={() => setEmailNotif(!emailNotif)}
                                className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ${emailNotif ? 'bg-blue-600' : 'bg-slate-300'} flex items-center`}
                              >
                                <div className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform duration-200 ${emailNotif ? 'translate-x-3.5' : 'translate-x-0'}`} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phone Mockup on the right (Polished to feel exactly like a clean iOS light theme) */}
                  <div className="w-full md:w-1/3 bg-slate-900 border-4 border-slate-800 rounded-3xl p-3 shadow-2xl shrink-0 max-w-[220px] mx-auto md:mx-0">
                    {/* Top pill notch */}
                    <div className="w-16 h-3 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className="w-2.5 h-1 bg-slate-900 rounded-full" />
                    </div>

                    <div className="space-y-3 bg-[#FFFFFF] rounded-2xl p-2.5 min-h-[250px] border border-slate-100">
                      {/* Phone header with live pulsating network status */}
                      <div className="flex justify-between items-center px-1 text-[8px] font-black text-slate-400 border-b border-slate-100 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-100 text-slate-800 text-[6.5px] font-black flex items-center justify-center">‹</span>
                          <div className="text-left">
                            <span className="text-slate-800 font-extrabold text-[8px] block leading-none">ABC Plumbing</span>
                            <span className="text-blue-500 font-bold text-[5.5px] block mt-0.5 animate-pulse">
                              {phoneStep === 0 && "Incoming enquiry..."}
                              {(phoneStep === 1 || phoneStep === 2) && "Auto-SMS responding..."}
                              {phoneStep === 3 && "Qualifying lead details..."}
                              {phoneStep === 4 && "Lead secured! ✓"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping mr-0.5" />
                          <span className="text-[6.5px] font-bold text-slate-400">LTE</span>
                          <span className="text-[7px]">🔋</span>
                        </div>
                      </div>

                      {/* Phone SMS Notification Card (Sleek iOS Style banner alert) */}
                      <motion.div 
                        key={phoneStep}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-slate-100/90 border border-slate-200/50 backdrop-blur-md rounded-xl p-2 shadow-sm mt-1 text-left"
                      >
                        <div className="flex justify-between items-center mb-0.5">
                          <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded bg-blue-600 text-white font-extrabold text-[5.5px] flex items-center justify-center">TC</span>
                            <span className="text-[7px] font-black text-slate-800">TradyCall Alerts</span>
                          </div>
                          <span className="text-[6px] text-slate-400 font-bold">now</span>
                        </div>
                        <p className="text-[7px] font-semibold text-slate-700 leading-normal">
                          {phoneStep === 4 ? "Job Confirmed! 📅 ABC Plumbing scheduled for today at 2:00 PM." : "Lead captured: John Carter (0412 892 411) qualified for Kew, VIC."}
                        </p>
                      </motion.div>

                      {/* Phone SMS replies block (High fidelity light Apple bubbles with layout auto-scroll/slide motion) */}
                      <div className="space-y-2 pt-1 min-h-[160px] flex flex-col justify-end overflow-hidden">
                        
                        {/* Auto-reply from TradyCall */}
                        {phoneStep >= 1 && (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-[#E9E9EB] text-[#1C1C1E] rounded-2xl rounded-tl-none px-2.5 py-1.5 text-[8px] font-semibold max-w-[85%] leading-normal mr-auto text-left shadow-sm"
                          >
                            Hi! Thanks for calling ABC Plumbing. We missed your call. How can we help you?
                          </motion.div>
                        )}

                        {/* Customer message typing indicator */}
                        {phoneStep === 1 && (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#E9E9EB] rounded-2xl rounded-tl-none px-3 py-2 max-w-[40px] mr-auto flex gap-0.5 justify-center items-center py-1 shadow-sm"
                          >
                            <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" />
                            <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce [animation-delay:0.15s]" />
                            <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce [animation-delay:0.3s]" />
                          </motion.div>
                        )}
                        {phoneStep >= 2 && (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-[#007AFF] text-white rounded-2xl rounded-tr-none px-2.5 py-1.5 text-[8px] font-semibold max-w-[85%] ml-auto text-left shadow-sm"
                          >
                            Need a plumber for a blocked drain in Kew this afternoon if possible?
                          </motion.div>
                        )}

                        {/* TradyCall's automated response typing indicator */}
                        {phoneStep === 2 && (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#E9E9EB] rounded-2xl rounded-tl-none px-3 py-2 max-w-[40px] mr-auto flex gap-0.5 justify-center items-center py-1 shadow-sm"
                          >
                            <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce" />
                            <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce [animation-delay:0.15s]" />
                            <span className="w-1 h-1 rounded-full bg-slate-500 animate-bounce [animation-delay:0.3s]" />
                          </motion.div>
                        )}
                        {phoneStep >= 3 && (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-[#E9E9EB] text-[#1C1C1E] rounded-2xl rounded-tl-none px-2.5 py-1.5 text-[8px] font-semibold max-w-[85%] leading-normal mr-auto text-left shadow-sm"
                          >
                            Certainly! We have an opening between 2 PM and 4 PM today. Please reply YES to confirm.
                          </motion.div>
                        )}

                        {/* Customer final confirmation */}
                        {phoneStep >= 4 && (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-[#007AFF] text-white rounded-2xl rounded-tr-none px-2.5 py-1.5 text-[8px] font-semibold max-w-[30%] ml-auto text-left shadow-sm"
                          >
                            YES
                          </motion.div>
                        )}

                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
