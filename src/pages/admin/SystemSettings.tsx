import React, { useState } from 'react';
import { Check } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'General' | 'Notifications' | 'Integrations'>('General');
  const [companyName, setCompanyName] = useState('SB Solar Energy');
  const [supportPhone, setSupportPhone] = useState('+91 70232 04464');
  const [email, setEmail] = useState('hello@sbsolar.com');
  const [defaultState, setDefaultState] = useState('Rajasthan');

  // Notifications states matching Settings.png
  const [notifyLead, setNotifyLead] = useState(true);
  const [notifyVendor, setNotifyVendor] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your workspace
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-56 sm:w-64 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            Save changes
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl animate-in fade-in">
          ✓ Changes saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200 text-sm font-medium">
        {(['General', 'Notifications', 'Integrations'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 transition-all cursor-pointer ${
              activeTab === tab
                ? 'border-b-2 border-[#f59e0b] text-slate-900 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Fields Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Company name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Support phone
            </label>
            <input
              type="text"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Default state
            </label>
            <input
              type="text"
              value={defaultState}
              onChange={(e) => setDefaultState(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-6">
          Notifications
        </h2>

        <div className="divide-y divide-slate-100">
          <div
            onClick={() => setNotifyLead(!notifyLead)}
            className="py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
          >
            <span className="text-sm font-medium text-slate-800">
              Email me on new lead
            </span>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                notifyLead
                  ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 font-bold'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {notifyLead && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          <div
            onClick={() => setNotifyVendor(!notifyVendor)}
            className="py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
          >
            <span className="text-sm font-medium text-slate-800">
              WhatsApp alerts for vendors
            </span>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                notifyVendor
                  ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 font-bold'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {notifyVendor && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          <div
            onClick={() => setWeeklyReport(!weeklyReport)}
            className="py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
          >
            <span className="text-sm font-medium text-slate-800">
              Weekly report
            </span>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                weeklyReport
                  ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 font-bold'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {weeklyReport && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
