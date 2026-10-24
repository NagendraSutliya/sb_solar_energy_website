import React from 'react';
import { TrendingUp, Download } from 'lucide-react';
import { REVENUE_MONTHS } from '../../data/crmData';

const ReportsManagement: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Sales & Pipeline Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Deep dive into monthly revenue velocity, win rates, and team performance
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-medium shadow-2xs transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500" />
          Export CSV
        </button>
      </div>

      {/* Summary KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Pipeline Value
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            ₹52.8 Lakhs
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% quarterly growth
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Average Deal Size
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            ₹2,84,000
          </div>
          <div className="text-xs text-blue-600 font-semibold mt-2">
            Commercial & Residential Rooftop
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Closed Win Rate
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            32.0%
          </div>
          <div className="text-xs text-slate-500 font-medium mt-2">
            Industry benchmark: 28%
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Past 12 Months Revenue Realization
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">Month</th>
                <th className="pb-3 px-4">Achieved Revenue</th>
                <th className="pb-3 px-4">Deals Closed</th>
                <th className="pb-3 pl-4 text-right">Performance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {REVENUE_MONTHS.slice().reverse().map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-slate-900">
                    {item.month} 2026
                  </td>
                  <td className="py-3 px-4 font-bold text-blue-600">
                    {item.value}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {Math.floor(12 + Math.random() * 8)} closed
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                      Target Exceeded
                    </span>
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
