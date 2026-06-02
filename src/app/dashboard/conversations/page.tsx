"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  ClipboardList,
  SlidersHorizontal,
  ChevronDown,
  CheckCheck,
  MoreVertical,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useDemo } from "../DemoContext";
import { MOCK_CONVERSATIONS } from "../MockData";

/* ── Status badge colours ── */
const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  Recovered:    { bg: "bg-[#DCFCE7]", text: "text-[#166534]", border: "border-[#BBF7D0]" },
  "Quote Sent": { bg: "bg-[#DBEAFE]", text: "text-[#1E40AF]", border: "border-[#BFDBFE]" },
  Booked:       { bg: "bg-[#FEF9C3]", text: "text-[#854D0E]", border: "border-[#FDE68A]" },
  "No Response":{ bg: "bg-[#F1F5F9]", text: "text-[#64748B]", border: "border-[#E2E8F0]" },
  New:          { bg: "bg-[#FFF9E6]", text: "text-[#854D0E]", border: "border-[#FDE68A]" },
  Replied:      { bg: "bg-[#DCFCE7]", text: "text-[#166534]", border: "border-[#BBF7D0]" },
  Active:       { bg: "bg-[#DBEAFE]", text: "text-[#1E40AF]", border: "border-[#BFDBFE]" },
  "Awaiting Reply": { bg: "bg-[#F3E8FF]", text: "text-[#6B21A8]", border: "border-[#E9D5FF]" }
};

