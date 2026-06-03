"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  BellRing,
  Calendar,
  Star,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import { trackBookDemoClick } from "@/lib/analytics";

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-transparent text-white pt-28 sm:pt-36 pb-16 sm:pb-28 lg:pb-32 overflow-hidden">

      {/* Dotted Grid Mesh */}
      <div className="absolute top-10 left-0 w-full lg:w-1/2 h-[500px] dot-grid opacity-[0.22] pointer-events-none z-0" />

      {/* Ambient glow blobs */}
      <div className="absolute top-[-100px] left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-yellow-accent/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[72px] font-black tracking-tight-heading leading-[1.05] text-white mb-4 sm:mb-6"
        >
          Turn Missed Calls <br />
          Into <span className="text-yellow-accent">Booked Jobs.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0"
        >
          TradyCall is your AI receptionist that texts missed callers instantly,
          captures leads, and helps you win more jobs — 24/7.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          <Link href="/demo" className="w-full sm:w-auto" onClick={() => trackBookDemoClick("hero")}>
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center gap-2.5 group justify-center text-sm font-black rounded-lg px-8 py-4">
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Book a Free Demo
            </Button>
          </Link>
          <Link href="/#how-it-works" className="w-full sm:w-auto">
            <Button variant="dark-outline" size="lg" className="w-full sm:w-auto flex items-center gap-2.5 group justify-center text-sm font-black rounded-lg px-8 py-4 border-white/20 bg-transparent hover:bg-white/10">
              See How It Works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-16"
        >
          {[
            { icon: <MessageSquare className="w-3.5 h-3.5 text-blue-400" />, label: "15-sec SMS reply" },
            { icon: <BellRing className="w-3.5 h-3.5 text-blue-400" />, label: "Instant notifications" },
            { icon: <DollarSign className="w-3.5 h-3.5 text-blue-400" />, label: "Zero missed revenue" },
          ].map((pill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-sm"
            >
              {pill.icon}
              <span className="text-[11px] sm:text-xs font-bold text-slate-200">{pill.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <div className="flex -space-x-2.5 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=80&h=80&q=80",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80",
            ].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Tradie portrait"
                width={36}
                height={36}
                className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full border-2 border-[#020a21] object-cover"
              />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-accent gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-accent text-yellow-accent" />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-extrabold uppercase tracking-wider">
              4.9/5 from 1,200+ Australian Businesses
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
