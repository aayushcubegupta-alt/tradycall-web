"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneMissed,
  MessageSquare,
  UserCheck,
  BellRing,
  CheckCircle2,
  Phone,
  ChevronLeft,
  Video,
  Info,
  ArrowRight,
  Zap,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  FileText,
  Calendar,
  ShieldCheck,
  Sparkles,
  Layers
} from "lucide-react";
import Image from "next/image";

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Bulletproof IntersectionObserver to track scroll intersection and sync the active step
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px", // focus on the middle band of the viewport (wider, more reliable scroll intersection)
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-step-index") || "0", 10);
          setActiveStep(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const stepElements = document.querySelectorAll("[data-step-index]");
    stepElements.forEach((el) => observer.observe(el));

    return () => {
      stepElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const steps = [
    {
      id: 0,
      number: "01",
      tagline: "STEP 1 • DETECTION",
      title: "Missed Call Detected",
      description: "A potential client dials your business. You're busy on-site, in a meeting, or driving. TradyCall instantly registers the missed call in real-time.",
      icon: <PhoneMissed />,
      themeColor: "rose",
    },
    {
      id: 1,
      number: "02",
      tagline: "STEP 2 • ENGAGEMENT",
      title: "Instant SMS Auto-Reply",
      description: "Within 15 seconds, TradyCall sends a customized, friendly SMS back. It stops the prospect from immediately clicking back to Google to call your competitor.",
      icon: <MessageSquare />,
      themeColor: "blue",
    },
    {
      id: 2,
      number: "03",
      tagline: "STEP 3 • QUALIFICATION",
      title: "AI Qualifies the Lead",
      description: "Our conversational AI texts back and forth with the customer, capturing their exact job type, location, urgency, and estimated budget without you lifting a finger.",
      icon: <UserCheck />,
      themeColor: "amber",
    },
    {
      id: 3,
      number: "04",
      tagline: "STEP 4 • NOTIFICATION",
      title: "You Get Notified Instantly",
      description: "The complete, pre-qualified job details are dispatched straight to your phone. Tap to view custom analytics and see the customer details on your admin feed.",
      icon: <BellRing />,
      themeColor: "purple",
    },
    {
      id: 4,
      number: "05",
      tagline: "STEP 5 • CONVERSION",
      title: "Job Recovered & Secured",
      description: "Confirm the booking, send it straight to your calendar, and recover thousands in lost revenue. You just won a new client while working on another job.",
      icon: <CheckCircle2 />,
      themeColor: "emerald",
    },
  ];

  const getThemeClasses = (theme: string, isActive: boolean) => {
    if (!isActive) return {
      iconBg: "bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800",
      pillBg: "bg-transparent",
      pillText: "text-slate-400 dark:text-slate-500",
      line: "bg-transparent",
    };

    switch (theme) {
      case "rose": return { iconBg: "bg-gradient-to-tr from-[#FF0A43] to-[#FF527B] shadow-[0_10px_30px_rgba(255,10,67,0.3)]", pillBg: "bg-[#FF0A43]/10 border-[#FF0A43]/20", pillText: "text-[#FF0A43]", line: "bg-[#FF0A43]" };
      case "blue": return { iconBg: "bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] shadow-[0_10px_30px_rgba(37,99,237,0.3)]", pillBg: "bg-[#2563EB]/10 border-[#2563EB]/20", pillText: "text-[#2563EB]", line: "bg-[#2563EB]" };
      case "amber": return { iconBg: "bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] shadow-[0_10px_30px_rgba(245,158,11,0.3)]", pillBg: "bg-[#F59E0B]/10 border-[#F59E0B]/20", pillText: "text-[#F59E0B]", line: "bg-[#F59E0B]" };
      case "purple": return { iconBg: "bg-gradient-to-tr from-[#8B5CF6] to-[#A78BFA] shadow-[0_10px_30px_rgba(139,92,246,0.3)]", pillBg: "bg-[#8B5CF6]/10 border-[#8B5CF6]/20", pillText: "text-[#8B5CF6]", line: "bg-[#8B5CF6]" };
      case "emerald": return { iconBg: "bg-gradient-to-tr from-[#10B981] to-[#34D399] shadow-[0_10px_30px_rgba(16,185,129,0.3)]", pillBg: "bg-[#10B981]/10 border-[#10B981]/20", pillText: "text-[#10B981]", line: "bg-[#10B981]" };
      default: return { iconBg: "bg-slate-800", pillBg: "bg-slate-100", pillText: "text-slate-800", line: "bg-slate-800" };
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 bg-[#FDFCFB] dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Intro Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 lg:mb-28">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4 sm:mb-6">
            How <span className="text-blue-600">Trady</span><span className="text-yellow-accent">Call</span> Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Watch our automated AI receptionist text back instantly, qualify client details, and dispatch new leads directly to your dashboard while you stay on the job.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: Steps ── */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-10 lg:space-y-[12vh] pb-0 lg:pb-[25vh] pt-0 lg:pt-[10vh] relative">
            
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const theme = getThemeClasses(step.themeColor, isActive);

              return (
                <div
                  key={step.id}
                  data-step-index={index}
                  className={`relative p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[32px] transition-all duration-700 ${
                    isActive 
                      ? "bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/60 dark:border-slate-800 scale-100 opacity-100" 
                      : "bg-white/45 dark:bg-slate-900/40 shadow-sm border border-slate-200/30 dark:border-slate-800/30 scale-[0.98] opacity-50 hover:opacity-80"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
                     <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${theme.iconBg}`}>
                        {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, {
                          className: `w-7 h-7 transition-all duration-500 ${
                            isActive 
                              ? "text-white scale-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]" 
                              : "text-slate-400 dark:text-slate-600"
                          }`
                        })}
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-3">
                           <span className={`text-[11px] font-black tracking-[0.2em] uppercase ${isActive ? theme.pillText : "text-slate-400"}`}>
                             Step {index + 1}
                           </span>
                           {isActive && <div className={`h-[2px] w-8 rounded-full ${theme.line} opacity-50`} />}
                        </div>
                        <h3 className="text-2xl sm:text-[28px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-[15px] sm:text-base leading-[1.6] font-medium">
                          {step.description}
                        </p>
                        
                        {/* Mobile-only responsive phone frame inline */}
                        <div className="mt-5 lg:hidden w-full max-w-[230px] aspect-[260/563] rounded-[32px] overflow-hidden border-[4px] border-[#1c1c1e] shadow-lg bg-black relative">
                          <img
                            src={
                              step.id === 0 ? "/step1.png?v=3" :
                              step.id === 1 ? "/step2.png?v=3" :
                              step.id === 2 ? "/step3.png?v=3" :
                              step.id === 3 ? "/step4.png?v=3" :
                              "/step5.png?v=3"
                            }
                            alt={`TradyCall Step ${index + 1} Screen`}
                            className="w-full h-full object-fill"
                          />
                        </div>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── RIGHT COLUMN: Sticky Premium Phone Frame ── */}
          <div className="hidden lg:block lg:col-span-6 sticky top-[15vh] self-start flex items-center justify-center pointer-events-none z-20">
            
            {/* Flat Wrapper */}
            <div className="relative flex items-center justify-center overflow-visible z-10">
              
              {/* The Inner Phone Screen (Adjusted aspect ratio and size to prevent clipping/cropping of realism images) */}
              <div className="relative w-[260px] h-[563px] rounded-[42px] bg-black border-[6px] border-[#1c1c1e] overflow-hidden ring-1 ring-white/10 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                
                {/* Dynamic Content based on active step - loaded directly from realism images via CSS cross-fade */}
                <div className="flex-grow w-full h-full relative">
                  {[0, 1, 2, 3, 4].map((stepIdx) => (
                    <img
                      key={stepIdx}
                      src={
                        stepIdx === 0 ? "/step1.png?v=3" :
                        stepIdx === 1 ? "/step2.png?v=3" :
                        stepIdx === 2 ? "/step3.png?v=3" :
                        stepIdx === 3 ? "/step4.png?v=3" :
                        "/step5.png?v=3"
                      }
                      alt={`TradyCall Step ${stepIdx + 1} Screen Mockup`}
                      className={`absolute inset-0 w-full h-full object-fill transition-all duration-500 ${
                        activeStep === stepIdx
                          ? "opacity-100 blur-0 scale-100"
                          : "opacity-0 blur-md scale-95 pointer-events-none"
                      }`}
                    />
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
