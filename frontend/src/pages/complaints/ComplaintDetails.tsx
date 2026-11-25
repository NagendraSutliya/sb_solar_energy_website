import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';
import { complaintsApi } from '../../services/api';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    complaintsApi.getAll()
      .then((res) => {
        if (res.success && res.data) {
          const match = res.data.find((c: any) => 
            String(c.id) === String(id) || 
            (c.complaint_no && c.complaint_no.replace('CMP-', '') === String(id)) ||
            c.complaint_no === id
          );
          if (match) setComplaint(match);
        }
      })
      .catch((err) => console.warn('Complaint details fetch error:', err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const displayNo = complaint?.complaint_no || `#CMP-${id}`;
  const nature = complaint?.nature || 'Inverter Beeping Issue';
  const category = complaint?.category || 'Inverter';
  const subCategory = complaint?.sub_category || 'General';
  const description = complaint?.description || 'No detailed notes provided.';
  const status = complaint?.status || 'Not Process Yet';
  const regDate = complaint?.created_at ? new Date(complaint.created_at).toLocaleDateString() : 'Recent';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Complaint {displayNo}</h1>
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
                <span className="text-base text-slate-900 font-semibold">{nature}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-medium text-slate-500 uppercase">Category</span>
                  <span className="text-sm text-slate-900 font-medium">{category}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-500 uppercase">Sub Category</span>
                  <span className="text-sm text-slate-900 font-medium">{subCategory}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase">Description</span>
                <p className="text-sm text-slate-700 mt-1 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" /> Remarks & Admin Updates
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                  A
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">SB Solar Support Team</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" /> {regDate}</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    {status === 'Closed' 
                      ? 'This complaint has been verified and resolved by our engineering team.'
                      : status === 'In Process'
                      ? 'Our technical support team is working on your complaint and will contact you shortly.'
                      : 'We have received your complaint in our system. A technician is being assigned.'}
                  </p>
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
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  status === 'Closed'
                    ? 'bg-emerald-100 text-emerald-600'
                    : status === 'In Process'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-amber-100 text-amber-600'
                }`}>
                  {status === 'Closed' ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-900">{status}</span>
                  <span className="text-xs text-slate-500">
                    {status === 'Closed' ? 'Resolved successfully' : status === 'In Process' ? 'Under active resolution' : 'Awaiting assignment'}
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                Registered on: {regDate}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplaintDetails;
