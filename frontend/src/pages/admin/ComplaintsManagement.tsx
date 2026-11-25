import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  ChevronRight, 
  MessageCircle
} from 'lucide-react';
import { complaintsApi } from '../../services/api';

interface ComplaintItem {
  id: number | string;
  complaint_no: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  category: string;
  sub_category?: string;
  nature: string;
  description: string;
  status: 'Not Process Yet' | 'In Process' | 'Closed';
  created_at?: string;
}

const INITIAL_MOCK_COMPLAINTS: ComplaintItem[] = [
  {
    id: 1,
    complaint_no: 'CMP-48201',
    customer_name: 'Vikram Choudhary',
    customer_email: 'vikram.c@gmail.com',
    customer_phone: '+91 98291 44552',
    category: 'Inverter',
    sub_category: 'Not Working',
    nature: 'Inverter red light blinking continuously',
    description: 'Since yesterday evening the solar inverter stopped generating and red error light is on with alarm beep.',
    status: 'Not Process Yet',
    created_at: '2026-11-23 11:20:00',
  },
  {
    id: 2,
    complaint_no: 'CMP-48190',
    customer_name: 'Pooja Sharma',
    customer_email: 'pooja.sharma@yahoo.com',
    customer_phone: '+91 94140 33211',
    category: 'Solar Panel',
    sub_category: 'Low Efficiency',
    nature: 'Generation dropped by 50%',
    description: '5kW rooftop system in Jaipur is generating only 8 units daily instead of usual 22 units.',
    status: 'In Process',
    created_at: '2026-11-22 15:45:00',
  },
  {
    id: 3,
    complaint_no: 'CMP-47912',
    customer_name: 'Rajesh Solanki',
    customer_email: 'rajesh.s@gmail.com',
    customer_phone: '+91 98280 77123',
    category: 'Battery',
    sub_category: 'Backup Issue',
    nature: 'Battery discharge within 30 minutes',
    description: 'Lithium battery backup drops immediately when grid fails. Technician visited and replaced terminal connection.',
    status: 'Closed',
    created_at: '2026-11-20 09:10:00',
  },
];

