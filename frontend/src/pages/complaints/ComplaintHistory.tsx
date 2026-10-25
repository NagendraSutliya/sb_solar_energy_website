import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const MOCK_COMPLAINTS = [
  { id: '12345', date: '2026-10-24', status: 'Not Process Yet', title: 'Inverter Beeping Issue', category: 'Inverter' },
  { id: '12344', date: '2026-10-20', status: 'In Process', title: 'Low Power Generation', category: 'Solar Panel' },
  { id: '12340', date: '2026-10-15', status: 'Closed', title: 'Battery Replacement', category: 'Battery' },
  { id: '12338', date: '2026-10-01', status: 'Closed', title: 'Wire loose connection', category: 'Accessories' },
];

const ComplaintHistory = () => {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');

  const filteredComplaints = statusFilter 
    ? MOCK_COMPLAINTS.filter(c => c.status.toLowerCase().replace(/ /g, '-') === statusFilter || (statusFilter === 'pending' && c.status === 'Not Process Yet'))
    : MOCK_COMPLAINTS;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Complaint History</h1>
          <p className="text-sm text-slate-500">Track and manage all your submitted complaints.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search ID..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Complaint No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title / Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reg Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No complaints found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">#CMP-{c.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{c.title}</div>
                      <div className="text-xs text-slate-500">{c.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{c.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        c.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'In Process' ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/portal/complaints/details/${c.id}`} className="text-primary hover:text-primary/80 px-3 py-1.5 border border-primary/20 rounded-md hover:bg-primary/5 transition-colors">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintHistory;
