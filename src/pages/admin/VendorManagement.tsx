import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface VendorItem {
  id: string;
  name: string;
  initials: string;
  district: string;
  rating: number;
  status: 'Verified' | 'Pending';
}

const INITIAL_VENDORS: VendorItem[] = [
  {
    id: '1',
    name: 'SunPower Jaipur',
    initials: 'SJ',
    district: 'Jaipur',
    rating: 4.8,
    status: 'Verified',
  },
  {
    id: '2',
    name: 'Lakecity Solar',
    initials: 'LS',
    district: 'Udaipur',
    rating: 4.9,
    status: 'Verified',
  },
  {
    id: '3',
    name: 'Apex Green Tech',
    initials: 'AG',
    district: 'Bikaner',
    rating: 4.7,
    status: 'Pending',
  },
  {
    id: '4',
    name: 'Mahi Solar Power',
    initials: 'MS',
    district: 'Banswara',
    rating: 4.8,
    status: 'Pending',
  },
];

const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState<VendorItem[]>(INITIAL_VENDORS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = (id: string) => {
    setVendors(vendors.map((v) => (v.id === id ? { ...v, status: 'Verified' } : v)));
  };

  const handleReject = (id: string) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vendors
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            36 verified · 4 pending approval
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
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add vendor
          </button>
        </div>
      </div>

      {/* 3 KPI Stat Cards matching Vendors.png */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">
            Verified
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            36
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">
            Pending
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            4
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">
            Avg rating
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            4.8
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-4 pr-4">Vendor</th>
                <th className="pb-4 px-4">District</th>
                <th className="pb-4 px-4">Rating</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {filtered.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Vendor Name + Avatar */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-amber-100 text-amber-800">
                        {vendor.initials}
                      </div>
                      <span className="font-semibold text-slate-900 whitespace-nowrap">
                        {vendor.name}
                      </span>
                    </div>
                  </td>

                  {/* District */}
                  <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                    {vendor.district}
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4 text-slate-800 font-semibold whitespace-nowrap">
                    {vendor.rating}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        vendor.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 pl-4 text-right whitespace-nowrap">
                    {vendor.status === 'Verified' ? (
                      <button
                        type="button"
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="flex items-center justify-end gap-1.5 text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => handleApprove(vendor.id)}
                          className="text-emerald-600 hover:text-emerald-800 cursor-pointer"
                        >
                          Approve
                        </button>
                        <span className="text-slate-300">·</span>
                        <button
                          type="button"
                          onClick={() => handleReject(vendor.id)}
                          className="text-rose-600 hover:text-rose-800 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}
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

export default VendorManagement;
