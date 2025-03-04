'use client';

import React from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E173F] to-[#09090B] text-white flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full bg-[#3D2A4F] rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
        <p className="text-sm text-gray-300 mb-6">
          Enter your email below and we’ll send you instructions to reset your password.
        </p>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white/70 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            className="w-full rounded-md bg-[#4D3A5F] border border-transparent 
                       focus:border-purple-500 focus:outline-none p-3 text-sm 
                       placeholder-[#8E7BAA] text-white"
          />
        </div>

        {/* Reset Password Button */}
        <button
          className="rounded-md bg-[#A844E7] px-4 py-2 w-full text-sm font-medium 
                     hover:bg-purple-600 transition-colors"
        >
          Send Reset Instructions
        </button>

        {/* Back to Login */}
        <div className="mt-4 text-center">
          <Link href="/auth" className="text-xs text-purple-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
