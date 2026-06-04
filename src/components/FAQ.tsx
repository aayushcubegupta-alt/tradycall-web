"use client";

import React, { useState } from "react";
import { ChevronDown, MessageSquare, ArrowRight, HelpCircle, Phone, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "What is TradyCall?",
      a: "TradyCall is an AI-powered receptionist built specifically for Australian tradies. It detects missed calls and instantly sends a professional, personalized SMS to secure the lead before they call a competitor.",
    },
    {
      q: "How does the SMS auto-reply work?",
      a: "Within seconds of a missed call, TradyCall sends a customized text message asking the customer about their job requirements. The AI holds a smart, friendly conversation to qualify their request and capture key details.",
    },
    {
      q: "Can I connect it to my existing CRM?",
      a: "Absolutely! TradyCall integrates with popular trade management platforms like Jobber, ServiceM8, ServiceTitan, and standard CRM tools via webhooks or exports.",
    },
    {
      q: "Can I keep my existing phone number?",
      a: "Yes. You don't need to change your number. We set up simple conditional call forwarding so that when you're busy, on a job, or call-waiting, TradyCall catches the missed call instantly.",
    },
    {
      q: "Is there a setup fee?",
      a: "Yes. The one-off setup fee covers custom AI message training, conditional forwarding configuration, integration testing, and hands-on onboarding support to guarantee 100% reliability.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 bg-[#FAF9F6] dark:bg-[#081225] overflow-hidden">
      {/* Premium ambient glows */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-yellow-accent/10 dark:bg-yellow-accent/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Decorative dots grid */}
      <div className="absolute inset-0 dot-grid-dark dark:dot-grid opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">


          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-navy-base dark:text-white tracking-tight leading-[1.1] mb-6"
          >
            Frequently{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-yellow-accent dark:to-yellow-hover bg-clip-text text-transparent">
              Asked Questions
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-medium leading-relaxed"
          >
            Got questions about how TradyCall captures missed calls and automatically turns them into bookings? We have answers.
          </motion.p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Mockup that blends into the background */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[380px] h-[500px] flex flex-col justify-start rounded-[36px] bg-white/30 dark:bg-navy-dark/15 border border-slate-200/50 dark:border-white/5 shadow-2xl p-4 overflow-hidden"
              style={{
                backdropFilter: "blur(12px)",
                maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)"
              }}
            >
              {/* Subtle glass phone notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-200/50 dark:bg-slate-800/60 rounded-full z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              </div>

              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-slate-200/40 dark:border-white/5 pb-3 mb-4 mt-6">
                <div className="w-8 h-8 rounded-full bg-yellow-accent/20 flex items-center justify-center text-yellow-hover dark:text-yellow-accent font-bold text-xs">
                  TC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy-base dark:text-white flex items-center gap-1.5">
                    TradyCall AI 
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">Smart Auto-Response</p>
                </div>
              </div>

              {/* Chat Bubble Container with gentle float effect */}
              <div className="flex flex-col gap-3.5 overflow-y-auto no-scrollbar">
                
                {/* Customer Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-start max-w-[85%]"
                >
                  <div className="bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 rounded-2xl px-3.5 py-2.5 text-xs font-semibold rounded-tl-none leading-relaxed shadow-sm">
                    Hey, are you free for a quick plumbing job in Richmond tomorrow?
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 pl-1">Just missed call • Customer</span>
                </motion.div>

                {/* AI Reply */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col items-end max-w-[85%] self-end"
                >
                  <div className="bg-yellow-accent/15 dark:bg-yellow-accent/10 border border-yellow-accent/25 text-navy-base dark:text-yellow-accent rounded-2xl px-3.5 py-2.5 text-xs font-bold rounded-tr-none leading-relaxed shadow-sm">
                    Hi! I'm currently on a job, but I can help you book this in. What kind of plumbing work do you need done? 🛠️
                  </div>
                  <span className="text-[9px] text-yellow-hover dark:text-yellow-accent/80 mt-1 pr-1 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI Assistant • 3s ago
                  </span>
                </motion.div>

                {/* Customer Message 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-col items-start max-w-[85%]"
                >
                  <div className="bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 rounded-2xl px-3.5 py-2.5 text-xs font-semibold rounded-tl-none leading-relaxed shadow-sm">
                    Need a hot water system replacement. It's leaking.
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 pl-1">Customer</span>
                </motion.div>

                {/* AI Reply 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.9 }}
                  className="flex flex-col items-end max-w-[85%] self-end"
                >
                  <div className="bg-yellow-accent/15 dark:bg-yellow-accent/10 border border-yellow-accent/25 text-navy-base dark:text-yellow-accent rounded-2xl px-3.5 py-2.5 text-xs font-bold rounded-tr-none leading-relaxed shadow-sm">
                    Got it! We can definitely do a hot water replacement tomorrow. Would 9:00 AM or 1:00 PM work better for you? 💧
                  </div>
                  <span className="text-[9px] text-yellow-hover dark:text-yellow-accent/80 mt-1 pr-1 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> AI Assistant • 1s ago
                  </span>
                </motion.div>

              </div>
            </motion.div>
          </div>

          {/* Right Column: Seamless Accordions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="border-t border-slate-200/60 dark:border-slate-800/60 divide-y divide-slate-200/60 dark:divide-slate-800/60">
              {faqs.map((faq, i) => {
                const isOpen = activeIndex === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="relative overflow-hidden transition-colors duration-300"
                  >
                    {/* Active dynamic background blend */}
                    <div 
                      className={`absolute inset-0 bg-yellow-accent/[0.02] dark:bg-yellow-accent/[0.01] transition-opacity duration-500 pointer-events-none ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`} 
                    />

                    <button
                      onClick={() => toggleFAQ(i)}
                      className="w-full flex items-center justify-between py-6 px-4 text-left font-extrabold text-navy-base dark:text-white text-base sm:text-lg transition-colors cursor-pointer group"
                    >
                      <span className="pr-4 leading-snug group-hover:text-blue-600 dark:group-hover:text-yellow-accent transition-colors">
                        {faq.q}
                      </span>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                          isOpen 
                            ? "bg-yellow-accent border-yellow-accent text-navy-base rotate-180" 
                            : "bg-slate-50 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-700/60 text-slate-400 dark:text-slate-400 group-hover:bg-yellow-accent/10 group-hover:border-yellow-accent/30 group-hover:text-yellow-hover dark:group-hover:text-yellow-accent"
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" />
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-4 pb-6 pt-1 text-slate-500 dark:text-slate-400 text-sm sm:text-base font-semibold leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
