import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Filter, 
  Briefcase, 
  CheckSquare, 
  BarChart3, 
  Sliders, 
  Store, 
  MessageCircle, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Main CRM Navigation items matching the reference mockups
  const crmNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Contacts', path: '/admin/contacts', icon: Users },
    { name: 'Leads', path: '/admin/leads', icon: Filter },
    { name: 'Deals', path: '/admin/deals', icon: Briefcase },
    { name: 'Tasks', path: '/admin/tasks', icon: CheckSquare },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Sliders },
  ];

  // Secondary Solar System Admin modules
  const solarAdminItems = [
    { name: 'Vendor Partners', path: '/admin/vendors', icon: Store },
    { name: 'WhatsApp Bot', path: '/admin/whatsapp', icon: MessageCircle },
    { name: 'User Management', path: '/admin/users', icon: ShieldCheck },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sb_auth_token');
    localStorage.removeItem('sb_user_role');
    localStorage.removeItem('sb_user_email');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans text-slate-800">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <img 
            src="/sb_logo.png" 
            alt="SB Solar Energy" 
            className="h-7 w-auto object-contain rounded"
          />
          <span className="font-heading font-extrabold text-slate-900 text-sm tracking-tight leading-tight">
            SB SOLAR <span className="text-primary">ENERGY</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - SB Solar Energy Admin */}
      <aside 
        className={`w-60 bg-white border-r border-slate-200/70 flex flex-col fixed h-full z-50 transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 pb-5 flex items-center justify-between border-b border-slate-100">
          <Link 
            to="/admin/dashboard" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/sb_logo.png" 
              alt="SB Solar Energy" 
              className="h-10 w-auto object-contain rounded-lg shadow-2xs group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-heading font-extrabold text-sm tracking-tight text-slate-900 block leading-tight">
                SB SOLAR <span className="text-primary">ENERGY</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
                Admin Panel
              </span>
            </div>
          </Link>
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
          {/* Main CRM Items */}
          <nav className="space-y-1">
            {crmNavItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#edf2fe] text-[#2f5bf8] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#2f5bf8]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* SB Solar System Admin Tools */}
          <div className="pt-2 border-t border-slate-100">
            <span className="px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Solar Operations
            </span>
            <nav className="space-y-1">
              {solarAdminItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#edf2fe] text-[#2f5bf8] font-semibold'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer / User Profile & Logout */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                R
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Rahul</p>
                <p className="text-[10px] text-slate-400">Super Admin</p>
              </div>
            </div>
            <Link
              to="/"
              title="Visit Public Website"
              className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-slate-100 hover:border-rose-100"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-60 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
