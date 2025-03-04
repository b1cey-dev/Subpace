"use client";

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0IQTfxVqkTAh8wRm-c4WrX_z2XhaZAVk",
  authDomain: "subpace-2e410.firebaseapp.com",
  projectId: "subpace-2e410",
  storageBucket: "subpace-2e410.firebasestorage.app",
  messagingSenderId: "518089898921",
  appId: "1:518089898921:web:a07b8b542c503219c7a2b8",
  measurementId: "G-Q3WZR3Y1ZY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Form state that will be pre-filled with the logged in user's data
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    // Remove query parameters from the URL after the component mounts
    if (window.history.replaceState) {
      const newUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // If a user is logged in, pre-populate the form with available data
      if (currentUser) {
        setFormData((prevData) => ({
          ...prevData,
          displayName: currentUser.displayName || '',
          email: currentUser.email || '',
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Dummy disconnect function—replace with your actual disconnect logic.
  const handleDisconnect = (providerName) => {
    console.log(`Disconnecting ${providerName} account`);
    // Example for Firebase: user.unlink('google.com') or user.unlink('facebook.com')
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // User is not logged in; you might want to redirect or show a login prompt
    return <div>Please log in to view your settings.</div>;
  }

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-b from-[#2E173F] to-[#09090B] text-white transition-opacity duration-300 ${
          showPopup ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Top Section: Heading + Beta Label */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Settings</h1>
            <span className="bg-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
              Beta
            </span>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 border-b border-[#4D3A5F] mb-8">
            <button className="pb-2 text-white border-b-2 border-purple-500 font-semibold">
              Profile
            </button>
            <button className="pb-2 border-b-2 border-transparent text-[#C9C9C9] hover:text-white hover:border-gray-500 transition">
              Notifications
            </button>
            <button className="pb-2 border-b-2 border-transparent text-[#C9C9C9] hover:text-white hover:border-gray-500 transition">
              Privacy
            </button>
            <button className="pb-2 border-b-2 border-transparent text-[#C9C9C9] hover:text-white hover:border-gray-500 transition">
              Appearance
            </button>
          </div>

          {/* Profile Information Card */}
          <div className="bg-[#4D3A5F] rounded-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-1">Profile Information</h2>
            <p className="text-sm text-[#C9C9C9] mb-6">
              Update your profile details and public information.
            </p>

            <form>
              {/* Display Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]/60 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    placeholder="John Doe"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-2 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]/60 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-2 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#FFFFFF]/60 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  placeholder="A passionate developer with years of experience..."
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                             focus:border-purple-500 focus:outline-none p-2 text-sm 
                             placeholder-[#8E7BAA] text-white"
                />
              </div>

              {/* Location & Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]/60 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="London, UK"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-2 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]/60 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full rounded-md bg-[#3D2A4F] border border-transparent 
                               focus:border-purple-500 focus:outline-none p-2 text-sm 
                               placeholder-[#8E7BAA] text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rounded-md bg-[#A844E7] px-4 py-2 text-sm font-medium 
                           hover:bg-purple-600 transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Account Settings Card */}
          <div className="bg-[#4D3A5F] rounded-md p-6">
            <h2 className="text-xl font-semibold mb-1">Account Settings</h2>

            {/* Two-Factor Auth */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-[#C9C9C9]">Protect your account with 2FA</p>
              </div>
              {/* Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 
                                peer-focus:ring-purple-500 peer-checked:bg-purple-600 
                                dark:bg-gray-700 peer-checked:after:translate-x-full 
                                peer-checked:after:border-white after:content-[''] 
                                after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                after:border-gray-300 after:border after:rounded-full 
                                after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Connected Accounts */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Connected Accounts</p>
                <p className="text-xs text-[#C9C9C9]">
                  Manage your linked social accounts
                </p>
              </div>
              <button
                className="rounded-md border border-purple-500 text-purple-500 
                           px-4 py-2 text-sm font-medium hover:bg-purple-500 
                           hover:text-white transition-colors"
                onClick={() => setShowPopup(true)}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal for Managing Connected Accounts */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Transparent background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative bg-[#4D3A5F] rounded-lg p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Manage Connected Accounts</h2>
            <div className="space-y-4">
              {/* Example Account: Google */}
              <div className="flex items-center justify-between">
                <span>Google</span>
                <button
                  className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium 
                             hover:bg-red-700 transition"
                  onClick={() => handleDisconnect('Google')}
                >
                  Disconnect
                </button>
              </div>
              {/* Example Account: Facebook */}
              <div className="flex items-center justify-between">
                <span>Facebook</span>
                <button
                  className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium 
                             hover:bg-red-700 transition"
                  onClick={() => handleDisconnect('Facebook')}
                >
                  Disconnect
                </button>
              </div>
              {/* Add additional connected accounts as needed */}
            </div>
            <button
              className="mt-4 w-full rounded-md bg-gray-700 px-4 py-2 text-sm font-medium 
                         hover:bg-gray-600 transition"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
