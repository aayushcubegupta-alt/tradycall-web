"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export default function DemoConfirmedPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow flex flex-col justify-center">
        {/* Hero Section */}
        <section className="relative bg-[#081225] text-white min-h-[80vh] flex items-center pt-28 pb-20 overflow-hidden">
          {/* Dotted Grid Overlay */}
          <div className="absolute inset-0 dot-grid opacity-[0.16] pointer-events-none z-0" />

          {/* Ambient Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[110px] pointer-events-none z-0" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#0b1f4d] border border-white/10 rounded-[32px] shadow-2xl p-8 sm:p-12 max-w-2xl mx-auto flex flex-col items-center space-y-8"
            >
              {/* Success Badge */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-yellow-accent text-navy-base flex items-center justify-center shadow-md">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight-heading text-white leading-tight">
                  Demo Successfully Booked
                </h1>
                <p className="text-slate-300 text-sm sm:text-base font-semibold leading-relaxed max-w-lg mx-auto">
                  Your TradyCall onboarding session has been scheduled successfully. Check your email for meeting details.
                </p>
              </div>

              {/* Trust badges */}
              <div className="w-full grid grid-cols-2 gap-4 py-4 px-6 border-y border-white/5 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>15-Minute Session</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-accent" />
                  <span>Aussie Support Team</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full pt-2">
                <Link href="/signup" className="flex-1 sm:flex-initial">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 font-black text-sm px-8 py-3.5"
                  >
                    <span>Create Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/" className="flex-1 sm:flex-initial">
                  <Button
                    variant="dark-outline"
                    size="lg"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 font-black text-sm px-8 py-3.5"
                  >
                    <Home className="w-4 h-4 text-white" />
                    <span>Return to Homepage</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
