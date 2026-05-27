"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneMissed,
  MessageSquare,
  UserCheck,
  BellRing,
  TrendingUp,
  Moon,
  ShieldCheck,
  Users,
  ThumbsUp,
  HeadphonesIcon,
  CheckCircle2,
  Phone,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Calendar,
  DollarSign,
  Zap,
  Check,
  Plus,
  Award,
  Sparkles,
  CheckCircle,
  TrendingUp as TrendUpIcon,
  ArrowRight,
  Shield,
  Clock,
  Briefcase,
  GitBranch,
  BrainCircuit,
  Mail,
  XCircle,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

// Framer motion animation variants
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

export default function FeaturesPage() {
  // ─── VIDEO CONTROLLER STATES ───
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ─── CHAT LOOP SIMULATOR STATES ───
  const [chatStep, setChatStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setChatStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // ─── INTERACTIVE FEATURES STATES ───
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto rotation of features showcase
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const featuresList = [
    {
      id: 0,
      title: "Missed Call Recovery",
      tagline: "Instantly turn missed calls into booked jobs",
      desc: "When you're on a job or driving, TradyCall immediately intercepts the missed call, logs the customer's phone number, and fires off a personalized response. No voicemail required.",
      badge: "24/7 Interception",
      icon: <Phone className="w-4 h-4" />
    },
    {
      id: 1,
      title: "Instant SMS Replies",
      tagline: "Engage customers before they call a competitor",
      desc: "Within 4 seconds of a missed call, your customer receives a friendly text on behalf of your brand. Our smart system guides them to state their emergency or book a calendar slot directly.",
      badge: "4s Response Time",
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Lead Qualification",
      tagline: "Pre-screen jobs based on urgency & budget",
      desc: "TradyCall asks key qualifying questions: name, location, service type, and urgency. It structures the information into a dispatch-ready sheet, automatically stamping approved jobs.",
      badge: "Fully Automated",
      icon: <UserCheck className="w-4 h-4" />
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      tagline: "Visual tracking of recovered revenue",
      desc: "Monitor your ROI in real time. Track captured calls, qualified leads, and total recovered job value. Watch your revenue climb through our sleek, interactive dashboard.",
      badge: "Live ROI Tracking",
      icon: <TrendingUp className="w-4 h-4" />
    }
  ];


  // ─── INTERACTIVE ROI CALCULATOR STATES ───
  const [missedCalls, setMissedCalls] = useState(8); // per week
  const [avgJobValue, setAvgJobValue] = useState(850); // in dollars

  // ROI Calculations
  const metrics = useMemo(() => {
    // TradyCall recovers approximately 55% more missed calls compared to standard voicemail.
    // Booking rate from recovered leads is typically 50% for trades businesses.
    const weeklyRecoveredJobs = Math.round(missedCalls * 0.55 * 0.50 * 10) / 10;
    const weeklyRevenue = Math.round(weeklyRecoveredJobs * avgJobValue);
    const monthlyRevenue = Math.round(weeklyRevenue * 4.33);
    const annualRevenue = Math.round(weeklyRevenue * 52);

    return {
      jobs: weeklyRecoveredJobs,
      weekly: weeklyRevenue,
      monthly: monthlyRevenue,
      annual: annualRevenue
    };
  }, [missedCalls, avgJobValue]);

  // 6 Smaller pillars features list
  const pillarsFeatures = [
    {
      icon: <Moon className="w-5 h-5 text-indigo-500" />,
      title: "After-Hours Mode",
      desc: "We work after hours, weekends & holidays so you never miss a job."
    },
    {
      icon: <BellRing className="w-5 h-5 text-blue-500" />,
      title: "Team Notifications",
      desc: "Instant alerts via SMS, email or push so your team responds faster."
    },
    {
      icon: <Calendar className="w-5 h-5 text-purple-500" />,
      title: "Booking Integration",
      desc: "Sync with your calendar and booking systems to turn leads into confirmed jobs."
    },
    {
      icon: <GitBranch className="w-5 h-5 text-emerald-500" />,
      title: "Workflow Automation",
      desc: "Automate follow-ups, reminders and job updates to save hours every week."
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-sky-500" />,
      title: "Smart AI Assistant",
      desc: "Natural conversations that sound human and represent your business."
    },
    {
      icon: <Mail className="w-5 h-5 text-rose-500" />,
      title: "Multi-Channel",
      desc: "SMS, email and push notifications all in one powerful platform."
    }
  ];

  // Integrations tool logos list
  const integrations = [
    { name: "ServiceM8", logo: "/reece_logo.svg", isText: true },
    { name: "Jobber", logo: "/clipsal_logo.svg", isText: true },
    { name: "simPRO", logo: "/bunnings_logo.svg", isText: true },
    { name: "Google Calendar", logo: "/globe.svg", isText: false },
    { name: "Outlook Calendar", logo: "/globe.svg", isText: false },
    { name: "Zapier", logo: "/colorbond_logo.svg", isText: true }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Daniel M.",
      company: "All Trade Plumbing",
      quote: "TradyCall is like having a receptionist that never sleeps. We recover so many jobs we used to miss after hours.",
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Sarah T.",
      company: "Sparks Electrical",
      quote: "The instant SMS replies make our business look so professional. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Michael R.",
      company: "TrueBlue Carpentry",
      quote: "We've booked an extra 20+ jobs a month since using TradyCall. Game-changer.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-[#FAF9F6] font-sans">
        {/* Style injection for animations and sliders */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes glowpulse {
            0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); }
          }
          .glow-active {
            animation: glowpulse 3s infinite;
          }
          .ledger-lines {
            background-image: linear-gradient(#e8e6df 1px, transparent 1px);
            background-size: 100% 24px;
          }
          .font-handwriting {
            font-family: 'Reenie Beanie', cursive, 'Caveat', 'Comic Sans MS', sans-serif;
            letter-spacing: 0.5px;
          }
        `}} />

        {/* ─── 1. RESTILLERED LIGHTWEIGHT VIDEO HERO (Dark cinematic theme - background cover) ─── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#081225] text-white">
          
          {/* 1. Video background layer */}
          <video
            ref={videoRef}
            src="/how it works page video.mp4"
            loop
            muted={isMuted}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-[1.03] pointer-events-none"
            style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0, black 160px)', maskImage: 'linear-gradient(to top, transparent 0, black 160px)' }}
          />

          {/* 2. Cinematic overlay & blur */}
          <div className="absolute inset-0 bg-[#081225]/70 backdrop-blur-[2px] pointer-events-none" />
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

          {/* 3. Dotted background grid */}
          <div className="absolute inset-0 dot-grid opacity-[0.1] pointer-events-none z-0" />

          {/* 4. Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-12">
            
            {/* Header Copy (Less text, extremely premium) */}
            <div className="space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] drop-shadow-md">
                Everything you need to capture <span className="text-yellow-accent">every opportunity.</span>
              </h1>
              <p className="text-white/80 text-sm sm:text-[17px] font-medium leading-relaxed max-w-2xl mx-auto tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                TradyCall works 24/7 in the background so you can focus on the job, not on missed calls.
              </p>
            </div>

          </div>

          {/* 5. Premium Unmute Toggle Button (Icon Only - absolute positioned bottom-14 right-10) */}
          <button
            onClick={toggleMute}
            className="absolute bottom-14 right-10 z-50 p-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          {/* 6. SPECTACULAR BLURRY FROSTED GRADIENT MASK (Transitioning to soft next section) */}
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/30 to-transparent pointer-events-none z-20 backdrop-blur-[2px]" />
        </section>

        {/* ─── 2. "POWERFUL FEATURES BUILT FOR TRADIES" (Tactile Showcase & Glass Bento) ─── */}
        <section id="powerful-features" className="bg-[#FAF9F6] py-24 relative overflow-hidden border-b border-slate-200/50">
          {/* Subtle dotted background */}
          <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none z-0" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50/80 border border-blue-100/50 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                OUR CORE CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-[46px] font-black text-navy-base tracking-tight leading-[1.1]">
                Powerful <span className="text-blue-600">features</span> built for tradies
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed max-w-xl mx-auto">
                Automate your dispatch, qualify leads, and watch your revenue scale while you stay focused on the job.
              </p>
            </div>

            {/* Split Interactive Showcase Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
              
              {/* Left Column: Tactile Control Panel (5 columns) */}
              <div className="lg:col-span-5 space-y-3.5">
                {featuresList.map((item, idx) => {
                  const isActive = activeFeature === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveFeature(idx);
                        setIsAutoPlaying(false); // Pause autoplay on manual click
                      }}
                      className={`w-full text-left p-5 sm:p-6 rounded-[24px] border transition-all duration-500 flex items-start gap-4 cursor-pointer relative overflow-hidden group select-none ${
                        isActive
                          ? "bg-white border-slate-200 shadow-[0_12px_32px_rgba(0,0,0,0.03)] scale-[1.015]"
                          : "bg-transparent border-transparent hover:bg-white/40 hover:border-slate-200/40"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-r-full" />
                      )}

                      {/* Icon housing */}
                      <div className={`p-3 rounded-2xl border transition-all duration-300 shrink-0 ${
                        isActive
                          ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/25"
                          : "bg-white border-slate-200 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-700"
                      }`}>
                        {item.icon}
                      </div>

                      {/* Text content block */}
                      <div className="space-y-1 pr-2 flex-grow">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`text-base font-black tracking-tight transition-colors duration-300 ${
                            isActive ? "text-navy-base" : "text-slate-700 group-hover:text-navy-base"
                          }`}>
                            {item.title}
                          </h3>
                          {item.badge && (
                            <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              isActive
                                ? "bg-blue-50 border-blue-100 text-blue-600"
                                : "bg-white border-slate-200 text-slate-400"
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-semibold transition-colors duration-300 ${
                          isActive ? "text-navy-base/80" : "text-slate-450 group-hover:text-slate-500"
                        }`}>
                          {item.tagline}
                        </p>
                        
                        {/* Smooth sliding text details */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pt-2.5"
                            >
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                {item.desc}
                              </p>

                              {/* Autoplay loading indicator line */}
                              {isAutoPlaying && (
                                <div className="mt-4 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                  <motion.div
                                    key={idx}
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 7, ease: "linear" }}
                                    className="h-full bg-blue-600"
                                  />
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Premium Mockup Display (7 columns) */}
              <div className="lg:col-span-7 flex justify-center items-center relative">
                
                {/* Visual backdrop ambient glow rings */}
                <div className="absolute w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none z-0" />
                <div className="absolute w-[250px] h-[250px] bg-yellow-accent/5 rounded-full blur-[80px] pointer-events-none z-0 -bottom-10" />

                {/* Device Frame Window */}
                <div className="relative z-10 w-full max-w-[480px] aspect-[4/3] sm:aspect-square bg-white/20 border border-slate-200/50 rounded-[40px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.02)] backdrop-blur-md flex justify-center items-center overflow-hidden min-h-[440px]">
                  
                  <AnimatePresence mode="wait">
                    {activeFeature === 0 && (
                      <motion.div
                        key="mockup-0"
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -15 }}
                        className="w-full flex justify-center items-center"
                      >
                        {/* Mockup 1: iPhone container mockup */}
                        <div className="w-[260px] h-[480px] bg-[#081225] border-[10px] border-slate-800 rounded-[44px] shadow-2xl relative flex flex-col items-center justify-between p-3.5 select-none overflow-hidden text-white">
                          
                          {/* Notch */}
                          <div className="absolute top-0 w-24 h-4 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#081225] mr-2" />
                            <div className="w-8 h-1 bg-[#081225] rounded-full" />
                          </div>
                          
                          {/* Status Bar */}
                          <div className="w-full flex justify-between items-center px-4 pt-1.5 text-[9px] font-bold text-slate-400 z-40">
                            <span>10:42 AM</span>
                            <div className="flex items-center gap-1">
                              <span>5G</span>
                              <div className="w-3.5 h-2 bg-slate-400 rounded-sm" />
                            </div>
                          </div>

                          {/* Incoming Call info */}
                          <div className="flex-grow w-full flex flex-col justify-between items-center py-8 relative">
                            
                            {/* Inbound caller detail */}
                            <div className="text-center space-y-2 pt-4">
                              <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-slate-350 border border-slate-700 mx-auto text-lg font-bold shadow-md">
                                04
                              </div>
                              <div className="space-y-0.5">
                                <p className="text-base font-black text-white leading-none tracking-wide">0488 923 112</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Brisbane, QLD</p>
                              </div>
                            </div>

                            {/* Alert Call status */}
                            <div className="space-y-2 text-center w-full px-4">
                              <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 rounded-full px-3 py-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase text-rose-400 tracking-wider">Missed Call</span>
                              </div>
                              <p className="text-[10px] text-slate-300 font-semibold max-w-[180px] mx-auto leading-normal">
                                Phone was silent while working on site...
                              </p>
                            </div>

                            {/* Call control action buttons */}
                            <div className="w-full flex justify-around items-center px-4 pt-4 border-t border-slate-800/60">
                              <div className="flex flex-col items-center gap-1">
                                <div className="w-9 h-9 rounded-full bg-rose-600/90 flex items-center justify-center text-white">
                                  <PhoneMissed className="w-4 h-4" />
                                </div>
                                <span className="text-[8px] text-slate-400 font-bold">Decline</span>
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <div className="w-9 h-9 rounded-full bg-emerald-600/90 flex items-center justify-center text-white">
                                  <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-[8px] text-slate-400 font-bold">Accept</span>
                              </div>
                            </div>

                            {/* Animated sliding TradyCall Intervention Alert overlay */}
                            <motion.div
                              initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                              className="absolute top-1 inset-x-0 bg-[#0c1630] border border-blue-500/35 rounded-2xl p-2.5 mx-1 flex items-center gap-2.5 shadow-xl z-50 backdrop-blur-md"
                            >
                              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
                                <Zap className="w-3.5 h-3.5 text-yellow-accent animate-pulse" />
                              </div>
                              <div className="text-left">
                                <span className="text-[8px] font-black uppercase text-blue-400 tracking-widest block leading-none mb-0.5">TradyCall Interceptor</span>
                                <span className="text-[9.5px] text-white font-black block leading-none">SMS Reply Triggered</span>
                                <span className="text-[8px] text-slate-450 block leading-none mt-0.5">Replying to Dave in &lt; 4 seconds...</span>
                              </div>
                            </motion.div>

                          </div>

                          {/* Home bar */}
                          <div className="w-24 h-1 bg-white/20 rounded-full mb-0.5 shrink-0" />
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 1 && (
                      <motion.div
                        key="mockup-1"
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -15 }}
                        className="w-full flex justify-center items-center"
                      >
                        {/* Mockup 2: Phone message chat simulator */}
                        <div className="w-[260px] h-[480px] bg-[#081225] border-[10px] border-slate-800 rounded-[44px] shadow-2xl relative flex flex-col items-center justify-between p-3.5 select-none overflow-hidden text-white">
                          
                          {/* Notch */}
                          <div className="absolute top-0 w-24 h-4 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#081225] mr-2" />
                            <div className="w-8 h-1 bg-[#081225] rounded-full" />
                          </div>
                          
                          {/* Chat header */}
                          <div className="w-full pt-4 pb-2 border-b border-slate-800/80 flex flex-col items-center bg-[#081225]/90 z-30">
                            <div className="flex justify-between items-center w-full px-4 text-[9px] font-bold text-slate-400 mb-2">
                              <span>10:43 AM</span>
                              <div className="flex items-center gap-1">
                                <span>5G</span>
                                <div className="w-3.5 h-2 bg-slate-400 rounded-sm" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-[10px] shadow-inner">
                                🛠️
                              </div>
                              <div className="text-left leading-none">
                                <p className="text-[10px] font-black text-white leading-none">Manly Plumbing Co.</p>
                                <span className="text-[7.5px] font-bold text-emerald-450 uppercase tracking-widest mt-0.5 block">Automated Dispatch</span>
                              </div>
                            </div>
                          </div>

                          {/* Message dialogue bubble loops */}
                          <div className="flex-grow w-full flex flex-col justify-end p-2 space-y-2 overflow-y-auto pb-4">
                            
                            {/* Customer SMS */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="bg-[#242427] text-white border border-white/5 rounded-2xl rounded-bl-sm p-3 text-[9.5px] font-bold max-w-[85%] self-start shadow-md leading-relaxed"
                            >
                              <p className="text-[7px] text-slate-400 font-black uppercase leading-none mb-1">Customer (Dave)</p>
                              G g'day, we've got a burst pipe flooding our laundry in Manly. Can anyone get out here today?
                            </motion.div>

                            {/* TradyCall Intelligent Response */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 1.5 }}
                              className="bg-blue-600 text-white border border-blue-500/20 rounded-2xl rounded-br-sm p-3 text-[9.5px] font-bold max-w-[85%] self-end shadow-md leading-relaxed"
                            >
                              <p className="text-[7px] text-blue-200 font-black uppercase leading-none mb-1 flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5 text-yellow-accent animate-pulse" /> TradyCall Dispatch
                              </p>
                              Hi Dave! Manly Plumbing here. 🛠️ I can book an emergency technician for you between 4 PM and 6 PM today. Would you like me to lock that slot in?
                            </motion.div>

                            {/* Customer confirmation */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 3 }}
                              className="bg-[#242427] text-white border border-white/5 rounded-2xl rounded-bl-sm p-3 text-[9.5px] font-bold max-w-[85%] self-start shadow-md leading-relaxed"
                            >
                              Yes please! That would be a lifesaver.
                            </motion.div>

                            {/* Auto booking locked confirmation */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 4.2 }}
                              className="bg-blue-600 text-white border border-blue-500/20 rounded-2xl rounded-br-sm p-3 text-[9.5px] font-bold max-w-[85%] self-end shadow-md leading-relaxed"
                            >
                              Done! You're booked for 4 PM today. We'll text you when our technician is 15 mins away.
                            </motion.div>
                          </div>

                          {/* Footer inputs */}
                          <div className="w-full pt-1.5 pb-2 border-t border-slate-800/60 flex items-center gap-2 px-2 shrink-0 bg-[#081225]/90 z-20">
                            <div className="flex-grow bg-slate-800 rounded-full px-3 py-1.5 text-[8px] font-semibold text-slate-500 border border-slate-700/30">
                              Text Message
                            </div>
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm font-black text-xs">
                              ↑
                            </div>
                          </div>

                          {/* Home bar */}
                          <div className="w-24 h-1 bg-white/20 rounded-full mb-0.5 shrink-0" />
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 2 && (
                      <motion.div
                        key="mockup-2"
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -15 }}
                        className="w-full flex justify-center items-center"
                      >
                        {/* Mockup 3: Skeuomorphic dispatch clipboard */}
                        <div className="w-[300px] bg-[#e3c7ab] rounded-3xl p-3 shadow-2xl relative border-4 border-[#bda081] flex flex-col overflow-hidden select-none">
                          
                          {/* Wooden Clip element at the top */}
                          <div className="w-[110px] h-7 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-xl border border-slate-650 shadow-md absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                            <div className="w-14 h-1.5 bg-slate-950 rounded-full shadow-inner" />
                          </div>

                          {/* Clipboard Paper container */}
                          <div className="w-full bg-[#FCFAF5] border border-[#dad2c3] rounded-2xl p-5 pt-7 flex flex-col justify-between relative shadow-inner min-h-[350px] text-slate-800">
                            {/* Ledger lines background */}
                            <div className="absolute inset-0 ledger-lines opacity-[0.06] pointer-events-none" />

                            {/* Header details */}
                            <div className="border-b-2 border-slate-350 pb-2 mb-3 flex justify-between items-center relative z-10">
                              <div>
                                <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-wider">JOB DISPATCH</h4>
                                <p className="text-[7.5px] font-bold text-slate-400 uppercase leading-none tracking-widest mt-0.5">TRADYCALL PRE-VETTING</p>
                              </div>
                              <span className="text-[8px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded shadow-sm">Qualified</span>
                            </div>

                            {/* Fields list (Handwritten ledger styles) */}
                            <div className="space-y-3.5 relative z-10 text-[9px] font-black text-slate-650">
                              <div className="flex justify-between items-baseline border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-400 font-extrabold uppercase text-[7.5px]">Client Name:</span>
                                <span className="text-slate-900 font-handwriting text-xs font-semibold">Sarah Jenkins</span>
                              </div>
                              <div className="flex justify-between items-baseline border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-400 font-extrabold uppercase text-[7.5px]">Site Address:</span>
                                <span className="text-slate-900 font-handwriting text-xs font-semibold">42 Pitt St, Sydney NSW</span>
                              </div>
                              <div className="flex justify-between items-baseline border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-400 font-extrabold uppercase text-[7.5px]">Job Needed:</span>
                                <span className="text-rose-600 font-handwriting text-xs font-semibold">Emergency Plumber (Burst laundry pipe)</span>
                              </div>
                              <div className="flex justify-between items-baseline border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-400 font-extrabold uppercase text-[7.5px]">Urgency:</span>
                                <span className="text-rose-650 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded font-black tracking-wide uppercase text-[7.5px]">CRITICAL</span>
                              </div>
                              <div className="flex justify-between items-baseline border-b border-dashed border-slate-200 pb-1">
                                <span className="text-slate-400 font-extrabold uppercase text-[7.5px]">Dispatch Estimate:</span>
                                <span className="text-emerald-600 font-handwriting text-xs font-semibold">Confirmed ($850 - $1,100 approved)</span>
                              </div>
                            </div>

                            {/* Dropping stamp seal */}
                            <motion.div
                              initial={{ scale: 2.2, rotate: -25, opacity: 0 }}
                              animate={{ scale: 1, rotate: -8, opacity: 0.95 }}
                              transition={{ delay: 1.1, type: "spring", damping: 11 }}
                              className="self-center mt-5 border-[3px] border-emerald-500 rounded-2xl px-5 py-2 text-center text-emerald-500 font-black tracking-widest uppercase text-[11px] bg-emerald-500/5 select-none relative rotate-[-8deg] z-20 shadow-[0_4px_12px_rgba(16,185,129,0.15)] glow-active"
                            >
                              DISPATCH APPROVED
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeFeature === 3 && (
                      <motion.div
                        key="mockup-3"
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -15 }}
                        className="w-full flex justify-center items-center"
                      >
                        {/* Mockup 4: Dashboard Analytics (Executive Dark Glass Board) */}
                        <div className="w-[320px] bg-[#070F21] border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden select-none flex flex-col justify-between min-h-[350px]">
                          {/* Glow backdrops */}
                          <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-blue-600/10 rounded-full blur-[55px] pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-[140px] h-[140px] bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

                          {/* Dashboard Header */}
                          <div className="flex justify-between items-center border-b border-white/5 pb-3.5 mb-3.5 relative z-10">
                            <div>
                              <span className="text-[7.5px] font-black uppercase text-blue-400 tracking-widest block leading-none">TradyCall Hub</span>
                              <h4 className="text-[11px] font-black text-white leading-none mt-1">Live Recovery Tracker</h4>
                            </div>
                            <span className="text-[7.5px] font-extrabold text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" /> Active Live
                            </span>
                          </div>

                          {/* Top Metrics Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                            <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-3 flex flex-col justify-between">
                              <span className="text-[7.5px] font-bold text-slate-450 uppercase block mb-1">Jobs Recovered</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-black text-white leading-none">27</span>
                                <span className="text-[7px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-1 py-0.5 rounded leading-none flex items-center">+35%</span>
                              </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/15 rounded-2xl p-3 flex flex-col justify-between">
                              <span className="text-[7.5px] font-bold text-slate-450 uppercase block mb-1">Value Won Back</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-base font-black text-yellow-accent leading-none">$18,450</span>
                              </div>
                            </div>
                          </div>

                          {/* Live logs activity feed */}
                          <div className="space-y-1.5 mb-4 relative z-10">
                            <span className="text-[7.5px] font-black uppercase text-slate-500 tracking-wider block mb-1">Recent Job Activity Feed</span>
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 space-y-1.5 text-[8.5px] font-black">
                              <div className="flex justify-between items-center text-slate-300">
                                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400" /> Manly (Plumbing)</span>
                                <span className="text-emerald-400 font-extrabold">Auto-Booked ($850)</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-350 border-t border-white/[0.03] pt-1">
                                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-blue-405" /> Brisbane (Roofer)</span>
                                <span className="text-slate-200 font-extrabold">Lead Qualified ($2,400)</span>
                              </div>
                              <div className="flex justify-between items-center text-slate-350 border-t border-white/[0.03] pt-1">
                                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400" /> Sydney (Sparky)</span>
                                <span className="text-emerald-400 font-extrabold">SMS Recovered ($650)</span>
                              </div>
                            </div>
                          </div>

                          {/* Dynamic SVG Sparkline Graph */}
                          <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-3 relative z-10 shrink-0">
                            <span className="text-[7px] font-bold text-slate-500 uppercase block mb-1 leading-none">Weekly Revenue Recovery</span>
                            <svg viewBox="0 0 100 22" className="w-full h-8 text-emerald-400 overflow-visible">
                              <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.8, ease: "easeOut" }}
                                d="M 0,20 Q 15,16 30,22 T 60,10 T 85,12 T 100,2"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path d="M 0,20 Q 15,16 30,22 T 60,10 T 85,12 T 100,2 L 100,22 L 0,22 Z" fill="url(#glassGreenGrad)" opacity="0.08" />
                              <circle cx="100" cy="2" r="2" fill="#10B981" />
                              <defs>
                                <linearGradient id="glassGreenGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </div>

            {/* ─── NEW GLASSMORPHIC BENTO GRID OF 6 FEATURES ─── */}
            <div className="mt-20 pt-20 border-t border-slate-200/50">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase bg-blue-50/80 border border-blue-100/50 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                  FULL AUTOMATION ENGINE
                </span>
                <h3 className="text-3xl font-black text-navy-base tracking-tight leading-tight">
                  A complete dispatcher in your pocket
                </h3>
                <p className="text-slate-500 text-sm font-semibold max-w-xl mx-auto leading-relaxed">
                  TradyCall is packed with advanced configurations tailormade to help trade companies run on autopilot.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                
                {/* Bento Card 1 (Span 2): After-Hours Mode */}
                <div className="lg:col-span-2 bg-white/40 backdrop-blur-md border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.005] transition-all duration-300 group overflow-hidden min-h-[280px] relative">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />
                  
                  <div className="space-y-3 mb-6 relative z-10 max-w-lg text-left">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 shrink-0">
                        <Moon className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-navy-base tracking-tight">After-Hours Mode</h4>
                    </div>
                    <p className="text-xs text-slate-550 font-semibold leading-relaxed">
                      We work while you rest. TradyCall automatically handles late-night inquiries, weekends, and holidays, so your business keeps booking around the clock without wake-up calls.
                    </p>
                  </div>

                  {/* Starry Night Mode Toggle visualization */}
                  <div className="w-full bg-[#081225] border border-slate-800 rounded-2xl p-4 flex justify-between items-center mt-2 relative z-10 select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        🌙
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-white leading-none">After-Hours Status</p>
                        <span className="text-[8px] font-bold text-slate-450 leading-none mt-0.5 block">Active & Monitoring</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[8.5px] font-black text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active (6 PM - 7 AM)
                    </div>
                  </div>
                </div>

                {/* Bento Card 2 (Span 1): Team Notifications */}
                <div className="bg-white/40 backdrop-blur-md border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.005] transition-all duration-300 group overflow-hidden min-h-[280px] relative">
                  <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />

                  <div className="space-y-3 mb-6 relative z-10 text-left">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0">
                        <BellRing className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-navy-base tracking-tight">Team Notifications</h4>
                    </div>
                    <p className="text-xs text-slate-550 font-semibold leading-relaxed">
                      Instantly dispatch leads to your crew via SMS or email notifications as soon as jobs are booked.
                    </p>
                  </div>

                  {/* Notification popup bubble */}
                  <div className="space-y-2 relative z-10 select-none">
                    <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
                      <div className="w-6.5 h-6.5 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-600 text-[10px] font-bold">💬</div>
                      <div className="text-left">
                        <span className="text-[7.5px] font-black uppercase text-blue-600 block leading-none mb-0.5">SMS Dispatch</span>
                        <p className="text-[8.5px] font-extrabold text-navy-base leading-none">New Urgent Lead Locked In!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bento Card 3 (Span 1): Booking Sync */}
                <div className="bg-white/40 backdrop-blur-md border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.005] transition-all duration-300 group overflow-hidden min-h-[280px] relative text-left">
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-purple-500/5 rounded-full blur-[45px] pointer-events-none" />

                  <div className="space-y-3 mb-6 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-navy-base tracking-tight">Booking Sync</h4>
                    </div>
                    <p className="text-xs text-slate-550 font-semibold leading-relaxed">
                      Directly updates your calendar (Google, Outlook) and syncs perfectly with your trade CRM dashboards.
                    </p>
                  </div>

                  {/* Sync visual tags */}
                  <div className="flex items-center justify-around gap-2 bg-white/70 border border-slate-200/60 rounded-2xl p-3 relative z-10 select-none shadow-inner">
                    <div className="text-[10px] font-black text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">ServiceM8</div>
                    <span className="text-slate-400 font-bold text-xs animate-pulse">⇄</span>
                    <div className="text-[10px] font-black text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm">simPRO</div>
                  </div>
                </div>

                {/* Bento Card 4 (Span 2): Workflow Automation */}
                <div className="lg:col-span-2 bg-white/40 backdrop-blur-md border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.005] transition-all duration-300 group overflow-hidden min-h-[280px] relative text-left">
                  <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[65px] pointer-events-none" />

                  <div className="space-y-3 mb-6 relative z-10 max-w-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                        <GitBranch className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-navy-base tracking-tight">Workflow Automation</h4>
                    </div>
                    <p className="text-xs text-slate-550 font-semibold leading-relaxed">
                      Configure custom triggers and event streams. TradyCall moves seamlessly from answering, vetting, estimating values, checking team availability, and booking the job.
                    </p>
                  </div>

                  {/* Flow pipeline visual */}
                  <div className="grid grid-cols-4 gap-2 text-center text-[8.5px] font-black text-slate-600 relative z-10 mt-2 select-none">
                    <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 shadow-sm">
                      <div className="text-slate-450 block mb-0.5 text-[7px] font-extrabold">01</div>
                      <span className="text-rose-500 font-bold block">Missed Call</span>
                    </div>
                    <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 shadow-sm">
                      <div className="text-slate-450 block mb-0.5 text-[7px] font-extrabold">02</div>
                      <span className="text-blue-600 font-bold block">Auto SMS</span>
                    </div>
                    <div className="bg-white border border-slate-200/60 rounded-xl p-2.5 shadow-sm">
                      <div className="text-slate-450 block mb-0.5 text-[7px] font-extrabold">03</div>
                      <span className="text-amber-600 font-bold block">Qualified</span>
                    </div>
                    <div className="bg-[#10B981] text-white border border-emerald-500 rounded-xl p-2.5 shadow-md">
                      <div className="text-emerald-100 block mb-0.5 text-[7px] font-bold">04</div>
                      <span className="font-black block">Job Booked</span>
                    </div>
                  </div>
                </div>

                {/* Bento Card 5 (Span 1): Smart AI Assistant */}
                <div className="bg-white/40 backdrop-blur-md border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.005] transition-all duration-300 group overflow-hidden min-h-[280px] relative text-left">
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-sky-500/5 rounded-full blur-[45px] pointer-events-none" />

                  <div className="space-y-3 mb-6 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 shrink-0">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-navy-base tracking-tight">Smart AI Assistant</h4>
                    </div>
                    <p className="text-xs text-slate-550 font-semibold leading-relaxed">
                      Empowered by highly human trade dispatch algorithms that understand emergency trade terms and locations.
                    </p>
                  </div>

                  {/* Pulsing visual neural soundwave */}
                  <div className="flex items-center justify-center gap-1.5 h-10 w-full relative z-10 select-none bg-[#081225] border border-slate-800 rounded-2xl px-4 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["10px", "28px", "10px"] }}
                        transition={{ repeat: Infinity, duration: 1.1 + i * 0.12, ease: "easeInOut" }}
                        className="w-1 bg-sky-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Bento Card 6 (Span 1): Multi-Channel Delivery */}
                <div className="bg-white/40 backdrop-blur-md border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.005] transition-all duration-300 group overflow-hidden min-h-[280px] relative text-left">
                  <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-rose-500/5 rounded-full blur-[45px] pointer-events-none" />

                  <div className="space-y-3 mb-6 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-black text-navy-base tracking-tight">Multi-Channel Delivery</h4>
                    </div>
                    <p className="text-xs text-slate-550 font-semibold leading-relaxed">
                      Receive your dispatch tickets instantly through SMS, email summary dashboards, or webhooks.
                    </p>
                  </div>

                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1.5 relative z-10 select-none">
                    <span className="bg-white border border-slate-200/60 shadow-sm text-slate-700 px-2 py-1 rounded-lg text-[9px] font-black">✉️ Email Alerts</span>
                    <span className="bg-white border border-slate-200/60 shadow-sm text-slate-700 px-2 py-1 rounded-lg text-[9px] font-black">💬 SMS Logs</span>
                    <span className="bg-white border border-slate-200/60 shadow-sm text-slate-700 px-2 py-1 rounded-lg text-[9px] font-black">🔗 CRM Dispatch</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ─── 3. "BEFORE TRADYCALL VS. AFTER TRADYCALL" (Comparison Block) ─── */}
        <section className="bg-slate-900 py-24 relative overflow-hidden text-white border-b border-slate-800">
          {/* Subtle grid layer */}
          <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              
              {/* LEFT SIDE: Before TradyCall (Red / Grayscale Stress) */}
              <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative min-h-[480px]">
                {/* Red stress spotlight glow */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-rose-500 block mb-1">BEFORE TRADYCALL</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Missed calls. Lost jobs. Lost revenue.</h3>
                  </div>

                  {/* Red cross list */}
                  <ul className="space-y-3 font-black text-xs sm:text-sm text-slate-300">
                    {[
                      "Calls go unanswered",
                      "Voicemails never returned",
                      "Leads go to competitors",
                      "Frustrated customers",
                      "Lost revenue"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stressed Tradie image visual (Grayscale technical styling for elite visual premium feel) */}
                <div className="mt-8 relative w-full h-[180px] rounded-xl overflow-hidden shadow-inner border border-white/5 shrink-0">
                  <Image
                    src="/tradie_faq.png"
                    alt="Stressed tradesman in black and white"
                    fill
                    className="object-cover grayscale contrast-[1.25] brightness-75 select-none"
                    style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)', maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
                  />
                  <div className="absolute top-4 right-4 w-7 h-7 bg-rose-500 rounded-full flex items-center justify-center animate-ping">
                    <span className="text-[14px] font-black">!</span>
                  </div>
                </div>
              </div>

              {/* CENTER CONNETOR ARROW PILL */}
              <div className="lg:col-span-2 flex items-center justify-center select-none z-20">
                <div className="w-12 h-12 rounded-full bg-yellow-accent text-navy-base flex items-center justify-center shadow-lg font-black text-xl rotate-90 lg:rotate-0">
                  →
                </div>
              </div>

              {/* RIGHT SIDE: After TradyCall (Green / Color Success) */}
              <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative min-h-[480px]">
                {/* Green success glow */}
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 block mb-1">AFTER TRADYCALL</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Every call captured. More jobs booked.</h3>
                  </div>

                  {/* Green check list */}
                  <ul className="space-y-3 font-black text-xs sm:text-sm text-slate-300">
                    {[
                      "Instant SMS replies",
                      "Leads qualified automatically",
                      "Jobs booked & revenue grown",
                      "Happier customers",
                      "Business grows 24/7"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Happy Tradie Visual (Vibrant full color visual) */}
                <div className="mt-8 relative w-full h-[180px] rounded-xl overflow-hidden shadow-inner border border-white/5 shrink-0">
                  <Image
                    src="/pricing_tradie.png"
                    alt="Happy tradesman in full color"
                    fill
                    className="object-cover select-none brightness-105"
                    style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)', maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
                  />

                  {/* Floating Booking Success Popover */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-emerald-500/30 rounded-xl p-2.5 shadow-xl flex items-center gap-2.5 scale-90 sm:scale-100 z-30 backdrop-blur-sm">
                    <div className="w-6.5 h-6.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase text-emerald-400 block leading-none mb-0.5">New Job Booked!</span>
                      <span className="text-[9px] text-white font-extrabold block leading-none">Bathroom Renovation</span>
                      <span className="text-[8px] text-slate-400 block leading-none mt-0.5">John Smith — $1,850</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ─── 4. "WORKS SEAMLESSLY WITH TOOLS YOU ALREADY USE" (Logos bar) ─── */}
        <section className="bg-white border-b border-slate-200/50 py-10 relative select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              WORKS SEAMLESSLY WITH THE TOOLS YOU ALREADY USE
            </span>
            
            {/* Logo items alignment */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-3 font-black text-sm text-slate-500">
              <span className="border-r border-slate-200 pr-8 md:pr-12 text-slate-800">ServiceM8</span>
              <span className="border-r border-slate-200 pr-8 md:pr-12 text-slate-800">Jobber</span>
              <span className="border-r border-slate-200 pr-8 md:pr-12 text-slate-800">simPRO</span>
              <span className="border-r border-slate-200 pr-8 md:pr-12 text-slate-800">Google Calendar</span>
              <span className="border-r border-slate-200 pr-8 md:pr-12 text-slate-800">Outlook Calendar</span>
              <span className="border-r border-slate-200 pr-8 md:pr-12 text-slate-800">Zapier</span>
              <span className="text-slate-400 font-extrabold">+ More</span>
            </div>
          </div>
        </section>

        {/* ─── 5. INTERACTIVE ROI CALCULATOR (Retained at visual center!) ─── */}
        <section id="roi-calculator" className="bg-[#FAF9F6] py-24 relative overflow-hidden border-b border-slate-200/50">
          <div className="absolute inset-0 dot-grid-dark opacity-[0.04] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase block mb-3">
                REVENUE CALCULATOR
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-tight mb-4">
                See how much you can recover.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed max-w-xl mx-auto">
                Select your typical missed calls and job value to see what TradyCall wins back for you in cold, hard cash.
              </p>
            </div>

            {/* Calculator Card */}
            <div className="max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              
              {/* Sliders */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
                      Missed Calls Per Week
                    </span>
                    <span className="text-2xl font-black text-blue-600">
                      {missedCalls}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-extrabold uppercase">
                    <span>1 missed call</span>
                    <span>50 missed calls</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
                      Average Job Value
                    </span>
                    <span className="text-2xl font-black text-blue-600">
                      ${avgJobValue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={avgJobValue}
                    onChange={(e) => setAvgJobValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-extrabold uppercase">
                    <span>$100 value</span>
                    <span>$5,000 value</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                    <strong>Why this is realistic:</strong> In the building services trade, less than 30% of callers leave a voicemail. TradyCall texts them back within seconds, recovering up to 85% of potential jobs, of which about 50% ultimately book.
                  </p>
                </div>
              </div>

              {/* Calculated Outputs (Dark panel matching mockup style) */}
              <div className="lg:col-span-5 bg-[#091535] rounded-3xl p-8 border border-white/5 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl">
                <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-yellow-accent/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="space-y-6">
                  <span className="text-[9px] font-black uppercase text-yellow-accent tracking-widest block">
                    PROJECTED REVENUE RECOVERED
                  </span>

                  <div className="space-y-1">
                    <span className="text-xs text-slate-450 font-bold block">Recovered Monthly</span>
                    <motion.div
                      key={metrics.monthly}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      className="text-4xl sm:text-[42px] font-black text-white leading-none tracking-tight"
                    >
                      ${metrics.monthly.toLocaleString()}
                    </motion.div>
                  </div>

                  <div className="space-y-1 border-t border-white/10 pt-4">
                    <span className="text-xs text-slate-450 font-bold block">Recovered Annually</span>
                    <motion.div
                      key={metrics.annual}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      className="text-5xl sm:text-[56px] font-black text-yellow-accent leading-none tracking-tight"
                    >
                      ${metrics.annual.toLocaleString()}
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <span>Adds approx. {metrics.jobs} booked jobs / week</span>
                  </div>
                </div>

                <div className="pt-8">
                  <Link href="/demo" className="w-full">
                    <Button variant="primary" className="w-full py-4 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2">
                      <span>Start Recovering Revenue</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── 6. "LOVED BY AUSTRALIAN TRADIES" (Testimonials Row) ─── */}
        <section className="bg-white py-24 relative overflow-hidden border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-navy-base tracking-tight leading-tight">
                Loved by Australian tradies
              </h2>
            </div>

            {/* Testimonials row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, index) => (
                <div key={index} className="bg-[#FAF9F6] border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
                  
                  {/* Quotes detail */}
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="mt-8 border-t border-slate-200/60 pt-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-navy-base leading-none mb-1">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 block leading-none">
                        {item.company}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ─── 7. CINEMATIC BOTTOM CTA BANNER (Trade van at night visual) ─── */}
        <section className="bg-[#081225] py-24 relative overflow-hidden border-b border-white/5">
          {/* Spotlight behind */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-[#121E42]/40 border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left side text copy */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-[40px] font-black text-white tracking-tight leading-tight">
                    Every missed call is <span className="text-yellow-accent">lost revenue.</span>
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Book a free 15-minute demo and see how TradyCall can help your business grow 24/7.
                  </p>
                </div>

                {/* Right side gold CTAs and trust ratings */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-5">
                  <Link href="/demo" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto font-black py-4 uppercase text-xs tracking-wider flex items-center justify-center gap-2">
                      <span>Book Your Free Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    NO LOCK-IN CONTRACTS. CANCEL ANYTIME.
                  </span>

                  {/* High Trust badges */}
                  <div className="flex items-center gap-3 mt-1.5 select-none border-t border-white/5 pt-4 w-full justify-center lg:justify-end">
                    <div className="flex -space-x-1.5 shrink-0">
                      {[
                        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60&q=80"
                      ].map((url, idx) => (
                        <Image
                          key={idx}
                          src={url}
                          alt="Tradie portrait"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full border-2 border-navy-base object-cover"
                        />
                      ))}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-300 block mb-0.5 leading-none">Trusted by 120+ Australian tradies</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                        ))}
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
