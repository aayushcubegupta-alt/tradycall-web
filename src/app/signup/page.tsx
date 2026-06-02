"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            business_name: businessName,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
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
          className="w-full max-w-[460px] bg-[#0b1f4d]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative"
        >
          {/* Subtle glow edge accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Create your account
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-2">
              Start recovering missed leads on autopilot in minutes
            </p>
          </div>

          {/* Error message banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs font-semibold leading-relaxed">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4.5 h-4.5" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="John Smith"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
                />
              </div>
            </div>

            {/* Business Name Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                Trade Business Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Briefcase className="w-4.5 h-4.5" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smith Plumbing & Gas"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@business.com.au"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Terms Consent */}
            <p className="text-[10px] text-slate-400 font-medium leading-normal py-1">
              By creating an account, you agree to our{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">Terms of Service</span> and{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">Privacy Policy</span>.
            </p>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full justify-center flex items-center gap-2 font-black py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-accent/5 hover:shadow-yellow-accent/15 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? "Creating account..." : "Create your free account"}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </div>
          </form>

          {/* Login Link footer */}
          <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs sm:text-sm font-semibold text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-yellow-accent font-black hover:underline"
            >
              Log in instead
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer information */}
      <footer className="relative z-10 w-full py-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-500" />
        <span>Secure Sign Up Portal • Aussie Setup Experts</span>
      </footer>
    </div>
  );
}
