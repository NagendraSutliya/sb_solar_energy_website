import { useState, useEffect } from 'react';
import { Search, MoreVertical, Shield, User, Edit, Trash2, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredVendors, type Vendor } from '../../data/vendorStorage';

const UserManagement = () => {
  const [vendors, setVendors] = useState<Vendor[]>(() => getStoredVendors());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      setVendors(getStoredVendors());
    };
    window.addEventListener('sb-vendors-updated', handleUpdate);
    return () => window.removeEventListener('sb-vendors-updated', handleUpdate);
  }, []);

  const baseUsers = [
    { name: 'Admin User', email: 'admin@sbsolar.com', role: 'Super Admin', status: 'Active', color: 'indigo', joined: 'Oct 20, 2026' },
    { name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Customer', status: 'Active', color: 'emerald', joined: 'Oct 19, 2026' },
  ];

  const vendorUsers = vendors.map(v => ({
    name: v.name,
    email: v.email || `${v.contact}@vendor.sbsolar.in`,
    role: `Vendor (${v.businessType.toUpperCase()})`,
    status: v.status === 'Approved' ? 'Active' : v.status,
    color: 'amber',
    joined: new Date(v.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }));

  const allUsers = [...baseUsers, ...vendorUsers].filter(u => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500">Manage customers, registered vendors, and admin staff accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/vendors" 
            className="px-4 py-2 border border-slate-300 text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Store className="h-4 w-4 text-indigo-600" />
            Manage Vendors ({vendors.length})
          </Link>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
            Add New User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50" 
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Total Accounts: <span className="font-bold text-slate-800">{allUsers.length}</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {allUsers.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full bg-${user.color}-100 text-${user.color}-700 flex items-center justify-center`}>
                        {user.role.includes('Admin') ? <Shield className="h-5 w-5" /> : user.role.includes('Vendor') ? <Store className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <span className="font-medium">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2 text-slate-400">
                      <button className="p-1 hover:text-indigo-600 transition-colors"><Edit className="h-4 w-4" /></button>
                      <button className="p-1 hover:text-rose-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      <button className="p-1 hover:text-slate-600 transition-colors"><MoreVertical className="h-4 w-4" /></button>
                    </div>
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
