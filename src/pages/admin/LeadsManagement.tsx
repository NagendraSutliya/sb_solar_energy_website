import React, { useState } from 'react';
import { Search, Plus, ArrowUpRight } from 'lucide-react';

const LeadsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const leads = [
    {
      id: 'L-101',
      name: 'Rameshwar Patidar',
      source: 'Website Solar Calc',
      capacity: '10 kW Residential',
      location: 'Udaipur, Rajasthan',
      estimatedValue: '₹4,50,000',
      status: 'New Lead',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      date: 'Today, 11:20 AM',
    },
    {
      id: 'L-102',
      name: 'Modern Cold Storage',
      source: 'Direct WhatsApp',
      capacity: '40 kW Commercial',
      location: 'Bhilwara, Rajasthan',
      estimatedValue: '₹14,00,000',
      status: 'Contacted',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-100',
      date: 'Today, 09:45 AM',
    },
    {
      id: 'L-103',
      name: 'Deepak Singhal',
      source: 'Google Ads',
      capacity: '5 kW Rooftop',
      location: 'Ajmer, Rajasthan',
      estimatedValue: '₹2,20,000',
      status: 'Qualified',
      statusColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      date: 'Yesterday',
    },
    {
      id: 'L-104',
      name: 'Heritage Resort & Spa',
      source: 'Referral Partner',
      capacity: '75 kW Institutional',
      location: 'Pushkar, Rajasthan',
      estimatedValue: '₹28,50,000',
      status: 'Site Visit Scheduled',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-100',
      date: 'Yesterday',
    },
    {
      id: 'L-105',
      name: 'Suresh Choudhary',
      source: 'PM Surya Ghar Portal',
      capacity: '3 kW Subsidy Plan',
      location: 'Jodhpur, Rajasthan',
      estimatedValue: '₹1,35,000',
      status: 'Follow Up',
      statusColor: 'bg-orange-50 text-orange-700 border-orange-100',
      date: '22 Oct 2026',
    },
  ];

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Leads
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and convert fresh incoming solar leads (128 this month)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-60 sm:w-72 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#2f5bf8] hover:bg-[#254edb] text-white rounded-xl text-sm font-medium shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add lead
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">Lead Name</th>
                <th className="pb-3 px-4">Source</th>
                <th className="pb-3 px-4">Requirement</th>
                <th className="pb-3 px-4">Location</th>
                <th className="pb-3 px-4">Est. Value</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-slate-900 whitespace-nowrap">
                    {lead.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {lead.source}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 whitespace-nowrap">
                    {lead.capacity}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {lead.location}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {lead.estimatedValue}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold border ${lead.statusColor}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Convert <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
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

export default LeadsManagement;
