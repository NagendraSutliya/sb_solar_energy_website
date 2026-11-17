import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  LogIn, 
  AlertCircle, 
  ShieldCheck, 
  KeyRound, 
  ArrowLeft, 
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const ComplaintLogin = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'customer';
  const [loginRole, setLoginRole] = useState<'customer' | 'admin'>(initialRole);
  
  // Show dev login if ?dev=true is in URL or when developer link is clicked
  const [showDevLogin, setShowDevLogin] = useState(searchParams.get('dev') === 'true');

  useEffect(() => {
    if (searchParams.get('role') === 'admin') {
      setLoginRole('admin');
    } else if (searchParams.get('role') === 'customer') {
      setLoginRole('customer');
    }
  }, [searchParams]);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded secure credentials for demo / internal development access
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[300px] bg-slate-200/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        {!showDevLogin ? (
          /* ========================================================== */
          /* 1. CLEAN & ELEGANT "COMING SOON" VIEW FOR LIVE VISITORS   */
          /* ========================================================== */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/80 text-center space-y-6"
          >
            {/* Animated Icon Badge */}
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shadow-sm">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </div>
              </motion.div>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide uppercase border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Under Development</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {loginRole === 'admin' ? 'Admin & Staff Portal' : 'Customer Portal'}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                We are building a seamless digital experience to help you track solar installations, raise service tickets, and manage systems with ease.
              </p>
            </div>

            {/* Role indicator pill */}
            <div className="py-2 px-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Selected Option:</span>
              <span className="font-semibold text-slate-800 capitalize">
                {loginRole === 'admin' ? 'Admin / Staff Login' : 'Customer Login'}
              </span>
            </div>

            {/* CTA Buttons */}
            {/* <div className="space-y-3 pt-2">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Link>

              <a
                href="https://wa.me/917023204664?text=Hello%20SB%20Solar%20Energy,%20I%20need%20assistance%20regarding%20portal%20access."
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-slate-600" />
                <span>Contact Support on WhatsApp</span>
              </a>
            </div> */}

            {/* Back to Website */}
            <div className="pt-2">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Website</span>
              </Link>
            </div>

            {/* Discreet Developer / Staff Access Toggle */}
            {/* <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowDevLogin(true)}
                className="text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Internal Staff &amp; Developer Access</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div> */}
          </motion.div>
        ) : (
          /* ========================================================== */
          /* 2. WORKING LOGIN FORM FOR INTERNAL DEVELOPMENT & TESTING   */
          /* ========================================================== */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
          >
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setShowDevLogin(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Coming Soon View</span>
              </button>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Dev Mode
              </span>
            </div>

            <div className="text-center">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {loginRole === 'customer' ? 'Customer Portal Login' : 'Admin Control Center'}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                Internal development access. Enter credentials to test CRM and dashboards.
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
            
            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                  Dev Only
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
        )}
      </div>
    </div>
  );
};

export default ComplaintLogin;
