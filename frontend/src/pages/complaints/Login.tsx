import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  LogIn, 
  AlertCircle, 
  ShieldCheck, 
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { authApi } from '../../services/api';

const ComplaintLogin = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'customer';
  const [loginRole, setLoginRole] = useState<'customer' | 'admin'>(initialRole);

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (role: 'customer' | 'admin') => {
    setLoginRole(role);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Direct Real Database Authentication via API
      const res = await authApi.login({
        email: cleanEmail,
        password,
        role: loginRole,
      });

      if (res.success && res.user) {
        localStorage.setItem('sb_auth_token', res.token || 'active_authenticated_session');
        localStorage.setItem('sb_user_role', res.user?.role || loginRole);
        localStorage.setItem('sb_user_email', res.user?.email || cleanEmail);
        if (res.user?.name) {
          localStorage.setItem('sb_user_name', res.user.name);
        }

        if (loginRole === 'admin' || res.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/portal/dashboard');
        }
        return;
      } else {
        setError(res.message || 'Login failed. Please verify your credentials.');
      }
    } catch (apiError: any) {
      console.error('[DB LOGIN ERROR]', apiError);
      setError(apiError?.message || `Database login failed for ${loginRole === 'admin' ? 'Admin' : 'Customer'} portal.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[300px] bg-slate-200/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="text-center">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {loginRole === 'customer' ? 'Customer Portal Login' : 'Admin Control Center'}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
              Sign in with your registered account credentials to access your dashboard.
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
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3.5">
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  ) : (
                    <LogIn className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
                  )}
                </span>
                {isLoading ? 'Verifying Credentials...' : `Sign In to ${loginRole === 'admin' ? 'Admin Panel' : 'Customer Portal'}`}
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComplaintLogin;
