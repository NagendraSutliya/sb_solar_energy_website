import { Link } from 'react-router-dom';
import { MessageSquare, Plus, Clock, CheckCircle2 } from 'lucide-react';

const TicketDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" /> Support Tickets
            </h1>
            <p className="text-sm text-slate-500 mt-1">Manage your support queries and communicate with our team.</p>
          </div>
          <Link
            to="/portal/support/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-1" /> New Ticket
          </Link>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-4">
            <h2 className="font-semibold text-slate-800">Your Recent Tickets</h2>
          </div>
          
          <div className="divide-y divide-slate-100">
            {/* Ticket Item - Open */}
            <Link to="/portal/support/chat/1" className="block p-5 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500">#TCK-9921</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Open</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">Solar Panel Inverter issue</h3>
                  <p className="text-sm text-slate-600 line-clamp-1">Hi, my inverter is beeping continuously since morning...</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 2 hours ago</span>
                  <span className="font-medium text-primary">View Chat</span>
                </div>
              </div>
            </Link>

            {/* Ticket Item - Closed */}
            <Link to="/portal/support/chat/2" className="block p-5 hover:bg-slate-50 transition-colors opacity-75">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500">#TCK-9805</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Resolved
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">Warranty claim for batteries</h3>
                  <p className="text-sm text-slate-600 line-clamp-1">Thank you, the issue has been resolved.</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Oct 12, 2026</span>
                  <span className="font-medium text-slate-600">View Chat</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketDashboard;
