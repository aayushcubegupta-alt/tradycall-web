"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Blocks, 
  TrendingUp, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  PhoneCall, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Menu,
  X,
  User,
  HelpCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DemoProvider, useDemo } from "./DemoContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { isDemoMode, setDemoMode, businessName, fullName, loadingProfile } = useDemo();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(4); // May (0-indexed)
  const [calendarYear, setCalendarYear] = useState(2025);

  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-[#0F172A] relative font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#0B1F44] border-t-[#FACC15] rounded-full animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-[#64748B]">
            Securing Connection...
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Leads", href: "/dashboard/leads", icon: Users },
    { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
    { name: "Integrations", href: "/dashboard/integrations", icon: Blocks },
    { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row relative font-sans antialiased overflow-x-hidden">
      
      {/* ─── 1. LEFT SIDEBAR (DESKTOP) ─── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E2E8F0] shrink-0 fixed inset-y-0 left-0 z-40">
        {/* Brand Logo header */}
        <div className="px-6 py-5 bg-[#0B1F44] border-b border-[#0B1F44] flex items-center justify-center shrink-0">
          <Link href="/dashboard" className="flex items-center shrink-0">
            <Image
              src="/tradycall_logo_v2.png"
              alt="TradyCall Logo"
              width={180}
              height={54}
              priority
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-grow px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all ${
                  isActive 
                    ? "bg-[#0B1F44] text-white shadow-sm shadow-[#0B1F44]/10" 
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#FACC15]" : "text-[#64748B]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Card (Constant bottom section) */}
        <div className="p-4 border-t border-[#E2E8F0] space-y-4 relative">

          {/* Upwards floating Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-18 left-4 right-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-3.5 z-50 text-left space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <Link 
                href="/dashboard/settings"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-[#0B1F44] hover:bg-[#F8FAFC] transition-colors"
              >
                <Settings className="w-4 h-4 text-[#64748B]" />
                <span>Account Settings</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-50 transition-colors text-left cursor-pointer border-none bg-transparent"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* User Profile Card Selector */}
          <div 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center justify-between p-2 rounded-2xl hover:bg-[#F8FAFC] cursor-pointer select-none transition-colors border border-transparent hover:border-[#E2E8F0]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-[#E2E8F0] text-[#0B1F44] flex items-center justify-center font-black text-[11px] shrink-0">
                {fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "JS"}
              </div>
              <div className="text-left leading-tight min-w-0">
                <span className="text-xs font-black text-[#0F172A] block truncate">
                  {fullName || "John Smith"}
                </span>
                <span className="text-[10px] text-[#64748B] font-bold block truncate mt-0.5">
                  {businessName || "Smith Plumbing"}
                </span>
              </div>
            </div>
            {userMenuOpen ? (
              <ChevronUp className="w-4 h-4 text-[#64748B] shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#64748B] shrink-0" />
            )}
          </div>

        </div>
      </aside>

      {/* Mobile Sidebar overlay backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Mobile Drawer (Left panel) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E2E8F0] z-50 flex flex-col transform lg:hidden transition-transform duration-300 ease-out ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="px-5 py-4 bg-[#0B1F44] border-b border-[#0B1F44] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center shrink-0">
            <Image
              src="/tradycall_logo_v2.png"
              alt="TradyCall Logo"
              width={150}
              height={45}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all ${
                  isActive 
                    ? "bg-[#0B1F44] text-white" 
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#FACC15]" : "text-[#64748B]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E2E8F0] space-y-2">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-black text-rose-500 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── 2. MAIN SCREEN AREA ─── */}
      <div className="flex-grow lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header navbar */}
        <header className="h-20 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 relative z-30">
          
          {/* Left section: Hamburger button & Welcome text */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0b1f44] cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="text-left">
              <h1 className="text-sm sm:text-base font-black text-[#0F172A] tracking-tight leading-snug">
                Good morning, {fullName}
              </h1>
              <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#64748B] font-bold">
                <span>{businessName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
              </div>
            </div>
          </div>

          {/* Right section: Utilities menu & Demo controls */}
          <div className="flex items-center gap-3">
            
            {/* Book a Demo CTA */}
            <button
              onClick={() => window.open("https://calendly.com/tradycall/demo", "_blank")}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-transparent"
            >
              Book a Demo
            </button>

            {/* Demo Dashboard Trigger button */}
            {isDemoMode ? (
              <button
                onClick={() => setDemoMode(false)}
                className="px-3 py-2 bg-[#0b1f44] hover:bg-[#1a2d52] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-transparent"
              >
                Return to My Dashboard
              </button>
            ) : (
              <button
                onClick={() => setDemoMode(true)}
                className="px-3 py-2 bg-[#FACC15] hover:bg-[#eab308] text-[#0b1f44] rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-transparent"
              >
                Demo Dashboard
              </button>
            )}

            {/* Interactive Date Indicator with Calendar Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => { setCalendarOpen(!calendarOpen); setNotificationsOpen(false); setProfileMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 border border-[#E2E8F0] bg-white rounded-xl text-xs font-black text-[#0f172a] shadow-sm select-none hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#64748B]" />
                <span>Today, 23 May 2025</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
              </button>

              {/* Calendar dropdown */}
              {calendarOpen && (
                <div className="absolute right-0 mt-2.5 w-72 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => {
                        if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(calendarYear - 1); }
                        else setCalendarMonth(calendarMonth - 1);
                      }}
                      className="p-1 rounded-lg hover:bg-[#F8FAFC] cursor-pointer text-[#64748B] border-none bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-[#0B1F44]">
                      {['January','February','March','April','May','June','July','August','September','October','November','December'][calendarMonth]} {calendarYear}
                    </span>
                    <button
                      onClick={() => {
                        if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(calendarYear + 1); }
                        else setCalendarMonth(calendarMonth + 1);
                      }}
                      className="p-1 rounded-lg hover:bg-[#F8FAFC] cursor-pointer text-[#64748B] border-none bg-transparent"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-0 mb-1">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                      <div key={d} className="text-center text-[9px] font-bold text-[#94A3B8] uppercase py-1">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-0">
                    {(() => {
                      const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
                      const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
                      const cells = [];
                      for (let i = 0; i < firstDay; i++) {
                        cells.push(<div key={`empty-${i}`} className="p-1" />);
                      }
                      for (let day = 1; day <= daysInMonth; day++) {
                        const isToday = day === 23 && calendarMonth === 4 && calendarYear === 2025;
                        cells.push(
                          <button
                            key={day}
                            className={`p-1 text-center text-[10px] font-medium rounded-lg cursor-pointer border-none transition-colors ${
                              isToday
                                ? 'bg-[#FACC15] text-[#0B1F44] font-bold'
                                : 'text-[#0F172A] hover:bg-[#F8FAFC] bg-transparent'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      }
                      return cells;
                    })()}
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#F1F5F9] text-center">
                    <button
                      onClick={() => { setCalendarMonth(4); setCalendarYear(2025); }}
                      className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer bg-transparent border-none"
                    >
                      Go to Today
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Alert Bell */}
            <div className="relative">
              <button 
                onClick={() => { setNotificationsOpen(!notificationsOpen); setCalendarOpen(false); setProfileMenuOpen(false); }}
                className="w-10 h-10 rounded-xl border border-[#E2E8F0] bg-white text-[#0B1F44] hover:bg-[#F8FAFC] flex items-center justify-center transition-all cursor-pointer relative shrink-0"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FACC15] text-[#0B1F44] border-2 border-white rounded-full text-[8px] font-black flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notification drop menu */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-72 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-4 text-left space-y-3 z-50">
                  <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider pb-1.5 border-b border-[#E2E8F0]">
                    Recent Notifications
                  </h4>
                  <div className="space-y-2.5 text-xs font-bold text-[#64748B]">
                    <div className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer">
                      <span className="text-[#0f172a] font-black block">Blocked Drain lead captured</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">Sarah Mitchell • 12m ago</span>
                    </div>
                    <div className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer">
                      <span className="text-[#0f172a] font-black block">Active SMS session ongoing</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">David Thompson • 28m ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setProfileMenuOpen(!profileMenuOpen); setCalendarOpen(false); setNotificationsOpen(false); }}
                className="w-10 h-10 rounded-xl bg-[#0B1F44] text-white flex items-center justify-center text-sm font-black border border-[#0B1F44] shadow-sm select-none cursor-pointer hover:opacity-90 transition-opacity"
              >
                {fullName.substring(0, 1).toUpperCase() || "J"}
              </button>

              {/* Profile dropdown menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50">
                  <div className="px-3 py-2.5 border-b border-[#F1F5F9] mb-1">
                    <span className="text-xs font-bold text-[#0F172A] block">{fullName || 'John Smith'}</span>
                    <span className="text-[10px] text-[#94A3B8] font-medium block mt-0.5">{businessName || 'Aussie Plumbing'}</span>
                  </div>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#64748B]" />
                    Profile
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#64748B]" />
                    Account Settings
                  </Link>

                  <Link
                    href="/dashboard/billing"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <CreditCard className="w-4 h-4 text-[#64748B]" />
                    Billing
                  </Link>

                  <button
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors w-full text-left cursor-pointer bg-transparent border-none"
                  >
                    <HelpCircle className="w-4 h-4 text-[#64748B]" />
                    Help & Support
                  </button>

                  <div className="border-t border-[#F1F5F9] mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#EF4444] hover:bg-red-50 transition-colors w-full text-left cursor-pointer bg-transparent border-none"
                    >
                      <LogOut className="w-4 h-4 text-[#EF4444]" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Global Demo Mode Warning Banner */}
        {isDemoMode && (
          <div className="bg-[#FFF9E6] border-b border-[#FDE047] px-4 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-bold text-[#854D0E] shrink-0 text-left relative z-20 animate-fade-in shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse shrink-0" />
              <span>You are viewing sample data. Switch back to your business dashboard at any time.</span>
            </div>
            <button
              onClick={() => setDemoMode(false)}
              className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline shrink-0 bg-transparent border-none p-0 cursor-pointer text-left"
            >
              Return to My Dashboard →
            </button>
          </div>
        )}

        {/* Dashboard inner content canvas */}
        <main className="flex-grow overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DemoProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DemoProvider>
  );
}
