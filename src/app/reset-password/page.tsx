"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, EyeOff, ArrowRight, RefreshCw, KeyRound } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

function ResetPasswordInner() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      setErrorMsg("Email address is missing from the query string.");
    }
  }, [searchParams]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const val = element.value.replace(/[^0-9]/g, ""); // Digits only
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (index < 7 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "");
    
    if (pastedData.length >= 8) {
      const newOtp = pastedData.substring(0, 8).split("");
      setOtp(newOtp);
      
      if (inputRefs.current[7]) {
        inputRefs.current[7].focus();
      }
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const token = otp.join("");
    if (token.length < 8) {
      setErrorMsg("Please enter the complete 8-digit verification code.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Verify recovery OTP code to sign user in temporarily
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "recovery",
      });

      if (verifyError) {
        setErrorMsg(verifyError.message);
        setIsLoading(false);
        return;
      }

      // 2. Verified successfully and signed in! Now update user password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setErrorMsg(updateError.message);
        setIsLoading(false);
        return;
      }

      setSuccessMsg("✓ Password successfully reset!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to reset password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081225] text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Decorative premium glows & dot-grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header */}
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
      </header>

      {/* Main Card */}
      <main className="flex-grow flex items-center justify-center px-4 relative z-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[440px] bg-[#0b1f4d]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative"
        >
          {/* Subtle glow accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Icon Header */}
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-450 flex items-center justify-center mx-auto mb-6 shadow-md">
            <KeyRound className="w-6 h-6" />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Choose New Password
            </h2>
            <p className="text-slate-355 text-xs sm:text-sm font-semibold mt-2 leading-relaxed">
              Enter the recovery code sent to your email and select your new account password
            </p>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs font-semibold leading-relaxed text-left">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-350 text-xs font-black leading-relaxed text-left">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleReset} className="space-y-4">
            
             {/* OTP Section */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block text-left">
                8-Digit Recovery Code
              </label>
              <div className="grid grid-cols-8 gap-1.5 sm:gap-2 max-w-full">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-full h-11 sm:h-13 bg-white/5 border border-white/10 rounded-xl text-center text-base sm:text-lg font-black text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-all min-w-0"
                  />
                ))}
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5 text-left pt-2">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
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
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
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
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full justify-center flex items-center gap-2 font-black py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-accent/5 hover:shadow-yellow-accent/15 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? "Resetting password..." : "Reset password"}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center justify-center gap-2 border-t border-white/5">
        <ShieldCheck className="w-4 h-4 text-blue-500" />
        <span>Secure Password Recovery • TradyCall Security</span>
      </footer>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[#081225] flex flex-col items-center justify-center text-white font-sans">
        <RefreshCw className="w-10 h-10 text-yellow-accent animate-spin" />
        <p className="text-sm font-black uppercase tracking-widest text-slate-400 mt-4">Loading recovery...</p>
      </div>
    }>
      <ResetPasswordInner />
    </React.Suspense>
  );
}
