"use client";

import React from "react";
import {
  Crown,
  CheckCircle2,
  CalendarDays,
  CreditCard,
  Phone,
  MessageSquare,
  Users,
  Download,
  ExternalLink,
} from "lucide-react";
import { useDemo } from "../DemoContext";

/* ── Invoice data ── */
const invoices = [
  { id: "INV-2025-0428", date: "28 Apr 2025", amount: "$249.00 AUD", status: "Paid" },
  { id: "INV-2025-0328", date: "28 Mar 2025", amount: "$249.00 AUD", status: "Paid" },
  { id: "INV-2025-0228", date: "28 Feb 2025", amount: "$249.00 AUD", status: "Paid" },
  { id: "INV-2025-0128", date: "28 Jan 2025", amount: "$249.00 AUD", status: "Paid" },
  { id: "INV-2024-1228", date: "28 Dec 2024", amount: "$249.00 AUD", status: "Paid" },
];

/* ── Plan features (Growth plan) ── */
const planFeatures = [
  "Up to 300 lead recoveries / month",
  "AI-generated lead summaries",
  "Smart lead categorization",
  "Multiple staff notifications",
  "After-hours automations",
  "Priority support",
  "CRM exports",
  "Team workflows",
];

/* ── Upgrade plans ── */
const plans = [
  {
    name: "Starter",
    price: "$199",
    setupFee: "$299",
    desc: "For solo tradies & owner-operators",
    current: false,
  },
  {
    name: "Growth",
    price: "$249",
    setupFee: "$499",
    desc: "For growing teams & businesses",
    current: true,
    popular: true,
  },
  {
    name: "Pro",
    price: "$499",
    setupFee: "$899",
    desc: "For larger teams & multi-location businesses",
    current: false,
  },
];

