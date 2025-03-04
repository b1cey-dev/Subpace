'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0IQTfxVqkTAh8wRm-c4WrX_z2XhaZAVk",
  authDomain: "subpace-2e410.firebaseapp.com",
  projectId: "subpace-2e410",
  storageBucket: "subpace-2e410.firebasestorage.app",
  messagingSenderId: "518089898921",
  appId: "1:518089898921:web:a07b8b542c503219c7a2b8",
  measurementId: "G-Q3WZR3Y1ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function PreviewFeatures({
  features,
}: {
  features: { name: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[];
}) {
  return (
    <div className="mt-6">
      <h5 className="mb-2 text-sm font-semibold">Features</h5>
      <ul className="space-y-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <li key={index} className="flex items-center space-x-2 text-xs text-gray-300">
              <Icon className="h-4 w-4" />
              <span>{feature.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('desktop');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const features = [
    { name: 'Real-time analytics', icon: ChartBarIcon },
    { name: 'User management', icon: UserGroupIcon },
    { name: 'Customizable dashboard', icon: Cog6ToothIcon },
    { name: 'API Integration', icon: CodeBracketIcon },
  ];

  // Handle email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Handle Google sign-in
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      client_id: '518089898921-ma3sq6ub2m14g7pm0es3dio0qb5eqi7p.apps.googleusercontent.com',
    });
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E173F] to-[#09090B] text-white">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* LEFT COLUMN (Login/Register Form) */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-6">
          <div className="max-w-md w-full">
            {/* Toggle Buttons */}
            <div className="flex space-x-8 border-b border-[#4D3A5F] mb-6">
              <button
                onClick={() => setAuthMode('login')}
                className={`pb-2 font-semibold text-base ${
                  authMode === 'login'
                    ? 'border-b-2 border-purple-500 text-white'
                    : 'border-b-2 border-transparent text-[#C9C9C9] hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`pb-2 font-semibold text-base ${
                  authMode === 'register'
                    ? 'border-b-2 border-purple-500 text-white'
                    : 'border-b-2 border-transparent text-[#C9C9C9] hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            {authMode === 'login' ? (
              /* ================= LOGIN FORM ================= */
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-3 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-3 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                  <div className="mt-2 text-right">
                    <Link
                      href="/auth/forgot"
                      className="text-xs text-purple-400 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="rounded-md bg-[#A844E7] px-4 py-2 w-full text-sm font-medium 
                             hover:bg-purple-600 transition-colors"
                >
                  Login
                </button>

                {/* Social Logins */}
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center space-x-2 bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md text-sm"
                  >
                    {/* Google Icon */}
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M21.35 11.1h-9.4v2.9h5.55a4.78 4.78 0 01-2.05 3.14l-.02.14 3.06 2.37.21.02a9.2 9.2 0 002.65-6.63c0-.59-.06-1.17-.2-1.74z"
                        fill="#4285F4"
                      />
                      <path
                        d="M11.95 21c2.4 0 4.41-.8 5.88-2.16l-3.06-2.38c-.82.55-1.88.88-2.82.88-2.16 0-3.99-1.46-4.64-3.44l-.13.01-3.15 2.45-.04.12A8.99 8.99 0 0011.95 21z"
                        fill="#34A853"
                      />
                      <path
                        d="M7.31 13.9a4.77 4.77 0 01-.25-1.58c0-.55.09-1.08.24-1.58l-.01-.11-3.2-2.47-.1.05A9.01 9.01 0 003 12.32c0 1.45.34 2.82.94 4.03l3.37-2.45z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M11.95 6.33c1.3 0 2.45.56 3.21 1.45l2.39-2.32A8.62 8.62 0 0011.95 3 8.99 8.99 0 004.03 7.3l3.29 2.55c.66-1.98 2.49-3.52 4.63-3.52z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google</span>
                  </button>
                </div>
              </form>
            ) : (
              /* ================= REGISTER FORM (simplified example) ================= */
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-3 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-3 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-3 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-3 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>

                {/* Register Button */}
                <button className="rounded-md bg-[#A844E7] px-4 py-2 w-full text-sm font-medium 
                             hover:bg-purple-600 transition-colors">
                  Register
                </button>

                {/* Already have an account? */}
                <div className="text-center">
                  <p className="text-xs text-gray-300">
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthMode('login')}
                      className="text-purple-400 hover:underline"
                    >
                      Login here
                    </button>
                  </p>
                </div>

                {/* Social Signups */}
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <button className="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4850c8] transition-colors text-white px-4 py-2 rounded-md text-sm">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.73 0H1.27C.57 0 0 .57 0 1.27v21.46c0 .7.57 1.27 1.27 1.27h14.6l-.69-2.4 1.6 1.48 1.52 1.36h3.43c.7 0 1.27-.57 1.27-1.27V1.27C24 .57 23.43 0 22.73 0z" />
                    </svg>
                    <span>Discord</span>
                  </button>
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center space-x-2 bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-md text-sm"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M21.35 11.1h-9.4v2.9h5.55a4.78 4.78 0 01-2.05 3.14l-.02.14 3.06 2.37.21.02a9.2 9.2 0 002.65-6.63c0-.59-.06-1.17-.2-1.74z"
                        fill="#4285F4"
                      />
                      <path
                        d="M11.95 21c2.4 0 4.41-.8 5.88-2.16l-3.06-2.38c-.82.55-1.88.88-2.82.88-2.16 0-3.99-1.46-4.64-3.44l-.13.01-3.15 2.45-.04.12A8.99 8.99 0 0011.95 21z"
                        fill="#34A853"
                      />
                      <path
                        d="M7.31 13.9a4.77 4.77 0 01-.25-1.58c0-.55.09-1.08.24-1.58l-.01-.11-3.2-2.47-.1.05A9.01 9.01 0 003 12.32c0 1.45.34 2.82.94 4.03l3.37-2.45z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M11.95 6.33c1.3 0 2.45.56 3.21 1.45l2.39-2.32A8.62 8.62 0 0011.95 3 8.99 8.99 0 004.03 7.3l3.29 2.55c.66-1.98 2.49-3.52 4.63-3.52z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (Dashboard Preview) */}
        <div className="relative md:w-1/2 min-h-[400px]">
          <img
            src="https://www.buzz.dev/graphics/login_overlay.svg"
            alt="Background Overlay"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative flex items-center justify-center h-full p-4 sm:p-6">
            <div className="rounded-lg bg-[#3D2A4F]/90 p-6 shadow-lg w-full max-w-md">
              <h3 className="mb-4 text-lg font-semibold">Preview</h3>
              <div className="mb-6 flex items-center space-x-8">
                <button
                  className={`flex items-center space-x-1 border-b-2 pb-1 text-sm font-medium ${
                    previewMode === 'mobile'
                      ? 'border-[#9b59b6] text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setPreviewMode('mobile')}
                >
                  <DevicePhoneMobileIcon className="h-4 w-4" />
                  <span>Mobile</span>
                </button>
                <button
                  className={`flex items-center space-x-1 border-b-2 pb-1 text-sm font-medium ${
                    previewMode === 'desktop'
                      ? 'border-[#9b59b6] text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setPreviewMode('desktop')}
                >
                  <ComputerDesktopIcon className="h-4 w-4" />
                  <span>Desktop</span>
                </button>
              </div>
              <div className={`mx-auto ${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-md'}`}>
                <div className="rounded-lg border border-white/20 bg-[#3D2A4F] p-6 shadow-md">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-gray-300">
                      Logo
                    </div>
                  </div>
                  <h4 className="mb-2 text-center text-xl font-semibold">My Community</h4>
                  <p className="mb-4 text-center text-sm text-gray-300">
                    This is a community for amazing people who want to grow their business.
                    Chat business strategy, marketing, sales, and more!
                  </p>
                  <div className="mb-4 flex flex-col items-center">
                    <span className="text-sm font-medium">Membership</span>
                    <span className="text-sm text-gray-300">Free</span>
                  </div>
                  <button className="w-full rounded bg-[#9b59b6] py-2 text-sm font-medium transition hover:bg-[#8e44ad]">
                    Join Community
                  </button>
                  <PreviewFeatures features={features} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
