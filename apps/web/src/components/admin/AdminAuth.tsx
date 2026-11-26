import React, { useState } from 'react';
import { BRAND } from '@meghpiyon/shared';
import { loginApi } from '../../lib/api';

interface AdminAuthProps {
  onLoginSuccess: (user: { id?: string; email: string; name: string; role: string }, token: string) => void;
}

export function AdminAuth({ onLoginSuccess }: AdminAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginApi(email.trim(), password);
      const role = data.user?.role;

      if (role !== 'admin' && role !== 'employee' && role !== 'moderator') {
        setError('এই অ্যাকাউন্টটির অ্যাডমিন বা এমপ্লয়ি প্যানেল অ্যাক্সেস নেই।');
        return;
      }

      onLoginSuccess(
        {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        },
        data.token
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'অবৈধ অ্যাডমিন বা এমপ্লয়ি তথ্য।';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillAdminDemo = () => {
    setEmail('admin@meghpiyon.com');
    setPassword('admin123');
    setError(null);
  };

  const fillEmployeeDemo = () => {
    setEmail('employee@meghpiyon.com');
    setPassword('emp123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-parchment paper-grain flex items-center justify-center p-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(203,160,56,0.1),transparent_55%)]" />

      <div className="relative z-10 w-full max-w-[440px] rounded-[4px] border border-parchment-line bg-parchment-light p-7 sm:p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_28px_56px_-28px_rgba(43,27,23,0.45)]">
        {/* Double-frame inner border */}
        <div className="pointer-events-none absolute inset-[6px] rounded-[2px] border border-gold-500/20" aria-hidden="true" />

        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/50 bg-gradient-to-br from-crimson-600 to-ink-deep text-gold-200 shadow-[0_6px_16px_-4px_rgba(61,12,17,0.55),inset_0_1px_2px_rgba(255,255,255,0.2)]">
              <span className="font-display text-xl font-semibold tracking-tight">M</span>
            </div>
            <p className="pt-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-700">
              Atelier Staff & Admin
            </p>
            <h1 className="font-display text-2xl sm:text-[28px] font-semibold text-espresso leading-tight">
              {BRAND.name} Staff Portal
            </h1>
            <p className="font-bengali text-[13.5px] text-clay">
              {BRAND.nameBn} অ্যাডমিন ও এমপ্লয়ি ম্যানেজমেন্ট পোর্টাল
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs font-bengali rounded-[3px] bg-crimson-50 border border-crimson-300 text-crimson-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block font-bengali text-[13px] font-semibold text-espresso">
                ইমেইল অথবা মোবাইল নম্বর
              </label>
              <input
                id="admin-email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@meghpiyon.com"
                className="w-full px-3.5 py-2.5 text-[13.5px] bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso placeholder:text-clay-light focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block font-bengali text-[13px] font-semibold text-espresso">
                পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-[13.5px] bg-parchment-50 border border-parchment-border rounded-[3px] text-espresso placeholder:text-clay-light focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-500/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-clay hover:text-espresso transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-5 rounded-[3px] bg-ink hover:bg-burgundy-dark text-parchment font-bengali text-[14.5px] font-medium tracking-wide border border-gold-500/40 shadow-[0_8px_20px_-8px_rgba(43,27,23,0.5)] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <span className="text-[10px] text-gold-300/80 font-serif" aria-hidden="true">❖</span>
              <span>{loading ? 'যাচাই করা হচ্ছে...' : 'পোর্টালে প্রবেশ করুন'}</span>
              <span className="text-[10px] text-gold-300/80 font-serif" aria-hidden="true">❖</span>
            </button>
          </form>

          {/* Role Demo Quick-Fill */}
          <div className="rounded-[3px] bg-parchment-deep/70 border border-parchment-border p-4 space-y-2.5">
            <span className="block text-[10px] font-bold text-gold-800 uppercase tracking-[0.18em]">
              Quick Test Accounts (MongoDB Atlas)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillAdminDemo}
                className="px-2.5 py-2 rounded-[3px] bg-parchment-50 hover:bg-parchment border border-parchment-border text-left transition-colors"
              >
                <span className="block text-[11px] font-bold text-burgundy">Super Admin</span>
                <span className="block text-[10px] text-clay truncate">admin@meghpiyon.com</span>
              </button>
              <button
                type="button"
                onClick={fillEmployeeDemo}
                className="px-2.5 py-2 rounded-[3px] bg-parchment-50 hover:bg-parchment border border-parchment-border text-left transition-colors"
              >
                <span className="block text-[11px] font-bold text-espresso">Employee</span>
                <span className="block text-[10px] text-clay truncate">employee@meghpiyon.com</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <a href="/" className="font-bengali text-xs text-clay hover:text-burgundy font-medium transition-colors">
              ← মেঘপিয়ন স্টোরফ্রন্টে ফিরে যান
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
