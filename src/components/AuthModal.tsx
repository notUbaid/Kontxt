import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const supabase = await getSupabase();
      if (isForgotPassword) {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (resetError) throw resetError;
        setSuccessMsg('Check your email for the password reset link!');
      } else if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        onLogin();
        onClose();
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        onLogin();
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-background w-full max-w-md rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="font-black text-3xl tracking-tighter flex items-center justify-center select-none mb-2">
                  <span className="text-accent">Kon</span>
                  <span className="text-primary">txt</span>
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome back' : 'Create your account')}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {isForgotPassword ? 'Enter your email to receive a reset link' : (isLogin ? 'Sign in to access your projects' : 'Start building your context today')}
                </p>
              </div>

              {!isForgotPassword && (
                <>
                  <div className="space-y-4 mb-6">
                    <button 
                      onClick={() => handleOAuth('github')}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border-2 border-muted hover:bg-muted/50 transition-colors text-foreground font-medium"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      Continue with GitHub
                    </button>
                    <button 
                      onClick={() => handleOAuth('google')}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border-2 border-muted hover:bg-muted/50 transition-colors text-foreground font-medium"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238598)">
                          <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                          <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                          <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                          <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                        </g>
                      </svg>
                      Continue with Google
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 border-t border-muted"></div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Or continue with email</span>
                    <div className="flex-1 border-t border-muted"></div>
                  </div>
                </>
              )}

              {successMsg && (
                <div className="mb-6 p-3 bg-green-500/10 text-green-500 text-sm rounded-xl flex items-start gap-2 border border-green-500/20">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-3 bg-destructive/10 text-destructive text-sm rounded-xl flex items-start gap-2 border border-destructive/20">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-background border border-input rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground text-sm"
                      required
                    />
                  </div>
                </div>
                
                {!isForgotPassword && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-foreground">Password</label>
                      {isLogin && (
                        <button 
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-xs text-primary hover:text-accent transition-colors"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-background border border-input rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground text-sm"
                      required={!isForgotPassword}
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-primary text-background rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group mt-2 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isForgotPassword ? 'Send Reset Link' : (isLogin ? 'Sign In' : 'Create Account'))}
                  {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => {
                    if (isForgotPassword) {
                      setIsForgotPassword(false);
                      setIsLogin(true);
                    } else {
                      setIsLogin(!isLogin);
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isForgotPassword ? "Back to Sign in" : (isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in")}
                </button>
              </div>
            </div>
          </motion.div>
          {/* Click outside overlay */}
          <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
