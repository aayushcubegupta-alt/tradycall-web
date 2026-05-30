"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { 
  PhoneMissed, 
  MessageSquare, 
  UserCheck, 
  BellRing, 
  CheckCircle2,
  Sparkles,
  Phone,
  PhoneOff,
  User,
  MapPin,
  Wrench,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Check
} from "lucide-react";

export const HowItWorks3D: React.FC = () => {
  // Use global page scroll tracking (completely bulletproof across all layout styles)
  const { scrollYProgress } = useScroll();

  // Use a spring transition for smooth camera movement (feels premium, no jitter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001
  });

  // 1. Dynamic Camera Zooms and Pans mapped to Scroll Progress
  const scale = useTransform(
    smoothProgress, 
    [0, 0.15, 0.35, 0.55, 0.75, 0.90, 0.98, 1.0], 
    [1.12, 1.05, 1.95, 1.70, 1.85, 1.55, 1.15, 1.0]
  );

  const transformOrigin = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.90, 0.98, 1.0],
    [
      "50% 50%", // Initial
      "50% 50%", // Start
      "22% 64%", // Step 1 (Phone zoom-in)
      "43% 73%", // Step 2 (AI Core zoom-in)
      "46% 70%", // Step 3 (AI qualifications orbit)
      "80% 66%", // Step 4 (Tradie / Dashboard)
      "72% 38%", // Step 5 (Service van & Garage)
      "50% 50%"  // Final Ecosystem overview
    ]
  );

  // Dynamic Depth-of-Field Blur simulation
  const blurEffect = useTransform(
    smoothProgress,
    [0, 0.10, 0.20, 0.95, 1.0],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
  );

  // Ambient Vignette intensity (darkens or highlights focus areas)
  const vignetteOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.75, 0.95, 1.0],
    [0.85, 0.5, 0.7, 0.65, 0.5, 0.8]
  );

  // Track active narrative step to update sidebar indicators
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      if (latest < 0.15) {
        setActiveStep(0); // Intro
      } else if (latest >= 0.15 && latest < 0.35) {
        setActiveStep(1); // Step 1
      } else if (latest >= 0.35 && latest < 0.55) {
        setActiveStep(2); // Step 2
      } else if (latest >= 0.55 && latest < 0.75) {
        setActiveStep(3); // Step 3
      } else if (latest >= 0.75 && latest < 0.90) {
        setActiveStep(4); // Step 4
      } else {
        setActiveStep(5); // Step 5 / Final
      }
    });
  }, [smoothProgress]);

  // Story step descriptions
  const steps = [
    {
      id: 1,
      tag: "STEP 1 • DETECTION",
      title: "Missed Call Registered",
      desc: "A customer dials your line. You're busy on-site or driving. The call drops, and TradyCall immediately intercepts the missed event.",
      color: "text-rose-500",
      accent: "bg-rose-500"
    },
    {
      id: 2,
      tag: "STEP 2 • ENGAGEMENT",
      title: "Instant SMS Auto-Reply",
      desc: "Within 15 seconds, TradyCall sends a tailored text back to the prospect. It locks them in, stopping them from calling a competitor on Google.",
      color: "text-blue-500",
      accent: "bg-blue-500"
    },
    {
      id: 3,
      tag: "STEP 3 • QUALIFICATION",
      title: "Conversational AI Qualifies",
      desc: "Our smart AI chats back-and-forth, extracting client name, specific service needed, suburb, and urgency details automatically.",
      color: "text-amber-500",
      accent: "bg-amber-500"
    },
    {
      id: 4,
      tag: "STEP 4 • NOTIFICATION",
      title: "Instantly Sent to Dashboard",
      desc: "The fully qualified lead details compile into a premium dispatch card and trigger an alert directly on your phone feed.",
      color: "text-purple-500",
      accent: "bg-purple-500"
    },
    {
      id: 5,
      tag: "STEP 5 • BOOKING SECURED",
      title: "Job Booked & Revenue Won",
      desc: "Your van lights up, your pipeline records a new win, and a confirmed booking slides onto your calendar while you work.",
      color: "text-emerald-500",
      accent: "bg-emerald-500"
    }
  ];

  // Specific scroll ranges to trigger various UI card layers
  const step1Active = useTransform(smoothProgress, [0.15, 0.22, 0.32, 0.38], [0, 1, 1, 0]);
  const step2Active = useTransform(smoothProgress, [0.35, 0.42, 0.52, 0.58], [0, 1, 1, 0]);
  const step3Active = useTransform(smoothProgress, [0.55, 0.62, 0.72, 0.78], [0, 1, 1, 0]);
  const step4Active = useTransform(smoothProgress, [0.75, 0.82, 0.88, 0.94], [0, 1, 1, 0]);
  const step5Active = useTransform(smoothProgress, [0.88, 0.94, 0.98, 1.0], [0, 1, 1, 0]);

  // Global elements (energy trails and final headings)
  const finalSceneActive = useTransform(smoothProgress, [0.95, 0.98, 1.0], [0, 1, 1]);
  const introActive = useTransform(smoothProgress, [0, 0.05, 0.12, 0.18], [1, 1, 0, 0]);

  return (
    <div className="relative w-full bg-[#050B1A] text-white min-h-[600vh]">
      
      {/* ── STICKY/FIXED FULLSCREEN VIEWPORT (Takes up 100vh, completely immune to parent CSS constraints) ── */}
      <div className="fixed inset-0 h-screen w-full overflow-hidden flex items-center justify-center z-20">
        
        {/* 1. Cinematic 3D Backdrop Scene (Zooming & Panning) */}
        <motion.div 
          style={{ 
            scale, 
            transformOrigin,
            filter: blurEffect
          }}
          className="absolute inset-0 w-full h-full select-none pointer-events-none transition-all duration-300"
        >
          {/* Main Realistic 3D Backdrop Render */}
          <img 
            src="/how-it-works-3d.jpg" 
            alt="TradyCall 3D Cinematic Ecosystem" 
            className="w-full h-full object-cover object-center"
          />

          {/* Service Van Headlight Glow (Step 5 dynamic overlay) */}
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0.86, 0.93], [0, 0.95])
            }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
          >
            {/* Soft yellow radial glare aligned with the van's headlights in the render */}
            <div className="absolute top-[44%] left-[61.5%] w-[160px] h-[80px] bg-yellow-400/25 blur-xl rounded-full transform rotate-[22deg]" />
            <div className="absolute top-[42.5%] left-[58%] w-[120px] h-[60px] bg-yellow-400/20 blur-lg rounded-full transform rotate-[22deg]" />
            {/* Electric pulses across the shop facade */}
            <div className="absolute top-[21%] left-[56%] w-[240px] h-[50px] bg-blue-500/10 blur-xl rounded-full" />
          </motion.div>
        </motion.div>

        {/* 2. Cinematic Atmospheric Lighting Overlays */}
        <motion.div 
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050B1A_95%)] pointer-events-none z-10" 
        />
        
        {/* Gradient Bottom Dust Shadow */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050B1A] to-transparent pointer-events-none z-10" />

        {/* 3. Glowing SVG Energy Trails */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trail 1: Phone to AI Core */}
            <motion.path 
              d="M380 620 C 440 600, 520 620, 600 700 C 650 750, 720 780, 810 750" 
              stroke="url(#blue-energy-gradient)" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="16 12"
              style={{
                pathLength: useTransform(smoothProgress, [0.20, 0.40], [0, 1]),
                opacity: useTransform(smoothProgress, [0.18, 0.42], [0, 0.85])
              }}
            />
            {/* Trail 2: AI Core to SMS Message Bubble */}
            <motion.path 
              d="M840 730 C 850 660, 810 590, 760 540" 
              stroke="url(#blue-energy-gradient)" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="12 8"
              style={{
                pathLength: useTransform(smoothProgress, [0.38, 0.52], [0, 1]),
                opacity: useTransform(smoothProgress, [0.35, 0.55], [0, 0.9])
              }}
            />
            {/* Trail 3: AI Core to Lead Dashboard Card */}
            <motion.path 
              d="M860 760 C 960 780, 1080 750, 1140 700 C 1200 650, 1260 620, 1310 650" 
              stroke="url(#blue-energy-gradient)" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="16 12"
              style={{
                pathLength: useTransform(smoothProgress, [0.55, 0.80], [0, 1]),
                opacity: useTransform(smoothProgress, [0.52, 0.82], [0, 0.85])
              }}
            />
            {/* Trail 4: Dashboard Card to Service Van */}
            <motion.path 
              d="M1410 680 C 1450 630, 1420 540, 1320 480 C 1250 440, 1190 410, 1200 370" 
              stroke="url(#emerald-energy-gradient)" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="14 10"
              style={{
                pathLength: useTransform(smoothProgress, [0.82, 0.94], [0, 1]),
                opacity: useTransform(smoothProgress, [0.80, 0.96], [0, 0.9])
              }}
            />

            <defs>
              <linearGradient id="blue-energy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
                <stop offset="100%" stopColor="#FACC15" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="emerald-energy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── LAYER: FLOATING GLASSMORPHIC UI CARDS (3D Overlays) ── */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-[1440px] h-full mx-auto px-6 sm:px-12 flex items-center">
            
            {/* STEP 1: Phone Incoming & Missed Call Cards */}
            <motion.div 
              style={{ opacity: step1Active }}
              className="absolute left-[8%] bottom-[20%] w-[330px] flex flex-col gap-4 pointer-events-auto"
            >
              {/* Flashing Ringing Card */}
              <motion.div 
                className="backdrop-blur-xl bg-slate-950/70 border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative overflow-hidden"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute top-0 right-0 p-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-white/10 text-white animate-pulse">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-slate-500 uppercase font-bold block mb-0.5">Incoming Call</span>
                    <h4 className="text-base font-black text-white font-mono">0412 345 678</h4>
                    <p className="text-xs text-slate-400 font-medium">Potential Customer</p>
                  </div>
                </div>
                
                {/* Call buttons UI */}
                <div className="flex gap-2.5 mt-4">
                  <div className="flex-1 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/20 flex items-center justify-center gap-1.5 text-rose-300 text-xs font-semibold">
                    <PhoneOff className="w-3.5 h-3.5" /> Decline
                  </div>
                  <div className="flex-1 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/20 flex items-center justify-center gap-1.5 text-emerald-300 text-xs font-semibold">
                    <Phone className="w-3.5 h-3.5" /> Accept
                  </div>
                </div>
              </motion.div>

              {/* Glowing Red Missed Call Notification popped out */}
              <motion.div 
                style={{ 
                  scale: useTransform(smoothProgress, [0.20, 0.32], [0.85, 1]),
                  rotateX: 12,
                  rotateY: -8
                }}
                className="backdrop-blur-2xl bg-rose-950/40 border border-rose-500/30 rounded-2xl p-5 shadow-[0_20px_50px_rgba(239,68,68,0.2)] ring-2 ring-rose-500/20 transform-gpu relative z-10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center border border-rose-500/40 shrink-0">
                    <PhoneMissed className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-black tracking-wider text-rose-400 uppercase">Missed Call</span>
                      <span className="text-[10px] text-rose-400/70 font-mono font-bold">2:15 PM</span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono">Mobile (0412 345 678)</h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      Tradie is unavailable. Triggering TradyCall SMS auto-reply...
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>


            {/* STEP 2: Glowing AI Core Activation & SMS */}
            <motion.div 
              style={{ opacity: step2Active }}
              className="absolute left-[38%] bottom-[32%] w-[380px] flex flex-col gap-4 pointer-events-auto"
            >
              {/* Glowing AI Activation Card */}
              <div className="backdrop-blur-xl bg-blue-950/30 border border-blue-500/30 rounded-2xl p-5 shadow-[0_20px_60px_rgba(37,99,237,0.2)] ring-1 ring-blue-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center relative overflow-hidden">
                    <Sparkles className="w-6 h-6 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-blue-400 font-bold block uppercase">AI Core Receptionist</span>
                    <h4 className="text-base font-black text-white">Instantly Triggered</h4>
                    <p className="text-xs text-slate-400">Response Delay: <span className="text-yellow-accent font-semibold font-mono">14.2s</span></p>
                  </div>
                </div>
              </div>

              {/* Floating Message Bubble */}
              <motion.div 
                style={{ 
                  scale: useTransform(smoothProgress, [0.38, 0.48], [0.9, 1.0]),
                  y: useTransform(smoothProgress, [0.38, 0.50], [15, 0]),
                  rotateX: -10,
                  rotateY: 15
                }}
                className="backdrop-blur-2xl bg-slate-950/80 border border-blue-500/30 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] ring-2 ring-blue-500/20"
              >
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-extrabold text-blue-400">TradyCall AI Agent</span>
                  <span className="text-[10px] text-slate-500 ml-auto font-mono font-semibold">2:16 PM</span>
                </div>
                
                <div className="space-y-2">
                  <div className="bg-slate-900 border border-white/5 p-3 rounded-xl rounded-tl-none">
                    <p className="text-xs text-slate-300 font-medium leading-relaxed font-mono">
                      "Hi! Thanks for calling ABC Plumbing. We're busy on a job right now, but I can secure your booking in 20 seconds. What service do you need?"
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 p-3 rounded-xl rounded-tr-none max-w-[85%]">
                      <p className="text-xs text-white leading-relaxed">
                        "Hey, my hot water heater just burst, water is spraying everywhere! Can you get someone to Cronulla ASAP?"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>


            {/* STEP 3: Floating Orbiting Qualified Lead Pills */}
            <motion.div 
              style={{ opacity: step3Active }}
              className="absolute left-[34%] top-[12%] w-[420px] pointer-events-auto"
            >
              <div className="backdrop-blur-xl bg-slate-950/80 border border-white/10 rounded-2xl p-6 shadow-[0_30px_70px_rgba(0,0,0,0.6)] ring-1 ring-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase block mb-1">Qualifying In Progress</span>
                <h3 className="text-lg font-bold text-white mb-4">Capturing High-Value Details</h3>
                
                {/* Visual Stack of orbiting structured lead data */}
                <div className="space-y-3">
                  {[
                    { label: "Client Name", value: "Dave Richardson", icon: <User className="w-3.5 h-3.5" />, color: "border-blue-500/20 text-blue-400" },
                    { label: "Job Urgency", value: "Emergency (High Priority)", icon: <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />, color: "border-rose-500/20 text-rose-400 bg-rose-500/5" },
                    { label: "Service Suburb", value: "Cronulla NSW (2230)", icon: <MapPin className="w-3.5 h-3.5" />, color: "border-amber-500/20 text-amber-400" },
                    { label: "Service Request", value: "Hot Water System Burst Repair", icon: <Wrench className="w-3.5 h-3.5" />, color: "border-emerald-500/20 text-emerald-400" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border bg-slate-900/60 ${item.color}`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-950 border border-white/5 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <span className="text-[9px] text-slate-500 font-bold block uppercase">{item.label}</span>
                        <span className="text-xs font-semibold text-slate-200 font-mono">{item.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>


            {/* STEP 4: Tradie Dashboard & Vibrating Phone Alerts */}
            <motion.div 
              style={{ opacity: step4Active }}
              className="absolute right-[4%] bottom-[12%] w-[420px] flex flex-col gap-5 pointer-events-auto"
            >
              {/* Premium Dashboard Dispatch Card */}
              <motion.div 
                style={{ 
                  scale: useTransform(smoothProgress, [0.75, 0.85], [0.92, 1.0]),
                  y: useTransform(smoothProgress, [0.75, 0.85], [20, 0]),
                  rotateX: 12,
                  rotateY: -10
                }}
                className="backdrop-blur-2xl bg-slate-950/80 border border-purple-500/30 rounded-3xl p-6 shadow-[0_30px_70px_rgba(0,0,0,0.7)] ring-2 ring-purple-500/20"
              >
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                    <span className="text-[10px] font-black tracking-widest text-purple-400 uppercase">Lead Dispatched</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] font-mono text-purple-300 font-bold">
                    Job ID: #TC-9804
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-base font-bold text-white">Dave Richardson</h4>
                      <p className="text-[11px] text-slate-400 font-mono">📱 +61 412 345 678</p>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-yellow-accent/10 border border-yellow-accent/20 text-[10px] font-bold text-yellow-accent uppercase tracking-wider font-mono">
                      $1,250 Est.
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/5">
                    <div>
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Suburb</span>
                      <span className="text-xs font-semibold text-slate-300">Cronulla NSW</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 font-bold uppercase block">Urgency</span>
                      <span className="text-xs font-semibold text-rose-400 font-bold">EMERGENCY</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Dispatch analytics chart */}
                <div className="flex items-center gap-3 bg-purple-950/15 border border-purple-500/10 p-3 rounded-xl mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <div>
                    <span className="text-[9px] text-purple-300 font-bold block uppercase">TRADIE INSIGHT</span>
                    <p className="text-xs text-slate-400 leading-normal">
                      Conversion rate is up <span className="text-emerald-400 font-semibold font-mono">+18.5%</span> this week using Auto-Reply.
                    </p>
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black tracking-wider uppercase shadow-[0_10px_20px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2">
                  <BellRing className="w-4 h-4" /> Dispatch to Service Van <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>


            {/* STEP 5: Success confirmed, Metrics count & Van lights up */}
            <motion.div 
              style={{ opacity: step5Active }}
              className="absolute right-[12%] top-[15%] w-[380px] flex flex-col gap-4 pointer-events-auto"
            >
              {/* Job Confirmed Banner */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="backdrop-blur-xl bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 shadow-[0_20px_50px_rgba(16,185,129,0.15)] ring-2 ring-emerald-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[9px] tracking-widest text-emerald-400 font-extrabold block uppercase">Win Confirmed</span>
                    <h4 className="text-base font-black text-white leading-tight">Job Secured in Calendar</h4>
                    <p className="text-xs text-slate-400 font-mono">Cronulla NSW • Hot Water System</p>
                  </div>
                </div>
              </motion.div>

              {/* Financial Dashboard Increment Counter Card */}
              <div className="backdrop-blur-xl bg-slate-950/70 border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">WEEKLY TRADIE REVENUE</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-bold">
                    + $1,250
                  </span>
                </div>
                
                {/* Big counting display */}
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-3xl font-black text-white font-mono tracking-tight">$14,250</span>
                  <span className="text-xs text-slate-400 font-medium">AUD</span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: "65%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-bold mt-2 font-mono uppercase tracking-wide">
                  92% of missed calls recovered this month
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── NARRATIVE PANEL: SLEEK APPLE-STYLE FIXED TEXT BAR ── */}
        <div className="absolute left-[6%] top-1/2 -translate-y-1/2 z-40 max-w-[420px] pointer-events-none hidden md:block">
          
          {/* Scroll progress narrative block */}
          <div className="space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center gap-1.5 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div 
                  key={s} 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeStep === s 
                      ? "w-8 bg-blue-500" 
                      : activeStep > s 
                        ? "w-4 bg-blue-500/50" 
                        : "w-2 bg-slate-800"
                  }`} 
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {steps.map((step) => {
                if (step.id !== activeStep) return null;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-3"
                  >
                    <span className={`text-[10px] font-black tracking-[0.25em] uppercase font-mono ${step.color}`}>
                      {step.tag}
                    </span>
                    <h2 className="text-3xl font-black tracking-tight leading-tight text-white">
                      {step.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        </div>


        {/* ── INTRO OVERLAY STATE (Scroll percentage 0% - 15%) ── */}
        <motion.div 
          style={{ opacity: introActive }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/80 px-4 text-center pointer-events-none"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-[11px] font-black tracking-widest text-blue-400 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Interactive scrollytelling
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
              The <span className="text-blue-500">Trady</span><span className="text-yellow-accent">Call</span> Cinematic Experience
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              We intercept missed calls, text customers back, qualify leads, and update your dashboard in seconds. Scroll to begin the simulation.
            </p>
            <div className="flex flex-col items-center gap-3 pt-6">
              <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-slate-500 font-black uppercase font-mono animate-bounce">SCROLL TO START</span>
            </div>
          </motion.div>
        </motion.div>


        {/* ── FINAL CINEMATIC REVEAL CTA STATE (Scroll percentage 95% - 100%) ── */}
        <motion.div 
          style={{ opacity: finalSceneActive }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 text-center pointer-events-none px-4"
        >
          <div className="max-w-4xl space-y-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/5 text-xs font-black text-yellow-accent tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" /> Ready for Australian Tradies
            </div>
            <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-white leading-tight">
              Turn Missed Calls<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-accent to-emerald-400">Into Booked Jobs</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Stop bleeding thousands in lost revenue to faster competitors. Let our conversational AI qualify and book your local clients 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a 
                href="#pricing"
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_15px_30px_rgba(37,99,237,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Start Free Trial <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#demo"
                className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-300"
              >
                Watch 2-Min Demo
              </a>
            </div>

            {/* Micro feature badges */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 pt-12 text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> NO CREDIT CARD REQUIRED
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> SECURE SMS BACKUP
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> 14-DAY FREE TRIAL
              </div>
            </div>
          </div>
        </motion.div>


        {/* Scroll Progress Level Indicator at the bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 pointer-events-none">
          <span className="text-[9px] tracking-widest text-slate-500 font-black uppercase font-mono">CINEMATIC PREVIEW ROUTE</span>
          <div className="w-40 h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              style={{ scaleX: smoothProgress }} 
              className="h-full bg-blue-500 origin-left"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks3D;
