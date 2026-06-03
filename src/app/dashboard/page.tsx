"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  PhoneMissed, 
  User, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  MoreHorizontal,
  Droplet,
  Flame,
  Wrench,
  Hammer,
  ClipboardList,
  AlertCircle,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  Settings
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { useDemo } from "./DemoContext";
import { trackBookDemoClick } from "@/lib/analytics";
import { MOCK_LEADS, MOCK_CONVERSATIONS, MOCK_ACTIVITIES } from "./MockData";

// Dynamic Lucide icons map
const serviceIconMap: Record<string, any> = {
  "Blocked Drain": Droplet,
  "Hot Water System": Flame,
  "Bathroom Renovation": Hammer,
  "Leaking Tap": Wrench,
  "Toilet Replacement": Wrench,
  "Ceiling Fan Installation": Hammer,
  "Switchboard Upgrade": Hammer,
  "Burst Pipe": Droplet,
};

const serviceColorMap: Record<string, string> = {
  "Blocked Drain": "text-blue-500",
  "Hot Water System": "text-orange-500",
  "Bathroom Renovation": "text-purple-500",
  "Leaking Tap": "text-slate-500",
  "Toilet Replacement": "text-emerald-500",
  "Ceiling Fan Installation": "text-purple-500",
  "Switchboard Upgrade": "text-purple-500",
  "Burst Pipe": "text-blue-500",
};

// Activity Lucide icons map
const activityIconMap: Record<string, any> = {
  "PhoneMissed": PhoneMissed,
  "MessageSquare": MessageSquare,
  "User": User,
};

