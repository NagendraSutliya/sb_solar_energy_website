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
  ShieldCheck, 
  LogOut, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Main CRM Navigation items matching Dashboard v2
  const mainNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/admin/leads', icon: Filter, badge: '128' },
    { name: 'Deals', path: '/admin/deals', icon: Briefcase, badge: '64' },
    { name: 'Contacts', path: '/admin/contacts', icon: Users },
    { name: 'Tasks', path: '/admin/tasks', icon: CheckSquare, badge: '3' },
  ];

  // Manage Navigation items matching requirements screenshots
  const manageNavItems = [
    { name: 'Vendors', path: '/admin/vendors', icon: Store },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Users & roles', path: '/admin/users', icon: ShieldCheck },
    { name: 'Settings', path: '/admin/settings', icon: Sliders },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sb_auth_token');
    localStorage.removeItem('sb_user_role');
    localStorage.removeItem('sb_user_email');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex bg-[#f4f6fa] font-sans text-slate-800">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0c1222] border-b border-slate-800/80 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
            <img 
              src="/sb_logo.png" 
              alt="SB Solar Energy" 
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-heading font-extrabold text-white text-sm tracking-tight leading-tight">
            SB SOLAR <span className="text-amber-400">ENERGY</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Dark Navy Theme */}
      <aside 
        className={`w-64 bg-[#0c1222] text-slate-200 border-r border-slate-800/60 flex flex-col fixed h-full z-50 transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between bg-[#2a423c] rounded-lg border-b border-slate-800/80 shadow-2xs">
          <Link 
            to="/admin/dashboard" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <img 
                src="/sb_logo.png" 
                alt="SB Solar Energy" 
                className="h-full w-full object-contain group-hover:scale-105"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm tracking-tight text-white block leading-tight">
                SB SOLAR <span className="text-amber-400">ENERGY</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
                Admin Panel
              </span>
            </div>
          </Link>
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* MAIN SECTION */}
          <div>
            <span className="px-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Main
            </span>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                      isActive
                        ? 'bg-[#f59e0b] text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold transition-colors ${
                          isActive
                            ? 'bg-slate-950/20 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* MANAGE SECTION */}
          <div>
            <span className="px-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Manage
            </span>
            <nav className="space-y-1">
              {manageNavItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                      isActive
                        ? 'bg-[#f59e0b] text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer / User Profile matching Dashboard.png bottom left card */}
        <div className="p-4 bg-[#0c1222]">
          <div className="bg-[#141d33] rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-slate-950 flex items-center justify-center font-extrabold text-md shadow-xs shrink-0">
                R
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white leading-tight">Rahul</p>
                <p className="text-xs text-slate-400">Admin</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                to="/"
                title="View Website"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Full Canvas Width on Cool Gray Background */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen pt-16 md:pt-0 bg-[#f4f6fa]">
        <div className="p-6 md:p-8 lg:p-10 w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
