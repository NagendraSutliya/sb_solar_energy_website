import { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  Plus, 
  ShieldCheck, 
  ExternalLink,
  Store,
  X
} from 'lucide-react';
import { 
  getStoredVendors, 
  saveVendor, 
  updateVendorStatus, 
  deleteVendor, 
  type Vendor 
} from '../../data/vendorStorage';
import { indiaStatesDistricts } from '../../data/indiaStatesDistricts';

const VendorManagement = () => {
  const [vendors, setVendors] = useState<Vendor[]>(() => getStoredVendors());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Vendor Form State
  const [newVendorForm, setNewVendorForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    contact: '',
    state: '',
    district: '',
    address: '',
    businessType: 'dealer' as 'dealer' | 'distributor' | 'installer' | 'other',
    status: 'Approved' as 'Approved' | 'Pending' | 'Rejected',
  });

  useEffect(() => {
    const handleUpdate = () => {
      setVendors(getStoredVendors());
    };
    window.addEventListener('sb-vendors-updated', handleUpdate);
    return () => window.removeEventListener('sb-vendors-updated', handleUpdate);
  }, []);

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Pending' | 'Rejected') => {
    updateVendorStatus(id, newStatus);
    setVendors(getStoredVendors());
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the vendor database?`)) {
      deleteVendor(id);
      setVendors(getStoredVendors());
      if (selectedVendor?.id === id) {
        setSelectedVendor(null);
      }
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorForm.name || !newVendorForm.contact) {
      alert('Please fill out at least the company name and contact number.');
      return;
    }

    saveVendor({
      name: newVendorForm.name,
      contactPerson: newVendorForm.contactPerson,
      email: newVendorForm.email,
      contact: newVendorForm.contact,
      state: newVendorForm.state,
      district: newVendorForm.district,
      address: newVendorForm.address,
      businessType: newVendorForm.businessType,
      status: newVendorForm.status,
    });

    setIsAddModalOpen(false);
    setNewVendorForm({
      name: '',
      contactPerson: '',
      email: '',
      contact: '',
      state: '',
      district: '',
      address: '',
      businessType: 'dealer',
      status: 'Approved',
    });
  };

  // Filtered List
  const filteredVendors = vendors.filter(vendor => {
    if (statusFilter !== 'All' && vendor.status !== statusFilter) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        vendor.name.toLowerCase().includes(q) ||
        vendor.contactPerson.toLowerCase().includes(q) ||
        vendor.email.toLowerCase().includes(q) ||
        vendor.contact.toLowerCase().includes(q) ||
        (vendor.state && vendor.state.toLowerCase().includes(q)) ||
        (vendor.district && vendor.district.toLowerCase().includes(q)) ||
        vendor.address.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Analytics Stats
  const totalVendors = vendors.length;
  const approvedCount = vendors.filter(v => v.status === 'Approved').length;
  const pendingCount = vendors.filter(v => v.status === 'Pending').length;
  const rejectedCount = vendors.filter(v => v.status === 'Rejected').length;
  const uniqueDistricts = new Set(vendors.filter(v => v.district).map(v => v.district)).size;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Store className="h-7 w-7 text-indigo-600" />
            Vendor &amp; Partner Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View real vendor applications, manage dealer approvals, and manage live partner listings.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 border border-slate-300 text-slate-700 bg-white rounded-lg hover:bg-slate-50 text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-slate-500" />
            View Public Directory
          </a>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add New Vendor
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
            <span>Total Registered</span>
            <Building2 className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{totalVendors}</div>
          <div className="text-xs text-slate-500 mt-1">Covering {uniqueDistricts} distinct districts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
            <span>Live / Approved</span>
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">{approvedCount}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Visible on customer search</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
            <span>Pending Review</span>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">{pendingCount}</div>
          <div className="text-xs text-amber-600 font-medium mt-1">Awaiting verification</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
            <span>Rejected / Inactive</span>
            <XCircle className="h-5 w-5 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-rose-600 mt-2">{rejectedCount}</div>
          <div className="text-xs text-slate-400 mt-1">Hidden from directory</div>
        </div>
      </div>

      {/* Main Vendor Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Filters and Search Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-slate-50/70">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by company, person, city, phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50" 
            />
          </div>

          {/* Status Tab Filter */}
          <div className="flex items-center space-x-1 bg-slate-200/60 p-1 rounded-lg self-start md:self-auto text-xs font-semibold">
            {(['All', 'Approved', 'Pending', 'Rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  statusFilter === tab 
                    ? 'bg-white text-indigo-700 shadow-sm font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab} {tab === 'All' ? `(${totalVendors})` : tab === 'Approved' ? `(${approvedCount})` : tab === 'Pending' ? `(${pendingCount})` : `(${rejectedCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Vendor / Business</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Details</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <Store className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                    <p className="font-medium text-slate-600">No vendors found matching your filter</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting the search query or status filter</p>
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Business Name */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        {vendor.name}
                        {vendor.status === 'Approved' && (
                          <span title="Verified Approved Partner">
                            <ShieldCheck className="h-4 w-4 text-emerald-500 inline shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Contact: <span className="font-medium text-slate-700">{vendor.contactPerson || 'N/A'}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Registered: {new Date(vendor.registeredAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 text-xs space-y-1">
                      <div className="flex items-center text-slate-700 font-medium">
                        <Phone className="h-3.5 w-3.5 text-indigo-500 mr-1.5 shrink-0" />
                        <a href={`tel:${vendor.contact}`} className="hover:underline">{vendor.contact}</a>
                      </div>
                      {vendor.email && (
                        <div className="flex items-center text-slate-500">
                          <Mail className="h-3.5 w-3.5 text-slate-400 mr-1.5 shrink-0" />
                          <a href={`mailto:${vendor.email}`} className="hover:underline truncate max-w-[180px]">{vendor.email}</a>
                        </div>
                      )}
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-xs text-slate-600">
                      <div className="font-semibold text-slate-800 flex items-center">
                        <MapPin className="h-3.5 w-3.5 text-rose-500 mr-1 shrink-0" />
                        {vendor.district ? `${vendor.district}, ${vendor.state || 'India'}` : vendor.state || 'India'}
                      </div>
                      <div className="text-slate-400 truncate max-w-[200px] mt-0.5" title={vendor.address}>
                        {vendor.address}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                        {vendor.businessType}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="px-6 py-4">
                      <select
                        value={vendor.status}
                        onChange={(e) => handleStatusChange(vendor.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border outline-none cursor-pointer transition-colors ${
                          vendor.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-1 focus:ring-emerald-500'
                            : vendor.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 focus:ring-1 focus:ring-amber-500'
                            : 'bg-rose-50 text-rose-700 border-rose-200 focus:ring-1 focus:ring-rose-500'
                        }`}
                      >
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedVendor(vendor)}
                          className="px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(vendor.id, vendor.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded hover:bg-rose-50"
                          title="Delete Vendor"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
            <button 
              onClick={() => setSelectedVendor(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedVendor.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                  selectedVendor.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                  selectedVendor.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  Status: {selectedVendor.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm divide-y divide-slate-100">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500 font-medium">Contact Person:</span>
                <span className="font-semibold text-slate-800">{selectedVendor.contactPerson || 'N/A'}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500 font-medium">Phone:</span>
                <a href={`tel:${selectedVendor.contact}`} className="font-semibold text-indigo-600 hover:underline">{selectedVendor.contact}</a>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500 font-medium">Email:</span>
                <a href={`mailto:${selectedVendor.email}`} className="font-semibold text-indigo-600 hover:underline">{selectedVendor.email || 'N/A'}</a>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500 font-medium">Partnership Type:</span>
                <span className="font-semibold text-slate-800 uppercase tracking-wide text-xs">{selectedVendor.businessType}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500 font-medium">State &amp; District:</span>
                <span className="font-semibold text-slate-800">{selectedVendor.district}, {selectedVendor.state || 'N/A'}</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 font-medium block mb-1">Full Business Address:</span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 text-xs leading-relaxed border border-slate-200">
                  {selectedVendor.address}
                </p>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500 font-medium">Registration Date:</span>
                <span className="text-slate-700 font-medium">{new Date(selectedVendor.registeredAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleStatusChange(selectedVendor.id, 'Approved');
                    setSelectedVendor({ ...selectedVendor, status: 'Approved' });
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedVendor.id, 'Rejected');
                    setSelectedVendor({ ...selectedVendor, status: 'Rejected' });
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Reject
                </button>
              </div>

              <button
                onClick={() => setSelectedVendor(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Vendor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Plus className="h-5 w-5 text-indigo-600" />
                Add Authorized Vendor
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Solar Solutions"
                  value={newVendorForm.name}
                  onChange={(e) => setNewVendorForm({ ...newVendorForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={newVendorForm.contactPerson}
                    onChange={(e) => setNewVendorForm({ ...newVendorForm, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={newVendorForm.contact}
                    onChange={(e) => setNewVendorForm({ ...newVendorForm, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="partner@example.com"
                    value={newVendorForm.email}
                    onChange={(e) => setNewVendorForm({ ...newVendorForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Partnership Type</label>
                  <select
                    value={newVendorForm.businessType}
                    onChange={(e) => setNewVendorForm({ ...newVendorForm, businessType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-white"
                  >
                    <option value="dealer">Certified Dealer</option>
                    <option value="distributor">Regional Distributor</option>
                    <option value="installer">System Installer</option>
                    <option value="other">Other Partner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <select
                    value={newVendorForm.state}
                    onChange={(e) => setNewVendorForm({ ...newVendorForm, state: e.target.value, district: '' })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-white"
                  >
                    <option value="">Select State</option>
                    {Object.keys(indiaStatesDistricts).map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District</label>
                  <select
                    value={newVendorForm.district}
                    disabled={!newVendorForm.state}
                    onChange={(e) => setNewVendorForm({ ...newVendorForm, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-white disabled:opacity-50"
                  >
                    <option value="">Select District</option>
                    {newVendorForm.state && indiaStatesDistricts[newVendorForm.state]?.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Business Address</label>
                <textarea
                  rows={2}
                  placeholder="Street, locality, postal code"
                  value={newVendorForm.address}
                  onChange={(e) => setNewVendorForm({ ...newVendorForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Status</label>
                <select
                  value={newVendorForm.status}
                  onChange={(e) => setNewVendorForm({ ...newVendorForm, status: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-white"
                >
                  <option value="Approved">Approved (Immediately visible in Find Vendor)</option>
                  <option value="Pending">Pending (Requires review)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