const ComplaintsManagement: React.FC = () => {
  const [complaints, setComplaints] = useState<ComplaintItem[]>(INITIAL_MOCK_COMPLAINTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Not Process Yet' | 'In Process' | 'Closed'>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintItem | null>(null);
  const [updatingId, setUpdatingId] = useState<number | string | null>(null);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await complaintsApi.getAll();
      if (res.success && res.data && res.data.length > 0) {
        setComplaints(res.data.map((c: any) => ({
          id: c.id,
          complaint_no: c.complaint_no || `CMP-${c.id}`,
          customer_name: c.customer_name || 'Customer',
          customer_email: c.customer_email || '—',
          customer_phone: c.customer_phone || '—',
          category: c.category || 'General',
          sub_category: c.sub_category || '',
          nature: c.nature || 'Customer Complaint',
          description: c.description || 'No detailed description provided.',
          status: (c.status as 'Not Process Yet' | 'In Process' | 'Closed') || 'Not Process Yet',
          created_at: c.created_at || new Date().toISOString(),
        })));
      }
    } catch (err: any) {
      console.warn('Complaints fetch note:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id: number | string, newStatus: 'Not Process Yet' | 'In Process' | 'Closed') => {
    setUpdatingId(id);
    try {
      await complaintsApi.updateStatus(id, newStatus);
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedComplaint && selectedComplaint.id === id) {
        setSelectedComplaint((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      console.warn('Status update note:', err.message);
      // Optimistic update locally
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered complaints
  const filtered = complaints.filter((c) => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category.toLowerCase() === categoryFilter.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      c.complaint_no.toLowerCase().includes(q) ||
      c.customer_name.toLowerCase().includes(q) ||
      c.customer_phone.toLowerCase().includes(q) ||
      c.customer_email.toLowerCase().includes(q) ||
      c.nature.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q);

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Counts
  const countPending = complaints.filter((c) => c.status === 'Not Process Yet').length;
  const countInProcess = complaints.filter((c) => c.status === 'In Process').length;
  const countClosed = complaints.filter((c) => c.status === 'Closed').length;

  const categories = ['All', ...Array.from(new Set(complaints.map((c) => c.category).filter(Boolean)))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <AlertCircle className="h-7 w-7 text-amber-500" />
            Complaints & Service Requests
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time issues and support tickets raised from the Customer Portal & Public Website.
          </p>
        </div>
        <button
          onClick={fetchComplaints}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Complaints</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{complaints.length}</p>
          <p className="text-xs text-slate-400 mt-1">From all portal channels</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs bg-gradient-to-br from-amber-50/50 to-white">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Not Process Yet
          </p>
          <p className="text-3xl font-extrabold text-amber-700 mt-2">{countPending}</p>
          <p className="text-xs text-amber-600 mt-1">Requires immediate attention</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs bg-gradient-to-br from-blue-50/50 to-white">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            In Process
          </p>
          <p className="text-3xl font-extrabold text-blue-700 mt-2">{countInProcess}</p>
          <p className="text-xs text-blue-600 mt-1">Currently being handled</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-xs bg-gradient-to-br from-emerald-50/50 to-white">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Resolved / Closed
          </p>
          <p className="text-3xl font-extrabold text-emerald-700 mt-2">{countClosed}</p>
          <p className="text-xs text-emerald-600 mt-1">Successfully resolved</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(['All', 'Not Process Yet', 'In Process', 'Closed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === tab
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                statusFilter === tab ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-600'
              }`}>
                {tab === 'All' ? complaints.length : tab === 'Not Process Yet' ? countPending : tab === 'In Process' ? countInProcess : countClosed}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaint, name, phone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3">Complaint No</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Issue / Nature</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    No complaints found matching this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const cleanPhone = (item.customer_phone || '').replace(/[^0-9]/g, '');
                  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                  const waUrl = `https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(item.customer_name)},%20we%20are%20contacting%20you%20regarding%20your%20complaint%20${encodeURIComponent(item.complaint_no)}.`;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Complaint No */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-900">{item.complaint_no}</span>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-800">{item.customer_name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          {item.customer_phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {item.customer_phone}
                            </span>
                          )}
                          {item.customer_email && item.customer_email !== '—' && (
                            <span className="hidden sm:flex items-center gap-1">
                              <Mail className="h-3 w-3 text-slate-400" />
                              {item.customer_email}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {item.category}
                        </span>
                        {item.sub_category && (
                          <div className="text-[10px] text-slate-400 mt-0.5">{item.sub_category}</div>
                        )}
                      </td>

                      {/* Issue / Nature */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="font-medium text-slate-800 line-clamp-1">{item.nature}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-[11px] text-slate-500">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            item.status === 'Closed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'In Process'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status === 'Closed' && <CheckCircle2 className="h-3 w-3" />}
                          {item.status === 'In Process' && <Clock className="h-3 w-3" />}
                          {item.status === 'Not Process Yet' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                          {item.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Direct WhatsApp Customer */}
                          {item.customer_phone && item.customer_phone !== '—' && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                          )}

                          {/* Move to In Process */}
                          {item.status === 'Not Process Yet' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'In Process')}
                              disabled={updatingId === item.id}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-[11px] transition-colors cursor-pointer"
                              title="Assign / Mark In Process"
                            >
                              Process
                            </button>
                          )}

                          {/* Mark as Closed */}
                          {item.status !== 'Closed' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'Closed')}
                              disabled={updatingId === item.id}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium text-[11px] transition-colors cursor-pointer"
                              title="Mark Resolved"
                            >
                              Resolve
                            </button>
                          )}

                          {/* Reopen if closed */}
                          {item.status === 'Closed' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'In Process')}
                              disabled={updatingId === item.id}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium text-[11px] transition-colors cursor-pointer"
                              title="Reopen Complaint"
                            >
                              Reopen
                            </button>
                          )}

                          {/* View Detail Modal */}
                          <button
                            onClick={() => setSelectedComplaint(item)}
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Complaint Details</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedComplaint.complaint_no}</h3>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block font-medium">Customer Name</span>
                  <span className="font-semibold text-slate-800">{selectedComplaint.customer_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Phone</span>
                  <span className="font-semibold text-slate-800">{selectedComplaint.customer_phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Email</span>
                  <span className="font-semibold text-slate-800">{selectedComplaint.customer_email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Category</span>
                  <span className="font-semibold text-slate-800">
                    {selectedComplaint.category} {selectedComplaint.sub_category ? `(${selectedComplaint.sub_category})` : ''}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Issue / Nature</span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-medium text-slate-800">
                  {selectedComplaint.nature}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Detailed Description</span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 whitespace-pre-wrap">
                  {selectedComplaint.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium mb-1">Current Status</span>
                <div className="flex items-center gap-2">
                  {(['Not Process Yet', 'In Process', 'Closed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedComplaint.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                        selectedComplaint.status === st
                          ? st === 'Closed'
                            ? 'bg-emerald-600 text-white'
                            : st === 'In Process'
                            ? 'bg-blue-600 text-white'
                            : 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsManagement;
