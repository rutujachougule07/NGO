import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  X,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLoginPage() {
  const { isAdminAuthenticated, loginAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@immenselife.org');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // If already authenticated, redirect to /admin or previous intended route
  useEffect(() => {
    if (isAdminAuthenticated) {
      const target = location.state?.from?.pathname || '/admin';
      navigate(target, { replace: true });
    }
  }, [isAdminAuthenticated, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const result = loginAdmin({ email, password });
      setIsLoading(false);
      if (result.success) {
        const target = location.state?.from?.pathname || '/admin';
        navigate(target, { replace: true });
      } else {
        setErrorMsg(result.message || 'Invalid admin credentials.');
      }
    }, 350);
  };

  const handleQuickFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between font-sans selection:bg-[#E87A1E] selection:text-white relative">
      
      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-stone-200 shadow-xl text-center space-y-3 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-[#E87A1E] flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Reset Admin Password</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Administrative credentials are managed under Indian Trusts Act compliance. To reset your security keys, please contact the <strong>Super Admin (Dr. Arvind Swaminathan)</strong> or use the standard demo key:
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-700 font-mono text-center">
              admin@immenselife.org / admin123
            </div>
            <button
              onClick={() => {
                handleQuickFill('admin@immenselife.org', 'admin123');
                setShowForgotModal(false);
              }}
              className="w-full py-2 bg-[#E87A1E] hover:bg-[#D2640C] text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Autofill Default Credentials
            </button>
            <button
              onClick={() => setShowForgotModal(false)}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium block mx-auto cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Center Login Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-[430px] bg-white rounded-2xl border border-stone-200/80 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(0,0,0,0.03)] p-7 sm:p-9 text-center">
          
          {/* Circular Brand Icon */}
          <div className="w-14 h-14 mx-auto rounded-full bg-[#E87A1E] flex items-center justify-center shadow-sm">
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7 text-white fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
            >
              {/* Sprouting leaf / lotus seva emblem matching Foundation branding */}
              <path d="M12 22v-9" />
              <path d="M12 13c-3-3-4-7-1-10 3 3 2 7 1 10z" />
              <path d="M12 15c-3-2-6-1-7 2 2 1 6 0 7-2z" />
              <path d="M12 15c3-2 6-1 7 2-2 1-6 0-7-2z" />
            </svg>
          </div>

          {/* Foundation Brand Text */}
          <div className="mt-3.5">
            <h2 className="font-serif font-black text-xl text-[#381602] tracking-tight leading-none">
              Immense Life
            </h2>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#E87A1E] font-black block mt-1">
              FOUNDATION
            </span>
          </div>

          {/* Heading and Subtitle */}
          <div className="mt-5">
            <h1 className="font-serif font-bold text-2xl text-[#2E1605]">
              Admin Login
            </h1>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed max-w-[320px] mx-auto">
              Access your admin console to manage and oversee foundation activities.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span className="flex-1 font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Official Email or Admin ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Enter your email or admin ID"
                  required
                  className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#E87A1E] focus:ring-2 focus:ring-[#E87A1E]/15 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#E87A1E] focus:ring-2 focus:ring-[#E87A1E]/15 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-[#E87A1E] focus:ring-[#E87A1E] accent-[#E87A1E] cursor-pointer"
                />
                <span className="text-xs text-stone-600 font-normal">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-semibold text-[#E87A1E] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-[#E87A1E] hover:bg-[#D2640C] active:bg-[#B85205] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pill Note */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1 text-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-[#E87A1E]" />
              <span>Demo login:</span>
            </span>
            <button
              type="button"
              onClick={() => handleQuickFill('admin@immenselife.org', 'admin123')}
              className="font-mono text-[#E87A1E] hover:underline font-medium cursor-pointer"
            >
              admin@immenselife.org
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Footer Back Link */}
      <div className="pb-4 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#381602] font-medium transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Website</span>
        </Link>
      </div>

    </div>
  );
}
