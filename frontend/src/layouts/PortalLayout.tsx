import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Zap, LogOut, ShieldCheck } from 'lucide-react';

const PortalLayout = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
    { name: 'Support Center', path: '/portal/support', icon: MessageSquare },
    { name: 'Energy System', path: '/portal/energy', icon: Zap },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 flex items-center justify-center border-b border-slate-800">
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="text-primary h-6 w-6" /> Customer Portal
            </span>
            <span className="text-xs text-slate-400 mt-1">SB Solar Energy</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button 
            type="button"
            onClick={() => {
              localStorage.removeItem('sb_auth_token');
              localStorage.removeItem('sb_user_role');
              localStorage.removeItem('sb_user_email');
              window.location.href = '/';
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all w-full cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Exit / Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        <div className="p-4 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PortalLayout;
