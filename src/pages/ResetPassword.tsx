import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabase } from '../lib/supabase';
import { KeyRound, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if we have the hash in the URL (Supabase appends #access_token=... for recovery links)
    const hash = window.location.hash;
    if (!hash || !hash.includes('type=recovery')) {
      // You can either redirect them or show an error. 
      // For now, we just let them try, Supabase will reject if there's no valid recovery session
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const supabase = await getSupabase();
    const { error } = await supabase.auth.updateUser({ password });
    
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-background border-2 border-primary/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <KeyRound className="text-primary w-8 h-8" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-foreground text-center mb-2">Reset Password</h2>
        <p className="text-muted-foreground text-center mb-8">Enter your new secure password below.</p>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-destructive w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        )}

        {success ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Password Updated!</h3>
            <p className="text-muted-foreground text-sm">Redirecting you to the dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">New Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                placeholder="At least 6 characters"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-background font-bold px-4 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
