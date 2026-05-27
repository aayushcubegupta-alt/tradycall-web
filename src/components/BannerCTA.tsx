"use client";

import React from "react";
import { Headphones, ArrowRight } from "lucide-react";
import Button from "./ui/Button";

export const BannerCTA: React.FC = () => {
  return (
    <section className="bg-yellow-accent py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-[#091535] rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl border border-white/5">
        
        {/* Yellow dot pattern graphic overlay (Matching the right-hand mesh in screenshot) */}
        <div className="absolute right-0 top-0 bottom-0 w-32 opacity-35 flex items-center justify-end pointer-events-none hidden sm:flex">
          <div className="grid grid-cols-4 gap-2 p-6">
            {[...Array(24)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-accent" />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Block: Headset icon & Title */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            {/* Headset Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-yellow-accent flex items-center justify-center text-[#091535] flex-shrink-0 shadow-[0_8px_25px_rgba(250,204,21,0.25)]">
              <Headphones className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
            </div>
            {/* Texts */}
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight-heading leading-none">
                Ready to stop losing jobs?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-bold leading-relaxed">
                Book a free 15-minute demo and see how TradyCall can help your business grow.
              </p>
            </div>
          </div>

          {/* Right Block: CTA button in black (matching screenshot) */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full lg:w-auto flex items-center justify-center gap-2.5 bg-black hover:bg-slate-900 border-black hover:border-slate-900 text-white font-extrabold text-sm tracking-wider uppercase px-8 py-4 shadow-xl hover:scale-[1.02]"
            >
              Book Your Free Demo
              <ArrowRight className="w-4 h-4 text-yellow-accent stroke-[2.5]" />
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};
export default BannerCTA;
