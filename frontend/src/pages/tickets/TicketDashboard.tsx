import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, Clock } from 'lucide-react';
import { complaintsApi } from '../../services/api';

const DEFAULT_TICKETS = [
  {
    id: 'TCK-9921',
    status: 'Open',
    title: 'Solar Panel Inverter issue',
    desc: 'Hi, my inverter is beeping continuously since morning...',
    time: '2 hours ago',
    chatId: '1',
  },
  {
    id: 'TCK-9805',
    status: 'Resolved',
    title: 'Warranty claim for batteries',
    desc: 'Thank you, the issue has been resolved.',
    time: 'Oct 12, 2026',
    chatId: '2',
  },
];

const TicketDashboard = () => {
  const [tickets, setTickets] = useState(DEFAULT_TICKETS);

  useEffect(() => {
    const userEmail = localStorage.getItem('sb_user_email') || '';
    complaintsApi.getAll(userEmail ? { email: userEmail } : undefined)
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((c: any) => ({
            id: c.complaint_no || `TCK-${c.id}`,
            status: c.status === 'Closed' ? 'Resolved' : c.status === 'In Process' ? 'In Progress' : 'Open',
            title: c.nature || 'Support Query',
            desc: c.description || `Category: ${c.category}`,
            time: c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Recent',
            chatId: String(c.id),
          }));
          setTickets(mapped);
        }
      })
      .catch((err) => console.warn('Tickets load note:', err.message));
  }, []);

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
            {tickets.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No support tickets found. Click "New Ticket" above to raise a query.
              </div>
            ) : (
              tickets.map((t) => (
                <div key={t.id} className={`p-5 hover:bg-slate-50 transition-colors ${t.status === 'Resolved' ? 'opacity-75' : ''}`}>
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-700">{t.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          t.status === 'Resolved' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : t.status === 'In Progress' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900">{t.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-1">{t.desc}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {t.time}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketDashboard;
