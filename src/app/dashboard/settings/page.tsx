"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  MessageSquare,
  Users2,
  Shield,
  Clock,
  ChevronDown,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";
import { useDemo } from "../DemoContext";

/* ── Team members ── */
const teamMembers = [
  {
    name: "Andrew Brown",
    initials: "AB",
    email: "andrew@aussieplumbing.com.au",
    role: "Admin",
    status: "Active",
    avatarBg: "bg-[#FEF9C3]",
    avatarText: "text-[#854D0E]",
  },
  {
    name: "Jake Smith",
    initials: "JS",
    email: "jake@aussieplumbing.com.au",
    role: "User",
    status: "Active",
    avatarBg: "bg-[#DBEAFE]",
    avatarText: "text-[#1E40AF]",
  },
];

export default function SettingsPage() {
  const { isDemoMode, businessName: activeBusName, fullName: activeFullName, user } = useDemo();

  const [businessName, setBusinessName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [tradeType, setTradeType] = useState("Plumbing");
  const [email, setEmail] = useState("");

  const [smsTemplate, setSmsTemplate] = useState("");
  const [teamList, setTeamList] = useState<any[]>([]);

  const [notifMissedCall, setNotifMissedCall] = useState(true);
  const [notifSmsReply, setNotifSmsReply] = useState(true);
  const [notifDailySummary, setNotifDailySummary] = useState(true);
  const [closedSunday, setClosedSunday] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      setBusinessName("Aussie Plumbing");
      setContactNumber("0412 345 678");
      setTradeType("Plumbing");
      setEmail("info@aussieplumbing.com.au");
      setSmsTemplate(
        `Hi {{first_name}},\nThanks for calling {{business_name}}. We missed your call. Our team will get back to you shortly.\n\nThanks,\n{{business_name}}`
      );
      setTeamList(teamMembers);
    } else {
      setBusinessName("");
      setContactNumber("");
      setTradeType("");
      setEmail("");
      setSmsTemplate("");
      setTeamList([]);
    }
  }, [isDemoMode, activeBusName, activeFullName, user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✓ Settings saved successfully!");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto text-left">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#0B1F44] tracking-tight">
          Settings
        </h2>
        <p className="text-xs text-[#64748B] font-medium mt-0.5">
          Manage your business settings and preferences.
        </p>
      </div>

      {/* ── TOP ROW: Business Info + SMS Settings ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Business Information */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                <Building2 className="w-4.5 h-4.5 text-[#475569]" style={{ width: 18, height: 18 }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1F44]">Business Information</h3>
                <p className="text-[10px] text-[#94A3B8] font-medium">
                  Update your business details and contact information.
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="bg-[#0B1F44] hover:bg-[#0a1a38] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer border-none shadow-sm"
            >
              Save changes
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] text-[#64748B] font-medium block">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 focus:border-[#FACC15]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#64748B] font-medium block">
                Contact Number
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 focus:border-[#FACC15]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#64748B] font-medium block">
                Trade Type
              </label>
              <div className="relative">
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 focus:border-[#FACC15] appearance-none cursor-pointer"
                >
                  <option value="">Select trade...</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Roofing">Roofing</option>
                  <option value="General">General</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#64748B] font-medium block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 focus:border-[#FACC15]"
              />
            </div>
          </div>
        </div>

        {/* SMS Settings */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
              <MessageSquare className="w-4.5 h-4.5 text-[#475569]" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1F44]">SMS Settings</h3>
              <p className="text-[10px] text-[#94A3B8] font-medium">
                Manage your SMS templates, working hours and notifications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Default SMS Template */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-[#64748B] font-medium block">
                Default SMS Template
              </label>
              <textarea
                value={smsTemplate}
                onChange={(e) => setSmsTemplate(e.target.value)}
                rows={7}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40 focus:border-[#FACC15] resize-none leading-relaxed"
              />
              <p className="text-[10px] text-[#94A3B8] font-medium">
                Variables: <span className="text-[#64748B]">{"{{first_name}}"}, {"{{business_name}}"}</span>
              </p>
            </div>

            {/* Working Hours */}
            <div className="space-y-3">
              <label className="text-[11px] text-[#64748B] font-medium block">
                Working Hours
              </label>

              {/* Mon-Fri */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5">
                  <Clock className="w-3 h-3 text-[#64748B]" />
                  <span className="text-[10px] font-medium text-[#0F172A]">Mon - Fri</span>
                </div>
                <input
                  type="text"
                  defaultValue="7:00 AM"
                  className="w-[72px] bg-white border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-[10px] font-medium text-[#0F172A] text-center focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                />
                <span className="text-[10px] text-[#94A3B8]">–</span>
                <input
                  type="text"
                  defaultValue="5:00 PM"
                  className="w-[72px] bg-white border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-[10px] font-medium text-[#0F172A] text-center focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                />
              </div>

              {/* Saturday */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5">
                  <Clock className="w-3 h-3 text-[#64748B]" />
                  <span className="text-[10px] font-medium text-[#0F172A]">Saturday</span>
                </div>
                <input
                  type="text"
                  defaultValue="8:00 AM"
                  className="w-[72px] bg-white border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-[10px] font-medium text-[#0F172A] text-center focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                />
                <span className="text-[10px] text-[#94A3B8]">–</span>
                <input
                  type="text"
                  defaultValue="12:00 PM"
                  className="w-[72px] bg-white border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-[10px] font-medium text-[#0F172A] text-center focus:outline-none focus:ring-2 focus:ring-[#FACC15]/40"
                />
              </div>

              {/* Sunday toggle */}
              <div className="flex items-center gap-2.5 mt-1">
                <button
                  type="button"
                  onClick={() => setClosedSunday(!closedSunday)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer border-none ${
                    closedSunday ? "bg-[#FACC15]" : "bg-[#E2E8F0]"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                      closedSunday ? "translate-x-[18px]" : "translate-x-[3px]"
                    }`}
                  />
                </button>
                <span className="text-[11px] text-[#0F172A] font-medium">Closed on Sunday</span>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="space-y-3">
              <label className="text-[11px] text-[#64748B] font-medium block">
                Notification Preferences
              </label>

              {[
                { label: "New missed call notifications", state: notifMissedCall, setter: setNotifMissedCall },
                { label: "New SMS reply notifications", state: notifSmsReply, setter: setNotifSmsReply },
                { label: "Daily summary report", state: notifDailySummary, setter: setNotifDailySummary },
              ].map((notif) => (
                <label
                  key={notif.label}
                  className="flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <button
                    type="button"
                    onClick={() => notif.setter(!notif.state)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer border-none shrink-0 ${
                      notif.state ? "bg-[#FACC15]" : "bg-[#E2E8F0]"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                        notif.state ? "translate-x-[18px]" : "translate-x-[3px]"
                      }`}
                    />
                  </button>
                  <span className="text-[11px] text-[#0F172A] font-medium">{notif.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TEAM SETTINGS ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
              <Users2 className="w-4.5 h-4.5 text-[#475569]" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0B1F44]">Team Settings</h3>
              <p className="text-[10px] text-[#94A3B8] font-medium">
                Manage your team members and their access levels.
              </p>
            </div>
          </div>
          <button className="bg-white hover:bg-[#F8FAFC] text-[#0B1F44] font-bold text-xs px-4 py-2 rounded-lg border border-[#E2E8F0] transition-colors cursor-pointer shadow-sm">
            Add Team Member
          </button>
        </div>

        {/* Team table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider text-left">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {teamList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#94A3B8] font-medium">
                    No team members added yet. Invite your staff to TradyCall.
                  </td>
                </tr>
              ) : (
                teamList.map((member) => (
                  <tr key={member.email} className="hover:bg-[#FAFBFC] transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full ${member.avatarBg} ${member.avatarText} flex items-center justify-center font-bold text-[10px] shrink-0 select-none`}
                        >
                          {member.initials}
                        </div>
                        <span className="text-xs font-semibold text-[#0F172A]">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-[#64748B] font-medium">{member.email}</td>
                    <td className="py-3.5 pr-4">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] cursor-pointer">
                        {member.role}
                        <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold text-[#16A34A] bg-[#DCFCE7]">
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer text-[#94A3B8] bg-transparent border-none">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECURITY ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-[#475569]" style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0B1F44]">Security</h3>
            <p className="text-[10px] text-[#94A3B8] font-medium">
              Keep your account secure and up to date.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Password */}
          <div>
            <h4 className="text-xs font-bold text-[#0B1F44]">Password</h4>
            <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
              Update your account password.
            </p>
            <button className="mt-3 bg-white hover:bg-[#F8FAFC] text-[#0B1F44] font-bold text-xs px-4 py-2 rounded-lg border border-[#E2E8F0] transition-colors cursor-pointer shadow-sm">
              Change Password
            </button>
          </div>

          {/* Email Verification */}
          <div>
            <h4 className="text-xs font-bold text-[#0B1F44]">Email Verification</h4>
            <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
              Your email is verified.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DCFCE7] border border-[#BBF7D0]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span className="text-xs font-bold text-[#16A34A]">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
