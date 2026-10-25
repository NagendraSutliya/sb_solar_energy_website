import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, PlusCircle, AlertCircle } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back! Here's an overview of your complaints.</p>
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
            count="12" 
            icon={FileText} 
            colorClass="bg-blue-500" 
            link="/portal/complaints/history" 
          />
          <DashboardCard 
            title="Pending processing" 
            count="3" 
            icon={AlertCircle} 
            colorClass="bg-amber-500" 
            link="/portal/complaints/history?status=pending" 
          />
          <DashboardCard 
            title="In Process" 
            count="4" 
            icon={Clock} 
            colorClass="bg-purple-500" 
            link="/portal/complaints/history?status=in-process" 
          />
          <DashboardCard 
            title="Closed Complaints" 
            count="5" 
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reg Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {/* Dummy Row 1 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#CMP-12345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Oct 24, 2026</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Not Process Yet
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to="/portal/complaints/details/12345" className="text-primary hover:text-primary/80">View Details</Link>
                  </td>
                </tr>
                {/* Dummy Row 2 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#CMP-12344</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Oct 20, 2026</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      In Process
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to="/portal/complaints/details/12344" className="text-primary hover:text-primary/80">View Details</Link>
                  </td>
                </tr>
                {/* Dummy Row 3 */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#CMP-12340</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Oct 15, 2026</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      Closed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to="/portal/complaints/details/12340" className="text-primary hover:text-primary/80">View Details</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