export default function BillingPage() {
  const { isDemoMode } = useDemo();

  const invoiceList = isDemoMode ? invoices : [];
  const currentSubscriptionName = isDemoMode ? "Growth Plan" : "Choose Your Plan";
  const currentSubscriptionStatus = isDemoMode ? "Active" : "No Plan Selected";
  const currentRenewalDate = isDemoMode ? "28 May 2025" : "—";
  const currentRenewalTime = isDemoMode ? "In 23 days" : "Please select a plan below";
  const currentMonthlyCost = isDemoMode ? "$249.00 AUD" : "—";
  const currentPaymentMethod = isDemoMode ? "Visa •••• 4242" : "No payment method linked";
  const currentSetupFeeText = isDemoMode ? "Setup Fee $499 • Billed monthly" : "Select a plan below to activate recovery services";
  
  const usageProcessed = isDemoMode ? "156" : "0";
  const usageSent = isDemoMode ? "312" : "0";
  const usageRecovered = isDemoMode ? "48" : "0";

  const usageStats = [
    {
      label: "Missed Calls Processed",
      value: usageProcessed,
      limit: isDemoMode ? "300 / month" : "—",
      icon: Phone,
      iconBg: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]",
    },
    {
      label: "SMS Messages Sent",
      value: usageSent,
      limit: isDemoMode ? "Unlimited" : "—",
      icon: MessageSquare,
      iconBg: "bg-[#FEF9C3]",
      iconColor: "text-[#CA8A04]",
    },
    {
      label: "Recovered Leads",
      value: usageRecovered,
      limit: isDemoMode ? "300 / month" : "—",
      icon: Users,
      iconBg: "bg-[#F1F5F9]",
      iconColor: "text-[#475569]",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto text-left">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#0B1F44] tracking-tight">
          Billing &amp; Subscription
        </h2>
        <p className="text-xs text-[#64748B] font-medium mt-0.5">
          Manage your subscription, billing details and view your usage.
        </p>
      </div>

      {/* ── MAIN GRID: Content ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* FULL WIDTH CONTENT */}
        <div className="lg:col-span-12 space-y-5">
          {/* ── Current Plan Card ── */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Plan icon + name */}
              <div className="flex items-center gap-3.5 shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#FEF9C3] flex items-center justify-center">
                  <Crown className="w-6 h-6 text-[#CA8A04]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1F44]">{currentSubscriptionName}</h3>
                  <p className="text-xs text-[#64748B] font-medium">
                    {isDemoMode ? "For growing teams & businesses." : "Please select a plan below to activate services."}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 sm:ml-4">
                {planFeatures.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                    <span className="text-xs text-[#0F172A] font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Price + badge */}
              <div className="text-right shrink-0 sm:ml-4 sm:min-w-[120px]">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDemoMode 
                    ? "text-[#CA8A04] bg-[#FEF9C3] border border-[#FDE68A]" 
                    : "text-[#EF4444] bg-[#FEE2E2] border border-[#FECACA]"
                }`}>
                  {isDemoMode ? "Current Plan" : "Inactive"}
                </span>
                <div className="mt-1">
                  <span className="text-3xl font-black text-[#0B1F44]">{isDemoMode ? "$249" : "—"}</span>
                  <span className="text-sm text-[#64748B] font-medium ml-0.5">{isDemoMode ? "/month" : ""}</span>
                </div>
                <p className="text-[10px] text-[#94A3B8] font-medium mt-0.5">{currentSetupFeeText}</p>
              </div>
            </div>
          </div>

          {/* ── Billing Information ── */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B1F44] mb-4">Billing Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {/* Current Subscription */}
              <div>
                <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider block">
                  Current Subscription
                </span>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0B1F44]">{currentSubscriptionName}</span>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    isDemoMode ? "text-[#16A34A] bg-[#DCFCE7]" : "text-[#64748B] bg-[#F1F5F9]"
                  }`}>
                    {currentSubscriptionStatus}
                  </span>
                </div>
                <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5 block">
                  {isDemoMode ? "Monthly" : "No Plan"}
                </span>
              </div>

              {/* Renewal Date */}
              <div>
                <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider block">
                  Renewal Date
                </span>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-[#64748B]" />
                  <span className="text-sm font-bold text-[#0B1F44]">{currentRenewalDate}</span>
                </div>
                <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5 block">{currentRenewalTime}</span>
              </div>

              {/* Monthly Cost */}
              <div>
                <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider block">
                  Monthly Cost
                </span>
                <div className="mt-1.5">
                  <span className="text-sm font-bold text-[#0B1F44]">{currentMonthlyCost}</span>
                </div>
                <span className="text-[11px] text-[#94A3B8] font-medium mt-0.5 block">+ GST</span>
              </div>

              {/* Payment Method */}
              <div>
                <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider block">
                  Payment Method
                </span>
                <div className="mt-1.5 flex items-center gap-2">
                  {isDemoMode && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold text-[#1E40AF] bg-[#DBEAFE] tracking-wider uppercase">
                      Visa
                    </span>
                  )}
                  <span className="text-sm font-bold text-[#0B1F44]">{currentPaymentMethod}</span>
                </div>
                {!isDemoMode && (
                  <button className="text-[11px] text-[#2563EB] font-semibold mt-0.5 hover:underline cursor-pointer bg-transparent border-none p-0">
                    Add card
                  </button>
                )}
                {isDemoMode && (
                  <button className="text-[11px] text-[#2563EB] font-semibold mt-0.5 hover:underline cursor-pointer bg-transparent border-none p-0">
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Usage This Month ── */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B1F44] mb-4">Usage This Month</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {usageStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-3.5"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${stat.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-4.5 h-4.5 ${stat.iconColor}`} style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#94A3B8] font-medium block">{stat.label}</span>
                      <span className="text-xl font-black text-[#0B1F44] block leading-tight">{stat.value}</span>
                      <span className="text-[10px] text-[#16A34A] font-semibold">{stat.limit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Invoice History ── */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#0B1F44] mb-4">Invoice History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider text-left">
                    <th className="pb-3 pr-4">Invoice Number</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Amount</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {invoiceList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#94A3B8] font-medium">
                        No subscription invoices generated yet.
                      </td>
                    </tr>
                  ) : (
                    invoiceList.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#FAFBFC] transition-colors">
                        <td className="py-3 pr-4 text-[#0F172A] font-semibold">{inv.id}</td>
                        <td className="py-3 pr-4 text-[#64748B] font-medium">{inv.date}</td>
                        <td className="py-3 pr-4 text-[#0F172A] font-semibold">{inv.amount}</td>
                        <td className="py-3 pr-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold text-[#16A34A] bg-[#DCFCE7]">
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="inline-flex items-center gap-1 text-[11px] text-[#2563EB] font-semibold hover:underline cursor-pointer bg-transparent border-none p-0">
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* View all link */}
            {invoiceList.length > 0 && (
              <div className="text-center mt-4 pt-3 border-t border-[#F1F5F9]">
                <button className="text-[11px] text-[#2563EB] font-semibold hover:underline cursor-pointer bg-transparent border-none p-0">
                  View all invoices
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CHOOSE YOUR PLAN SECTION ── */}
      <section className="space-y-6 pt-10 border-t border-[#E2E8F0] mt-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-black text-[#0B1F44] tracking-tight">Choose Your Plan</h3>
          <p className="text-xs text-[#64748B] font-semibold">
            Unlock more features and take your business to the next level.
          </p>
        </div>

        {/* 3-Column Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1300px] mx-auto items-stretch pt-4">
          {/* STARTER CARD */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] text-[#94A3B8] font-black uppercase tracking-wider block mb-1">
                  Starter
                </span>
                <p className="text-xs text-[#64748B] font-bold min-h-[32px]">
                  For solo tradies & owner-operators
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-black text-[#0B1F44]">$199</span>
                  <span className="text-xs text-[#64748B] font-bold ml-1">/month</span>
                </div>
                <span className="text-[10px] text-[#94A3B8] font-bold mt-1.5 block">Setup Fee $299</span>
              </div>

              <div className="border-t border-[#F1F5F9] pt-6 space-y-3">
                {[
                  "Australian business number",
                  "Missed-call detection",
                  "Instant SMS replies",
                  "Up to 100 lead recoveries / month",
                  "Basic lead dashboard",
                  "Email + SMS notifications",
                  "Business-hours workflows",
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-[#0F172A] font-medium text-left">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => window.open("https://calendly.com/tradycall/demo", "_blank")}
                className="w-full bg-white hover:bg-slate-50 text-[#0B1F44] border-2 border-[#0B1F44] font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* GROWTH CARD */}
          <div className="bg-white border-2 border-[#FACC15] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative md:scale-105 z-10">
            {/* MOST POPULAR BAR */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FACC15] text-[#0B1F44] font-black text-[9px] uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">
              Most Popular
            </div>

            <div className="space-y-6">
              <div className="text-center pt-2">
                <span className="text-[10px] text-[#0B1F44] font-black uppercase tracking-wider block mb-1">
                  Growth
                </span>
                <p className="text-xs text-[#64748B] font-bold min-h-[32px]">
                  For growing teams & businesses
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-black text-[#0B1F44]">$249</span>
                  <span className="text-xs text-[#64748B] font-bold ml-1">/month</span>
                </div>
                <span className="text-[10px] text-[#94A3B8] font-bold mt-1.5 block">Setup Fee $499</span>
              </div>

              <div className="border-t border-[#F1F5F9] pt-6 space-y-3">
                <span className="text-[9px] text-[#64748B] font-black uppercase tracking-wider block mb-2 text-left">
                  Everything in Starter, plus:
                </span>
                {[
                  "Up to 300 lead recoveries / month",
                  "AI-generated lead summaries",
                  "Smart lead categorization",
                  "Multiple staff notifications",
                  "After-hours automations",
                  "Priority support",
                  "CRM exports",
                  "Team workflows",
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-[#0F172A] font-medium text-left">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => window.open("https://calendly.com/tradycall/demo", "_blank")}
                className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0B1F44] font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-sm transition-all cursor-pointer border-none"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* PRO CARD */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-[10px] text-[#94A3B8] font-black uppercase tracking-wider block mb-1">
                  Pro
                </span>
                <p className="text-xs text-[#64748B] font-bold min-h-[32px]">
                  For larger teams & multi-location businesses
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-black text-[#0B1F44]">$499</span>
                  <span className="text-xs text-[#64748B] font-bold ml-1">/month</span>
                </div>
                <span className="text-[10px] text-[#94A3B8] font-bold mt-1.5 block">Setup Fee $999</span>
              </div>

              <div className="border-t border-[#F1F5F9] pt-6 space-y-3">
                <span className="text-[9px] text-[#64748B] font-black uppercase tracking-wider block mb-2 text-left">
                  Everything in Growth, plus:
                </span>
                {[
                  "Up to 750 lead recoveries / month",
                  "Multi-location setup",
                  "Advanced automations",
                  "AI lead qualification",
                  "Booking integrations",
                  "Analytics dashboard",
                  "Dedicated onboarding",
                  "Custom workflows",
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-[#0F172A] font-medium text-left">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => window.open("https://calendly.com/tradycall/demo", "_blank")}
                className="w-full bg-white hover:bg-slate-50 text-[#0B1F44] border-2 border-[#0B1F44] font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
