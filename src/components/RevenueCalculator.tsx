"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { trackBookDemoClick } from "@/lib/analytics";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2 } from "lucide-react";
import Button from "./ui/Button";

export const RevenueCalculator: React.FC = () => {
  const [missedCalls, setMissedCalls] = useState<number>(8); // per week
  const [avgJobValue, setAvgJobValue] = useState<number>(850); // in dollars

  // ROI Calculations
  const metrics = useMemo(() => {
    // TradyCall recovers approximately 55% more missed calls compared to standard voicemail.
    // Booking rate from recovered leads is typically 50% for trades businesses.
    const weeklyRecoveredJobs = Math.round(missedCalls * 0.55 * 0.50 * 10) / 10;
    const weeklyRevenue = Math.round(weeklyRecoveredJobs * avgJobValue);
    const monthlyRevenue = Math.round(weeklyRevenue * 4.33);
    const annualRevenue = Math.round(weeklyRevenue * 52);

    return {
      jobs: weeklyRecoveredJobs,
      weekly: weeklyRevenue,
      monthly: monthlyRevenue,
      annual: annualRevenue
    };
  }, [missedCalls, avgJobValue]);

  return (
    <section id="roi-calculator" className="bg-[#FAF9F6] py-16 sm:py-24 relative overflow-hidden border-b border-slate-200/50 z-20">
      <div className="absolute inset-0 dot-grid-dark opacity-[0.04] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-black tracking-widest text-blue-600 uppercase block mb-3">
            REVENUE CALCULATOR
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-tight mb-4">
            See how much you can recover.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed max-w-xl mx-auto">
            Select your typical missed calls and job value to see what TradyCall wins back for you in cold, hard cash.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Sliders */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
                  Missed Calls Per Week
                </span>
                <span className="text-2xl font-black text-blue-600">
                  {missedCalls}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={missedCalls}
                onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-extrabold uppercase">
                <span>1 missed call</span>
                <span>50 missed calls</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-slate-800 uppercase tracking-wide">
                  Average Job Value
                </span>
                <span className="text-2xl font-black text-blue-600">
                  ${avgJobValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={avgJobValue}
                onChange={(e) => setAvgJobValue(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-extrabold uppercase">
                <span>$100 value</span>
                <span>$5,000 value</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                <strong>Why this is realistic:</strong> In the building services trade, less than 30% of callers leave a voicemail. TradyCall texts them back within seconds, recovering up to 85% of potential jobs, of which about 50% ultimately book.
              </p>
            </div>
          </div>

          {/* Calculated Outputs (Dark panel matching mockup style) */}
          <div className="lg:col-span-5 bg-[#091535] rounded-3xl p-8 border border-white/5 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl">
            <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-yellow-accent/5 rounded-full blur-[60px] pointer-events-none" />

            <div className="space-y-6">
              <span className="text-[9px] font-black uppercase text-yellow-accent tracking-widest block">
                PROJECTED REVENUE RECOVERED
              </span>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold block">Recovered Monthly</span>
                <motion.div
                  key={metrics.monthly}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className="text-4xl sm:text-[42px] font-black text-white leading-none tracking-tight"
                >
                  ${metrics.monthly.toLocaleString()}
                </motion.div>
              </div>

              <div className="space-y-1 border-t border-white/10 pt-4">
                <span className="text-xs text-slate-400 font-bold block">Recovered Annually</span>
                <motion.div
                  key={metrics.annual}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className="text-5xl sm:text-[56px] font-black text-yellow-accent leading-none tracking-tight"
                >
                  ${metrics.annual.toLocaleString()}
                </motion.div>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span>Adds approx. {metrics.jobs} booked jobs / week</span>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/demo" className="w-full" onClick={() => trackBookDemoClick("calculator")}>
                <Button variant="primary" className="w-full py-4 text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2">
                  <span>Start Recovering Revenue</span>
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RevenueCalculator;
