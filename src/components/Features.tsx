"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
  TrendingUp as TrendUpIcon,
  Sparkles
} from "lucide-react";

export const Features: React.FC = () => {
  // ─── STAGE STATES FOR DYNAMIC LOOPING INTERACTIONS ───
  const [chatStep, setChatStep] = useState(0);
  const [leadStep, setLeadStep] = useState(0);
  const [revenue, setRevenue] = useState(24650);
  const [missedCalls, setMissedCalls] = useState(115);
  const [repliesSent, setRepliesSent] = useState(113);
  const [leadsCaptured, setLeadsCaptured] = useState(84);
  const [jobsBooked, setJobsBooked] = useState(23);
  const [showNotification, setShowNotification] = useState(true);

  // 1. Dynamic typing chat loop (Left Card & Central Phone)
  useEffect(() => {
    const chatInterval = setInterval(() => {
      setChatStep((prev) => (prev + 1) % 5);
    }, 4500);

    return () => clearInterval(chatInterval);
  }, []);

  // 2. Qualifications Rotating Lead Types
  const qualificationLeads = [
    { service: "Hot Water System", urgency: "High", budget: "$450 - $850", location: "Brisbane, QLD", bg: "bg-rose-50 text-rose-600 border-rose-100" },
    { service: "Switchboard Upgrade", urgency: "Medium", budget: "$1,200 - $1,800", location: "Richmond, VIC", bg: "bg-amber-50 text-amber-600 border-amber-100" },
    { service: "Decking Repair", urgency: "High", budget: "$2,500 - $3,500", location: "Manly, NSW", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { service: "Aircon Installation", urgency: "High", budget: "$1,800 - $2,400", location: "Adelaide, SA", bg: "bg-blue-50 text-blue-600 border-blue-100" },
  ];

  useEffect(() => {
    const leadInterval = setInterval(() => {
      setLeadStep((prev) => (prev + 1) % qualificationLeads.length);
    }, 4000);
    return () => clearInterval(leadInterval);
  }, []);

  // 3. Live Revenue Ticker & Metric Incrementer (Realism booster!)
  useEffect(() => {
    const revenueInterval = setInterval(() => {
      // Small realistic live updates to simulate live business activity
      setRevenue((prev) => prev + Math.floor(Math.random() * 4) * 85);
      setMissedCalls((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
      setRepliesSent((prev) => prev + (Math.random() > 0.75 ? 1 : 0));
      setLeadsCaptured((prev) => prev + (Math.random() > 0.8 ? 1 : 0));
      setJobsBooked((prev) => prev + (Math.random() > 0.9 ? 1 : 0));
    }, 6000);

    return () => clearInterval(revenueInterval);
  }, []);

  // 4. Notification Pulsing Trigger
  useEffect(() => {
    const notifInterval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => setShowNotification(true), 600);
    }, 8000);
    return () => clearInterval(notifInterval);
  }, []);

  return (
    <section id="features" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden font-sans">
      {/* Background glow for the header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Header ─── */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-900 tracking-tight leading-tight mb-6">
            Everything you need, <span className="text-blue-600">working while you work.</span>
          </h2>
          <p className="text-slate-500 text-[17px] leading-relaxed font-medium max-w-3xl mx-auto">
            From the first missed call to a booked job. TradyCall makes sure every opportunity is captured, qualified, and followed up—so you never lose another job.
          </p>
        </div>

        {/* ─── Main Bento Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* ─── Left Column (3 spans): Realtime Reply Simulator ─── */}
          <div className="col-span-1 lg:col-span-3 bg-white rounded-[32px] p-8 sm:p-10 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col relative overflow-hidden group">
             {/* Decorative subtle background pattern */}
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.3]" />
             
             <div className="relative z-10 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
                   <PhoneMissed className="w-5 h-5 text-amber-600 animate-pulse" />
                </div>
                <h3 className="text-[26px] font-black text-slate-900 leading-[1.1] tracking-tight mb-3">
                   Never miss <br />another lead
                </h3>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                   We instantly pick up missed calls and text the caller back within seconds automatically.
                </p>
             </div>

             {/* UI Graphic: Live message feed typing loop */}
             <div className="relative z-10 flex-1 flex flex-col justify-end mt-4 min-h-[300px]">
                
                {/* Missed Call Pill */}
                <motion.div 
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="bg-white rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center gap-3 relative z-20 w-[90%] -ml-2"
                >
                   <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                      <Image src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=100&h=100&q=80" alt="Caller" fill className="object-cover" />
                   </div>
                   <div>
                      <p className="text-[13px] font-bold text-slate-900">Missed call</p>
                      <p className="text-[11px] text-slate-500 font-medium">From 0412 345 678</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Just now</p>
                   </div>
                   <div className="absolute -right-2.5 -bottom-2.5 w-7 h-7 bg-rose-500 rounded-full border-[3px] border-white flex items-center justify-center shadow-md animate-bounce">
                      <Phone className="w-3 h-3 text-white" />
                   </div>
                </motion.div>

                {/* Dotted Arrow with animated dash offset */}
                <svg className="absolute left-[30%] top-[30%] w-12 h-16 text-slate-200 pointer-events-none" viewBox="0 0 50 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                   <path d="M 10 0 C 10 40 40 40 40 80" strokeDasharray="4 4" className="animate-[dash_2s_linear_infinite]" style={{ strokeDashoffset: 20 }} />
                   <path d="M 30 70 L 40 80 L 50 70" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>

                {/* TradyCall Reply Pill - Typing Simulator */}
                <div className="bg-white rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 mt-8 relative z-10 w-[95%] self-end">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-[#091535] flex items-center justify-center shrink-0 shadow-sm">
                         <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[12px] font-bold text-blue-600">TradyCall AI</span>
                      <span className="text-[9px] text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded ml-auto">Auto</span>
                   </div>
                   
                   <AnimatePresence mode="wait">
                     {chatStep === 0 ? (
                       <motion.div key="typing" className="flex items-center gap-1 py-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                         <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                         <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                         <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                       </motion.div>
                     ) : (
                       <motion.p key="text" className="text-[12px] font-medium text-slate-700 leading-snug pr-4" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                         Hi! Thanks for calling ABC Plumbing. How can we help you?
                       </motion.p>
                     )}
                   </AnimatePresence>

                   <div className="flex justify-between items-center mt-2.5">
                      <span className="text-[10px] text-slate-400 font-medium">15s ago</span>
                      <span className="text-[10px] text-blue-500 font-black">✓✓</span>
                   </div>
                </div>

                {/* Success Badge */}
                <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl py-2.5 px-4 flex items-center gap-2 w-max shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                   <span className="text-[12px] font-bold text-emerald-700">Replied in 15 seconds</span>
                </div>
             </div>
          </div>

          {/* ─── Center Column (5 spans): Live Interactive Dashboard & Phone ─── */}
          <div className="col-span-1 lg:col-span-5 bg-[#091535] rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(9,21,53,0.25)] overflow-hidden relative border border-slate-800 flex flex-col justify-between">
             {/* Subtle ambient glow behind phone */}
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-accent/10 blur-[80px] rounded-full pointer-events-none" />

             {/* Content */}
             <div className="relative z-10 w-full sm:w-[65%]">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-accent animate-ping" />
                   <span className="text-[10px] font-black tracking-wider text-yellow-accent uppercase">Live Dashboard Feed</span>
                </div>
                
                <h3 className="text-3xl sm:text-[36px] font-black text-white leading-[1.1] tracking-tight mb-4">
                   All your leads. <br />One simple dashboard.
                </h3>
                <p className="text-slate-400 text-[14px] font-medium leading-relaxed mb-8">
                   See every conversation, track response times, and watch missed calls turn into booked jobs in real-time.
                </p>

                {/* Mini Dashboard Grid with Live Counting Tickers */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="bg-[#121E42]/80 border border-white/5 rounded-2xl p-4 transition-all hover:bg-[#121E42] shadow-inner">
                      <span className="text-[11px] text-slate-400 font-bold mb-1 block">Missed Calls</span>
                      <div className="flex items-end gap-2">
                         <motion.span key={missedCalls} initial={{ scale: 1.1, color: "#F59E0B" }} animate={{ scale: 1, color: "#FFFFFF" }} transition={{ duration: 0.3 }} className="text-2xl font-black text-white leading-none">
                           {missedCalls}
                         </motion.span>
                         <span className="text-[10px] font-bold text-rose-400 flex items-center leading-none pb-0.5"><TrendingDown className="w-3 h-3 mr-0.5" />8%</span>
                      </div>
                   </div>
                   <div className="bg-[#121E42]/80 border border-white/5 rounded-2xl p-4 transition-all hover:bg-[#121E42] shadow-inner">
                      <span className="text-[11px] text-slate-400 font-bold mb-1 block">Replies Sent</span>
                      <div className="flex items-end gap-2">
                         <motion.span key={repliesSent} initial={{ scale: 1.1, color: "#10B981" }} animate={{ scale: 1, color: "#FFFFFF" }} transition={{ duration: 0.3 }} className="text-2xl font-black text-white leading-none">
                           {repliesSent}
                         </motion.span>
                         <span className="text-[10px] font-bold text-emerald-400 flex items-center leading-none pb-0.5"><TrendingUp className="w-3 h-3 mr-0.5" />18%</span>
                      </div>
                   </div>
                   <div className="bg-[#121E42]/80 border border-white/5 rounded-2xl p-4 transition-all hover:bg-[#121E42] shadow-inner">
                      <span className="text-[11px] text-slate-400 font-bold mb-1 block">Leads Captured</span>
                      <div className="flex items-end gap-2">
                         <motion.span key={leadsCaptured} initial={{ scale: 1.1, color: "#10B981" }} animate={{ scale: 1, color: "#FFFFFF" }} transition={{ duration: 0.3 }} className="text-2xl font-black text-white leading-none">
                           {leadsCaptured}
                         </motion.span>
                         <span className="text-[10px] font-bold text-emerald-400 flex items-center leading-none pb-0.5"><TrendingUp className="w-3 h-3 mr-0.5" />24%</span>
                      </div>
                   </div>
                   <div className="bg-[#121E42]/80 border border-white/5 rounded-2xl p-4 transition-all hover:bg-[#121E42] shadow-inner">
                      <span className="text-[11px] text-slate-400 font-bold mb-1 block">Jobs Booked</span>
                      <div className="flex items-end gap-2">
                         <motion.span key={jobsBooked} initial={{ scale: 1.1, color: "#10B981" }} animate={{ scale: 1, color: "#FFFFFF" }} transition={{ duration: 0.3 }} className="text-2xl font-black text-white leading-none">
                           {jobsBooked}
                         </motion.span>
                         <span className="text-[10px] font-bold text-emerald-400 flex items-center leading-none pb-0.5"><TrendingUp className="w-3 h-3 mr-0.5" />31%</span>
                      </div>
                   </div>
                </div>

                {/* Big Chart Card with dynamic animating drawing SVG path */}
                <div className="bg-[#121E42] border border-white/5 rounded-2xl p-5 relative overflow-hidden shadow-inner">
                   <div className="flex justify-between items-start mb-6 relative z-10">
                      <div>
                         <span className="text-[11px] text-slate-400 font-bold block mb-1">Jobs booked this month</span>
                         <span className="text-3xl font-black text-white leading-none">27</span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md flex items-center">
                         <TrendingUp className="w-3 h-3 mr-1" />31%
                      </span>
                   </div>
                   {/* Animating Chart Line */}
                   <svg className="w-full h-12 relative z-10 overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                      <motion.path 
                        d="M 0 35 L 30 30 L 60 38 L 90 20 L 120 25 L 150 10 L 180 15 L 200 0" 
                        fill="none" 
                        stroke="#FBBF24" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                      />
                      <circle cx="200" cy="0" r="3" fill="#FBBF24" />
                      <circle cx="150" cy="10" r="3" fill="#FBBF24" />
                      <circle cx="90" cy="20" r="3" fill="#FBBF24" />
                      <circle cx="30" cy="30" r="3" fill="#FBBF24" />
                      <path d="M 0 35 L 30 30 L 60 38 L 90 20 L 120 25 L 150 10 L 180 15 L 200 0 L 200 50 L 0 50 Z" fill="url(#chartGrad2)" opacity="0.15" />
                      <defs>
                         <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FBBF24" stopOpacity="1" />
                            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                          </linearGradient>
                      </defs>
                   </svg>
                </div>
             </div>

             {/* ── Overlapping Realistic CSS Phone with Typing Simulator ── */}
             <div className="hidden sm:block absolute -bottom-[6%] right-[-5%] w-[270px] h-[550px] rounded-[44px] bg-white border-[10px] border-[#1e1e24] shadow-[-20px_20px_50px_rgba(0,0,0,0.45)] flex flex-col ring-1 ring-white/10 z-20 overflow-hidden">
                  {/* Notch / Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[22px] bg-[#1e1e24] rounded-b-2xl z-30 flex items-end justify-center pb-1">
                     <div className="w-10 h-1.5 rounded-full bg-black/40" />
                  </div>
                  
                  {/* Status Bar */}
                  <div className="h-9 w-full flex justify-between items-center px-6 pt-1 shrink-0 bg-slate-50">
                     <span className="text-[10px] font-bold text-slate-800">2:15</span>
                     <div className="flex gap-1 items-center">
                        <svg className="w-3.5 h-3.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        <div className="w-4 h-2 border border-slate-800 rounded-sm p-[1px] relative"><div className="w-[85%] h-full bg-slate-800 rounded-[1px]"/><div className="absolute -right-1 top-0.5 w-0.5 h-0.5 bg-slate-800"/></div>
                     </div>
                  </div>

                  {/* Contact Header */}
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                     <ChevronLeft className="w-4 h-4 text-blue-600" />
                     <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-black text-slate-600 mb-0.5">AP</div>
                        <span className="text-[11px] font-bold text-slate-900 leading-none">ABC Plumbing {">"}</span>
                        <span className="text-[8px] text-slate-400">AI Assistant</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-blue-600 opacity-0" />
                  </div>

                  {/* Chat Area */}
                  <div className="flex-grow p-4 bg-slate-50 flex flex-col gap-2.5 overflow-hidden">
                     
                     {/* TradyCall Msg */}
                     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: chatStep >= 1 ? 1 : 0, scale: chatStep >= 1 ? 1 : 0.9 }} className="bg-[#E9E9EB] text-black px-3 py-2 rounded-2xl rounded-tl-sm text-[10px] max-w-[80%] font-medium self-start shadow-sm leading-snug">
                        Hi! Thanks for calling ABC Plumbing. How can we help you?
                     </motion.div>

                     {/* Client Msg */}
                     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: chatStep >= 2 ? 1 : 0, scale: chatStep >= 2 ? 1 : 0.9 }} className="bg-blue-600 text-white px-3 py-2 rounded-2xl rounded-br-sm text-[10px] max-w-[85%] font-medium self-end shadow-sm leading-snug mt-1">
                        I need someone to fix a hot water system.
                     </motion.div>

                     {/* TradyCall Qualified Reply */}
                     <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: chatStep >= 3 ? 1 : 0, scale: chatStep >= 3 ? 1 : 0.9 }} className="bg-[#E9E9EB] text-black px-3 py-2 rounded-2xl rounded-tl-sm text-[10px] max-w-[85%] font-medium self-start shadow-sm leading-snug mt-1">
                        No worries! Can I grab your name and location?
                     </motion.div>

                     {/* Lead Captured Popover (Overlaps chat dynamically on Step 4) */}
                     <AnimatePresence>
                       {chatStep === 4 && (
                         <motion.div 
                           initial={{ opacity: 0, y: 40, scale: 0.9 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: 20, scale: 0.95 }}
                           transition={{ type: "spring", stiffness: 200, damping: 20 }}
                           className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.18)] border border-slate-100 p-3.5 z-30"
                         >
                            <div className="flex items-center gap-1.5 mb-2.5 border-b border-slate-100 pb-2">
                               <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                               <span className="text-[10px] font-black uppercase text-slate-900 tracking-wider">New Lead Pre-Qualified</span>
                            </div>
                            <div className="space-y-2">
                               <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-slate-500 font-medium">Service</span>
                                  <span className="text-[10px] text-slate-900 font-bold">Hot Water System</span>
                               </div>
                               <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-slate-500 font-medium">Urgency</span>
                                  <span className="text-[10px] text-rose-500 font-bold bg-rose-50 px-1.5 rounded">High</span>
                               </div>
                               <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-slate-500 font-medium">Location</span>
                                  <span className="text-[10px] text-slate-900 font-bold">Brisbane, QLD</span>
                               </div>
                            </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </div>

                  {/* Input Area */}
                  <div className="h-12 border-t border-slate-100 bg-white flex items-center px-4 gap-3 relative z-10 shrink-0">
                     <span className="text-xl text-slate-400 font-light">+</span>
                     <div className="flex-1 h-7 rounded-full border border-slate-200 bg-slate-50 px-3 flex items-center">
                        <span className="text-[11px] text-slate-400">Message...</span>
                     </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[80px] h-1 bg-slate-800 rounded-full z-10" />
             </div>
          </div>

          {/* ─── Right Column (4 spans): Lively, Animating Trust Cards ─── */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
             
             {/* Card 1: Qualify Every Lead (Rotating Dynamic Values!) */}
             <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex-1 flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Users className="w-5 h-5 text-blue-600 animate-pulse" />
                   </div>
                   <div>
                      <h4 className="text-[17px] font-black text-slate-900 mb-1 leading-tight tracking-tight">Qualify every lead</h4>
                      <p className="text-[13px] text-slate-500 font-medium leading-snug">We ask the right questions so you get all the details up front.</p>
                   </div>
                </div>

                {/* Animate Lead Rotation Box */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 min-h-[110px] flex flex-col justify-center">
                   <div className="flex justify-between items-center mb-2"><span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Pre-Qualified Info</span></div>
                   <AnimatePresence mode="wait">
                     <motion.div 
                       key={leadStep}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: 10 }}
                       transition={{ duration: 0.3 }}
                       className="space-y-1"
                     >
                       <div className="flex justify-between items-center"><span className="text-[10px] text-slate-500 font-medium">Service</span><span className="text-[10px] text-slate-900 font-black">{qualificationLeads[leadStep].service}</span></div>
                       <div className="flex justify-between items-center"><span className="text-[10px] text-slate-500 font-medium">Urgency</span><span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${qualificationLeads[leadStep].bg}`}>{qualificationLeads[leadStep].urgency}</span></div>
                       <div className="flex justify-between items-center"><span className="text-[10px] text-slate-500 font-medium">Location</span><span className="text-[10px] text-slate-900 font-black">{qualificationLeads[leadStep].location}</span></div>
                     </motion.div>
                   </AnimatePresence>
                </div>
             </div>

             {/* Card 2: Instant Notifications (Pulsing Slider!) */}
             <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex-1 flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <BellRing className="w-5 h-5 text-amber-600" />
                   </div>
                   <div>
                      <h4 className="text-[17px] font-black text-slate-900 mb-1 leading-tight tracking-tight">Instant notifications</h4>
                      <p className="text-[13px] text-slate-500 font-medium leading-snug">Get real-time alerts so you can respond fast and stay ahead of competitors.</p>
                   </div>
                </div>

                <div className="min-h-[70px] relative flex items-center justify-center">
                  <AnimatePresence>
                     {showNotification && (
                       <motion.div 
                         initial={{ opacity: 0, y: -15, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 15, scale: 0.95 }}
                         transition={{ type: "spring", stiffness: 300, damping: 18 }}
                         className="w-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-slate-100 rounded-xl p-3 relative z-10"
                       >
                          <div className="flex items-center gap-1.5 mb-1.5">
                             <div className="w-4 h-4 bg-[#091535] rounded-md flex items-center justify-center"><BellRing className="w-2.5 h-2.5 text-white animate-pulse" /></div>
                             <span className="text-[9px] font-bold text-slate-900 tracking-wider uppercase">TradyCall Dispatch</span>
                             <span className="text-[9px] text-slate-400 ml-auto">just now</span>
                          </div>
                          <p className="text-[11px] font-bold text-slate-900 leading-tight">New Qualified Lead Captured!</p>
                          <p className="text-[10px] text-slate-500 leading-tight">Tap to confirm water heater booking</p>
                       </motion.div>
                     )}
                  </AnimatePresence>
                </div>
             </div>

             {/* Card 3: Recover More Jobs (Live Realtime Ticker!) */}
             <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex-1 flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <TrendingUp className="w-5 h-5 text-emerald-600 animate-[bounce_3s_infinite]" />
                   </div>
                   <div>
                      <h4 className="text-[17px] font-black text-slate-900 mb-1 leading-tight tracking-tight">Recover more jobs</h4>
                      <p className="text-[13px] text-slate-500 font-medium leading-snug">Turn missed opportunities into booked jobs and grow your revenue.</p>
                   </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center">
                   <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Revenue Recovered Live</span>
                      
                      {/* Live Counter animation */}
                      <motion.span 
                        key={revenue}
                        initial={{ scale: 1.15, color: "#10B981" }}
                        animate={{ scale: 1, color: "#0F172A" }}
                        transition={{ duration: 0.4 }}
                        className="text-[20px] font-black text-slate-900 leading-none block"
                      >
                         ${revenue.toLocaleString()}
                      </motion.span>

                      <span className="text-[9px] font-bold text-emerald-500 flex items-center mt-1"><TrendUpIcon className="w-2.5 h-2.5 mr-0.5"/> 38% <span className="text-slate-400 font-medium ml-1">This Month</span></span>
                   </div>
                   <div className="w-[60px] h-8 relative">
                      {/* Animating Sparkline Path */}
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 60 20" preserveAspectRatio="none">
                         <motion.path 
                           d="M 0 18 L 10 15 L 20 16 L 30 10 L 40 12 L 50 4 L 60 0" 
                           fill="none" 
                           stroke="#10B981" 
                           strokeWidth="2" 
                           strokeLinecap="round" 
                           strokeLinejoin="round" 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                         />
                         <circle cx="60" cy="0" r="2.5" fill="#10B981" className="animate-ping" />
                      </svg>
                   </div>
                </div>
             </div>

             {/* Card 4: After-Hours Coverage (Neon Rotating Moon!) */}
             <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex-1 flex items-center gap-4 justify-between group hover:shadow-md transition-shadow">
                <div className="flex-1 flex gap-4 items-start">
                   <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Moon className="w-5 h-5 text-indigo-600 animate-[spin_12s_linear_infinite]" />
                   </div>
                   <div>
                      <h4 className="text-[17px] font-black text-slate-900 mb-1 leading-tight tracking-tight">After-hours coverage</h4>
                      <p className="text-[13px] text-slate-500 font-medium leading-snug">We work after hours, on weekends and public holidays so you don't miss a thing.</p>
                   </div>
                </div>
                
                {/* 24/7 Glowing Stamp */}
                <div className="shrink-0 bg-white border border-slate-200 shadow-[0_4px_12px_rgba(37,99,237,0.08)] rounded-xl py-2 px-3 rotate-3 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden">
                   <span className="text-[9px] font-black text-blue-600 block text-center uppercase tracking-wider mb-0.5">Coverage</span>
                   <span className="text-[13px] font-black text-slate-900 block text-center uppercase tracking-tight leading-none">ACTIVE</span>
                   <span className="text-[16px] font-black text-blue-600 block text-center leading-none mt-1 animate-pulse">24/7</span>
                   <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
                </div>
             </div>

          </div>
 
        </div>
      </div>
    </section>
  );
};

export default Features;
