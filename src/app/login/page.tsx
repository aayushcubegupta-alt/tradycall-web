"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred during login.");
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
          className="w-full max-w-[440px] bg-[#0b1f4d]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative"
        >
          {/* Subtle glow edge accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-2">
              Log in to manage your missed call auto-replies
            </p>
          </div>

          {/* Error message banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs font-semibold leading-relaxed">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[10px] sm:text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold transition-all"
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4.5 h-4.5 rounded bg-white/5 border border-white/10 checked:bg-yellow-accent checked:border-yellow-accent text-navy-base focus:ring-offset-0 focus:ring-0 focus:outline-none cursor-pointer transition-colors"
                />
                <span className="text-[11px] sm:text-xs text-slate-400 group-hover:text-slate-300 font-bold transition-colors">
                  Remember me on this device
                </span>
              </label>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full justify-center flex items-center gap-2 font-black py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-accent/5 hover:shadow-yellow-accent/15 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? "Logging in..." : "Log in to your account"}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </div>
          </form>

          {/* Signup Link footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs sm:text-sm font-semibold text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-yellow-accent font-black hover:underline"
            >
              Sign up free
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer information */}
      <footer className="relative z-10 w-full py-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-500" />
        <span>Secure Trade Portal • TradyCall Automation</span>
      </footer>
    </div>
  );
}
