"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  ChevronLeft,
  X,
  Phone,
  Droplet,
  Flame,
  Wrench,
  Hammer,
  FileText,
  CheckCircle2,
  PhoneCall,
  ChevronDown
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { useDemo } from "../DemoContext";
import { MOCK_LEADS } from "../MockData";

// Lucide icon mapping based on service name
const serviceIconMap: Record<string, any> = {
  "Blocked Drain": Droplet,
  "Hot Water System": Flame,
  "Hot Water System Repair": Flame,
  "Bathroom Renovation": Hammer,
  "Leaking Tap": Wrench,
  "Toilet Replacement": Wrench,
  "Toilet Repair": Wrench,
  "Ceiling Fan Installation": Hammer,
  "Switchboard Upgrade": Hammer,
  "Burst Pipe": Droplet,
  "Powerpoint Installation": Wrench,
  "Tap Replacement": Wrench
};

const serviceColorMap: Record<string, string> = {
  "Blocked Drain": "text-blue-500",
  "Hot Water System": "text-orange-500",
  "Hot Water System Repair": "text-orange-500",
  "Bathroom Renovation": "text-purple-500",
  "Leaking Tap": "text-slate-500",
  "Toilet Replacement": "text-emerald-500",
  "Toilet Repair": "text-emerald-500",
  "Ceiling Fan Installation": "text-purple-500",
  "Switchboard Upgrade": "text-purple-500",
  "Burst Pipe": "text-blue-500",
  "Powerpoint Installation": "text-slate-500",
  "Tap Replacement": "text-emerald-500"
};

