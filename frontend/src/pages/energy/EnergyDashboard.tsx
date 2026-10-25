import { Zap, Sun, Battery, Activity } from 'lucide-react';

const DashboardMetric = ({ title, value, unit, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">
        {value} <span className="text-lg text-slate-400 font-medium">{unit}</span>
      </h3>
    </div>
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
  </div>
);

const EnergyDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sun className="h-6 w-6 text-amber-500" /> Energy Portal
            </h1>
            <p className="text-sm text-slate-500 mt-1">Monitor your solar energy production and consumption in real-time.</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-lg text-emerald-700 font-medium border border-emerald-200">
            <Activity className="h-5 w-5" />
            System Online
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardMetric title="Current Generation" value="4.2" unit="kW" icon={Zap} color="bg-amber-500" />
          <DashboardMetric title="Total Yield Today" value="28.5" unit="kWh" icon={Sun} color="bg-blue-500" />
          <DashboardMetric title="Battery Status" value="85" unit="%" icon={Battery} color="bg-emerald-500" />
          <DashboardMetric title="Grid Feed-in" value="1.1" unit="kW" icon={Activity} color="bg-purple-500" />
        </div>

        {/* Chart Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-800 mb-6">Power Generation Chart</h2>
          
          <div className="h-64 w-full bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 flex-col gap-3">
            <Activity className="h-10 w-10 text-slate-300" />
            <p>Connect database/API to load actual generation data graph</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnergyDashboard;
