import React, { useState } from 'react';
import { BRAND } from '@meghpiyon/shared';

interface AdminAuthProps {
  onLoginSuccess: (user: { email: string; name: string; role: string }) => void;
}

export function AdminAuth({ onLoginSuccess }: AdminAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      // Allow demo credentials or any email containing admin
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === 'admin@meghpiyon.com' && password === 'admin123') ||
        cleanEmail.includes('admin') ||
        (cleanEmail && password.length >= 4)
      ) {
        const user = {
          email: cleanEmail,
          name: cleanEmail === 'admin@meghpiyon.com' ? 'Super Admin' : 'Meghpiyon Manager',
          role: 'admin',
        };
        onLoginSuccess(user);
      } else {
        setError('Invalid admin credentials. Please use the demo credentials below.');
      }
      setLoading(false);
    }, 400);
  };

  const fillDemo = () => {
    setEmail('admin@meghpiyon.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md">
            ম
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {BRAND.name} Admin Portal
          </h1>
          <p className="text-xs text-slate-500 font-bengali">
            {BRAND.nameBn} অ্যাডমিন ড্যাশবোর্ড ও ম্যানেজমেন্ট সিস্টেম
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 border border-rose-200 text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Admin Email / Username
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@meghpiyon.com"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In as Administrator'}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="rounded-xl bg-sky-50 border border-sky-100 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">Demo Credentials</span>
            <button
              type="button"
              onClick={fillDemo}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline"
            >
              Fill Credentials
            </button>
          </div>
          <div className="text-xs text-sky-800 space-y-0.5">
            <p><span className="font-medium">Email:</span> admin@meghpiyon.com</p>
            <p><span className="font-medium">Password:</span> admin123</p>
          </div>
        </div>

        <div className="text-center pt-2">
          <a href="/" className="text-xs text-slate-500 hover:text-sky-600 font-medium">
            ← Return to Meghpiyon Store
          </a>
        </div>
      </div>
    </div>
  );
}
