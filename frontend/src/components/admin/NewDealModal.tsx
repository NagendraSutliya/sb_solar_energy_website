import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { getStoredDeals, saveStoredDeals, type Deal } from '../../data/crmData';

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStage?: 'qualified' | 'proposal_sent' | 'negotiation' | 'closing';
  onDealAdded?: (newDeal: Deal) => void;
}

export const NewDealModal: React.FC<NewDealModalProps> = ({
  isOpen,
  onClose,
  defaultStage = 'qualified',
  onDealAdded,
}) => {
  const [customer, setCustomer] = useState('');
  const [projectType, setProjectType] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState<'qualified' | 'proposal_sent' | 'negotiation' | 'closing'>(defaultStage);
  const [owner, setOwner] = useState('Rahul');
  const [tag, setTag] = useState('New');
  const [tagColor, setTagColor] = useState<Deal['tagColor']>('purple');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !value) return;

    const numValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 150000;

    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      name: customer.trim(),
      customer: customer.trim(),
      projectType: projectType.trim() || 'Rooftop solar, 5 kW',
      value: numValue,
      stage,
      tag: tag.trim() || 'New',
      tagColor,
      owner,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const currentDeals = getStoredDeals();
    const updated = [newDeal, ...currentDeals];
    saveStoredDeals(updated);

    if (onDealAdded) {
      onDealAdded(newDeal);
    }

    onClose();
    // Reset form
    setCustomer('');
    setProjectType('');
    setValue('');
    setTag('New');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#f59e0b] flex items-center justify-center text-slate-950 font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Create New Deal / Lead</h3>
              <p className="text-xs text-slate-500">Add a new solar lead directly into your pipeline</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Customer Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma, Sunita Patel"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Project / Capacity
              </label>
              <input
                type="text"
                placeholder="e.g. Rooftop solar, 5 kW"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Deal Value (₹) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 250000"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Pipeline Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="qualified">Qualified</option>
                <option value="proposal_sent">Proposal sent</option>
                <option value="negotiation">Negotiation</option>
                <option value="closing">Closing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Deal Owner
              </label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="Rahul">Rahul</option>
                <option value="Neha">Neha</option>
                <option value="Aman">Aman</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Status Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Call Thu, Follow up, New"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Tag Badge Color
              </label>
              <select
                value={tagColor}
                onChange={(e) => setTagColor(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="purple">Purple (New)</option>
                <option value="indigo">Indigo (Call)</option>
                <option value="amber">Amber (Follow up)</option>
                <option value="orange">Orange (Discount)</option>
                <option value="blue">Blue (Viewed)</option>
                <option value="emerald">Emerald (Closing / Contract)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-bold text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
