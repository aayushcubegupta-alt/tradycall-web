"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, ArrowRight, RefreshCw, Edit2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

function VerifyEmailInner() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Resend Countdown Timer State
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      setErrorMsg("Email address is missing. Please sign up again.");
    }
  }, [searchParams]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const val = element.value.replace(/[^0-9]/g, ""); // Allow digits only
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1); // Get last digit typed
    setOtp(newOtp);

    // Auto-advance to next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      
      // If current field is filled, clear it.
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If current field is empty, clear previous field and move focus back.
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
    
    if (pastedData.length >= 6) {
      const newOtp = pastedData.substring(0, 6).split("");
      setOtp(newOtp);
      
      // Focus on last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const token = otp.join("");
    if (token.length < 6) {
      setErrorMsg("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Verify OTP using Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      // 2. Verified successfully! Now record/upsert profiles record
      const user = data.user;
      if (user) {
        const fullName = user.user_metadata?.full_name || "Tradie Partner";
        const businessName = user.user_metadata?.business_name || "TradyCall Client";

        // Query if profile already exists
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!existingProfile) {
          const { error: dbError } = await supabase
            .from("profiles")
            .insert([
              {
                user_id: user.id,
                full_name: fullName,
                business_name: businessName,
                email: user.email || email,
              }
            ]);
            
          if (dbError) {
            console.error("Database Profiles Insert Error Details:", dbError);
            setErrorMsg(`Verification succeeded, but profile creation failed: ${dbError.message} (Code: ${dbError.code || 'unknown'}). Please ensure your public.profiles table exists and the RLS insert policy allows authenticated users.`);
            setIsLoading(false);
            return;
          }
        }
      }

      setSuccessMsg("✓ Email successfully verified!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);

    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred during verification.");
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setResending(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("✓ A fresh 6-digit code has been sent!");
        setCountdown(60);
        setCanResend(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081225] text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Decorative premium glows & dot-grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-yellow-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header bar */}
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
            <Mail className="w-6 h-6" />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Verify Your Email
            </h2>
            <p className="text-slate-350 text-xs sm:text-sm font-semibold mt-2.5 leading-relaxed">
              We&apos;ve sent a 6-digit verification code to<br />
              <strong className="text-white font-extrabold">{email || "your address"}</strong>
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

          {/* OTP Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            
            {/* Input boxes grid */}
            <div className="flex justify-between items-center gap-2 sm:gap-3">
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
                  className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-black text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-all"
                />
              ))}
            </div>

            {/* Verify CTA */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full justify-center flex items-center gap-2 font-black py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-accent/5 hover:shadow-yellow-accent/15 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? "Verifying..." : "Verify Code"}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Button>
            </div>
          </form>

          {/* Actions footer (Resend / Change Email) */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3.5 text-center text-xs sm:text-sm font-semibold">
            
            {/* Resend Action */}
            <div className="text-slate-400">
              Didn&apos;t receive a code?{" "}
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="text-yellow-accent font-black hover:underline cursor-pointer focus:outline-none disabled:opacity-50"
                >
                  {resending ? "Sending..." : "Resend Code"}
                </button>
              ) : (
                <span className="text-slate-500 font-bold">
                  Resend in <strong className="font-extrabold text-slate-400">{countdown}s</strong>
                </span>
              )}
            </div>

            {/* Change Email Action */}
            <div>
              <Link 
                href="/signup" 
                className="inline-flex items-center gap-1 text-slate-550 hover:text-yellow-accent transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Change email address
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center justify-center gap-2 border-t border-white/5">
        <ShieldCheck className="w-4 h-4 text-blue-500" />
        <span>Secure OTP System • TradyCall Security</span>
      </footer>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[#081225] flex flex-col items-center justify-center text-white font-sans">
        <RefreshCw className="w-10 h-10 text-yellow-accent animate-spin" />
        <p className="text-sm font-black uppercase tracking-widest text-slate-400 mt-4">Loading verification...</p>
      </div>
    }>
      <VerifyEmailInner />
    </React.Suspense>
  );
}
