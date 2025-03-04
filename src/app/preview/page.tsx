"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

// Heroicons (same as in your dashboard)
import {
  GiftIcon,
  UserIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/*  FIREBASE CONFIG (same as your Dashboard)
/* -------------------------------------------------------------------------- */
const firebaseConfig = {
  apiKey: "AIzaSyD0IQTfxVqkTAh8wRm-c4WrX_z2XhaZAVk",
  authDomain: "subpace-2e410.firebaseapp.com",
  projectId: "subpace-2e410",
  storageBucket: "subpace-2e410.firebasestorage.app",
  messagingSenderId: "518089898921",
  appId: "1:518089898921:web:a07b8b542c503219c7a2b8",
  measurementId: "G-Q3WZR3Y1ZY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* -------------------------------------------------------------------------- */
/*  ICON PICKER CONFIG - same logic as Dashboard
/* -------------------------------------------------------------------------- */
const ICON_OPTIONS = [
  { value: "gift", label: "Gift", Icon: GiftIcon },
  { value: "user", label: "User", Icon: UserIcon },
  { value: "video", label: "Video", Icon: VideoCameraIcon },
  { value: "calendar", label: "Calendar", Icon: CalendarDaysIcon },
];

function getIconComponent(iconValue: string) {
  const match = ICON_OPTIONS.find((opt) => opt.value === iconValue);
  if (!match) return null;
  const TheIcon = match.Icon;
  return <TheIcon className="h-5 w-5 text-[#9b59b6]" />;
}

/* -------------------------------------------------------------------------- */
/*  PROFILE DATA INTERFACE
/* -------------------------------------------------------------------------- */
interface ProfileData {
  communityName: string;
  communityDescription: string;
  avatarUrl?: string | null;
  features?: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];
  updatedAt?: any;
}

const PreviewPage: React.FC = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const displayName = searchParams.get("name"); // Extract display name slug

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) {
      setError("No user ID provided.");
      setLoading(false);
      return;
    }

    const publishedDocRef = doc(db, "publishedProfiles", uid);
    const unsubscribe = onSnapshot(
      publishedDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data() as ProfileData);
          setError(null);
        } else {
          setError("Profile not published.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [uid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2E173F] text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2E173F] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2E173F] text-white flex flex-col items-center justify-center p-4">
      {/* Optional header showing display name */}
      {displayName && (
        <h2 className="mb-4 text-2xl font-semibold">Preview for {displayName}</h2>
      )}
      <div className="w-full max-w-sm rounded-lg border border-white/20 bg-[#3D2A4F] p-6 shadow-md">
        {/* Avatar / Logo */}
        <div className="mb-4 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Profile Logo"
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/80?text=Logo"
                alt="Placeholder Logo"
                className="h-20 w-20 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Community Name */}
        <h1 className="mb-2 text-center text-xl font-semibold">
          {profile?.communityName}
        </h1>

        {/* Community Description */}
        <p className="mb-4 text-center text-sm text-gray-300">
          {profile?.communityDescription}
        </p>

        {/* Membership (Hard-coded for now) */}
        <div className="mb-4 flex flex-col items-center">
          <span className="text-sm font-medium">Membership</span>
          <span className="text-sm text-gray-300">Free</span>
        </div>

        {/* Join Button */}
        <button className="mb-4 w-full rounded bg-[#9b59b6] py-2 text-sm font-medium transition hover:bg-[#8e44ad]">
          Join Community
        </button>

        {/* Features */}
        {profile?.features && profile.features.length > 0 && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Features &amp; Perks</h2>
            <div className="space-y-3">
              {profile.features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start space-x-3 rounded border border-white/20 bg-[#3D2A4F] px-4 py-3 shadow-sm"
                >
                  <div className="mt-1">{getIconComponent(feature.icon)}</div>
                  <div>
                    <p className="text-sm font-medium">{feature.title}</p>
                    <p className="text-xs text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
