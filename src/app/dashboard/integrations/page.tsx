"use client";

import React from "react";
import { CheckCircle2, Clock, ChevronRight } from "lucide-react";

interface Integration {
  name: string;
  desc: string;
  status: "connected" | "available" | "coming_soon";
  available: boolean;
  logo: string;
}

/* ── Integration card data with actual logo images ── */
const integrations: Integration[] = [
  {
    name: "Twilio",
    desc: "Connect Twilio to enable SMS messaging and call tracking.",
    status: "connected" as const,
    available: true,
    logo: "/images/integrations/twilio.png",
  },
  {
    name: "Jobber",
    desc: "Sync jobs, customers and quotes with Jobber.",
    status: "available" as const,
    available: true,
    logo: "/images/integrations/jobber.png",
  },
  {
    name: "ServiceM8",
    desc: "Sync jobs, customers and quotes with ServiceM8.",
    status: "available" as const,
    available: true,
    logo: "/images/integrations/servicem8.png",
  },
  {
    name: "Simpro",
    desc: "Integrate with Simpro to sync jobs and customer data.",
    status: "available" as const,
    available: true,
    logo: "/images/integrations/simpro.png",
  },
  {
    name: "Google Calendar",
    desc: "Sync appointments and bookings with Google Calendar.",
    status: "available" as const,
    available: true,
    logo: "/images/integrations/google-calendar.png",
  },
  {
    name: "Microsoft Outlook Calendar",
    desc: "Sync appointments and bookings with Microsoft Outlook Calendar.",
    status: "available" as const,
    available: true,
    logo: "/images/integrations/outlook-calendar.png",
  },
  {
    name: "Zapier",
    desc: "Automate workflows and connect TradyCall with 5,000+ apps.",
    status: "available" as const,
    available: true,
    logo: "/images/integrations/zapier.png",
  },
  {
    name: "n8n",
    desc: "Create powerful workflows and automate business processes.",
    status: "available" as const,
    available: true,
    logo: "/images/integrations/n8n.png",
  },
];

/* ── Activity feed data using actual logos ── */
const activityFeed = [
  {
    name: "Twilio connected",
    detail: "SMS and calls are now active",
    time: "10 min ago",
    status: "Connected",
    statusColor: "text-[#16A34A]",
    logo: "/images/integrations/twilio.png",
  },
  {
    name: "Google Calendar connected",
    detail: "Calendar sync enabled",
    time: "2 hours ago",
    status: "Connected",
    statusColor: "text-[#16A34A]",
    logo: "/images/integrations/google-calendar.png",
  },
  {
    name: "Jobber connection attempted",
    detail: "Authentication successful",
    time: "1 day ago",
    status: "Connected",
    statusColor: "text-[#16A34A]",
    logo: "/images/integrations/jobber.png",
  },
  {
    name: "ServiceM8 connection attempted",
    detail: "Authentication successful",
    time: "1 day ago",
    status: "Connected",
    statusColor: "text-[#16A34A]",
    logo: "/images/integrations/servicem8.png",
  },
  {
    name: "Zapier connected",
    detail: "Webhook configured",
    time: "2 days ago",
    status: "Connected",
    statusColor: "text-[#16A34A]",
    logo: "/images/integrations/zapier.png",
  },
  {
    name: "Microsoft Outlook disconnected",
    detail: "User disconnected integration",
    time: "3 days ago",
    status: "Disconnected",
    statusColor: "text-[#EF4444]",
    logo: "/images/integrations/outlook-calendar.png",
  },
  {
    name: "n8n connected",
    detail: "Workflow created",
    time: "5 days ago",
    status: "Connected",
    statusColor: "text-[#16A34A]",
    logo: "/images/integrations/n8n.png",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto text-left animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#0B1F44] tracking-tight">
          Integrations
        </h2>
        <p className="text-xs text-[#64748B] font-medium mt-0.5">
          Connect TradyCall with your existing business tools.
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT: Integration Cards (cols 8) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {integrations.map((intg) => (
              <div
                key={intg.name}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200"
              >
                {/* Top section */}
                <div>
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 p-1.5 shadow-sm">
                      <img
                        src={intg.logo}
                        alt={intg.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#0B1F44] leading-tight">{intg.name}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[#64748B] font-medium leading-relaxed mb-3">
                    {intg.desc}
                  </p>

                  {/* Status */}
                  {intg.status === "connected" && (
                    <div className="flex items-center gap-1.5 mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span className="text-[11px] font-bold text-[#16A34A]">Connected</span>
                    </div>
                  )}
                  {intg.status === "available" && (
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                      <span className="text-[11px] font-medium text-[#16A34A]">Available</span>
                    </div>
                  )}
                  {intg.status === "coming_soon" && (
                    <div className="flex items-center gap-1.5 mb-4">
                      <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="text-[11px] font-medium text-[#94A3B8]">Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Button */}
                {intg.status === "connected" ? (
                  <button className="w-full bg-white hover:bg-[#F8FAFC] text-[#0B1F44] font-bold text-xs py-2.5 rounded-lg border border-[#E2E8F0] transition-colors cursor-pointer shadow-sm">
                    Manage Connection
                  </button>
                ) : intg.status === "coming_soon" ? (
                  <button
                    disabled
                    className="w-full bg-[#F1F5F9] text-[#94A3B8] font-bold text-xs py-2.5 rounded-lg border border-[#E2E8F0] cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <button className="w-full bg-[#0B1F44] hover:bg-[#0a1a38] text-white font-bold text-xs py-2.5 rounded-lg border-none transition-colors cursor-pointer shadow-sm">
                    Connect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Recent Integration Activity (cols 4) */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm sticky top-6">
            <h3 className="text-sm font-bold text-[#0B1F44] mb-4">
              Recent integration activity
            </h3>

            <div className="space-y-0">
              {activityFeed.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 py-3 ${
                    idx < activityFeed.length - 1 ? "border-b border-[#F1F5F9]" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shrink-0 mt-0.5 overflow-hidden p-1 shadow-sm">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-[#0F172A] block truncate">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-[#94A3B8] font-medium shrink-0 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-[10px] text-[#94A3B8] font-medium">
                        {item.detail}
                      </span>
                      <span className={`text-[10px] font-bold ${item.statusColor} shrink-0`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View all link */}
            <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer bg-transparent border border-[#E2E8F0] text-xs font-semibold text-[#0F172A]">
                View all activity
                <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
