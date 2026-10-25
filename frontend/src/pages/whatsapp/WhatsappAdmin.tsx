import { MessageCircle, Users, Activity, Settings, BarChart3, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </div>
    <div className={`p-4 rounded-full ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </div>
);

const WhatsappAdmin = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-[#25D366]" /> WhatsApp Bot Admin
            </h1>
            <p className="text-sm text-slate-500 mt-1">Manage automated replies, campaigns, and user interactions.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#25D366]/10 px-4 py-2 rounded-lg text-[#25D366] font-medium border border-[#25D366]/20">
            <Smartphone className="h-5 w-5" />
            Connected
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Messages" value="12,450" icon={BarChart3} color="bg-blue-500" />
          <StatCard title="Active Users" value="842" icon={Users} color="bg-indigo-500" />
          <StatCard title="Auto-Replies Sent" value="5,930" icon={Activity} color="bg-emerald-500" />
          <StatCard title="Campaigns Running" value="3" icon={Settings} color="bg-amber-500" />
        </div>

        {/* Recent Messages Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-4 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800">Recent Bot Interactions</h2>
            <Link to="/admin/whatsapp/logs" className="text-sm text-primary font-medium hover:underline">View All Logs</Link>
          </div>
          
          <div className="p-6 text-center text-slate-500 py-12">
            <MessageCircle className="h-12 w-12 mx-auto text-slate-300 mb-3" />
            <p>Database not connected. Interactions will appear here once the backend is configured.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhatsappAdmin;
