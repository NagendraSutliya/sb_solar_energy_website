import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User, Clock, CheckCircle2 } from 'lucide-react';

const TicketChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-2xl shadow-sm border border-slate-100 p-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-slate-900">Ticket #TCK-{id}</h1>
              {id === '2' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Resolved
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  Open
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 font-medium">Solar Panel Inverter issue</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-slate-50 border-x border-slate-100 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* User Message */}
        <div className="flex gap-4 max-w-3xl">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900">You</span>
              <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> 2 hours ago</span>
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 text-slate-700 text-sm">
              Hi, my inverter is beeping continuously since morning even though there is no power cut. What should I do?
            </div>
          </div>
        </div>

        {/* Support Message */}
        <div className="flex gap-4 max-w-3xl flex-row-reverse self-end ml-auto">
          <div className="h-10 w-10 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0">
            SB
          </div>
          <div className="space-y-1 flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> 1 hour ago</span>
              <span className="font-semibold text-sm text-slate-900">SB Support Team</span>
            </div>
            <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none text-sm">
              Hello! We apologize for the inconvenience. A continuous beep usually indicates an overload or a battery fault. Could you please check if the load on the inverter exceeds its capacity? If not, we will arrange a technician visit.
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-4 max-w-3xl">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900">You</span>
              <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> Just now</span>
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 text-slate-700 text-sm">
              No, the load is normal (just a few fans and lights). Please arrange a technician visit.
            </div>
          </div>
        </div>

      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-slate-100 p-4 shrink-0">
        {id === '2' ? (
          <div className="text-center p-3 bg-slate-50 rounded-lg text-slate-500 text-sm">
            This ticket is closed. You cannot reply to this conversation.
          </div>
        ) : (
          <form className="flex gap-3 items-center">
            <input 
              type="text" 
              placeholder="Type your message here..." 
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <button type="submit" className="h-12 w-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0 shadow-sm">
              <Send className="h-5 w-5 ml-1" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

export default TicketChat;
