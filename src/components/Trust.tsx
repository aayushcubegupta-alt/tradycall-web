import React from "react";
import Image from "next/image";

export const Trust: React.FC = () => {
  const partners = [
    {
      name: "REECE PLUMBING",
      logo: "/reece_logo.svg",
    },
    {
      name: "CLIPSAL ELECTRICAL",
      logo: "/clipsal_logo.svg",
    },
    {
      name: "DAIKIN HVAC",
      logo: "/daikin_logo.svg",
    },
    {
      name: "BUNNINGS TRADE",
      logo: "/bunnings_logo.svg",
    },
    {
      name: "COLORBOND ROOFING",
      logo: "/colorbond_logo.svg",
    },
  ];

  // We repeat the 5 original logos 4 times to fill the marquee track endlessly
  const doublePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="bg-[#FAF9F6] dark:bg-[#081225] py-14 overflow-hidden relative z-20 -mt-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-slate-400 mb-10">
          Trusted by tradies and service businesses across Australia
        </p>
      </div>
      
      {/* Endless logo scrolling marquee container */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-gradient">
        {/* The scrolling track - continuously moving with no hover scale jumps or click changes */}
        <div className="flex animate-marquee gap-14 sm:gap-20 min-w-full items-center">
          {doublePartners.map((partner, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-4 flex-shrink-0 select-none"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={240}
                height={80}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle blur overlay at the edges of the logo bar to create a smooth fade-in / fade-out effect */}
      <div className="absolute top-0 bottom-0 left-0 w-28 sm:w-36 bg-gradient-to-r from-[#FAF9F6] dark:from-[#081225] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-28 sm:w-36 bg-gradient-to-l from-[#FAF9F6] dark:from-[#081225] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Trust;

