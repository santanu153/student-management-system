'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import {
  isFirebaseConfigured,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  auth
} from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthError = (err: unknown) => {
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          return 'Invalid email or password.';
        case 'auth/email-already-in-use':
          return 'An account with this email already exists.';
        case 'auth/weak-password':
          return 'Password should be at least 6 characters.';
        case 'auth/popup-closed-by-user':
          return 'Sign-in popup was closed before completing.';
        default:
          return err.message;
      }
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError('Firebase is not configured. Please add API keys to .env file.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (providerName: 'google') => {
    if (!auth) {
      setError('Firebase is not configured. Please add API keys to .env file.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const provider = googleProvider;
      if (!provider) {
        setError('Auth provider not available.');
        return;
      }
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="glass rounded-3xl p-8 w-full max-w-md space-y-6 animate-fadeIn">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
            <Sparkles size={24} color="white" />
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? 'Sign in to access your resumes' : 'Get started with ResumeAI'}
          </p>
        </div>

        {/* Firebase Setup Warning */}
        {!isFirebaseConfigured && (
          <div className="p-4 rounded-xl text-sm space-y-2" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle size={16} />
              Firebase Setup Required
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
              To enable Google & LinkedIn sign-in, you need to add Firebase API keys to your <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>.env</code> file. See the setup guide for details.
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialAuth('google')}
            disabled={loading || !isFirebaseConfigured}
            className="btn btn-secondary w-full justify-center py-3 flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>


        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: 'var(--border)' }}></div>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>OR</span>
          <div className="h-px flex-1" style={{ background: 'var(--border)' }}></div>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full justify-center py-3" disabled={loading || !isFirebaseConfigured}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="font-semibold"
            style={{ color: '#818CF8' }}
            disabled={loading}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
