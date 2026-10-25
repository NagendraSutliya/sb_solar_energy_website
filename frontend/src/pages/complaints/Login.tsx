import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, ShieldCheck, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

const ComplaintLogin = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') === 'admin') ? 'admin' : 'customer';
  const [loginRole, setLoginRole] = useState<'customer' | 'admin'>(initialRole);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded secure credentials for demo / restricted access
  const CREDENTIALS = {
    admin: {
      email: 'admin@sbsolar.com',
      password: 'admin#123'
    },
    customer: {
      email: 'customer@sbsolar.com',
      password: 'customer#123'
    }
  };

  const handleRoleChange = (role: 'customer' | 'admin') => {
    setLoginRole(role);
    setError('');
  };

  const handleAutoFill = (role: 'customer' | 'admin') => {
    setLoginRole(role);
    setEmail(CREDENTIALS[role].email);
    setPassword(CREDENTIALS[role].password);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const targetCreds = CREDENTIALS[loginRole];

    if (email.trim().toLowerCase() === targetCreds.email.toLowerCase() && password === targetCreds.password) {
      // Set auth in localStorage
      localStorage.setItem('sb_auth_token', 'active_authenticated_session');
      localStorage.setItem('sb_user_role', loginRole);
      localStorage.setItem('sb_user_email', email);

      if (loginRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/portal/dashboard');
      }
    } else {
      setError(`Invalid credentials for ${loginRole === 'admin' ? 'Admin' : 'Customer'} portal. Please check email and password.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-6 bg-white p-8 md:p-10 rounded-3xl shadow-xl z-10 border border-slate-100"
      >
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {loginRole === 'customer' ? 'Customer Portal Login' : 'Admin Control Center'}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            Protected live access. Enter authorized credentials to proceed.
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => handleRoleChange('customer')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              loginRole === 'customer' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer Portal
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              loginRole === 'admin' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin / Staff
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Access Denied:</strong> {error}
            </div>
          </div>
        )}
        
        <form className="mt-6 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm bg-slate-50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm bg-slate-50"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3.5">
                <LogIn className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
              </span>
              Sign In to {loginRole === 'admin' ? 'Admin Panel' : 'Customer Portal'}
            </button>
          </div>
        </form>

        {/* Demo Quick-Fill Credentials Helper Box */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between text-slate-700 font-bold">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-500" /> Authorized Demo Credentials
            </span>
            <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              Live Protection Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleAutoFill('admin')}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-left transition-all cursor-pointer"
            >
              <div className="font-bold text-slate-800 text-[11px]">🔐 Admin Role</div>
              <div className="text-[10px] text-slate-500 truncate">admin@sbsolar.com</div>
              <div className="text-[10px] text-primary font-semibold mt-0.5">Click to Fill</div>
            </button>

            <button
              type="button"
              onClick={() => handleAutoFill('customer')}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-left transition-all cursor-pointer"
            >
              <div className="font-bold text-slate-800 text-[11px]">👤 Customer Role</div>
              <div className="text-[10px] text-slate-500 truncate">customer@sbsolar.com</div>
              <div className="text-[10px] text-primary font-semibold mt-0.5">Click to Fill</div>
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            ← Return to Main Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplaintLogin;
