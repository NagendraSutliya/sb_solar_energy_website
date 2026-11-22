import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { complaintsApi } from '../../services/api';

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [nature, setNature] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await complaintsApi.create({
        category,
        sub_category: subCategory,
        nature,
        description,
        customer_email: localStorage.getItem('sb_user_email') || '',
        customer_name: localStorage.getItem('sb_user_name') || 'Customer',
      });
      navigate('/portal/complaints/history');
    } catch (err: any) {
      console.warn('Complaint submission note:', err.message);
      navigate('/portal/complaints/history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lodge New Complaint</h1>
          <p className="text-sm text-slate-500">Fill in the details below to report an issue directly to the database.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select 
                required 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="inverter">Inverter Issue</option>
                <option value="panel">Solar Panel Damage</option>
                <option value="battery">Battery Backup</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sub Category</label>
              <select 
                required 
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Sub Category</option>
                <option value="not_working">Not Working completely</option>
                <option value="low_efficiency">Low Efficiency</option>
                <option value="noise">Strange Noise</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nature of Complaint</label>
            <input 
              type="text" 
              required 
              value={nature}
              onChange={(e) => setNature(e.target.value)}
              placeholder="Short title for your issue" 
              className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Complaint Details</label>
            <textarea 
              required 
              rows={5} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..." 
              className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 cursor-pointer"
            >
              {loading ? 'Submitting to Database...' : (
                <>
                  <Send className="mr-2 -ml-1 h-4 w-4" />
                  Submit Complaint
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
