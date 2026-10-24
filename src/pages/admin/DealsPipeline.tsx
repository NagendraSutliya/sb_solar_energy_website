import React, { useState, useEffect } from 'react';
import { Plus, ChevronDown, MoveRight, CheckCircle2 } from 'lucide-react';
import { 
  getStoredDeals, 
  saveStoredDeals, 
  STAGE_CONFIG, 
  OWNERS,
  type Deal 
} from '../../data/crmData';
import { NewDealModal } from '../../components/admin/NewDealModal';

const DealsPipeline: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<string>('All owners');
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);
  const [isNewDealOpen, setIsNewDealOpen] = useState(false);
  const [activeStageForNewDeal, setActiveStageForNewDeal] = useState<Deal['stage']>('qualified');
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

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

  // Filter deals based on selected owner
  const filteredDeals = selectedOwner === 'All owners'
    ? deals
    : deals.filter((d) => d.owner.toLowerCase() === selectedOwner.toLowerCase());

  // Move deal to next stage
  const handleMoveStage = (dealId: string, nextStage: Deal['stage']) => {
    const updated = deals.map((d) => 
      d.id === dealId ? { ...d, stage: nextStage } : d
    );
    setDeals(updated);
    saveStoredDeals(updated);
  };

  // Drag and drop handlers
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

  const getTagBadgeStyle = (tag: string, tagColor?: Deal['tagColor']) => {
    switch (tag.toLowerCase()) {
      case 'call thu':
        return 'bg-[#edf2fe] text-[#3b5998]';
      case 'new':
        return 'bg-[#f0edfe] text-[#6366f1]';
      case 'follow up':
        return 'bg-[#fef3c7] text-[#b45309]';
      case 'viewed':
        return 'bg-[#e0f2fe] text-[#0284c7]';
      case 'discount ask':
        return 'bg-[#ffedd5] text-[#c2410c]';
      case 'contract out':
      case 'verbal yes':
        return 'bg-[#dcfce7] text-[#16a34a]';
      default:
        if (tagColor === 'purple') return 'bg-[#f0edfe] text-[#6366f1]';
        if (tagColor === 'amber') return 'bg-[#fef3c7] text-[#b45309]';
        if (tagColor === 'orange') return 'bg-[#ffedd5] text-[#c2410c]';
        if (tagColor === 'blue') return 'bg-[#e0f2fe] text-[#0284c7]';
        if (tagColor === 'emerald') return 'bg-[#dcfce7] text-[#16a34a]';
        return 'bg-[#edf2fe] text-[#3b5998]';
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans" onClick={() => setIsOwnerDropdownOpen(false)}>
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Deals pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            64 open deals · ₹52.8L total value
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Owner Filter Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
            >
              <span>{selectedOwner}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isOwnerDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95">
                {OWNERS.map((owner) => (
                  <button
                    key={owner}
                    type="button"
                    onClick={() => {
                      setSelectedOwner(owner);
                      setIsOwnerDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                      selectedOwner === owner
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{owner}</span>
                    {selectedOwner === owner && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* + New deal button */}
          <button
            type="button"
            onClick={() => {
              setActiveStageForNewDeal('qualified');
              setIsNewDealOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#2f5bf8] hover:bg-[#254edb] active:scale-[0.98] text-white rounded-xl text-sm font-medium shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New deal
          </button>
        </div>
      </div>

      {/* 4 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-start">
        {STAGE_CONFIG.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage.id);

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage.id as Deal['stage'])}
              className="bg-[#edf2f7]/80 rounded-2xl p-3.5 flex flex-col gap-3 min-h-[580px] border border-slate-200/40"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1.5 py-1">
                <h3 className="font-bold text-slate-800 text-sm">
                  {stage.label}
                </h3>
                <span className="text-slate-400 font-semibold text-sm">
                  {stage.count}
                </span>
              </div>

              {/* Deals List */}
              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal.id)}
                    className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-100 hover:shadow-md hover:border-slate-200/80 transition-all cursor-grab active:cursor-grabbing group relative"
                  >
                    {/* Customer Name */}
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {deal.customer}
                    </h4>

                    {/* Subtitle / Project Type */}
                    <p className="text-xs text-slate-500 mt-0.5">
                      {deal.projectType}
                    </p>

                    {/* Amount */}
                    <div className="text-base font-bold text-slate-900 mt-2.5">
                      ₹{deal.value.toLocaleString('en-IN')}
                    </div>

                    {/* Bottom Row: Tag Badge & Quick Stage Action */}
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTagBadgeStyle(
                          deal.tag,
                          deal.tagColor
                        )}`}
                      >
                        {deal.tag}
                      </span>

                      {/* Stage advancement shortcut on hover */}
                      {stage.id !== 'closing' && (
                        <button
                          type="button"
                          title="Move to next stage"
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextStageMap: Record<Deal['stage'], Deal['stage']> = {
                              qualified: 'proposal_sent',
                              proposal_sent: 'negotiation',
                              negotiation: 'closing',
                              closing: 'closing',
                            };
                            handleMoveStage(deal.id, nextStageMap[deal.stage]);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 p-1 rounded-md hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          <MoveRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Empty State / Drop target visual if empty */}
                {stageDeals.length === 0 && (
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
