"use client";

import React from "react";
import HowItWorks3D from "@/components/HowItWorks3D";

export default function HowItWorks3DPage() {
  return (
    <main className="bg-[#050B1A] min-h-screen text-white relative">
      {/* Draft top banner to remind us this is a local draft - absolute so it sits above the fixed layers */}
      <div className="absolute top-0 inset-x-0 bg-blue-600/10 border-b border-blue-500/20 px-4 py-2.5 text-center text-xs font-mono text-blue-400 tracking-wider z-50">
        DEVELOPMENT SANDBOX • LOCAL ONLY • DRAFT PREVIEW ROUTE
      </div>
      
      {/* The 3D Scroll Component */}
      <HowItWorks3D />
    </main>
  );
}
