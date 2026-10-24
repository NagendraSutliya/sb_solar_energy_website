import React, { useState, useEffect } from 'react';
import { Plus, Search, Check } from 'lucide-react';
import { 
  getStoredTasks, 
  saveStoredTasks, 
  REVENUE_MONTHS, 
  STAGE_CONFIG, 
  type Task 
} from '../../data/crmData';
import { NewDealModal } from '../../components/admin/NewDealModal';

const AdminDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    const loadData = () => {
      setTasks(getStoredTasks());
    };

    loadData();
    window.addEventListener('sb-crm-tasks-updated', loadData);

    return () => {
      window.removeEventListener('sb-crm-tasks-updated', loadData);
    };
  }, []);

  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map((t) => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    saveStoredTasks(updated);
  };

  // 4 Top Deals displayed in the table matching the mockup
  const defaultTopDeals = [
    {
      initials: 'AS',
      initialsBg: 'bg-blue-100 text-blue-700',
      name: 'Aarav Sharma',
      stage: 'Closing',
      stageBadge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      value: '₹4,20,000',
      owner: 'Rahul',
    },
    {
      initials: 'PM',
      initialsBg: 'bg-purple-100 text-purple-700',
      name: 'Priya Mehta',
      stage: 'Negotiation',
      stageBadge: 'bg-amber-50 text-amber-700 border-amber-100',
      value: '₹3,10,000',
      owner: 'Neha',
    },
    {
      initials: 'VK',
      initialsBg: 'bg-indigo-100 text-indigo-700',
      name: 'Vikram Khanna',
      stage: 'Proposal sent',
      stageBadge: 'bg-blue-50 text-blue-700 border-blue-100',
      value: '₹2,75,000',
      owner: 'Rahul',
    },
    {
      initials: 'SR',
      initialsBg: 'bg-indigo-100 text-indigo-800',
      name: 'Sneha Rao',
      stage: 'Qualified',
      stageBadge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      value: '₹1,90,000',
      owner: 'Aman',
    },
  ];

  // Filter top deals if searching
  const filteredTopDeals = defaultTopDeals.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.stage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, Rahul
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here's what's happening with your pipeline today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search contacts, deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-60 sm:w-72 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsNewDealOpen(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#2f5bf8] hover:bg-[#254edb] active:scale-[0.98] text-white rounded-xl text-sm font-medium shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New deal
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Revenue (this month) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-sm transition-all">
          <span className="text-xs font-medium text-slate-500 block">
            Revenue (this month)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            ₹18.4L
          </div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>▲</span> 12.5% vs last month
          </div>
        </div>

        {/* Card 2: Open deals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-sm transition-all">
          <span className="text-xs font-medium text-slate-500 block">
            Open deals
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            64
          </div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>▲</span> 8 new this week
          </div>
        </div>

        {/* Card 3: Win rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-sm transition-all">
          <span className="text-xs font-medium text-slate-500 block">
            Win rate
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            32%
          </div>
          <div className="text-xs font-semibold text-rose-600 mt-2 flex items-center gap-1">
            <span>▼</span> 2.1% vs last month
          </div>
        </div>

        {/* Card 4: New leads */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-sm transition-all">
          <span className="text-xs font-medium text-slate-500 block">
            New leads
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            128
          </div>
          <div className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>▲</span> 18% vs last month
          </div>
        </div>
      </div>

      {/* Middle Row: Revenue Overview & Pipeline by Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Revenue overview (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Revenue overview
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Last 12 months
            </p>
          </div>

          {/* Bar Chart Container */}
          <div className="mt-8 pt-4">
            <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-3 px-1 sm:px-2">
              {REVENUE_MONTHS.map((item) => {
                const isHovered = activeTooltip === item.month;
                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                    onMouseEnter={() => setActiveTooltip(item.month)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {/* Floating Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-9 z-20 bg-slate-900 text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow-md whitespace-nowrap animate-in fade-in zoom-in-95">
                        {item.month}: {item.value}
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t-md sm:rounded-t-lg transition-all duration-300 ${
                        item.isCurrent
                          ? 'bg-[#2f5bf8] shadow-md shadow-blue-500/20 group-hover:bg-[#254edb]'
                          : 'bg-[#c5d5fb] group-hover:bg-[#b0c5fa]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between gap-1.5 sm:gap-3 px-1 sm:px-2 mt-3 text-xs text-slate-400 font-medium">
              {REVENUE_MONTHS.map((item) => (
                <div key={item.month} className="flex-1 text-center text-[11px] sm:text-xs">
                  {item.month}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pipeline by stage (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <h2 className="text-base font-bold text-slate-900 mb-2">
            Pipeline by stage
          </h2>

          <div className="space-y-5 my-auto py-2">
            {STAGE_CONFIG.map((stage) => (
              <div key={stage.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {stage.label}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {stage.count}
                  </span>
                </div>
                {/* Progress track */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#2f5bf8] h-full rounded-full transition-all duration-500"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Top deals & Today's tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Top deals Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs overflow-hidden">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Top deals
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 px-4">Stage</th>
                  <th className="pb-3 px-4">Value</th>
                  <th className="pb-3 pl-4">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {filteredTopDeals.map((deal, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    {/* Customer */}
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${deal.initialsBg}`}
                        >
                          {deal.initials}
                        </div>
                        <span className="font-medium text-slate-900 whitespace-nowrap">
                          {deal.name}
                        </span>
                      </div>
                    </td>

                    {/* Stage Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border ${deal.stageBadge}`}
                      >
                        {deal.stage}
                      </span>
                    </td>

                    {/* Value */}
                    <td className="py-3.5 px-4 font-medium text-slate-900 whitespace-nowrap">
                      {deal.value}
                    </td>

                    {/* Owner */}
                    <td className="py-3.5 pl-4 text-slate-600 whitespace-nowrap">
                      {deal.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Today's tasks (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Today's tasks
          </h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className="flex items-start gap-3.5 p-1 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                {/* Checkbox Box */}
                <div
                  className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                    task.completed
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium transition-all ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-800 group-hover:text-slate-900'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {task.time} · {task.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Deal Modal */}
      <NewDealModal
        isOpen={isNewDealOpen}
        onClose={() => setIsNewDealOpen(false)}
        onDealAdded={() => {}}
      />
    </div>
  );
};

export default AdminDashboard;
