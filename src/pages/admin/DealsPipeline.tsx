import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { 
  getStoredDeals, 
  saveStoredDeals, 
  type Deal 
} from '../../data/crmData';
import { NewDealModal } from '../../components/admin/NewDealModal';

interface KanbanColumn {
  id: Deal['stage'];
  label: string;
  count: number;
}

const DealsPipeline: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [activeStageForNewDeal, setActiveStageForNewDeal] = useState<Deal['stage']>('qualified');
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  const columns: KanbanColumn[] = [
    { id: 'qualified', label: 'Qualified', count: 24 },
    { id: 'proposal_sent', label: 'Proposal', count: 18 },
    { id: 'negotiation', label: 'Negotiation', count: 14 },
    { id: 'closing', label: 'Closing', count: 8 },
  ];

  useEffect(() => {
    const loadDeals = () => {
      setDeals(getStoredDeals());
    };

    loadDeals();
    window.addEventListener('sb-crm-deals-updated', loadDeals);
    return () => {
      window.removeEventListener('sb-crm-deals-updated', loadDeals);
    };
  }, []);

  const filteredDeals = deals.filter(
    (d) =>
      d.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.projectType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoveStage = (dealId: string, nextStage: Deal['stage']) => {
    const updated = deals.map((d) => 
      d.id === dealId ? { ...d, stage: nextStage } : d
    );
    setDeals(updated);
    saveStoredDeals(updated);
  };

  const handleDragStart = (dealId: string) => {
    setDraggedDealId(dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStage: Deal['stage']) => {
    if (!draggedDealId) return;
    handleMoveStage(draggedDealId, targetStage);
    setDraggedDealId(null);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Deals
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            64 open · ₹52.8L value
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 w-56 sm:w-64 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />

          <button
            type="button"
            onClick={() => {
              setActiveStageForNewDeal('qualified');
              setIsNewDealOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#f59e0b] hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-bold rounded-xl text-sm shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New deal
          </button>
        </div>
      </div>

      {/* 4 Kanban Columns matching Deals.png */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-start">
        {columns.map((column) => {
          const columnDeals = filteredDeals.filter((d) => d.stage === column.id);

          return (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              className="bg-[#edf2f7]/80 rounded-2xl p-3.5 flex flex-col gap-3 min-h-[580px] border border-slate-200/50"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-2 py-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  {column.label}
                </h3>
                <span className="text-slate-400 font-semibold text-sm">
                  {column.count}
                </span>
              </div>

              {/* Deals Cards */}
              <div className="space-y-3">
                {columnDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal.id)}
                    className="bg-white rounded-2xl p-4 shadow-2xs border border-transparent hover:border-slate-200/80 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                      {deal.customer}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1">
                      {deal.projectType}
                    </p>

                    <div className="text-base font-bold text-slate-900 mt-2.5">
                      ₹{deal.value.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}

                {columnDeals.length === 0 && (
                  <div className="h-28 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400">
                    Drop deals here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Deal Modal */}
      <NewDealModal
        isOpen={isNewDealOpen}
        defaultStage={activeStageForNewDeal}
        onClose={() => setIsNewDealOpen(false)}
        onDealAdded={() => setDeals(getStoredDeals())}
      />
    </div>
  );
};

export default DealsPipeline;
