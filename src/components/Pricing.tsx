"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, TrendingUp } from "lucide-react";
import Button from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "STARTER",
      subtitle: "For solo owner-operators",
      priceMonthly: 199,
      priceYearly: 159,
      setup: 299,
      roiBadge: "$2,500 / mo",
      bullets: [
        "Australian business number",
        "Real-time missed call detection",
        "Instant SMS auto-replies (15s)",
        "Up to 100 lead recoveries / month",
        "Basic live lead dashboard",
        "Email + SMS lead notifications",
        "Business-hours workflows",
      ],
      ctaText: "Book a Demo",
    },
    {
      name: "GROWTH",
      subtitle: "For growing teams & businesses",
      priceMonthly: 249,
      priceYearly: 199,
      setup: 499,
      roiBadge: "$6,500 / mo",
      plusText: "Everything in Starter, plus:",
      bullets: [
        "Up to 300 lead recoveries / month",
        "AI conversational summaries",
        "Smart qualification & location parsing",
        "Multiple staff SMS notifications",
        "Dynamic after-hours automations",
        "Priority 24/7 client support",
        "One-click CRM exports (ServiceM8)",
        "Advanced team workflows",
      ],
      ctaText: "Book a Demo",
    },
    {
      name: "PRO",
      subtitle: "For larger multi-location crews",
      priceMonthly: 499,
      priceYearly: 399,
      setup: 999,
      roiBadge: "$15,000+ / mo",
      plusText: "Everything in Growth, plus:",
      bullets: [
        "Up to 750 lead recoveries / month",
        "Multi-location setup & routing",
        "Advanced conversational automations",
        "Fully tailored AI qualification",
        "Direct booking integrations (Calendly)",
        "Custom analytics dashboards",
        "Dedicated onboarding manager",
        "Bespoke trade workflows",
      ],
      ctaText: "Book a Demo",
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-28 bg-[#FAF9F6] dark:bg-[#081225] overflow-hidden font-sans relative">
      
      {/* Decorative premium glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-yellow-accent/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ─── Premium Split Header Section ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-20 lg:mb-24">
          
          {/* Header Copy (Left 6 Spans) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Simple Pricing. <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-yellow-accent dark:to-yellow-hover bg-clip-text text-transparent">
                Plans that pay for themselves.
              </span>
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 text-[15px] sm:text-base leading-relaxed font-medium max-w-xl">
              Join hundreds of Australian trade businesses recovering thousands in lost calls every single month. Select the perfect tier for your crew, pay month-to-month, and cancel anytime.
            </p>

            {/* Premium Billing Cycle Switcher Toggle */}
            <div className="flex items-center gap-4 pt-4">
              <span className={`text-sm font-black transition-colors duration-300 ${billingPeriod === "monthly" ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                Monthly
              </span>
              
              <button 
                onClick={() => setBillingPeriod(prev => prev === "monthly" ? "yearly" : "monthly")}
                className="w-14 h-8 bg-navy-base dark:bg-slate-800 rounded-full p-1 relative flex items-center shadow-inner cursor-pointer focus:outline-none"
              >
                <motion.div 
                  layout 
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: billingPeriod === "yearly" ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              
              <span className={`text-sm font-black flex items-center gap-2 transition-colors duration-300 ${billingPeriod === "yearly" ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>
                Yearly
                <span className="text-[10px] font-extrabold tracking-wider text-yellow-hover dark:text-yellow-accent bg-yellow-accent/10 border border-yellow-accent/25 px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* Tradie Success Showcase (Right 6 Spans with new custom Tradie portrait) */}
          <div className="w-full lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* The Cinematic Blended Image Frame */}
            <div 
              className="relative w-full max-w-full sm:max-w-[420px] h-[260px] sm:h-[380px] lg:h-[440px] rounded-2xl sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] mx-auto"
              style={{
                maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)"
              }}
            >
              <img 
                src="/pricing_tradie.png" 
                alt="Successful Australian Trade Business Owner" 
                className="w-full h-full object-cover" 
              />
              
              {/* Dark Vignette Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Stat Overlay 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-10 left-6 right-6 bg-slate-950/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-xl text-left"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-450 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-black tracking-wider text-emerald-450 uppercase leading-none mb-1">PROVEN ROI</p>
                  <p className="text-[12px] sm:text-[13px] font-bold text-white leading-tight">
                    Harrison Decking recovered $6,850 in their first 30 days.
                  </p>
                </div>
              </motion.div>
              
              {/* Floating Badge 2 */}
              <div className="absolute top-4 right-4 bg-yellow-accent text-navy-base text-[10px] font-black tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg border border-yellow-hover/30">
                100% Australian Owned
              </div>
            </div>

            {/* Glowing Accent Dot behind frame */}
            <div className="absolute -top-10 -left-10 w-44 h-44 bg-gradient-to-tr from-yellow-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>

        {/* ─── Luxury Structured Pricing Cards Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const currentPrice = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceYearly;

            return (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-[32px] border transition-all duration-500 flex flex-col justify-between overflow-hidden backdrop-blur-md bg-white/95 dark:bg-[#0B1F4D]/25 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
              >
                
                {/* Unified Premium Card Inner Container */}
                <div>
                  
                  {/* Card Header area (no separate solid background, blends with the card) */}
                  <div className="p-8 text-center relative overflow-hidden pb-4">

                    <h3 className="text-base font-black tracking-[0.2em] mb-1.5 text-navy-base dark:text-white uppercase">
                      {plan.name}
                    </h3>
                    
                    <p className="text-xs font-semibold min-h-[16px] leading-snug text-slate-500 dark:text-slate-400">
                      {plan.subtitle}
                    </p>

                    {/* Pricing Block */}
                    <div className="mt-6 flex items-baseline justify-center">
                      <span className="text-2xl font-light mr-0.5 text-slate-400">$</span>
                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={currentPrice}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="text-5xl font-black tracking-tight text-navy-base dark:text-white"
                        >
                          {currentPrice}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs font-bold ml-1.5 text-slate-500 dark:text-slate-400">
                        /month
                      </span>
                    </div>

                    {/* Highly Premium & Realistic Setup Fee under price */}
                    <p className="text-[11px] font-bold mt-2 text-slate-400 dark:text-slate-500">
                      + ${plan.setup} one-off setup fee
                    </p>

                    {/* Highly Realistic Revenue Recovery under setup fee */}
                    <div className="mt-3.5 text-xs font-extrabold text-blue-650 dark:text-yellow-accent tracking-wide uppercase">
                      Est. revenue recovery: {plan.roiBadge}
                    </div>
                  </div>

                  {/* Bullet list area */}
                  <div className="p-8 pt-4 space-y-5">
                    {plan.plusText && (
                      <p className="text-[10px] font-black tracking-widest uppercase flex items-center gap-2 text-slate-900 dark:text-slate-350">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {plan.plusText}
                      </p>
                    )}
                    <ul className="space-y-4">
                      {plan.bullets.map((bullet, index) => (
                        <li 
                          key={index} 
                          className="flex items-start space-x-3 text-xs font-bold leading-relaxed text-slate-655 dark:text-slate-350"
                        >
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button area */}
                <div className="p-8 pt-0 relative">
                  <Button
                    variant="secondary"
                    className="w-full justify-center py-4 text-xs font-black tracking-widest uppercase shadow-md transition-all hover:scale-[1.02]"
                  >
                    {plan.ctaText}
                  </Button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* High-Conversion Guarantees Footer Bar */}
        <div className="mt-12 sm:mt-20 border-t border-slate-200/60 dark:border-slate-850 pt-8 max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-slate-400 text-xs font-black uppercase tracking-wider text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>100% Risk-Free Guarantee</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-800 hidden sm:block" />
          <span>Cancel Month-to-Month • No Contracts</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-800 hidden sm:block" />
          <span>Setup in under 10 minutes</span>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
