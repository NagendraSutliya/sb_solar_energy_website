import React, { useState } from 'react';

const ReportsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // 12 months bars: 11 soft amber bars + 12th highlighted in dark amber
  const monthlyDeals = [
    { month: 'Nov', height: '32%' },
    { month: 'Dec', height: '46%' },
    { month: 'Jan', height: '40%' },
    { month: 'Feb', height: '62%' },
    { month: 'Mar', height: '54%' },
    { month: 'Apr', height: '72%' },
    { month: 'May', height: '68%' },
    { month: 'Jun', height: '80%' },
    { month: 'Jul', height: '74%' },
    { month: 'Aug', height: '88%' },
    { month: 'Sep', height: '84%' },
    { month: 'Oct', height: '100%', isCurrent: true },
  ];

  const topVendors = [
    {
      name: 'SunPower Jaipur',
      leads: 42,
      won: 18,
      conversion: '43%',
    },
    {
      name: 'Lakecity Solar',
      leads: 31,
      won: 14,
      conversion: '45%',
    },
    {
      name: 'Aravalli Solar',
      leads: 27,
      won: 9,
      conversion: '33%',
    },
  ];

  const filteredVendors = topVendors.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Last 12 months
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-56 sm:w-64 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />

          <button
            type="button"
            className="px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* 3 Metric Cards matching Reports.png */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card 1: Dark Navy Hero Card */}
        <div className="bg-[#0d1527] text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 block">
            Revenue
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            ₹1.9Cr
          </div>
        </div>

        {/* Card 2: Deals won */}
        <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 block">
            Deals won
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            214
          </div>
        </div>

        {/* Card 3: Avg deal size */}
        <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 block">
            Avg deal size
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            ₹2.4L
          </div>
        </div>
      </div>

      {/* Deals won by month Bar Chart */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-6">
          Deals won by month
        </h2>

        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2">
          {monthlyDeals.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div
                style={{ height: bar.height }}
                className={`w-full rounded-md transition-all duration-300 ${
                  bar.isCurrent
                    ? 'bg-[#f59e0b]'
                    : 'bg-[#fae5c7]'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top vendors Table */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden">
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Top vendors
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-4 pr-4">Vendor</th>
                <th className="pb-4 px-4">Leads</th>
                <th className="pb-4 px-4">Won</th>
                <th className="pb-4 pl-4">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredVendors.map((vendor, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pr-4 font-semibold text-slate-900 whitespace-nowrap">
                    {vendor.name}
                  </td>
                  <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                    {vendor.leads}
                  </td>
                  <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                    {vendor.won}
                  </td>
                  <td className="py-4 pl-4 font-medium text-slate-900 whitespace-nowrap">
                    {vendor.conversion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;
