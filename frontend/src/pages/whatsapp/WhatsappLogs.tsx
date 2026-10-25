import { ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhatsappLogs = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bot Interactions Log</h1>
          <p className="text-sm text-slate-500">View recent messages sent and received by the WhatsApp Bot.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Message Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Content preview</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            <tr className="hover:bg-slate-50/80">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" /> Today, 10:45 AM
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">+91 98765 43210</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Inbound</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 truncate max-w-[200px]">
                I want to know about solar panels...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-emerald-600 font-medium">Auto-replied</td>
            </tr>
            <tr className="hover:bg-slate-50/80">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" /> Today, 09:30 AM
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">+91 98765 43211</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-medium">Campaign</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 truncate max-w-[200px]">
                Diwali Offer! Get 20% off on...
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-emerald-600 font-medium">Delivered</td>
            </tr>
            <tr className="hover:bg-slate-50/80">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" /> Yesterday, 04:15 PM
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">+91 98765 43212</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Inbound</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 truncate max-w-[200px]">
                Menu
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-emerald-600 font-medium">Auto-replied</td>
            </tr>
          </tbody>
        </table>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-center">
          <button className="text-sm font-medium text-primary hover:underline">Load More Logs</button>
        </div>
      </div>
    </div>
  );
};

export default WhatsappLogs;
