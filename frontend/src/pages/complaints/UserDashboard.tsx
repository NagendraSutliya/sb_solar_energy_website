import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, PlusCircle, AlertCircle } from 'lucide-react';
import { complaintsApi } from '../../services/api';

const DashboardCard = ({ title, count, icon: Icon, colorClass, link }: any) => (
  <Link to={link} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{count}</h3>
    </div>
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </Link>
);

const UserDashboard = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem('sb_user_email') || '';
    complaintsApi.getAll(userEmail ? { email: userEmail } : undefined)
      .then((res) => {
        if (res.success && res.data) {
          setComplaints(res.data);
        }
      })
      .catch((err) => console.warn('User dashboard complaints fetch note:', err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'Not Process Yet').length;
  const inProcessCount = complaints.filter((c) => c.status === 'In Process').length;
  const closedCount = complaints.filter((c) => c.status === 'Closed').length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back! Here's an overview of your complaints & requests.</p>
          </div>
          <Link
            to="/portal/complaints/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <PlusCircle className="mr-2 -ml-1 h-5 w-5" />
            Lodge New Complaint
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Total Complaints" 
            count={loading ? '...' : totalCount} 
            icon={FileText} 
            colorClass="bg-blue-500" 
            link="/portal/complaints/history" 
          />
          <DashboardCard 
            title="Pending processing" 
            count={loading ? '...' : pendingCount} 
            icon={AlertCircle} 
            colorClass="bg-amber-500" 
            link="/portal/complaints/history?status=pending" 
          />
          <DashboardCard 
            title="In Process" 
            count={loading ? '...' : inProcessCount} 
            icon={Clock} 
            colorClass="bg-purple-500" 
            link="/portal/complaints/history?status=in-process" 
          />
          <DashboardCard 
            title="Closed Complaints" 
            count={loading ? '...' : closedCount} 
            icon={CheckCircle} 
            colorClass="bg-emerald-500" 
            link="/portal/complaints/history?status=closed" 
          />
        </div>

        {/* Recent Activity / Table */}
        <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg leading-6 font-medium text-slate-900">Recent Complaints</h3>
            <Link to="/portal/complaints/history" className="text-sm text-primary hover:text-primary/80 font-medium">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Complaint No</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nature / Issue</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reg Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">
                      {loading ? 'Loading your complaints...' : 'No complaints submitted yet. Click "Lodge New Complaint" to raise an issue.'}
                    </td>
                  </tr>
                ) : (
                  complaints.slice(0, 5).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                        {c.complaint_no || `#CMP-${c.id}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {c.nature || c.category || 'General issue'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Recent'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          c.status === 'Closed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : c.status === 'In Process'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status || 'Not Process Yet'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/portal/complaints/details/${c.id}`} className="text-primary hover:text-primary/80">
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
    </div>
  );
};

export default UserDashboard;
