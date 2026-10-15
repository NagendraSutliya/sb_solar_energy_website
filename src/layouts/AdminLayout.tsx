import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, Settings, Users, LogOut, ShieldAlert, Store } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Vendor Partners', path: '/admin/vendors', icon: Store },
    { name: 'WhatsApp Bot', path: '/admin/whatsapp', icon: MessageCircle },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-950 text-white flex flex-col hidden md:flex fixed h-full z-20">
        <div className="p-6 flex items-center justify-center border-b border-indigo-900/50">
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              <ShieldAlert className="text-rose-500 h-6 w-6" /> Admin Panel
            </span>
            <span className="text-xs text-indigo-300 mt-1">SB Solar Energy</span>
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
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                    : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-indigo-900/50">
          <button 
            type="button"
            onClick={() => {
              localStorage.removeItem('sb_auth_token');
              localStorage.removeItem('sb_user_role');
              localStorage.removeItem('sb_user_email');
              window.location.href = '/';
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-indigo-200 hover:bg-indigo-900 hover:text-white transition-all w-full cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Exit / Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Top Header for Admin */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <h2 className="font-semibold text-slate-800">Admin Control Center</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Super Admin</span>
            <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
