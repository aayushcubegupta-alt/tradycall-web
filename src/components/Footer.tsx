"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-base text-slate-300 border-t border-white/5 pt-14 sm:pt-20 pb-10 relative overflow-hidden">
      
      {/* Premium ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Massive Brand Watermark for elite premium feel */}
      <div className="absolute bottom-[-2vw] left-0 right-0 text-center select-none pointer-events-none opacity-[0.015] font-black tracking-[0.25em] uppercase text-[10vw] text-white leading-none">
        TradyCall
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Columns Grid — full width on mobile, 2-col on md, 4-col on lg */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 sm:mb-16">
          
          {/* Column 1: Brand details — spans full width on mobile, 6/12 on lg */}
          <div className="col-span-2 md:col-span-2 lg:col-span-6 space-y-4 sm:space-y-6">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-102">
              <Image
                src="/tradycall_logo_v2.png"
                alt="TradyCall Logo"
                width={180}
                height={54}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed font-semibold">
              Turn missed calls into booked jobs with instant SMS replies and smart lead capture — 24/7.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "How It Works", href: "/#how-it-works" },
                { name: "Features", href: "/features" },
                { name: "Pricing", href: "/pricing" },
                { name: "Industries", href: "/industries" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-yellow-accent transition-colors duration-200 font-bold block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/#contact" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-yellow-accent transition-colors duration-200 font-bold block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Industries */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-widest text-white uppercase">
              Industries
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Plumbers", href: "/industries#plumbing" },
                { name: "Electricians", href: "/industries#electrical" },
                { name: "HVAC Specialists", href: "/industries#hvac" },
                { name: "Locksmiths", href: "/industries#locksmith" },
                { name: "Landscapers", href: "/industries#landscaping" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-yellow-accent transition-colors duration-200 font-bold block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright / legal row */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col items-center sm:flex-row sm:justify-between text-[11px] text-slate-500 font-bold tracking-wide gap-3 text-center sm:text-left">
          <span>© 2026 TradyCall. All rights reserved.</span>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-yellow-accent transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-accent transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
