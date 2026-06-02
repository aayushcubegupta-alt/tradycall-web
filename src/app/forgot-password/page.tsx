"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ShieldCheck, ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Forgot password logic not connected yet
  };

  return (
    <div className="min-h-screen bg-[#081225] text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Decorative premium glows & dot-grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header bar with Back to Home */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <Image
            src="/tradycall_logo_v2.png"
            alt="TradyCall Logo"
            width={140}
            height={42}
            priority
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </Link>
        <Link 
          href="/" 
          className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-yellow-accent transition-colors flex items-center gap-1"
        >
          ← Back to homepage
        </Link>
      </header>

      {/* Main Form Box Container */}
      <main className="flex-grow flex items-center justify-center px-4 relative z-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[440px] bg-[#0b1f4d]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative"
        >
          {/* Subtle glow edge accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {submitted ? (
            /* Success State */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-yellow-accent/10 text-yellow-accent border border-yellow-accent/25 flex items-center justify-center mx-auto shadow-lg">
                <Mail className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">Check your email</h3>
                <p className="text-slate-350 text-xs sm:text-sm font-semibold max-w-sm mx-auto leading-relaxed">
                  We&apos;ve sent password reset instructions to <strong>{email}</strong>.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/login" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-yellow-accent hover:underline uppercase tracking-wider">
                  <ChevronLeft className="w-4 h-4" /> Back to login
                </Link>
              </div>
            </div>
          ) : (
            /* Request State */
            <>
              {/* Heading */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Reset your password
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-2">
                  Enter your email address and we&apos;ll send you a recovery link
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="name@business.com.au"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center flex items-center gap-2 font-black py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-accent/5 hover:shadow-yellow-accent/15"
                  >
                    <span>Send password reset link</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </Button>
                </div>
              </form>

              {/* Login Link footer */}
              <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs sm:text-sm font-semibold text-slate-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-yellow-accent font-black hover:underline"
                >
                  Log in instead
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </main>

      {/* Footer information */}
      <footer className="relative z-10 w-full py-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-500" />
        <span>Secure Recovery System • TradyCall Security</span>
      </footer>
    </div>
  );
}
