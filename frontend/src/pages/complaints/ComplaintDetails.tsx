import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageCircle, FileText } from 'lucide-react';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Complaint #CMP-{id}</h1>
          <p className="text-sm text-slate-500">Details and status updates for your complaint.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-4">Complaint Information</h2>
            
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase">Nature of Complaint</span>
                <span className="text-base text-slate-900 font-medium">Inverter Beeping Issue</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-medium text-slate-500 uppercase">Category</span>
                  <span className="text-sm text-slate-900">Inverter</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-500 uppercase">Sub Category</span>
                  <span className="text-sm text-slate-900">Strange Noise</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase">Description</span>
                <p className="text-sm text-slate-700 mt-1 bg-slate-50 p-4 rounded-lg">
                  Since yesterday morning, the inverter is making a continuous beeping sound even when the battery is fully charged and grid power is available. Please send a technician.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" /> Remarks & Updates
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">Admin</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> Oct 25, 2026 - 10:30 AM</span>
                  </div>
                  <p className="text-sm text-slate-700">We have received your complaint. A technician will be assigned shortly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Current Status</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-900">Not Process Yet</span>
                  <span className="text-xs text-slate-500">Awaiting technician assignment</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                Registered on: Oct 24, 2026
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Attached Files</h2>
            <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
              <FileText className="h-6 w-6 text-slate-400" />
              <div className="flex-1 overflow-hidden">
                <span className="block text-sm font-medium text-slate-700 truncate">error_image.jpg</span>
                <span className="text-xs text-slate-500">2.4 MB</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplaintDetails;
