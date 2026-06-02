"use client";

import React, { useState } from "react";
import {
  Phone,
  UserCheck,
  Percent,
  Briefcase,
  DollarSign,
  ArrowUpRight,
  Info,
  ChevronDown,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import { useDemo } from "../DemoContext";

/* ───────────── KPI DATA ───────────── */
const DEMO_KPIS = [
  {
    label: "Missed Calls",
    value: "328",
    change: "12.5%",
    vs: "vs Apr 12 – May 11",
    icon: Phone,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
  },
  {
    label: "Recovered Leads",
    value: "246",
    change: "18.7%",
    vs: "vs Apr 12 – May 11",
    icon: UserCheck,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    label: "Recovery Rate",
    value: "75.0%",
    change: "4.3%",
    vs: "vs Apr 12 – May 11",
    icon: Percent,
    iconBg: "bg-[#FEF9C3]",
    iconColor: "text-[#CA8A04]",
  },
  {
    label: "Jobs Won",
    value: "68",
    change: "13.3%",
    vs: "vs Apr 12 – May 11",
    icon: Briefcase,
    iconBg: "bg-[#0B1F44]",
    iconColor: "text-white",
  },
  {
    label: "Revenue Generated",
    value: "$82,650",
    change: "22.1%",
    vs: "vs Apr 12 – May 11",
    icon: DollarSign,
    iconBg: "bg-[#FEF9C3]",
    iconColor: "text-[#CA8A04]",
  },
];

const EMPTY_KPIS = [
  {
    label: "Missed Calls",
    value: "0",
    change: "0%",
    vs: "no previous data",
    icon: Phone,
    iconBg: "bg-[#F1F5F9]",
    iconColor: "text-[#64748B]",
  },
  {
    label: "Recovered Leads",
    value: "0",
    change: "0%",
    vs: "no previous data",
    icon: UserCheck,
    iconBg: "bg-[#F1F5F9]",
    iconColor: "text-[#64748B]",
  },
  {
    label: "Recovery Rate",
    value: "0.0%",
    change: "0%",
    vs: "no previous data",
    icon: Percent,
    iconBg: "bg-[#F1F5F9]",
    iconColor: "text-[#64748B]",
  },
  {
    label: "Jobs Won",
    value: "0",
    change: "0%",
    vs: "no previous data",
    icon: Briefcase,
    iconBg: "bg-[#F1F5F9]",
    iconColor: "text-[#64748B]",
  },
  {
    label: "Revenue Generated",
    value: "$0",
    change: "0%",
    vs: "no previous data",
    icon: DollarSign,
    iconBg: "bg-[#F1F5F9]",
    iconColor: "text-[#64748B]",
  },
];

/* ───────────── LINE CHART DATA ───────────── */
const trendLabels = ["May 12", "May 19", "May 26", "Jun 2", "Jun 8"];
const DEMO_RECOVERED_DATA = [22, 38, 28, 42, 35]; // current period
const DEMO_PREVIOUS_DATA  = [18, 25, 22, 30, 28]; // dotted previous

const EMPTY_RECOVERED_DATA = [0, 0, 0, 0, 0];
const EMPTY_PREVIOUS_DATA  = [0, 0, 0, 0, 0];

/* ───────────── FUNNEL DATA ───────────── */
const DEMO_FUNNEL_STEPS = [
  { label: "Missed Calls",    value: 328, percent: "",      color: "#FACC15", dotColor: "bg-[#FACC15]" },
  { label: "Recovered Leads", value: 246, percent: "75.0%", color: "#EAB308", dotColor: "bg-[#EAB308]" },
  { label: "Qualified Leads", value: 132, percent: "53.7%", color: "#2563EB", dotColor: "bg-[#2563EB]" },
  { label: "Jobs Won",        value: 68,  percent: "27.6%", color: "#0B1F44", dotColor: "bg-[#0B1F44]" },
];

const EMPTY_FUNNEL_STEPS = [
  { label: "Missed Calls",    value: 0, percent: "",      color: "#F1F5F9", dotColor: "bg-[#E2E8F0]" },
  { label: "Recovered Leads", value: 0, percent: "0.0%",  color: "#F1F5F9", dotColor: "bg-[#E2E8F0]" },
  { label: "Qualified Leads", value: 0, percent: "0.0%",  color: "#F1F5F9", dotColor: "bg-[#E2E8F0]" },
  { label: "Jobs Won",        value: 0, percent: "0.0%",  color: "#F1F5F9", dotColor: "bg-[#E2E8F0]" },
];

/* ───────────── WEEKLY BAR DATA ───────────── */
const weeklyLabels = [
  "Apr 14 – Apr 20",
  "Apr 21 – Apr 27",
  "Apr 28 – May 4",
  "May 5 – May 11",
  "May 12 – May 18",
  "May 19 – May 25",
  "May 26 – Jun 1",
  "Jun 2 – Jun 8",
];
const DEMO_WEEKLY_RECOVERED = [35, 28, 42, 55, 62, 58, 50, 48];
const DEMO_WEEKLY_JOBS_WON   = [12, 10, 18, 22, 25, 20, 18, 16];
const DEMO_WEEKLY_REVENUE    = [8, 6, 12, 18, 22, 16, 14, 12]; // scaled for chart (represents $K)

const EMPTY_WEEKLY_RECOVERED = [0, 0, 0, 0, 0, 0, 0, 0];
const EMPTY_WEEKLY_JOBS_WON   = [0, 0, 0, 0, 0, 0, 0, 0];
const EMPTY_WEEKLY_REVENUE    = [0, 0, 0, 0, 0, 0, 0, 0];

/* ───────────── HELPER: Simple SVG line path ───────────── */
function buildPath(
  data: number[],
  width: number,
  height: number,
  maxVal: number,
  padding = 0
): string {
  const stepX = (width - padding * 2) / (data.length - 1);
  return data
    .map((d, i) => {
      const x = padding + i * stepX;
      const y = height - (d / maxVal) * (height - 20) - 10;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildSmoothPath(
  data: number[],
  width: number,
  height: number,
  maxVal: number,
  padding = 0
): string {
  const stepX = (width - padding * 2) / (data.length - 1);
  const points = data.map((d, i) => ({
    x: padding + i * stepX,
    y: height - (d / maxVal) * (height - 20) - 10,
  }));
  
  if (points.length < 2) return "";
  
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const cp1x = points[i].x + stepX * 0.4;
    const cp1y = points[i].y;
    const cp2x = points[i + 1].x - stepX * 0.4;
    const cp2y = points[i + 1].y;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i + 1].x} ${points[i + 1].y}`;
  }
  return path;
}

function buildAreaPath(
  data: number[],
  width: number,
  height: number,
  maxVal: number,
  padding = 0
): string {
  const linePath = buildSmoothPath(data, width, height, maxVal, padding);
  const stepX = (width - padding * 2) / (data.length - 1);
  const lastX = padding + (data.length - 1) * stepX;
  const firstX = padding;
  return `${linePath} L ${lastX} ${height} L ${firstX} ${height} Z`;
}

/* ────────────────── COMPONENT ────────────────── */
export default function AnalyticsPage() {
  const { isDemoMode } = useDemo();

  const kpis = isDemoMode ? DEMO_KPIS : EMPTY_KPIS;
  const funnelSteps = isDemoMode ? DEMO_FUNNEL_STEPS : EMPTY_FUNNEL_STEPS;
  const weeklyRecovered = isDemoMode ? DEMO_WEEKLY_RECOVERED : EMPTY_WEEKLY_RECOVERED;
  const weeklyJobsWon = isDemoMode ? DEMO_WEEKLY_JOBS_WON : EMPTY_WEEKLY_JOBS_WON;
  const weeklyRevenue = isDemoMode ? DEMO_WEEKLY_REVENUE : EMPTY_WEEKLY_REVENUE;
  const recoveredData = isDemoMode ? DEMO_RECOVERED_DATA : EMPTY_RECOVERED_DATA;
  const previousData = isDemoMode ? DEMO_PREVIOUS_DATA : EMPTY_PREVIOUS_DATA;

  const [trendPeriod, setTrendPeriod] = useState("Daily");
  const [weeklyPeriod, setWeeklyPeriod] = useState("Weekly");

  /* Chart dimensions */
  const trendW = 520;
  const trendH = 220;
  const trendMax = 100;

  const weeklyW = 800;
  const weeklyH = 250;
  const weeklyMax = 90;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto text-left">
      {/* ── HEADER BAR ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B1F44] tracking-tight">
            Analytics Overview
          </h2>
          <p className="text-xs text-[#64748B] font-medium mt-0.5">
            Track your missed call recovery performance and business impact.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] bg-white hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
            May 12 – Jun 8, 2025
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] bg-white hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B]" />
            Filter
          </button>
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm flex items-start gap-3.5"
            >
              <div
                className={`w-10 h-10 rounded-full ${kpi.iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-4.5 h-4.5 ${kpi.iconColor}`} style={{ width: 18, height: 18 }} />
              </div>
              <div className="min-w-0 flex-grow space-y-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-[#64748B]">{kpi.label}</span>
                  <Info className="w-3 h-3 text-[#CBD5E1]" />
                </div>
                <span className="text-2xl font-black text-[#0B1F44] block leading-none">
                  {kpi.value}
                </span>
                <span className="text-[10px] font-semibold text-[#16A34A] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {kpi.change}{" "}
                  <span className="text-[#94A3B8] ml-0.5">{kpi.vs}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MIDDLE ROW: Trend + Funnel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Lead Recovery Trend */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#0B1F44]">Lead Recovery Trend</h3>
              <Info className="w-3.5 h-3.5 text-[#CBD5E1]" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[11px] font-bold text-[#0F172A] bg-white hover:bg-[#F8FAFC] cursor-pointer transition-colors">
              {trendPeriod}
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 bg-[#FACC15] rounded-full" />
              <span className="text-[10px] text-[#64748B] font-medium">Recovered Leads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 border-t border-dashed border-[#94A3B8]" />
              <span className="text-[10px] text-[#64748B] font-medium">Previous Period</span>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${trendW} ${trendH}`}
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Horizontal grid lines */}
              {[0, 20, 40, 60, 80].map((v) => {
                const y = trendH - (v / trendMax) * (trendH - 20) - 10;
                return (
                  <g key={v}>
                    <line
                      x1="35"
                      y1={y}
                      x2={trendW}
                      y2={y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                    />
                    <text x="0" y={y + 3} fontSize="10" fill="#94A3B8" fontWeight="500">
                      {v}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path
                d={buildAreaPath(recoveredData, trendW, trendH, trendMax, 45)}
                fill="url(#trendGradient)"
                opacity="0.3"
              />

              {/* Previous period line (dashed) */}
              <path
                d={buildSmoothPath(previousData, trendW, trendH, trendMax, 45)}
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Recovered leads line */}
              <path
                d={buildSmoothPath(recoveredData, trendW, trendH, trendMax, 45)}
                fill="none"
                stroke="#FACC15"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              {recoveredData.map((d, i) => {
                const stepX = (trendW - 90) / (recoveredData.length - 1);
                const x = 45 + i * stepX;
                const y = trendH - (d / trendMax) * (trendH - 20) - 10;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="white"
                    stroke="#FACC15"
                    strokeWidth="2"
                  />
                );
              })}

              {/* X-axis labels */}
              {trendLabels.map((label, i) => {
                const stepX = (trendW - 90) / (trendLabels.length - 1);
                const x = 45 + i * stepX;
                return (
                  <text
                    key={label}
                    x={x}
                    y={trendH}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#94A3B8"
                    fontWeight="500"
                  >
                    {label}
                  </text>
                );
              })}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FACC15" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FACC15" stopOpacity="0.02" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Lead Conversion Funnel */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-1.5 mb-5">
            <h3 className="text-sm font-bold text-[#0B1F44]">Lead Conversion Funnel</h3>
            <Info className="w-3.5 h-3.5 text-[#CBD5E1]" />
          </div>

          <div className="flex items-center gap-5">
            {/* Funnel visual */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: 160 }}>
              {funnelSteps.map((step, idx) => {
                const widthPercent = 100 - idx * 18;
                return (
                  <div
                    key={step.label}
                    className="rounded-md transition-all"
                    style={{
                      width: `${widthPercent}%`,
                      height: 42,
                      backgroundColor: step.color,
                      opacity: 1 - idx * 0.1,
                    }}
                  />
                );
              })}
            </div>

            {/* Funnel labels */}
            <div className="flex-grow space-y-3.5">
              {funnelSteps.map((step) => (
                <div key={step.label} className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${step.dotColor} shrink-0`} />
                  <span className="text-xs font-medium text-[#64748B] flex-grow min-w-0">
                    {step.label}
                  </span>
                  <span className="text-sm font-bold text-[#0B1F44] tabular-nums">
                    {step.value}
                  </span>
                  {step.percent && (
                    <span className="text-[11px] text-[#94A3B8] font-medium tabular-nums w-12 text-right">
                      {step.percent}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: Weekly Recovery Performance ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-[#0B1F44]">Weekly Recovery Performance</h3>
            <Info className="w-3.5 h-3.5 text-[#CBD5E1]" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-[11px] font-bold text-[#0F172A] bg-white hover:bg-[#F8FAFC] cursor-pointer transition-colors">
            {weeklyPeriod}
            <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mb-5 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#0B1F44] rounded-sm" />
            <span className="text-[10px] text-[#64748B] font-medium">Recovered Leads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 bg-[#FACC15] rounded-full" />
            <span className="text-[10px] text-[#64748B] font-medium">Jobs Won</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 bg-[#93C5FD] rounded-full" />
            <span className="text-[10px] text-[#64748B] font-medium">Revenue Generated</span>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${weeklyW} ${weeklyH}`}
            className="w-full h-auto min-w-[600px]"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Horizontal grid lines */}
            {[0, 20, 40, 60, 80].map((v) => {
              const y = weeklyH - (v / weeklyMax) * (weeklyH - 40) - 20;
              return (
                <g key={v}>
                  <line x1="30" y1={y} x2={weeklyW - 40} y2={y} stroke="#F1F5F9" strokeWidth="1" />
                  <text x="0" y={y + 3} fontSize="10" fill="#94A3B8" fontWeight="500">{v}</text>
                </g>
              );
            })}

            {/* Revenue axis labels (right) */}
            {["$0", "$10K", "$20K", "$30K", "$40K"].map((label, i) => {
              const vals = [0, 20, 40, 60, 80];
              const y = weeklyH - (vals[i] / weeklyMax) * (weeklyH - 40) - 20;
              return (
                <text key={label} x={weeklyW - 5} y={y + 3} textAnchor="end" fontSize="10" fill="#94A3B8" fontWeight="500">
                  {label}
                </text>
              );
            })}

            {/* Bars */}
            {weeklyRecovered.map((val, i) => {
              const barWidth = 32;
              const gap = (weeklyW - 80) / weeklyLabels.length;
              const x = 45 + i * gap + (gap - barWidth) / 2;
              const barH = (val / weeklyMax) * (weeklyH - 40);
              const y = weeklyH - barH - 20;
              return (
                <rect
                  key={`bar-${i}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="4"
                  ry="4"
                  fill="#0B1F44"
                  opacity="0.85"
                />
              );
            })}

            {/* Jobs Won line */}
            {(() => {
              const gap = (weeklyW - 80) / weeklyLabels.length;
              const points = weeklyJobsWon.map((val, i) => ({
                x: 45 + i * gap + gap / 2,
                y: weeklyH - (val / weeklyMax) * (weeklyH - 40) - 20,
              }));
              let path = `M ${points[0].x} ${points[0].y}`;
              for (let i = 1; i < points.length; i++) {
                path += ` L ${points[i].x} ${points[i].y}`;
              }
              return (
                <g>
                  <path d={path} fill="none" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {points.map((p, i) => (
                    <circle key={`jw-${i}`} cx={p.x} cy={p.y} r="4" fill="#FACC15" stroke="white" strokeWidth="2" />
                  ))}
                </g>
              );
            })()}

            {/* Revenue line */}
            {(() => {
              const gap = (weeklyW - 80) / weeklyLabels.length;
              const points = weeklyRevenue.map((val, i) => ({
                x: 45 + i * gap + gap / 2,
                y: weeklyH - (val / weeklyMax) * (weeklyH - 40) - 20,
              }));
              let path = `M ${points[0].x} ${points[0].y}`;
              for (let i = 1; i < points.length; i++) {
                path += ` L ${points[i].x} ${points[i].y}`;
              }
              return (
                <g>
                  <path d={path} fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {points.map((p, i) => (
                    <circle key={`rv-${i}`} cx={p.x} cy={p.y} r="3.5" fill="#93C5FD" stroke="white" strokeWidth="2" />
                  ))}
                </g>
              );
            })()}

            {/* X-axis labels */}
            {weeklyLabels.map((label, i) => {
              const gap = (weeklyW - 80) / weeklyLabels.length;
              const x = 45 + i * gap + gap / 2;
              return (
                <text
                  key={label}
                  x={x}
                  y={weeklyH - 2}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#94A3B8"
                  fontWeight="500"
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
