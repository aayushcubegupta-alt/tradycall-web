"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Play,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  Users,
  Phone,
  PhoneOff,
  ArrowRight,
  Droplet,
  Zap,
  Sun,
  Hammer,
  Lock,
  Wrench,
  Bug,
  Scissors
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

// Framer motion animation configs
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

export default function IndustriesPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* ─── HERO SECTION (Dark Theme with Map and Smartphone Mockups) ─── */}
        <section className="relative bg-[#081225] text-white pt-36 pb-28 overflow-hidden">
          {/* Dotted Grid Mesh Overlay */}
          <div className="absolute inset-0 dot-grid opacity-[0.16] pointer-events-none z-0" />

          {/* Ambient Glows */}
          <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[110px] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column content */}
              <div className="lg:col-span-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase"
                >
                  Built for Tradies. Made for Results.
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight-heading leading-[1.08]"
                >
                  Built for every trade.<br />
                  <span className="text-yellow-accent">Results for your business.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-semibold max-w-xl"
                >
                  TradyCall helps Australian tradies and service businesses capture
                  every missed call, respond instantly, and turn more leads into
                  booked jobs.
                </motion.p>

                {/* Bullets with blue circles */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
                >
                  {[
                    { icon: <Phone className="w-4 h-4 text-blue-400" />, label: "24/7 Missed Call Capture" },
                    { icon: <MessageSquare className="w-4 h-4 text-blue-400" />, label: "Instant SMS Replies" },
                    { icon: <TrendingUp className="w-4 h-4 text-blue-400" />, label: "More Jobs. More Revenue." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-lg">
                        {item.icon}
                      </div>
                      <span className="text-xs font-black text-slate-200 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Hero CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4 pt-4"
                >
                  <Link href="/demo">
                    <Button variant="primary" className="flex items-center gap-2 font-black rounded-lg px-6 py-3.5 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4" />
                      Book a Free Demo
                    </Button>
                  </Link>
                  <Link href="/#how-it-works">
                    <Button variant="dark-outline" className="flex items-center gap-2 font-black rounded-lg px-6 py-3.5 text-xs sm:text-sm bg-transparent border-white/20 hover:bg-white/10">
                      See How It Works
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right Column visual display */}
              <div className="lg:col-span-6 relative flex items-center justify-center h-[400px] md:h-[450px]">
                
                {/* SVG Silhouette Map of Australia behind */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none transform scale-110 z-0 text-blue-400">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M12,48 C16,46 22,46 25,43 C28,40 32,42 35,40 C38,38 41,32 46,32 C51,32 55,34 59,31 C63,28 66,24 72,25 C78,26 84,21 88,24 C92,27 94,32 95,37 C96,42 90,44 88,48 C86,52 89,57 87,62 C85,67 80,72 78,77 C76,82 70,83 67,81 C64,79 61,74 57,75 C53,76 49,81 44,80 C39,79 37,73 34,71 C31,69 26,67 22,69 C18,71 14,75 11,70 C8,65 11,59 10,54 C9,49 8,50 12,48 Z" />
                  </svg>
                </div>

                {/* Double mockup display (Smartphone + floating Stats Panel) */}
                <div className="relative w-full max-w-[480px] h-full flex items-center z-10">
                  
                  {/* Smartphone Mockup on Left */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-[200px] sm:w-[220px] bg-[#0c0d12] border-4 border-slate-700 rounded-3xl p-3 shadow-2xl absolute left-2 sm:left-4 z-20 shrink-0"
                  >
                    {/* Notch */}
                    <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className="w-2.5 h-1 bg-slate-800 rounded-full" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1 text-[8px] font-black text-slate-400">
                        <span>10:42</span>
                        <span>LTE 🔋</span>
                      </div>

                      {/* SMS notification bubble */}
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10 shadow-lg">
                        <div className="flex justify-between items-center mb-0.5">
                          <div className="flex items-center gap-1">
                            <div className="w-3.5 h-3.5 rounded bg-yellow-accent flex items-center justify-center text-[7px] font-black text-navy-base">
                              TC
                            </div>
                            <span className="text-[8px] font-extrabold text-white">TradyCall</span>
                          </div>
                          <span className="text-[6px] text-slate-400 font-bold">now</span>
                        </div>
                        <p className="text-[7px] font-semibold text-slate-200 leading-normal">
                          Hi! Thanks for calling ABC Plumbing. We missed your call. How
                          can we help you? Reply STOP to opt out.
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <div className="bg-blue-600 text-white rounded-xl rounded-tr-none px-2 py-1.5 text-[7px] font-semibold max-w-[85%] ml-auto">
                          Need a plumber for a blocked drain in Kew this afternoon?
                        </div>
                        <div className="bg-white/10 text-white rounded-xl rounded-tl-none px-2 py-1.5 text-[7px] font-semibold max-w-[85%]">
                          No worries! We can fit you in between 2 PM and 4 PM. Reply YES to book.
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Stats Panel on Right */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-[220px] sm:w-[240px] dark-glass-card rounded-2xl p-4 border border-white/10 shadow-2xl absolute right-2 sm:right-4 z-10"
                  >
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                      <h5 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">This Month</h5>
                      <span className="text-[8px] bg-white/5 border border-white/10 text-slate-300 font-semibold px-2 py-0.5 rounded">This Month ▾</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/5 rounded p-2 border border-white/5">
                        <span className="text-[7px] font-black uppercase text-slate-400 block mb-0.5">Missed Calls</span>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-white">134</span>
                          <span className="text-yellow-accent text-[10px]">📞</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded p-2 border border-white/5">
                        <span className="text-[7px] font-black uppercase text-slate-400 block mb-0.5">Replies Sent</span>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-white">132</span>
                          <span className="text-blue-400 text-[10px]">💬</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded p-2 border border-white/5">
                        <span className="text-[7px] font-black uppercase text-slate-400 block mb-0.5">Leads Captured</span>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-white">98</span>
                          <span className="text-yellow-accent text-[10px]">👤</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded p-2 border border-white/5">
                        <span className="text-[7px] font-black uppercase text-slate-400 block mb-0.5">Jobs Recovered</span>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-white">27</span>
                          <span className="text-emerald-400 text-[10px] font-black">$</span>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard mini line chart */}
                    <div>
                      <h6 className="text-[7px] font-black tracking-widest text-slate-400 uppercase mb-2">Jobs Recovered</h6>
                      <div className="h-16 relative flex items-end">
                        <svg viewBox="0 0 100 30" className="w-full h-full text-blue-500 overflow-visible">
                          <path d="M 0,30 Q 15,22 30,28 T 60,18 T 90,12 T 100,5" fill="none" stroke="#facc15" strokeWidth="1.5" />
                          <circle cx="0" cy="30" r="1.5" fill="#facc15" />
                          <circle cx="30" cy="28" r="1.5" fill="#facc15" />
                          <circle cx="60" cy="18" r="1.5" fill="#facc15" />
                          <circle cx="90" cy="12" r="1.5" fill="#facc15" />
                          <circle cx="100" cy="5" r="1.5" fill="#facc15" />
                        </svg>
                        <div className="absolute top-0 bottom-0 left-0 text-[6px] text-slate-500 font-extrabold flex flex-col justify-between">
                          <span>30</span>
                          <span>15</span>
                          <span>0</span>
                        </div>
                        <div className="absolute bottom-[-10px] left-4 right-0 text-[5px] text-slate-500 font-black flex justify-between">
                          <span>May 1</span>
                          <span>May 8</span>
                          <span>May 15</span>
                          <span>May 22</span>
                          <span>May 29</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ─── SOLUTIONS FOR EVERY TRADE / INDUSTRIES WE SERVE SECTION ─── */}
        <section id="solutions" className="relative bg-[#FAF9F6] text-navy-base py-24 overflow-hidden">
          <div className="absolute inset-0 dot-grid-dark opacity-[0.05] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 bg-blue-600/10 text-blue-600 px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                Solutions for Every Trade
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight-heading text-navy-base">
                Industries <span className="text-blue-600">we serve</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
                Whether you're taking calls on-site, after hours, or on the go,
                TradyCall makes sure you never miss an opportunity.
              </p>
            </div>

            {/* Grid of 8 industries (4x2 on desktop) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              
              {/* Card 1: Plumbers */}
              <motion.div
                variants={fadeInUp}
                id="plumbers"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="Plumbing"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Droplet className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">Plumbers</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Capture emergency calls and new job enquiries, even when
                      you're on-site or under the floor.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 2: Electricians */}
              <motion.div
                variants={fadeInUp}
                id="electricians"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="Electrical"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Zap className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">Electricians</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Never miss urgent call-outs or quote requests while you're
                      on the tools.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 3: HVAC */}
              <motion.div
                variants={fadeInUp}
                id="hvac"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="HVAC & Air Conditioning"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Sun className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">HVAC & Air Conditioning</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Stay responsive 24/7 and capture leads for installations,
                      servicing and repairs.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 4: Roofers */}
              <motion.div
                variants={fadeInUp}
                id="roofers"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="Roofers"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Hammer className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">Roofers</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      From leaks to full replacements, make sure every call turns
                      into a booked job.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 5: Locksmiths */}
              <motion.div
                variants={fadeInUp}
                id="locksmiths"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="Locksmiths"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">Locksmiths</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Be there for urgent lockouts anytime, even when you're on
                      another job.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 6: Carpenters */}
              <motion.div
                variants={fadeInUp}
                id="carpenters"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="Carpenters & Builders"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Wrench className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">Carpenters & Builders</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Capture renovation and new build enquiries while you're on-site.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 7: Pest Control */}
              <motion.div
                variants={fadeInUp}
                id="pest-control"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="Pest Control"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Bug className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">Pest Control</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Respond quickly to pest emergencies and secure more bookings.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Card 8: Landscapers */}
              <motion.div
                variants={fadeInUp}
                id="landscapers"
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-300 group flex flex-col h-full scroll-mt-24"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1558904541-efa8c3a30fc9?auto=format&fit=crop&w=400&h=300&q=80"
                    alt="Landscapers"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Scissors className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-black text-navy-base">Landscapers</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                      Turn missed calls into seasonal bookings and keep your schedule full.
                    </p>
                  </div>
                  <Link href="/demo" className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700 pt-1 group/link">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ─── IMPACT STATS BAR ─── */}
        <section className="bg-white py-16 border-y border-slate-200/60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-slate-100/80">
              
              {/* Stat 1 */}
              <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4 p-4 first:pt-0 lg:first:p-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                  <PhoneOff className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-navy-base leading-tight">
                    250,000+
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    Missed calls captured
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4 p-4 pt-8 sm:pt-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-navy-base leading-tight">
                    180,000+
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    Instant replies sent
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4 p-4 pt-8 lg:pt-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-navy-base leading-tight">
                    3,500+
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    Australian businesses
                  </p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4 p-4 pt-8 lg:pt-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 leading-tight">
                    $45M+
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    In recovered jobs
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── BOTTOM CTA BANNER (Dark Navy Card) ─── */}
        <section className="bg-[#FAF9F6] py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0b1f4d] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/5"
            >
              {/* Decorative glows */}
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                
                {/* Left side details */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 max-w-2xl text-center sm:text-left">
                  <div className="w-14 h-14 rounded-full bg-white/10 text-yellow-accent flex items-center justify-center shrink-0 border border-white/10 shadow-lg animate-float">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      See how TradyCall can work<br />for your industry.
                    </h3>
                    <p className="text-slate-300 text-sm font-semibold leading-relaxed">
                      Book a free 15-minute demo and start recovering more jobs
                      from missed calls.
                    </p>
                  </div>
                </div>

                {/* Right side CTA Button and Social proof */}
                <div className="shrink-0 flex flex-col items-center lg:items-end gap-4 w-full sm:w-auto">
                  <Link href="/demo" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 group font-black">
                      Book Your Free Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  {/* Social proof portraits */}
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&h=60&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60&q=80"
                      ].map((url, idx) => (
                        <Image
                          key={idx}
                          src={url}
                          alt="Tradie avatar"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full border border-[#0b1f4d] object-cover"
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

      </main>

      <Footer />
    </>
  );
}