function StatusBadge({ status }: { status: string }) {
  const s = statusStyles[status] ?? statusStyles["No Response"];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${s.bg} ${s.text} border ${s.border} whitespace-nowrap`}>
      {status}
    </span>
  );
}

export default function ConversationsPage() {
  const { businessId, isDemoMode } = useDemo();

  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch conversations dynamically
  useEffect(() => {
    if (isDemoMode) {
      setChats(MOCK_CONVERSATIONS);
      if (MOCK_CONVERSATIONS.length > 0) {
        setActiveChatId(MOCK_CONVERSATIONS[0].id);
      } else {
        setActiveChatId(null);
      }
      setIsLoading(false);
      return;
    }

    // Reset states for real user mode immediately to prevent stale demo data
    setChats([]);
    setActiveChatId(null);

    if (!businessId) {
      setIsLoading(false);
      return;
    }

    const fetchChats = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("conversations")
          .select("*")
          .eq("business_id", businessId)
          .order("last_message_time", { ascending: false });

        if (data) {
          setChats(data);
          if (data.length > 0) {
            setActiveChatId(data[0].id);
          } else {
            setActiveChatId(null);
          }
        }
      } catch (err) {
        console.error("Conversations query error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [businessId, isDemoMode]);

  const active = chats.find(c => c.id === activeChatId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !active) return;

    const newMsg = {
      sender: "tradycall",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase()
    };

    const currentMsgs = Array.isArray(active.messages) ? active.messages : [];
    const updatedMessages = [...currentMsgs, newMsg];

    if (isDemoMode) {
      setChats(prev => prev.map(c => c.id === active.id ? {
        ...c,
        messages: updatedMessages,
        last_message: newMsg.text,
        last_message_time: new Date().toISOString(),
        status: "Replied"
      } : c));
      setInputText("");
      return;
    }

    try {
      const { error } = await supabase
        .from("conversations")
        .update({
          messages: updatedMessages,
          last_message: newMsg.text,
          last_message_time: new Date().toISOString()
        })
        .eq("id", active.id);

      if (!error) {
        setChats(prev => prev.map(c => c.id === active.id ? {
          ...c,
          messages: updatedMessages,
          last_message: newMsg.text,
          last_message_time: new Date().toISOString()
        } : c));
        setInputText("");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  };

  // Helper functions
  const getInitials = (nameStr: string) => {
    return nameStr.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "CN";
  };

  const getAvatarStyle = (nameStr: string) => {
    const initials = getInitials(nameStr);
    const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    const colors = [
      { bg: "bg-[#FEF9C3]", text: "text-[#854D0E]" },
      { bg: "bg-[#DBEAFE]", text: "text-[#1E40AF]" },
      { bg: "bg-[#FCE7F3]", text: "text-[#9D174D]" },
      { bg: "bg-[#DCFCE7]", text: "text-[#166534]" },
      { bg: "bg-[#F1F5F9]", text: "text-[#475569]" },
      { bg: "bg-[#FEF3C7]", text: "text-[#92400E]" },
    ];
    return colors[code % colors.length];
  };

  const formatMessageTime = (timeStr: string) => {
    const d = new Date(timeStr);
    const diffMs = Date.now() - d.getTime();
    if (diffMs > 86400000) return "Yesterday";
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
  };

  // Filter conversations
  const filteredChats = chats.filter(chat => {
    const matchesSearch = 
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      chat.phone.includes(searchTerm) || 
      (chat.service && chat.service.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "All Statuses" ? true : chat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden animate-fade-in">

      {/* ── TOP BAR ── */}
      <div className="shrink-0 bg-white border-b border-[#E2E8F0] px-5 py-3 flex items-center gap-3 flex-wrap">
        <h2 className="text-lg font-black text-[#0B1F44] tracking-tight mr-4">Conversations</h2>

        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-9 pr-4 py-2 text-xs font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 focus:border-[#FACC15]"
          />
        </div>

        {/* Filter Trigger */}
        <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors bg-white cursor-pointer">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B]" />
          Filter
        </button>

        {/* Status drop indicator */}
        <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors bg-white cursor-pointer relative">
          {statusFilter}
          <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
        </button>
      </div>

      {/* ── MAIN SPLIT PANEL ── */}
      <div className="flex-grow flex min-h-0 overflow-hidden">

        {/* LEFT: Recovered Leads list */}
        <div className="w-full max-w-[380px] border-r border-[#E2E8F0] bg-white flex flex-col min-h-0">
          
          <div className="px-4 pt-4 pb-2.5 flex items-center justify-between shrink-0">
            <h3 className="text-sm font-black text-[#0B1F44]">Recovered Leads</h3>
            <button className="p-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer text-[#64748B]">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable list */}
          <div className="flex-grow overflow-y-auto">
            {isLoading ? (
              <div className="py-12 text-center text-xs font-bold text-[#64748B] flex flex-col items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-[#0B1F44] border-t-[#FACC15] rounded-full animate-spin" />
                <span>Loading Chats...</span>
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="py-16 text-center text-xs font-bold text-slate-400">
                No active conversations.
              </div>
            ) : (
              filteredChats.map((chat) => {
                const avStyle = getAvatarStyle(chat.name);
                const isCurrentActive = chat.id === activeChatId;

                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors border-l-[3px] cursor-pointer ${
                      isCurrentActive
                        ? "bg-[#F8FAFC] border-l-[#FACC15]"
                        : "border-l-transparent hover:bg-[#FAFBFC]"
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full ${avStyle.bg} ${avStyle.text} flex items-center justify-center font-bold text-xs shrink-0 select-none`}>
                      {getInitials(chat.name)}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[13px] font-bold text-[#0F172A] block truncate">{chat.name}</span>
                          <span className="text-[11px] text-[#64748B] font-medium block mt-0.5">{chat.service || "Plumbing"}</span>
                        </div>
                        <span className="text-[10px] text-[#94A3B8] font-medium shrink-0 mt-0.5">
                          {formatMessageTime(chat.last_message_time || chat.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-1.5">
                        <p className="text-[11px] text-[#94A3B8] font-medium truncate">{chat.last_message}</p>
                        <StatusBadge status={chat.status} />
                      </div>
                    </div>
                  </button>
                );
              })
            )}

            {/* Support captures CTA */}
            <div className="px-4 py-5 border-t border-[#E2E8F0] mt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FEF9C3] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#CA8A04]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Never miss a lead again.</h4>
                  <p className="text-[10px] text-[#64748B] font-medium mt-0.5 leading-relaxed">
                    Capture every missed call and turn it into booked jobs.
                  </p>
                </div>
              </div>
              <Link href="/dashboard" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F44] hover:text-[#eab308] transition-colors">
                View Missed Calls
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: Chat pane */}
        <div className="flex-grow flex flex-col min-h-0 bg-[#FAFBFC]">
          
          {!active ? (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-slate-450 text-xs font-bold gap-2">
              <MessageSquare className="w-8 h-8 text-slate-300" />
              <span>No conversation selected. Select a lead to load chat thread.</span>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between shrink-0 text-left">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-full ${getAvatarStyle(active.name).bg} ${getAvatarStyle(active.name).text} flex items-center justify-center font-bold text-sm shrink-0 select-none`}>
                    {getInitials(active.name)}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-[#0F172A]">{active.name}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-[11px] text-[#64748B] font-medium">
                        <Phone className="w-3 h-3" />
                        {active.phone}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#64748B] font-medium">
                        <MapPin className="w-3 h-3" />
                        {active.service || "Plumbing"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right meta */}
                <div className="flex items-center gap-5">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-[#94A3B8] font-medium block">Source</span>
                    <span className="text-[11px] text-[#0F172A] font-bold">Missed Call Recovery</span>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-[#94A3B8] font-medium block">Status</span>
                    <div className="mt-0.5 flex items-center gap-1">
                      <StatusBadge status={active.status} />
                      <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer text-[#64748B]">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-grow overflow-y-auto px-5 py-5">
                <div className="text-center mb-6">
                  <span className="text-[10px] text-[#94A3B8] font-medium bg-[#F1F5F9] px-3 py-1 rounded-full">Today</span>
                </div>

                <div className="space-y-4 max-w-3xl mx-auto text-left">
                  {(Array.isArray(active.messages) ? active.messages : []).map((msg: any, idx: number) => {
                    const isTradyCall = msg.sender === "tradycall";
                    return (
                      <div key={idx} className={`flex ${isTradyCall ? "justify-end" : "justify-start"} gap-2.5`}>
                        {/* Customer avatar (left) */}
                        {!isTradyCall && (
                          <div className={`w-8 h-8 rounded-full ${getAvatarStyle(active.name).bg} ${getAvatarStyle(active.name).text} flex items-center justify-center font-bold text-[10px] shrink-0 select-none mt-1`}>
                            {getInitials(active.name)}
                          </div>
                        )}

                        <div className="max-w-[65%] space-y-1">
                          <div
                            className={`px-4 py-3 text-[13px] font-medium leading-relaxed whitespace-pre-line ${
                              isTradyCall
                                ? "bg-[#FEF9C3] text-[#0F172A] rounded-2xl rounded-tr-md"
                                : "bg-white text-[#0F172A] rounded-2xl rounded-tl-md border border-[#E2E8F0] shadow-sm"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className={`flex items-center gap-1 ${isTradyCall ? "justify-end" : "justify-start"} px-1`}>
                            <span className="text-[10px] text-[#94A3B8] font-medium">{msg.time}</span>
                            {isTradyCall && <CheckCheck className="w-3 h-3 text-[#94A3B8]" />}
                          </div>
                        </div>

                        {/* TradyCall avatar (right) */}
                        {isTradyCall && (
                          <div className="w-8 h-8 rounded-full bg-[#FACC15] flex items-center justify-center shrink-0 mt-1">
                            <Phone className="w-3.5 h-3.5 text-[#0B1F44]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Message input bar */}
              <div className="bg-white border-t border-[#E2E8F0] px-5 pt-3 pb-3 shrink-0">
                <form onSubmit={handleSend}>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="flex-grow bg-transparent text-xs font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none border-none"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Attach icons */}
                    <div className="flex items-center gap-1">
                      <button type="button" className="p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer text-[#94A3B8] hover:text-[#64748B] bg-transparent border-none">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer text-[#94A3B8] hover:text-[#64748B] bg-transparent border-none">
                        <Smile className="w-4 h-4" />
                      </button>
                      <button type="button" className="p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer text-[#94A3B8] hover:text-[#64748B] bg-transparent border-none">
                        <ClipboardList className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Send button */}
                    <div className="flex items-center">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#FACC15] hover:bg-[#EAB308] text-[#0B1F44] font-bold text-xs px-5 py-2.5 rounded-l-lg transition-colors cursor-pointer border-none shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send
                      </button>
                      <button
                        type="button"
                        className="bg-[#FACC15] hover:bg-[#EAB308] text-[#0B1F44] px-2 py-2.5 rounded-r-lg border-l border-[#EAB308] transition-colors cursor-pointer border-y-0 border-r-0 shadow-sm"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </form>

                {/* SMS notice */}
                <p className="text-[10px] text-[#94A3B8] font-medium mt-2 text-center">
                  SMS will be sent from {active.phone}
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