export default function LeadsPage() {
  const { businessId, isDemoMode } = useDemo();
  console.log("LeadsPage render - isDemoMode:", isDemoMode, "businessId:", businessId);
  
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState("overview"); // overview, notes, timeline
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Fetch leads dynamically based on business ID
  useEffect(() => {
    if (isDemoMode) {
      setLeads(MOCK_LEADS);
      if (MOCK_LEADS.length > 0) {
        setSelectedLeadId(MOCK_LEADS[0].id);
      } else {
        setSelectedLeadId(null);
      }
      setIsLoading(false);
      return;
    }

    // Reset states for real user mode immediately to prevent stale demo data
    setLeads([]);
    setSelectedLeadId(null);

    if (!businessId) {
      setIsLoading(false);
      return;
    }

    const fetchLeads = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false });

        if (data) {
          setLeads(data);
          if (data.length > 0) {
            setSelectedLeadId(data[0].id);
          } else {
            setSelectedLeadId(null);
          }
        }
      } catch (err) {
        console.error("Leads query error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [businessId, isDemoMode]);

  // Handle Mark as Contacted
  const handleMarkContacted = async (leadId: string) => {
    if (isDemoMode) {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: "Contacted" } : l));
      return;
    }

    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: "Contacted" })
        .eq("id", leadId);

      if (!error) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: "Contacted" } : l));
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  // Helper functions
  const getInitials = (nameStr: string) => {
    return nameStr.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "CN";
  };

  const getSvcIcon = (service: string) => {
    return serviceIconMap[service] || Wrench;
  };

  const getSvcColor = (service: string) => {
    return serviceColorMap[service] || "text-slate-500";
  };

  // Counts based on current lead states
  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === "New").length,
    contacted: leads.filter(l => l.status === "Contacted").length,
    quoted: leads.filter(l => l.status === "Quoted").length,
    won: leads.filter(l => l.status === "Won").length,
    lost: leads.filter(l => l.status === "Lost").length
  };

  // Filter leads list
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lead.phone.includes(searchTerm) || 
      (lead.service && lead.service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus ? lead.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1700px] mx-auto text-left animate-fade-in">
      
      {/* Split Grid layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* LEFT COLUMN: Recovered Leads Log (cols 8) */}
        <div className="xl:col-span-8 space-y-5">
          {/* Header block */}
          <div className="text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F44] tracking-tight">Recovered Leads</h2>
            <p className="text-xs text-[#64748B] font-semibold">
              Leads recovered from missed calls and tracked for follow-up.
            </p>
          </div>

          {/* Search bar & filters trigger */}
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search leads by name, phone or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-[#0F172A] placeholder-slate-450 focus:outline-none focus:border-blue-500 shadow-sm transition-all"
              />
            </div>
            <button className="flex items-center gap-1.5 px-4.5 py-2.5 border border-[#E2E8F0] bg-white rounded-xl text-xs font-black text-[#0B1F44] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-[#64748B]" />
              <span>Filters</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
            </button>
          </div>

          {/* Count indicators row */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 text-[10px] font-black tracking-wider uppercase text-slate-400">
            {/* New */}
            <button 
              onClick={() => setFilterStatus(filterStatus === "New" ? null : "New")}
              className={`flex items-center gap-2 px-3 py-2 border rounded-xl shadow-sm transition-all cursor-pointer ${
                filterStatus === "New" 
                  ? "bg-[#FFF9E6] border-[#FDE047] text-[#854D0E] font-black" 
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
              <span>New</span>
              <span className="text-[#0f172a] font-extrabold">{counts.new}</span>
            </button>

            {/* Contacted */}
            <button 
              onClick={() => setFilterStatus(filterStatus === "Contacted" ? null : "Contacted")}
              className={`flex items-center gap-2 px-3 py-2 border rounded-xl shadow-sm transition-all cursor-pointer ${
                filterStatus === "Contacted" 
                  ? "bg-[#DBEAFE] border-blue-200 text-[#1E40AF] font-black" 
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Contacted</span>
              <span className="text-[#0f172a] font-extrabold">{counts.contacted}</span>
            </button>

            {/* Quoted */}
            <button 
              onClick={() => setFilterStatus(filterStatus === "Quoted" ? null : "Quoted")}
              className={`flex items-center gap-2 px-3 py-2 border rounded-xl shadow-sm transition-all cursor-pointer ${
                filterStatus === "Quoted" 
                  ? "bg-[#F3E8FF] border-purple-200 text-[#6B21A8] font-black" 
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>Quoted</span>
              <span className="text-[#0f172a] font-extrabold">{counts.quoted}</span>
            </button>

            {/* Won */}
            <button 
              onClick={() => setFilterStatus(filterStatus === "Won" ? null : "Won")}
              className={`flex items-center gap-2 px-3 py-2 border rounded-xl shadow-sm transition-all cursor-pointer ${
                filterStatus === "Won" 
                  ? "bg-[#DCFCE7] border-green-200 text-[#166534] font-black" 
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Won</span>
              <span className="text-[#0f172a] font-extrabold">{counts.won}</span>
            </button>

            {/* Lost */}
            <button 
              onClick={() => setFilterStatus(filterStatus === "Lost" ? null : "Lost")}
              className={`flex items-center gap-2 px-3 py-2 border rounded-xl shadow-sm transition-all cursor-pointer ${
                filterStatus === "Lost" 
                  ? "bg-[#FEE2E2] border-red-200 text-[#991B1B] font-black" 
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Lost</span>
              <span className="text-[#0f172a] font-extrabold">{counts.lost}</span>
            </button>
          </div>

          {/* Table Container Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="py-16 text-center text-xs font-bold text-[#64748B] flex flex-col items-center justify-center gap-2">
                <div className="w-6 h-6 border-2 border-[#0B1F44] border-t-[#FACC15] rounded-full animate-spin" />
                <span>Loading Leads...</span>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-20 text-center text-xs font-bold text-slate-400">
                No leads recovered yet. Connected calls will appear here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-bold text-[#64748B] border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[10px] uppercase text-slate-400 tracking-wider text-left bg-slate-50/20">
                      <th className="py-4 pl-6 font-black">Customer Name</th>
                      <th className="py-4 pr-2 font-black">Phone Number</th>
                      <th className="py-4 pr-2 font-black">Service Requested</th>
                      <th className="py-4 pr-2 font-black">Lead Status</th>
                      <th className="py-4 pr-2 font-black">Estimated Value</th>
                      <th className="py-4 pr-6 font-black">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredLeads.map((lead) => {
                      const SvcIcon = getSvcIcon(lead.service);
                      const iconColor = getSvcColor(lead.service);
                      const isSelected = lead.id === selectedLeadId;
                      const dateObj = new Date(lead.created_at);
                      const leadDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const leadTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                      return (
                        <tr 
                          key={lead.id} 
                          onClick={() => setSelectedLeadId(lead.id)}
                          className={`transition-all cursor-pointer relative ${
                            isSelected 
                              ? "bg-[#FFF9E6]/35 border-y-2 border-[#FDE047]/65 hover:bg-[#FFF9E6]/45" 
                              : "hover:bg-slate-50/50"
                          }`}
                        >
                          {isSelected && (
                            <td className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FACC15]" />
                          )}

                          {/* Customer Name */}
                          <td className="py-4 pl-6 pr-2">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-slate-100 border border-[#E2E8F0] text-[#0B1F44] flex items-center justify-center font-black shrink-0 text-[10px]">
                                {getInitials(lead.name)}
                              </div>
                              <div className="text-left leading-tight">
                                <span className="text-[#0F172A] font-black block">{lead.name}</span>
                                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{lead.location || "Local Suburb"}</span>
                              </div>
                            </div>
                          </td>

                          {/* Phone */}
                          <td className="py-4 pr-2">
                            <span className="text-[#0f172a] font-semibold">{lead.phone}</span>
                          </td>

                          {/* Service */}
                          <td className="py-4 pr-2">
                            <div className="flex items-center gap-2 text-[#0f172a] font-semibold">
                              <SvcIcon className={`w-4.5 h-4.5 shrink-0 ${iconColor}`} />
                              <span>{lead.service}</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-4 pr-2">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              lead.status === "New" 
                                ? "bg-[#FEF08A] text-[#854D0E]" 
                                : lead.status === "Contacted" 
                                ? "bg-[#DBEAFE] text-[#1E40AF]" 
                                : lead.status === "Quoted" 
                                ? "bg-[#F3E8FF] text-[#6B21A8]"
                                : lead.status === "Won"
                                ? "bg-[#DCFCE7] text-[#166534]"
                                : "bg-[#FEE2E2] text-[#991B1B]"
                            }`}>
                              {lead.status}
                            </span>
                          </td>

                          {/* Estimated Value */}
                          <td className="py-4 pr-2 text-[#0f172a] font-black">
                            ${lead.value}
                          </td>

                          {/* Date */}
                          <td className="py-4 pr-6 relative">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-left leading-tight">
                                <span className="text-[#0f172a] font-bold block">{leadDate}</span>
                                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{leadTime}</span>
                              </div>
                              <ChevronRight className={`w-4.5 h-4.5 transition-all shrink-0 ${
                                isSelected ? "text-[#0B1F44] translate-x-1" : "text-transparent"
                              }`} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#64748B]">
              <span>Showing {filteredLeads.length === 0 ? 0 : 1} to {filteredLeads.length} of {filteredLeads.length} leads</span>
              
              <div className="flex items-center gap-1">
                <button className="p-2 border border-[#E2E8F0] rounded-xl hover:bg-slate-50 text-slate-400 cursor-pointer transition-colors shrink-0">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-xl bg-[#FFF9E6] border border-[#FDE047] text-[#854D0E] font-black text-center flex items-center justify-center cursor-pointer transition-all">
                  1
                </button>
                <button className="p-2 border border-[#E2E8F0] rounded-xl hover:bg-slate-50 text-slate-400 cursor-pointer transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Lead Detail Panel (cols 4) */}
        <div className={`xl:col-span-4 bg-white border border-[#E2E8F0] rounded-[24px] shadow-md flex flex-col min-h-[600px] xl:min-h-0 overflow-hidden text-left relative ${
          selectedLeadId 
            ? "fixed inset-0 z-50 xl:relative xl:inset-auto xl:z-auto xl:flex" 
            : "hidden xl:flex"
        }`}>
          
          {!selectedLead ? (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-slate-400 text-xs font-bold gap-2">
              <Phone className="w-8 h-8 text-slate-300" />
              <span>No lead selected. Select a lead to view details.</span>
            </div>
          ) : (
            <>
              {/* Close Button X */}
              <button 
                onClick={() => setSelectedLeadId(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-[#E2E8F0] text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Panel Header */}
              <div className="p-6 border-b border-[#E2E8F0] space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-[#E2E8F0] text-[#0B1F44] flex items-center justify-center font-black text-xs shrink-0 select-none">
                    {getInitials(selectedLead.name)}
                  </div>
                  <div className="space-y-1 text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-black text-[#0B1F44] truncate">{selectedLead.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${
                        selectedLead.status === "New" 
                          ? "bg-[#FEF08A] text-[#854D0E]" 
                          : "bg-[#DBEAFE] text-[#1E40AF]"
                      }`}>
                        {selectedLead.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold block">{selectedLead.location || "Local Suburb"}</p>
                    <a href={`tel:${selectedLead.phone}`} className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-black hover:underline mt-0.5">
                      <Phone className="w-3 h-3" /> {selectedLead.phone}
                    </a>
                  </div>
                </div>

                {/* Subnav tabs */}
                <div className="flex items-center border-b border-[#E2E8F0] pt-2 text-xs font-black text-[#64748B] select-none">
                  <button 
                    onClick={() => setActiveSubTab("overview")}
                    className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
                      activeSubTab === "overview" 
                        ? "border-[#FACC15] text-[#0B1F44] font-black" 
                        : "border-transparent hover:text-[#0F172A]"
                    }`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveSubTab("notes")}
                    className={`pb-2 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeSubTab === "notes" 
                        ? "border-[#FACC15] text-[#0B1F44] font-black" 
                        : "border-transparent hover:text-[#0F172A]"
                    }`}
                  >
                    <span>Notes</span>
                    <span className="w-4 h-4 rounded-full bg-slate-100 border border-[#E2E8F0] text-[8px] text-slate-450 font-black flex items-center justify-center shrink-0">
                      1
                    </span>
                  </button>
                  <button 
                    onClick={() => setActiveSubTab("timeline")}
                    className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
                      activeSubTab === "timeline" 
                        ? "border-[#FACC15] text-[#0B1F44] font-black" 
                        : "border-transparent hover:text-[#0F172A]"
                    }`}
                  >
                    Timeline
                  </button>
                </div>
              </div>

              {/* Panel Scrollable Body */}
              <div className="flex-grow p-6 overflow-y-auto space-y-6">
                {activeSubTab === "overview" && (
                  <>
                    {/* Customer Details */}
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
                        <h4 className="text-xs font-black text-[#0B1F44] uppercase tracking-wider">
                          Customer Details
                        </h4>
                        <button className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer border-none bg-transparent">
                          Edit
                        </button>
                      </div>

                      <div className="space-y-2 text-xs font-bold text-[#64748B]">
                        <div className="flex justify-between">
                          <span>Name</span>
                          <span className="text-[#0F172A] font-semibold text-right">{selectedLead.name}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-50">
                          <span>Phone</span>
                          <span className="text-[#0F172A] font-semibold text-right">{selectedLead.phone}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-50">
                          <span>Location</span>
                          <span className="text-[#0F172A] font-semibold text-right">{selectedLead.location || "Local Suburb"}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-50">
                          <span>Source</span>
                          <span className="text-[#0F172A] font-semibold text-right">{selectedLead.source || "Missed Call Recovery"}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-50">
                          <span>First Contact</span>
                          <span className="text-[#0F172A] font-semibold text-right">
                            {new Date(selectedLead.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                        <PhoneCall className="w-4 h-4 text-[#64748B] shrink-0" />
                        <h4 className="text-xs font-black text-[#0B1F44] uppercase tracking-wider">
                          Conversation Summary
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold block">
                        {new Date(selectedLead.created_at).toLocaleString()}
                      </span>
                      
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3.5 text-xs font-semibold text-[#0F172A] leading-relaxed relative">
                        <p>&ldquo;{selectedLead.summary || "Customer called regarding " + selectedLead.service + "."}&rdquo;</p>
                        
                        <div className="inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-xl px-3 py-1.5 font-black text-[#0B1F44] text-[10px] shadow-sm select-none">
                          {React.createElement(getSvcIcon(selectedLead.service), { className: `w-4.5 h-4.5 shrink-0 ${getSvcColor(selectedLead.service)}` })}
                          <span>{selectedLead.service}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#64748B] shrink-0" />
                          <h4 className="text-xs font-black text-[#0B1F44] uppercase tracking-wider">
                            Notes
                          </h4>
                        </div>
                        <button className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer border-none bg-transparent">
                          Edit
                        </button>
                      </div>
                      
                      <p className="text-xs font-semibold text-[#0F172A] leading-relaxed bg-[#F8FAFC] border border-dashed border-[#E2E8F0] rounded-xl p-3.5">
                        {selectedLead.notes || "No notes added yet."}
                      </p>
                    </div>
                  </>
                )}

                {activeSubTab === "notes" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
                      <h4 className="text-xs font-black text-[#0B1F44] uppercase tracking-wider">
                        Developer & Team Notes
                      </h4>
                      <button className="text-[10px] font-black text-blue-600 hover:underline cursor-pointer border-none bg-transparent">
                        + Add note
                      </button>
                    </div>
                    <div className="bg-[#FFF9E6] border border-[#FDE047] rounded-xl p-4 space-y-2 text-xs font-semibold text-[#854D0E] leading-normal text-left shadow-sm">
                      <p>&ldquo;{selectedLead.notes || "No team notes added yet."}&rdquo;</p>
                      <span className="text-[9px] text-[#CA8A04] font-black block pt-1 border-t border-[#FDE047]/50">
                        Added by AI Copilot • {new Date(selectedLead.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                {activeSubTab === "timeline" && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E2E8F0] pb-2 text-left">
                      <h4 className="text-xs font-black text-[#0B1F44] uppercase tracking-wider">
                        Lead Lifecycle Timeline
                      </h4>
                    </div>

                    <div className="space-y-5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E2E8F0] text-left">
                      <div className="relative space-y-1">
                        <div className="absolute -left-8 top-0.5 w-5 h-5 rounded-full bg-[#FFF9E6] border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                          <Phone className="w-3 h-3 text-[#CA8A04]" />
                        </div>
                        <h5 className="text-xs font-black text-[#0B1F44]">Missed Call Received</h5>
                        <span className="text-[10px] text-slate-400 font-bold block">{new Date(selectedLead.created_at).toLocaleString()}</span>
                      </div>

                      <div className="relative space-y-1">
                        <div className="absolute -left-8 top-0.5 w-5 h-5 rounded-full bg-[#FFF9E6] border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-[#CA8A04]" />
                        </div>
                        <h5 className="text-xs font-black text-[#0B1F44]">Lead Created</h5>
                        <span className="text-[10px] text-slate-400 font-bold block">{new Date(selectedLead.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel Footer Action Buttons */}
              <div className="p-4 border-t border-[#E2E8F0] bg-white shrink-0 flex items-center gap-1.5">
                <button 
                  onClick={() => handleMarkContacted(selectedLead.id)}
                  disabled={selectedLead.status === "Contacted"}
                  className="flex-grow bg-[#FACC15] hover:bg-[#Eab308] disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] disabled:cursor-not-allowed text-[#0B1F44] font-black text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-[#FACC15]/20 cursor-pointer border-none transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{selectedLead.status === "Contacted" ? "Contacted" : "Mark as Contacted"}</span>
                </button>
                <button className="bg-[#FACC15] hover:bg-[#Eab308] text-[#0B1F44] p-3.5 rounded-xl flex items-center justify-center cursor-pointer border-none transition-colors shrink-0 shadow-sm shadow-[#FACC15]/10">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}
