import React, { useState } from 'react';
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
} from '../../lib/firebase';
import { BRAND } from '@meghpiyon/shared';

interface CustomerAuthProps {
  mode?: 'login' | 'register';
  redirectUrl?: string;
}

export function CustomerAuth({ mode = 'login', redirectUrl = '/shop' }: CustomerAuthProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Email/Password States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (userData: {
    uid: string;
    name: string;
    email?: string | null;
    avatarUrl?: string | null;
    authProvider: 'google' | 'facebook' | 'email';
  }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('meghpiyon_customer_user', JSON.stringify(userData));
      setSuccess(`স্বাগতম, ${userData.name}!`);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 600);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!auth) throw new Error('Auth not initialized');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      handleLoginSuccess({
        uid: user.uid,
        name: user.displayName || 'Customer',
        email: user.email,
        avatarUrl: user.photoURL,
        authProvider: 'google',
      });
    } catch (err: unknown) {
      console.error('Google Sign In Error:', err);
      const errorObj = err as { code?: string; message?: string };
      // Fallback for demo when live keys are not yet added
      if (errorObj?.code === 'auth/api-key-not-valid' || errorObj?.code === 'auth/invalid-api-key') {
        handleLoginSuccess({
          uid: 'google-demo-123',
          name: 'Shakil Ahmed (Google User)',
          email: 'shakil.ahmed@gmail.com',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
          authProvider: 'google',
        });
        return;
      }
      setError(errorObj?.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Facebook Sign-In
  const handleFacebookSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!auth) throw new Error('Auth not initialized');
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      handleLoginSuccess({
        uid: user.uid,
        name: user.displayName || 'Customer',
        email: user.email,
        avatarUrl: user.photoURL,
        authProvider: 'facebook',
      });
    } catch (err: unknown) {
      console.error('Facebook Sign In Error:', err);
      const errorObj = err as { code?: string; message?: string };
      // Fallback for demo when live keys are not yet added
      if (errorObj?.code === 'auth/api-key-not-valid' || errorObj?.code === 'auth/invalid-api-key') {
        handleLoginSuccess({
          uid: 'fb-demo-456',
          name: 'Nusrat Faria (Facebook User)',
          email: 'nusrat.faria@facebook.com',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
          authProvider: 'facebook',
        });
        return;
      }
      setError(errorObj?.message || 'Failed to sign in with Facebook. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Email / Password Submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      handleLoginSuccess({
        uid: `email-${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        authProvider: 'email',
      });
      setLoading(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-1.5">
        <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow-sm">
          ম
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {mode === 'register' ? 'Create an Account' : 'Welcome to Meghpeon'}
        </h1>
        <p className="text-xs text-slate-500 font-bengali">
          {BRAND.tagline}
        </p>
      </div>

      {/* Social 1-Click Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs border border-slate-300 flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-60"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          onClick={handleFacebookSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium rounded-xl text-xs flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-60"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Continue with Facebook</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 w-full" />
        <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold absolute">
          Or Continue With Email
        </span>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-3 text-xs rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 text-xs rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
          {success}
        </div>
      )}

      {/* Email & Password Form */}
      <form onSubmit={handleEmailSubmit} className="space-y-3.5">
        {mode === 'register' && (
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Farhana Yasmin"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="customer@example.com"
            className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-700">Password</label>
            {mode === 'login' && (
              <a href="#" className="text-[11px] text-sky-600 hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl text-xs transition-colors shadow-sm disabled:opacity-60"
        >
          {loading ? 'Please wait...' : mode === 'register' ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      {/* Switch between Login and Register */}
      <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-600">
        {mode === 'login' ? (
          <>
            Don't have an account yet?{' '}
            <a href="/register" className="text-sky-600 font-semibold hover:underline">
              Create an Account
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a href="/login" className="text-sky-600 font-semibold hover:underline">
              Sign In
            </a>
          </>
        )}
      </div>
    </div>
  );
}
