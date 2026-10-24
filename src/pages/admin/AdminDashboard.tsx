import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { NewDealModal } from '../../components/admin/NewDealModal';

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [revenuePeriod, setRevenuePeriod] = useState<'Week' | 'Month' | 'Year'>('Year');
  const [activePoint, setActivePoint] = useState<{ month: string; value: string } | null>(null);

  // Top Deals matching Dashboard v2 mockup
  const topDeals = [
    {
      initials: 'AS',
      name: 'Aarav Sharma',
      stage: 'Closing',
      stageStyle: 'bg-emerald-100 text-emerald-800',
      value: '₹4,20,000',
    },
    {
      initials: 'PM',
      name: 'Priya Mehta',
      stage: 'Negotiation',
      stageStyle: 'bg-amber-100 text-amber-800',
      value: '₹3,10,000',
    },
    {
      initials: 'VK',
      name: 'Vikram Khanna',
      stage: 'Proposal',
      stageStyle: 'bg-slate-100 text-slate-700',
      value: '₹2,75,000',
    },
    {
      initials: 'SR',
      name: 'Sneha Rao',
      stage: 'Qualified',
      stageStyle: 'bg-slate-100 text-slate-700',
      value: '₹1,90,000',
    },
  ];

  // Recent Activity matching Dashboard v2 mockup
  const recentActivities = [
    {
      title: 'New quote request from Sikar',
      time: '2 min ago',
    },
    {
      title: 'Contract sent to Aarav Sharma',
      time: '1 hour ago',
    },
    {
      title: 'Vendor approved: Aravalli Solar',
      time: 'Yesterday',
    },
  ];

  // Lead Sources breakdown matching Dashboard v2 mockup
  const leadSources = [
    { label: 'Website forms', percentage: 42, color: '#f59e0b', dotColor: 'bg-[#f59e0b]' },
    { label: 'Vendor referral', percentage: 28, color: '#0f172a', dotColor: 'bg-[#0f172a]' },
    { label: 'WhatsApp', percentage: 18, color: '#64748b', dotColor: 'bg-[#64748b]' },
    { label: 'Other', percentage: 12, color: '#cbd5e1', dotColor: 'bg-[#cbd5e1]' },
  ];

  // Filter deals based on search
  const filteredDeals = topDeals.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.stage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SVG Line Chart coordinates for smooth curve
  // Nov (10, 160) -> Feb (155, 145) -> May (300, 120) -> Aug (445, 105) -> Oct (580, 40)
  const curvePoints = [
    { x: 10, y: 160, month: 'Nov', value: '₹6.8L' },
    { x: 155, y: 145, month: 'Feb', value: '₹11.2L' },
    { x: 300, y: 120, month: 'May', value: '₹12.6L' },
    { x: 445, y: 105, month: 'Aug', value: '₹16.2L' },
    { x: 580, y: 40, month: 'Oct', value: '₹18.4L' },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Saturday, 24 October · pipeline at a glance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search leads, deals, vendors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-60 sm:w-72 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsNewLeadOpen(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New lead
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Revenue this month (Dark Navy Hero Card) */}
        <div className="bg-[#0c1222] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 block">
            Revenue this month
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            ₹18.4L
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 bg-[#f59e0b] text-slate-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
              ▲ 12.5%
            </span>
          </div>
        </div>

        {/* Card 2: Open deals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 block">
            Open deals
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            64
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
              ▲ 8 this week
            </span>
          </div>
        </div>

        {/* Card 3: Win rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 block">
            Win rate
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            32%
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-100">
              ▼ 2.1%
            </span>
          </div>
        </div>

        {/* Card 4: New leads */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 block">
            New leads
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            128
          </div>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
              ▲ 18%
            </span>
          </div>
        </div>
      </div>

      {/* Middle Row: Revenue Smooth Area Chart & Lead Sources Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Revenue Area Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Revenue
            </h2>
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold text-slate-500">
              {(['Week', 'Month', 'Year'] as const).map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setRevenuePeriod(period)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    revenuePeriod === period
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="mt-6 relative">
            {/* Tooltip */}
            {activePoint && (
              <div
                className="absolute z-20 bg-slate-900 text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow-md -translate-x-1/2 -top-8 animate-in fade-in"
                style={{
                  left: `${(curvePoints.find((p) => p.month === activePoint.month)?.x || 0) / 6}%`,
                }}
              >
                {activePoint.month}: {activePoint.value}
              </div>
            )}

            <svg viewBox="0 0 600 200" className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="amberRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="#f1f5f9" strokeWidth="1" />

              {/* Area Gradient Fill */}
              <path
                d="M 10 160 C 80 150, 120 145, 170 145 C 220 145, 260 130, 310 120 C 360 110, 420 115, 470 100 C 520 85, 550 55, 580 40 L 580 200 L 10 200 Z"
                fill="url(#amberRevenueGradient)"
              />

              {/* Smooth Amber Line */}
              <path
                d="M 10 160 C 80 150, 120 145, 170 145 C 220 145, 260 130, 310 120 C 360 110, 420 115, 470 100 C 520 85, 550 55, 580 40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Peak Point: Oct (Black Dot with white/amber ring) */}
              <circle
                cx="580"
                cy="40"
                r="4.5"
                fill="#0f172a"
                stroke="#ffffff"
                strokeWidth="2"
                className="cursor-pointer hover:r-6 transition-all"
                onMouseEnter={() => setActivePoint({ month: 'Oct', value: '₹18.4L' })}
                onMouseLeave={() => setActivePoint(null)}
              />

              {/* Interactive invisible hover points */}
              {curvePoints.map((pt) => (
                <circle
                  key={pt.month}
                  cx={pt.x}
                  cy={pt.y}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setActivePoint({ month: pt.month, value: pt.value })}
                  onMouseLeave={() => setActivePoint(null)}
                />
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between px-2 mt-2 text-xs text-slate-400 font-medium">
              <span>Nov</span>
              <span>Feb</span>
              <span>May</span>
              <span>Aug</span>
              <span>Oct</span>
            </div>
          </div>
        </div>

        {/* Right: Lead Sources Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <h2 className="text-base font-bold text-slate-900 mb-2">
            Lead sources
          </h2>

          <div className="my-auto py-2 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* Donut Chart SVG */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                {/* Circumference = 2 * PI * 42 ~= 263.9 */}
                {/* 1. Website forms (42%) -> strokeDasharray: 110.8 153.1 */}
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="14"
                  strokeDasharray="110.8 263.9"
                  strokeDashoffset="0"
                />
                {/* 2. Vendor referral (28%) -> 73.9 */}
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="transparent"
                  stroke="#0f172a"
                  strokeWidth="14"
                  strokeDasharray="73.9 263.9"
                  strokeDashoffset="-110.8"
                />
                {/* 3. WhatsApp (18%) -> 47.5 */}
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="transparent"
                  stroke="#64748b"
                  strokeWidth="14"
                  strokeDasharray="47.5 263.9"
                  strokeDashoffset="-184.7"
                />
                {/* 4. Other (12%) -> 31.7 */}
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="transparent"
                  stroke="#cbd5e1"
                  strokeWidth="14"
                  strokeDasharray="31.7 263.9"
                  strokeDashoffset="-232.2"
                />
              </svg>

              {/* Center Metrics in hole */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-900 leading-tight">
                  128
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  leads
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2.5 text-xs text-slate-700 font-medium">
              {leadSources.map((source) => (
                <div key={source.label} className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${source.dotColor} shrink-0`} />
                  <span className="text-slate-800">
                    {source.label} · <strong className="font-bold">{source.percentage}%</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Top deals & Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Top deals Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs overflow-hidden">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Top deals
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 px-4">Stage</th>
                  <th className="pb-3 pl-4 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {filteredDeals.map((deal, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    {/* Customer */}
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-amber-100 text-amber-800">
                          {deal.initials}
                        </div>
                        <span className="font-semibold text-slate-900 whitespace-nowrap">
                          {deal.name}
                        </span>
                      </div>
                    </td>

                    {/* Stage Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${deal.stageStyle}`}
                      >
                        {deal.stage}
                      </span>
                    </td>

                    {/* Value */}
                    <td className="py-3.5 pl-4 text-right font-bold text-slate-900 whitespace-nowrap">
                      {deal.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent activity (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Recent activity
          </h2>

          <div className="space-y-4 pt-1">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {/* Amber Dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] mt-1.5 shrink-0 shadow-2xs" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Lead / Deal Modal */}
      <NewDealModal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        onDealAdded={() => {}}
      />
    </div>
  );
};

export default AdminDashboard;