export default function DashboardPage() {
  const router = useRouter();
  const { businessId, isDemoMode, isActive, onboardingBooked, setShowBookingModal } = useDemo();
  console.log("DashboardPage render - isDemoMode:", isDemoMode, "businessId:", businessId, "isActive:", isActive, "onboardingBooked:", onboardingBooked);

  const [leadsList, setLeadsList] = useState<any[]>([]);
  const [conversationsList, setConversationsList] = useState<any[]>([]);
  const [activitiesList, setActivitiesList] = useState<any[]>([]);
  const [missedCallsCount, setMissedCallsCount] = useState(0);
  const [recoveredCount, setRecoveredCount] = useState(0);
  const [activeConversationsCount, setActiveConversationsCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      setLeadsList(MOCK_LEADS.slice(0, 5));
      setConversationsList(MOCK_CONVERSATIONS.slice(0, 5));
      setActivitiesList(MOCK_ACTIVITIES);
      setMissedCallsCount(12);
      setRecoveredCount(8);
      setActiveConversationsCount(2);
      setIsLoadingData(false);
      return;
    }

    // Reset states for real user mode immediately to prevent stale demo data
    setLeadsList([]);
    setConversationsList([]);
    setActivitiesList([]);
    setMissedCallsCount(0);
    setRecoveredCount(0);
    setActiveConversationsCount(0);

    if (!businessId) {
      setIsLoadingData(false);
      return;
    }

    const fetchDashboardData = async () => {
      setIsLoadingData(true);
      try {
        // 1. Fetch recent leads
        const { data: leads, error: leadsErr } = await supabase
          .from("leads")
          .select("*")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false })
          .limit(5);

        // 2. Fetch recent conversations
        const { data: convs, error: convsErr } = await supabase
          .from("conversations")
          .select("*")
          .eq("business_id", businessId)
          .order("last_message_time", { ascending: false })
          .limit(5);

        // 3. Fetch missed calls for stats
        const { data: missedCalls, error: mcErr } = await supabase
          .from("missed_calls")
          .select("*")
          .eq("business_id", businessId);

        // 4. Fetch timeline activities
        const { data: activities, error: actsErr } = await supabase
          .from("recovery_activities")
          .select("*")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false })
          .limit(5);

        if (leads) setLeadsList(leads);
        if (convs) setConversationsList(convs);
        if (activities) setActivitiesList(activities);

        if (missedCalls) {
          setMissedCallsCount(missedCalls.length);
          const recovered = missedCalls.filter(m => m.recovered).length;
          setRecoveredCount(recovered);
        } else {
          setMissedCallsCount(0);
          setRecoveredCount(0);
        }

        if (convs) {
          const active = convs.filter(c => c.status === "Active" || c.status === "Replied").length;
          setActiveConversationsCount(active);
        } else {
          setActiveConversationsCount(0);
        }
      } catch (err) {
        console.error("Dashboard queries error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [businessId, isDemoMode]);

  // Compute values
  const hasData = missedCallsCount > 0 || leadsList.length > 0;
  const recoveryRate = missedCallsCount > 0 ? Math.round((recoveredCount / missedCallsCount) * 100) : 0;

  // Formatting helpers
  const formatTimeElapsed = (dateStr: string) => {
    const d = new Date(dateStr);
    const diffMs = Date.now() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
    return d.toLocaleDateString();
  };

  const getInitials = (nameStr: string) => {
    return nameStr.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "CN";
  };

  const getSvcIcon = (service: string) => {
    return serviceIconMap[service] || Wrench;
  };

  const getSvcColor = (service: string) => {
    return serviceColorMap[service] || "text-slate-500";
  };

  // Static stats list configuration mapped to dynamic values
  const stats = [
    { 
      label: "Missed Calls Today", 
      val: String(missedCallsCount), 
      trend: hasData ? "8% vs yesterday" : "0% vs yesterday", 
      isPositive: false,
      color: "bg-[#FEF08A] text-[#854D0E]", // Yellow
      icon: PhoneMissed
    },
    { 
      label: "Recovered Leads", 
      val: String(recoveredCount), 
      trend: hasData ? "33% vs yesterday" : "0% vs yesterday", 
      isPositive: true,
      color: "bg-[#DCFCE7] text-[#166534]", // Green
      icon: User
    },
    { 
      label: "Active Conversations", 
      val: String(activeConversationsCount), 
      trend: hasData ? "25% vs yesterday" : "0% vs yesterday", 
      isPositive: true,
      color: "bg-[#DBEAFE] text-[#1E40AF]", // Blue
      icon: MessageSquare
    },
    { 
      label: "Recovery Rate", 
      val: `${recoveryRate}%`, 
      trend: hasData ? "12% vs yesterday" : "0% vs yesterday", 
      isPositive: true,
      color: "bg-[#F3E8FF] text-[#6B21A8]", // Purple
      icon: TrendingUp
    }
  ];

  // Needs Attention items calculated dynamically
  const tasks = hasData ? [
    {
      count: `${leadsList.filter(l => l.status === "New").length} New Leads`,
      title: "Awaiting Follow-up",
      desc: "High priority leads",
      color: "bg-[#FEF08A] text-[#854D0E]", 
      icon: AlertCircle
    },
    {
      count: `${conversationsList.filter(c => c.status === "Awaiting Reply").length} Conversations`,
      title: "Awaiting Reply",
      desc: "Customers waiting on response",
      color: "bg-[#DBEAFE] text-[#1E40AF]", 
      icon: MessageSquare
    },
    {
      count: "1 Recovery Workflow",
      title: "Needs Review",
      desc: "Check configuration",
      color: "bg-[#F3E8FF] text-[#6B21A8]", 
      icon: Settings
    }
  ] : [];

  if (isLoadingData) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-[#64748B] font-bold text-xs uppercase tracking-widest gap-3">
        <div className="w-8 h-8 border-4 border-[#0B1F44] border-t-[#FACC15] rounded-full animate-spin" />
        <span>Loading Dashboard Data...</span>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh]">
      {/* Centered Onboarding Activation Modal */}
      {!isActive && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/40 backdrop-blur-[3px] animate-fade-in min-h-[80vh]">
          <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-8 sm:p-12 max-w-md w-full shadow-2xl text-center space-y-6 flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            {onboardingBooked ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-500 shadow-sm shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F44]">Onboarding Scheduled</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Awaiting Activation
                  </span>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed pt-3">
                    Your onboarding session has been booked successfully.
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                    Our team will contact you at the scheduled time and activate your workspace after setup.
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                  Awaiting manual activation
                </span>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-[#FFF9E6] border border-[#FDE047] flex items-center justify-center text-[#CA8A04] shadow-sm shrink-0">
                  <ClipboardList className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F44]">Welcome to TradyCall</h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                    Your workspace has been created successfully.
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                    To activate missed-call recovery for your business, book a quick onboarding call with our team.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowBookingModal(true);
                    trackBookDemoClick("dashboard_welcome_lock_modal");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md border-none"
                >
                  Book Onboarding Call
                </button>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                  Typical setup time: 15 minutes
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Dashboard Canvas - blur & disable interaction if inactive */}
      <div className={`p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto text-left animate-fade-in transition-all duration-300 ${
        !isActive ? "pointer-events-none select-none blur-[2px] opacity-65" : ""
      }`}>

      {/* ─── 1. "WELCOME TO TRADYCALL" ONBOARDING BANNER ─── */}
      <section className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 flex-grow">
          {/* Clipboard Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#FFF9E6] border border-[#FDE047] flex items-center justify-center shrink-0">
            <ClipboardList className="w-7 h-7 text-[#CA8A04]" />
          </div>
          
          <div className="space-y-4 flex-grow text-left">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#0B1F44]">Welcome to TradyCall</h2>
              <p className="text-xs text-[#64748B] font-bold">
                {hasData 
                  ? "Complete your setup to start recovering missed jobs automatically."
                  : "No missed calls have been recovered yet. Connect your business number to begin."
                }
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="max-w-md space-y-1.5">
              <div className="flex justify-between text-[10px] font-black text-[#CA8A04] uppercase tracking-wider">
                <span>20% Complete</span>
              </div>
              <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                <div className="bg-[#FACC15] h-full w-[20%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Step checklist */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 xl:gap-8 shrink-0 text-xs font-bold text-[#64748B] border-t xl:border-t-0 xl:border-l border-[#E2E8F0] pt-6 xl:pt-0 xl:pl-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex xl:flex-col gap-2 xl:gap-2.5 text-left">
            <li className="flex items-center gap-2 text-[#166534]">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#166534] fill-[#DCFCE7]" />
              <span>Account Created</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-slate-300" />
              <span>Connect Business Number</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-slate-300" />
              <span>Configure SMS Recovery</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-slate-300" />
              <span>Test Recovery Workflow</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-slate-300" />
              <span>Activate TradyCall</span>
            </li>
          </ul>

          <div className="pt-4 md:pt-0 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full sm:w-auto bg-[#FACC15] text-[#0B1F44] hover:bg-[#Eab308] border-none px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-sm transition-all text-center flex justify-center"
            >
              Connect Business Number
            </Button>
            <button
              onClick={() => {
                setShowBookingModal(true);
                trackBookDemoClick("dashboard_welcome_banner");
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0B1F44] border-2 border-[#0B1F44] px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer font-bold text-center"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. 4-COLUMN STATS ANALYTICS GRID ─── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm flex items-start justify-between min-h-[120px]">
              <div className="space-y-4 text-left">
                <span className="text-xs font-black text-[#64748B] uppercase tracking-wide block leading-none">
                  {stat.label}
                </span>
                <div className="space-y-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#0B1F44] block leading-none">
                    {stat.val}
                  </span>
                  
                  {/* Trend Indicator */}
                  <span className={`text-[10px] font-extrabold flex items-center gap-0.5 leading-none ${
                    stat.isPositive ? "text-[#166534]" : "text-[#991B1B]"
                  }`}>
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <ArrowDownLeft className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{stat.trend}</span>
                  </span>
                </div>
              </div>

              {/* Icon background bubble */}
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── 3. DOUBLE-PANE WORKSPACE ─── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* LEFT COLUMN: Recents Logs Pane */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Recent Leads Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#0B1F44] tracking-tight">
                  Recent Leads
                </h3>
              </div>
              <Link 
                href="/dashboard/leads" 
                className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all leads
              </Link>
            </div>

            {/* Custom Table layout */}
            <div className="overflow-x-auto">
              {leadsList.length === 0 ? (
                <div className="py-12 text-center text-xs font-bold text-slate-400">
                  No leads recovered yet. Connected calls will appear here.
                </div>
              ) : (
                <table className="w-full text-xs font-bold text-[#64748B] border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[10px] uppercase text-slate-400 tracking-wider text-left">
                      <th className="pb-3 font-black">Customer</th>
                      <th className="pb-3 font-black">Service Needed</th>
                      <th className="pb-3 font-black">Status</th>
                      <th className="pb-3 font-black text-right">Est. Job Value</th>
                      <th className="pb-3 font-black text-right">Last Contact</th>
                      <th className="pb-3 font-black text-center w-12">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {leadsList.map((lead, idx) => {
                      const SvcIcon = getSvcIcon(lead.service);
                      const iconCol = getSvcColor(lead.service);
                      return (
                        <tr key={lead.id || idx} className="hover:bg-slate-50/50 transition-colors">
                          {/* Customer Column */}
                          <td className="py-3.5 pr-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#0B1F44] flex items-center justify-center font-black shrink-0 text-[10px]">
                                {getInitials(lead.name)}
                              </div>
                              <div className="text-left leading-tight">
                                <span className="text-[#0f172a] font-black block">{lead.name}</span>
                                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{lead.phone}</span>
                              </div>
                            </div>
                          </td>

                          {/* Service Column */}
                          <td className="py-3.5 pr-2">
                            <div className="flex items-center gap-2 text-[#0f172a]">
                              <SvcIcon className={`w-4 h-4 shrink-0 ${iconCol}`} />
                              <span>{lead.service}</span>
                            </div>
                          </td>

                          {/* Status Column */}
                          <td className="py-3.5 pr-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              lead.status === "New" 
                                ? "bg-[#FEF08A] text-[#854D0E]" 
                                : lead.status === "Contacted" 
                                ? "bg-[#DBEAFE] text-[#1E40AF]" 
                                : "bg-[#DCFCE7] text-[#166534]"
                            }`}>
                              {lead.status}
                            </span>
                          </td>

                          {/* Value Column */}
                          <td className="py-3.5 pr-2 text-right text-[#0f172a] font-black">
                            ${lead.value}
                          </td>

                          {/* Time Column */}
                          <td className="py-3.5 pr-2 text-right text-slate-400">
                            {formatTimeElapsed(lead.last_contact || lead.created_at)}
                          </td>

                          {/* Actions Column */}
                          <td className="py-3.5 text-center">
                            <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                              <MoreHorizontal className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="text-center pt-2">
              <Link 
                href="/dashboard/leads" 
                className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all leads
              </Link>
            </div>

          </div>

          {/* Recent Conversations Table */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#0B1F44] tracking-tight">
                  Recent Conversations
                </h3>
              </div>
              <Link 
                href="/dashboard/conversations" 
                className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all conversations
              </Link>
            </div>

            <div className="overflow-x-auto">
              {conversationsList.length === 0 ? (
                <div className="py-12 text-center text-xs font-bold text-slate-400">
                  No conversations yet.
                </div>
              ) : (
                <table className="w-full text-xs font-bold text-[#64748B] border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[10px] uppercase text-slate-400 tracking-wider text-left">
                      <th className="pb-3 font-black">Customer</th>
                      <th className="pb-3 font-black">Service</th>
                      <th className="pb-3 font-black">Last Message</th>
                      <th className="pb-3 font-black text-right">Time</th>
                      <th className="pb-3 font-black text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {conversationsList.map((conv, idx) => {
                      const colorStyle = 
                        conv.status === "New" 
                          ? "bg-[#FEF08A] text-[#854D0E]" 
                          : conv.status === "Replied"
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : conv.status === "Active"
                          ? "bg-[#DBEAFE] text-[#1E40AF]"
                          : "bg-[#F3E8FF] text-[#6B21A8]"; // purple

                      return (
                        <tr key={conv.id || idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 pr-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#0B1F44] flex items-center justify-center font-black shrink-0 text-[10px]">
                                {getInitials(conv.name)}
                              </div>
                              <div className="text-left leading-tight">
                                <span className="text-[#0f172a] font-black block">{conv.name}</span>
                                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{conv.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 pr-2 text-[#0f172a]">
                            {conv.service}
                          </td>
                          <td className="py-3.5 pr-2 max-w-xs truncate text-[#0f172a] italic">
                            &ldquo;{conv.last_message}&rdquo;
                          </td>
                          <td className="py-3.5 pr-2 text-right text-slate-400">
                            {formatTimeElapsed(conv.last_message_time || conv.created_at)}
                          </td>
                          <td className="py-3.5 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${colorStyle}`}>
                              {conv.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="text-center pt-2">
              <Link 
                href="/dashboard/conversations" 
                className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all conversations
              </Link>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: timelines and quick cues panel */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Lead Recovery Activity Feed */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4 text-left">
              <h3 className="text-base sm:text-lg font-black text-[#0B1F44] tracking-tight">
                Lead Recovery Activity
              </h3>
            </div>

            {/* Timeline Wrapper */}
            {activitiesList.length === 0 ? (
              <div className="py-8 text-center text-xs font-bold text-slate-400">
                No activity recorded yet.
              </div>
            ) : (
              <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E2E8F0] text-left">
                {activitiesList.map((act, idx) => {
                  const ActIcon = activityIconMap[act.icon] || MessageSquare;
                  const timeText = new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={act.id || idx} className="relative space-y-1">
                      {/* Timeline dot */}
                      <div className={`absolute -left-8 top-0.5 w-6 h-6 rounded-full ${act.color} flex items-center justify-center shrink-0 border-2 border-white shadow-sm`}>
                        <ActIcon className="w-3.5 h-3.5" />
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#64748B] leading-none uppercase">
                        <span>{timeText}</span>
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black text-[#0b1f44] leading-tight">
                          {act.title}
                        </h4>
                        <p className="text-[11px] font-bold text-slate-400 leading-normal">
                          {act.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="text-center pt-2 border-t border-[#E2E8F0]">
              <Link 
                href="/dashboard/leads" 
                className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline"
              >
                View full activity
              </Link>
            </div>
          </div>

          {/* Needs Attention Alert queues */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm space-y-5">
            <div className="border-b border-[#E2E8F0] pb-4 text-left">
              <h3 className="text-base sm:text-lg font-black text-[#0B1F44] tracking-tight">
                Needs Attention
              </h3>
            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="py-6 text-center text-xs font-black text-[#166534] bg-[#DCFCE7] rounded-xl border border-green-200">
                  🎉 All caught up!
                </div>
              ) : (
                tasks.map((task, idx) => {
                  const TaskIcon = task.icon;
                  return (
                    <div 
                      key={idx} 
                      className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#CBD5E1] transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-xl ${task.color} flex items-center justify-center shrink-0`}>
                          <TaskIcon className="w-4.5 h-4.5" />
                        </div>
                        <div className="leading-tight">
                          <span className="text-xs font-black text-[#0B1F44]">
                            <strong className="font-extrabold">{task.count}</strong> {task.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                            {task.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4.5 h-4.5 text-[#64748B] shrink-0" />
                    </div>
                  );
                })
              )}
            </div>

            <div className="text-center pt-2 border-t border-[#E2E8F0]">
              <Link 
                href="/dashboard/leads" 
                className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all tasks
              </Link>
            </div>
          </div>

        </div>

      </section>

      </div>
    </div>
  );
}
