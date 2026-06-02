"use client";

import React from "react";
import Image from "next/image";
import { Star, CheckCircle } from "lucide-react";

interface Review {
  name: string;
  trade: string;
  location: string;
  avatar: string;
  quote: string;
  stars: number;
}

export const Testimonials: React.FC = () => {
  const reviews: Review[] = [
    {
      name: "Dave K.",
      trade: "DK Plumbing & Gas",
      location: "Sydney, NSW",
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "I was skeptical about automated SMS replies, but last Tuesday a caller missed me while in a ceiling space. TradyCall texted them immediately, got a reply, and booked a $480 hot water replacement. Literally paid for its yearly cost in one call.",
      stars: 5
    },
    {
      name: "Marcus G.",
      trade: "VoltCorp Electrical",
      location: "Melbourne, VIC",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "When we are on-site we can't answer. TradyCall captures every missed call, tells them we are on a job, and asks what they need. Customers love the fast response and we don't lose leads to the next sparky on Google.",
      stars: 5
    },
    {
      name: "Brad & Sam L.",
      trade: "Coastal Roofing Solutions",
      location: "Brisbane, QLD",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "Best tool we've added to the business. We've recovered over 14 commercial leak jobs in the last 2 months just because we got back to them in 10 seconds flat.",
      stars: 5
    },
    {
      name: "Luke P.",
      trade: "Patterson Air Conditioning",
      location: "Adelaide, SA",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "Our office gets flooded during heatwaves. Being able to auto-reply to missed calls with a link or a booking text keeps the pipeline full without hiring extra receptionists.",
      stars: 5
    },
    {
      name: "Shane D.",
      trade: "All-Out Carpentry",
      location: "Perth, WA",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "We're always on the tools, covered in dust, or driving. TradyCall runs in the background. It is incredibly simple and secures the lead before they go call someone else.",
      stars: 5
    },
    {
      name: "Sarah W.",
      trade: "Tasman Flow Drainage",
      location: "Hobart, TAS",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
      quote: "As a small owner-operator, missing calls means missing dinner. Since starting with TradyCall, I've got peace of mind knowing the system catches missed calls and keeps the customer warm.",
      stars: 5
    }
  ];

  // Double the reviews to make the scrolling marquee continuous and seamless
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] dark:bg-slate-950 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-black uppercase tracking-[0.2em] mb-3">
            Real Proof from the Tools
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-base dark:text-white tracking-tight">
            Loved by Australian tradies
          </h2>
          <div className="w-12 h-1 bg-yellow-accent mx-auto mt-4 rounded-full" />
        </div>
      </div>

      {/* Endless review scrolling marquee container */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap select-none">
        {/* The scrolling track - continuously moving with pause on hover */}
        <div className="flex animate-marquee-fast md:animate-marquee gap-6 min-w-full items-stretch py-4 cursor-grab active:cursor-grabbing">
          {doubleReviews.map((review, i) => (
            <div
              key={i}
              className="w-[300px] md:w-[380px] flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-blue-500/20 dark:hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between whitespace-normal"
            >
              {/* Header: Rating & Quote */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Stars */}
                  <div className="flex text-yellow-accent">
                    {[...Array(review.stars)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-yellow-accent text-yellow-accent" />
                    ))}
                  </div>
                  {/* Verified Badge */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3" />
                    Verified Tradie
                  </span>
                </div>

                {/* Quote */}
                <p className="text-slate-600 dark:text-slate-300 text-[13px] sm:text-[14px] font-medium leading-relaxed mb-6 italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Info & Avatar */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-yellow-accent">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-navy-base dark:text-white text-sm leading-tight flex items-center gap-1">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wide truncate">
                    {review.trade}
                  </p>
                  <p className="text-[9px] text-blue-500 dark:text-blue-400 font-bold uppercase tracking-wider mt-0.5">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle fade overlay at the edges of the testimonials */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF9F6] dark:from-slate-950 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF9F6] dark:from-slate-950 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Testimonials;

