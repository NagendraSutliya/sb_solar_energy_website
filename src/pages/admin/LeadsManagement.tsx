import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { NewDealModal } from '../../components/admin/NewDealModal';

interface LeadItem {
  id: string;
  name: string;
  initials: string;
  source: string;
  city: string;
  interest: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Lost';
  assigned: string;
}

const INITIAL_LEADS: LeadItem[] = [
  {
    id: '1',
    name: 'Anil Purohit',
    initials: 'AP',
    source: 'Website form',
    city: 'Udaipur',
    interest: 'Hotel solar 50 kW',
    status: 'New',
    assigned: 'Neha',
  },
  {
    id: '2',
    name: 'Suresh Dhayal',
    initials: 'SD',
    source: 'WhatsApp',
    city: 'Sikar',
    interest: 'Solar pump',
    status: 'Contacted',
    assigned: 'Rahul',
  },
  {
    id: '3',
    name: 'Kavita Joshi',
    initials: 'KJ',
    source: 'Vendor referral',
    city: 'Jaipur',
    interest: 'Rooftop 5 kW',
    status: 'Quoted',
    assigned: 'Aman',
  },
  {
    id: '4',
    name: 'Rohit Meena',
    initials: 'RM',
    source: 'Website form',
    city: 'Kota',
    interest: 'Rooftop 3 kW',
    status: 'New',
    assigned: 'Unassigned',
  },
  {
    id: '5',
    name: 'Imran Khan',
    initials: 'IK',
    source: 'Other',
    city: 'Bikaner',
    interest: 'Farm tubewell',
    status: 'Contacted',
    assigned: 'Neha',
  },
];

const LeadsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'New' | 'Contacted' | 'Quoted' | 'Lost'>('All');
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);

  const filterTabs: ('All' | 'New' | 'Contacted' | 'Quoted' | 'Lost')[] = [
    'All',
    'New',
    'Contacted',
    'Quoted',
    'Lost',
  ];

  const getStatusBadgeStyle = (status: LeadItem['status']) => {
    switch (status) {
      case 'Contacted':
        return 'bg-[#fef3c7] text-[#92400e]';
      case 'Quoted':
        return 'bg-[#d4f8db] text-[#14532d]';
      case 'Lost':
        return 'bg-rose-100 text-rose-800';
      case 'New':
      default:
        return 'bg-[#e2e8f0] text-slate-700';
    }
  };

  const filteredLeads = INITIAL_LEADS.filter((lead) => {
    const matchesFilter = activeFilter === 'All' || lead.status === activeFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.interest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Leads
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            128 leads · 14 new today
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-56 sm:w-64 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />

          <button
            type="button"
            onClick={() => setIsNewLeadOpen(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-sm font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New lead
          </button>
        </div>
      </div>

      {/* Filter Tabs matching Leads.png */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveFilter(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === tab
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Leads Table Container */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-4 pr-4">Name</th>
                <th className="pb-4 px-4">Source</th>
                <th className="pb-4 px-4">City</th>
                <th className="pb-4 px-4">Interest</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 pl-4">Assigned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Name with Avatar */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-[#fae8c8] text-[#8a5316]">
                        {lead.initials}
                      </div>
                      <span className="font-semibold text-slate-900 whitespace-nowrap">
                        {lead.name}
                      </span>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                    {lead.source}
                  </td>

                  {/* City */}
                  <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                    {lead.city}
                  </td>

                  {/* Interest */}
                  <td className="py-4 px-4 text-slate-800 font-medium whitespace-nowrap">
                    {lead.interest}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`py-1 rounded-full text-xs font-semibold ${
                        lead.status === 'Quoted'
                          ? 'w-36 px-4 block text-left bg-[#d4f8db] text-[#14532d]'
                          : `inline-block px-3 ${getStatusBadgeStyle(lead.status)}`
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  {/* Assigned */}
                  <td className="py-4 pl-4 text-slate-700 whitespace-nowrap">
                    {lead.assigned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Lead Modal */}
      <NewDealModal
        isOpen={isNewLeadOpen}
        onClose={() => setIsNewLeadOpen(false)}
        onDealAdded={() => {}}
      />
    </div>
  );
};

export default LeadsManagement;
