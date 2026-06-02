"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  ShieldAlert,
  LogOut, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  PhoneMissed, 
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

interface UserMetadata {
  full_name?: string;
  business_name?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [metadata, setMetadata] = useState<UserMetadata>({});
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Resend Verification State
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [resendErrorMsg, setResendErrorMsg] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          router.push("/login");
          return;
        }

        setUser(user);
        setMetadata(user.user_metadata || {});
        setIsEmailVerified(!!user.email_confirmed_at);
      } catch (err) {
        console.error("Dashboard User Auth Fetch Error:", err);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleResendVerification = async () => {
    if (!user || !user.email) return;
    
    setResending(true);
    setResendStatus("sending");
    setResendErrorMsg("");

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        setResendStatus("error");
        setResendErrorMsg(error.message);
      } else {
        setResendStatus("success");
      }
    } catch (err: any) {
      setResendStatus("error");
      setResendErrorMsg(err?.message || "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081225] flex flex-col items-center justify-center text-white relative font-sans">
        <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none" />
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-10 h-10 text-yellow-accent animate-spin" />
          <p className="text-sm font-black uppercase tracking-widest text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Dashboard Stats Mock Data
  const stats = [
    { val: "134", label: "Missed Calls", icon: <PhoneMissed className="w-5 h-5 text-rose-500" />, desc: "Total captured" },
    { val: "132", label: "Replies Sent", icon: <MessageSquare className="w-5 h-5 text-blue-500" />, desc: "Immediate responses" },
    { val: "98", label: "Leads Qualified", icon: <Zap className="w-5 h-5 text-yellow-accent" />, desc: "Parsed by AI" },
    { val: "$18,450", label: "Revenue Recovered", icon: <TrendingUp className="w-5 h-5 text-emerald-500" />, desc: "Booked jobs", highlight: true }
  ];

  // Dashboard Lead Feed Mock Data
  const leads = [
    { name: "Sarah Jenkins", trade: "Burst laundry pipe", location: "Pitt St, Sydney", value: "$850", time: "12 mins ago", status: "Auto-Booked" },
    { name: "David Miller", trade: "Hot water replacement", location: "Manly, NSW", value: "$1,850", time: "45 mins ago", status: "Qualified" },
    { name: "Cooper Brown", trade: "Switchboard upgrade", location: "Carlton, VIC", value: "$680", time: "2 hrs ago", status: "SMS Sent" }
  ];

  return (
    <div className="min-h-screen bg-[#081225] text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Dynamic premium ambient glows & dot-grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-yellow-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-grow">
        
        {/* ─── 1. DYNAMIC VERIFICATION BANNER ─── */}
        <AnimatePresence>
          {!isEmailVerified && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-md relative z-50 text-left"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0 text-amber-500">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-amber-400 font-bold block sm:inline">Action Required: </span>
                    <span className="text-slate-300">Your email address is unverified. Please confirm your account to activate live call intercepts.</span>
                  </div>
                </div>
                
                {/* Resend button block */}
                <div className="shrink-0 flex items-center gap-4 pl-11 sm:pl-0">
                  {resendStatus === "success" ? (
                    <span className="text-emerald-400 font-black flex items-center gap-1">
                      ✓ Verification email resent!
                    </span>
                  ) : (
                    <button
                      onClick={handleResendVerification}
                      disabled={resending}
                      className="text-yellow-accent font-black hover:text-yellow-hover hover:underline focus:outline-none cursor-pointer flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resending ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        "Resend verification email"
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Error notice */}
              {resendStatus === "error" && (
                <div className="max-w-7xl mx-auto px-4 pb-3 pl-15 text-xs text-rose-400 font-bold">
                  ⚠️ Error: {resendErrorMsg}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── 2. DASHBOARD NAVIGATION HEADER ─── */}
        <header className="border-b border-white/5 bg-[#0b1f4d]/20 backdrop-blur-md py-4 sm:py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <Image
                src="/tradycall_logo_v2.png"
                alt="TradyCall Logo"
                width={130}
                height={39}
                priority
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>

            {/* Profile & Sign out */}
            <div className="flex items-center gap-4">
              
              {/* User Email Indicator */}
              <span className="hidden sm:inline text-xs font-bold text-slate-400">
                {user?.email}
              </span>
              
              {/* Sign out */}
              <button
                onClick={handleSignOut}
                className="p-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 hover:border-rose-500/20 hover:bg-rose-500/5 hover:text-rose-400 transition-all text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* ─── 3. MAIN DASHBOARD CONTENT ─── */}
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 space-y-8 sm:space-y-10">
          
          {/* Dashboard Welcome Profile Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0b1f4d]/25 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative text-left">
            <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-yellow-accent/5 rounded-full blur-[50px] pointer-events-none" />
            
            {/* User Title Info */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Good morning, {metadata.full_name || "Tradie"}! 👋
              </h2>
              <p className="text-slate-450 text-xs sm:text-sm font-semibold flex flex-wrap items-center gap-1.5">
                <span>Answering missed calls for</span>
                <strong className="text-white font-extrabold">{metadata.business_name || "your trade business"}</strong>
              </p>
            </div>

            {/* Verification Status Indicator Badge */}
            <div className="shrink-0 flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-2xl p-3 sm:px-4">
              <div className="text-left">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-0.5 leading-none">
                  Verification Status
                </span>
                {isEmailVerified ? (
                  <span className="text-xs font-black text-emerald-450 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 fill-emerald-500/10 text-emerald-450 shrink-0" />
                    Verified Partner
                  </span>
                ) : (
                  <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    Unverified Email
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats Analytics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`bg-[#0b1f4d]/25 border rounded-3xl p-5 sm:p-6 shadow-md text-left flex flex-col justify-between min-h-[120px] sm:min-h-[140px] relative ${
                  stat.highlight ? "border-yellow-accent/20 bg-yellow-accent/[0.01]" : "border-white/5"
                }`}
              >
                {stat.highlight && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-accent/5 rounded-full blur-2xl pointer-events-none" />
                )}
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sm:text-xs font-black text-slate-450 uppercase tracking-wide leading-none">
                    {stat.label}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10 shrink-0">
                    {stat.icon}
                  </div>
                </div>
                <div className="space-y-0.5 pt-3">
                  <span className={`text-xl sm:text-2xl font-black block leading-none ${
                    stat.highlight ? "text-yellow-accent" : "text-white"
                  }`}>
                    {stat.val}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 leading-none">
                    {stat.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Leads Dispatch Feed Mock Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Live Leads Activity Feed list */}
            <div className="lg:col-span-8 bg-[#0b1f4d]/20 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    Recent Lead Recovery Feed
                  </h3>
                  <p className="text-slate-500 text-[10px] sm:text-xs font-semibold">
                    Real-time missed call qualification captures
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[9px] font-black text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Feeds
                </div>
              </div>

              {/* Feed Items */}
              <div className="space-y-4">
                {leads.map((lead, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-450 text-xs font-black">
                        💬
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                          {lead.name}
                          <span className="inline-flex items-center gap-1 text-[8px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            {lead.time}
                          </span>
                        </h4>
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-1 leading-snug">
                          <strong className="text-rose-400 font-bold">{lead.trade}</strong> — {lead.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 pl-13 sm:pl-0">
                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[9px] text-slate-500 font-bold uppercase block leading-none mb-1">Estimated Value</span>
                        <span className="text-xs sm:text-sm font-black text-yellow-accent leading-none">{lead.value}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-center shrink-0 border ${
                        lead.status === "Auto-Booked" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-450" 
                          : lead.status === "Qualified" 
                          ? "bg-blue-600/15 border-blue-500/20 text-blue-400" 
                          : "bg-white/5 border-white/10 text-slate-300"
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Side panel */}
            <div className="lg:col-span-4 bg-[#0b1f4d]/20 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Quick Settings
                </h3>
                <p className="text-slate-500 text-[10px] sm:text-xs font-semibold">
                  Configure answering templates
                </p>
              </div>

              {/* Action options */}
              <div className="space-y-4 text-xs font-bold text-slate-300">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Answering Mode</span>
                  <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      After-Hours Active
                    </span>
                    <span className="text-[10px] font-black text-yellow-accent uppercase tracking-widest cursor-pointer">Configure</span>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2.5">
                  <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Trade Notifications</span>
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>SMS Alerts to Team</span>
                    <span className="text-emerald-450 font-black uppercase tracking-wider">ON</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-xs pt-1">
                    <span>Weekly PDF summaries</span>
                    <span className="text-emerald-450 font-black uppercase tracking-wider">ON</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Footer information */}
      <footer className="relative z-10 w-full py-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase flex items-center justify-center gap-2 border-t border-white/5">
        <ShieldCheck className="w-4 h-4 text-blue-500" />
        <span>Secure Tradie Dashboard • TradyCall Automation</span>
      </footer>
    </div>
  );
}
