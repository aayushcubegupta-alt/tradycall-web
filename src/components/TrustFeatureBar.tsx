import React from "react";
import {
  MapPin,
  ShieldCheck,
  Users,
  ThumbsUp,
  HeadphonesIcon,
  Sparkles,
  Smartphone,
  CheckCircle2
} from "lucide-react";

export const TrustFeatureBar: React.FC = () => {
  const points = [
    {
      title: "Australian owned",
      description: "Proudly built for Aussie tradies and service businesses.",
      icon: <MapPin />,
      themeColor: "blue",
    },
    {
      title: "Secure & private",
      description: "Your data is safe with enterprise-grade security.",
      icon: <ShieldCheck />,
      themeColor: "rose",
    },
    {
      title: "Trusted by tradies",
      description: "Join 120+ Australian businesses winning more jobs.",
      icon: <Users />,
      themeColor: "amber",
    },
    {
      title: "No lock-in contracts",
      description: "Stay because it works, not because you're locked in.",
      icon: <ThumbsUp />,
      themeColor: "emerald",
    },
    {
      title: "Local support",
      description: "Real humans. Local team. Always here to help.",
      icon: <HeadphonesIcon />,
      themeColor: "purple",
    },
    {
      title: "Instant setup",
      description: "Go live and start capturing leads in under 10 minutes.",
      icon: <Sparkles />,
      themeColor: "blue",
    },
    {
      title: "No app needed",
      description: "Works instantly via your phone's native SMS and browser.",
      icon: <Smartphone />,
      themeColor: "amber",
    },
    {
      title: "High conversion",
      description: "Designed by sales experts to close and recover more jobs.",
      icon: <CheckCircle2 />,
      themeColor: "emerald",
    },
  ];

  // We repeat the points 3 times to ensure a completely seamless looping marquee across all viewport sizes
  const repeatedPoints = [...points, ...points, ...points];

  return (
    <section className="bg-[#FAF9F6] dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800/80 py-10 overflow-hidden relative z-20">
      
      {/* Endless scroll features marquee container */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-gradient">
        
        {/* The scrolling track - continuously moving with no pauses */}
        <div className="flex animate-marquee gap-14 min-w-full items-center">
          {repeatedPoints.map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-5 px-8 flex-shrink-0 select-none"
            >
              {/* Feature Icon - Clean circular slate design from previous look but upscaled */}
              <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-850 flex items-center justify-center shrink-0 shadow-sm">
                {React.cloneElement(point.icon as React.ReactElement<{ className?: string }>, {
                  className: "w-6 h-6 text-slate-700 dark:text-slate-300"
                })}
              </div>
              
              {/* Feature Text - Larger premium typography */}
              <div className="flex flex-col">
                <h5 className="text-[17px] font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-1">
                  {point.title}
                </h5>
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 leading-snug">
                  {point.description}
                </p>
              </div>

              {/* Separator dots between marquee items */}
              <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800/80 ml-10 shrink-0" />
            </div>
          ))}
        </div>

      </div>

      {/* Edge gradient fade masks */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#FAF9F6] dark:from-slate-950 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#FAF9F6] dark:from-slate-950 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default TrustFeatureBar;
