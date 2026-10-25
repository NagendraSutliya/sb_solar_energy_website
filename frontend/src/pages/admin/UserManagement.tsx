import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface MemberItem {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited';
}

const INITIAL_MEMBERS: MemberItem[] = [
  {
    id: '1',
    name: 'Rahul Verma',
    initials: 'RV',
    email: 'rahul@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Neha Gupta',
    initials: 'NG',
    email: 'neha@example.com',
    role: 'Sales manager',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Aman Singh',
    initials: 'AS',
    email: 'aman@example.com',
    role: 'Sales',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Pooja Rao',
    initials: 'PR',
    email: 'pooja@example.com',
    role: 'Viewer',
    status: 'Invited',
  },
];

const UserManagement: React.FC = () => {
  const [members] = useState<MemberItem[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');

  const permissions = [
    { area: 'Leads', admin: '✓', manager: '✓', sales: '✓', viewer: 'View' },
    { area: 'Vendors', admin: '✓', manager: '✓', sales: '—', viewer: 'View' },
    { area: 'Reports', admin: '✓', manager: '✓', sales: '—', viewer: 'View' },
    { area: 'Settings', admin: '✓', manager: '—', sales: '—', viewer: '—' },
  ];

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Users & roles
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            8 team members
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
            Invite user
          </button>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-4 pr-4">User</th>
                <th className="pb-4 px-4">Email</th>
                <th className="pb-4 px-4">Role</th>
                <th className="pb-4 pl-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* User with avatar */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-[#fae8c8] text-[#8a5316]">
                        {member.initials}
                      </div>
                      <span className="font-semibold text-slate-900 whitespace-nowrap">
                        {member.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 px-4 text-slate-700 whitespace-nowrap">
                    {member.email}
                  </td>

                  {/* Role Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`py-1 rounded-full text-xs font-semibold ${
                        member.role === 'Admin'
                          ? 'w-36 px-4 block text-left bg-[#d4f8db] text-[#14532d]'
                          : 'inline-block px-3.5 bg-[#e2e8f0] text-slate-700'
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 pl-4 font-medium text-slate-800 whitespace-nowrap">
                    {member.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden">
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Permissions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-4 pr-4">Area</th>
                <th className="pb-4 px-4">Admin</th>
                <th className="pb-4 px-4">Manager</th>
                <th className="pb-4 px-4">Sales</th>
                <th className="pb-4 pl-4">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {permissions.map((perm) => (
                <tr key={perm.area} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 pr-4 font-semibold text-slate-900 whitespace-nowrap">
                    {perm.area}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {perm.admin}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {perm.manager}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {perm.sales}
                  </td>
                  <td className="py-4 pl-4 font-medium text-slate-600 whitespace-nowrap">
                    {perm.viewer}
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

export default UserManagement;
