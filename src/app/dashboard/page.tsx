/*
Firestore Rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // publishedProfiles: Public read access, but writes require authentication.
    match /publishedProfiles/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // profiles: Only the authenticated owner of the document can read/write.
    match /profiles/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == docId;
    }
  }
}
*/

"use client";
import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Squares2X2Icon,
  LinkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  GiftIcon,
  UserIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

/* -------------------------------------------------------------------------- */
/*  ICON PICKER CONFIG
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
/*  FEATURE INTERFACE
/* -------------------------------------------------------------------------- */
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  isEditing: boolean;
}

/* -------------------------------------------------------------------------- */
/*  FIREBASE CONFIG & INIT
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
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

/* -------------------------------------------------------------------------- */
/*  MAIN DASHBOARD COMPONENT
/* -------------------------------------------------------------------------- */
const Dashboard: FC = () => {
  const router = useRouter();

  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Local profile state – defaults provided.
  const [communityName, setCommunityName] = useState("My Community");
  const [communityDescription, setCommunityDescription] = useState(
    "This is a community for amazing people who want to grow their business..."
  );
  // Use Google avatar by default
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [features, setFeatures] = useState<Feature[]>([
    { id: 1, icon: "gift", title: "Bonus Content", description: "Feature description goes here", isEditing: false },
    { id: 2, icon: "user", title: "1 on 1 Access To Me", description: "Feature description goes here", isEditing: false },
    { id: 3, icon: "video", title: "Weekly Livestreams", description: "Feature description goes here", isEditing: false },
    { id: 4, icon: "calendar", title: "Access To Member-Only Events", description: "Feature description goes here", isEditing: false },
  ]);
  const [nextId, setNextId] = useState(5);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  const [showShareModal, setShowShareModal] = useState(false);

  // On auth state change, set user and load stored profile data.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
      } else {
        setUser(currentUser);
        // Use the user's Google avatar by default.
        if (currentUser.photoURL) {
          setAvatarUrl(currentUser.photoURL);
        }
        // Load profile data from Firestore.
        const profileRef = doc(db, "profiles", currentUser.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const data = profileSnap.data();
          setCommunityName(data.communityName || "");
          setCommunityDescription(data.communityDescription || "");
          // If a stored avatar exists, use it; otherwise, fallback to Google avatar.
          setAvatarUrl(data.avatarUrl || currentUser.photoURL || null);
          // Load features and update nextId to avoid duplicate keys.
          const loadedFeatures = data.features || [];
          setFeatures(loadedFeatures);
          const maxId = loadedFeatures.reduce((max: number, feat: Feature) => Math.max(max, feat.id), 0);
          setNextId(maxId + 1);
          setIsPublished(data.isPublished || false);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Auto-save community name (debounced)
  useEffect(() => {
    if (!authLoading && user) {
      const timer = setTimeout(() => {
        updateProfileField("communityName", communityName);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [communityName, authLoading, user]);

  // Auto-save community description (debounced)
  useEffect(() => {
    if (!authLoading && user) {
      const timer = setTimeout(() => {
        updateProfileField("communityDescription", communityDescription);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [communityDescription, authLoading, user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#2E173F]">
        Loading...
      </div>
    );
  }

  // Helper: Sync entire profile to publishedProfiles.
  const syncPublishedProfile = async () => {
    if (!user) return;
    const publishedData = {
      communityName,
      communityDescription,
      avatarUrl,
      features,
      updatedAt: new Date(),
    };
    try {
      await setDoc(doc(db, "publishedProfiles", user.uid), publishedData, { merge: true });
    } catch (error) {
      console.error("Error syncing published profile:", error);
    }
  };

  // Update a specific field in the profiles document and sync if published.
  const updateProfileField = async (field: string, value: any) => {
    if (!user) return;
    try {
      await setDoc(doc(db, "profiles", user.uid), { [field]: value }, { merge: true });
      if (isPublished) await syncPublishedProfile();
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  // Remove published profile document when unpublishing.
  const removePublishedProfile = async () => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "publishedProfiles", user.uid));
    } catch (error) {
      console.error("Error removing published profile:", error);
    }
  };

  // (Optional) Avatar upload function remains available.
  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && user) {
      const file = e.target.files[0];
      const uniqueFileName = `${user.uid}-${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `avatars/${uniqueFileName}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setAvatarUrl(url);
        await setDoc(doc(db, "profiles", user.uid), { avatarUrl: url }, { merge: true });
        if (isPublished) await syncPublishedProfile();
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  // Feature handlers – each time features change, update Firestore.
  const handleAddFeature = async () => {
    const newFeature = {
      id: nextId,
      icon: "gift",
      title: "New Feature",
      description: "Edit me...",
      isEditing: true,
    };
    const newFeatures = [...features, newFeature];
    setFeatures(newFeatures);
    setNextId((prev) => prev + 1);
    await updateProfileField("features", newFeatures);
  };

  const handleEditFeature = (id: number) => {
    const updatedFeatures = features.map((feat) =>
      feat.id === id ? { ...feat, isEditing: true } : feat
    );
    setFeatures(updatedFeatures);
  };

  const handleCancelEdit = async (id: number) => {
    const updatedFeatures = features.map((feat) =>
      feat.id === id ? { ...feat, isEditing: false } : feat
    );
    setFeatures(updatedFeatures);
    await updateProfileField("features", updatedFeatures);
  };

  const handleChange = (id: number, field: "title" | "description" | "icon", value: string) => {
    const updatedFeatures = features.map((feat) =>
      feat.id === id ? { ...feat, [field]: value } : feat
    );
    setFeatures(updatedFeatures);
  };

  const handleSaveFeature = async (id: number) => {
    const updatedFeatures = features.map((feat) =>
      feat.id === id ? { ...feat, isEditing: false } : feat
    );
    setFeatures(updatedFeatures);
    await updateProfileField("features", updatedFeatures);
  };

  const handleDeleteFeature = async (id: number) => {
    const updatedFeatures = features.filter((feat) => feat.id !== id);
    setFeatures(updatedFeatures);
    await updateProfileField("features", updatedFeatures);
  };

  // Share modal handler.
  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#2E173F] text-white">
      {/* HEADER */}
      <header className="flex items-center justify-between bg-[#3D2A4F] px-8 py-4 shadow-md border-b border-white/20">
        <h2 className="text-2xl font-semibold">Subpace</h2>
        <div className="flex items-center space-x-4">
          <button onClick={async () => {
              // Manual toggle publish remains available.
              const newState = !isPublished;
              try {
                await setDoc(doc(db, "profiles", user!.uid), { isPublished: newState }, { merge: true });
                if (newState) {
                  await syncPublishedProfile();
                } else {
                  await removePublishedProfile();
                }
                setIsPublished(newState);
              } catch (error) {
                console.error("Error toggling publish:", error);
              }
            }} className="cursor-pointer text-sm text-gray-300 transition hover:text-white">
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <button onClick={handleShare} className="rounded bg-[#9b59b6] px-4 py-1 text-sm font-medium transition hover:bg-[#8e44ad]">
            Share
          </button>
          {user && <ProfileMenu user={user} />}
        </div>
      </header>

      {/* MAIN SECTION */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#3D2A4F] px-6 py-8 shadow-md border-r border-white/20">
          <nav className="space-y-1">
            <NavItem icon={<Squares2X2Icon className="h-5 w-5" />} label="Design" href="/dashboard/design" active />
            <NavItem icon={<LinkIcon className="h-5 w-5" />} label="Connections" href="/connections" />
            <NavItemPro icon={<CurrencyDollarIcon className="h-5 w-5" />} label="Pricing" href="/pricing" proLabel="Coming Soon" />
            <NavItem icon={<ChartBarIcon className="h-5 w-5" />} label="Analytics" href="/analytics" />
            <NavItemPro icon={<DocumentTextIcon className="h-5 w-5" />} label="Application Forms" href="/application" proLabel="Pro" />
            <NavItem icon={<UsersIcon className="h-5 w-5" />} label="Users" href="/users" />
          </nav>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 p-8">
          <h1 className="mb-6 text-3xl font-semibold">Subpace Dashboard</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* LEFT COLUMN: Edit Section */}
            <div className="space-y-6">
              {/* Community Logo */}
              <div className="rounded-lg bg-[#3D2A4F] p-4 shadow-lg">
                <p className="text-sm font-medium">Community Logo</p>
                <p className="text-xs text-gray-300">Using your Google avatar</p>
                <div className="mt-4 flex items-center">
                  <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gray-300">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                      <img src="https://via.placeholder.com/64?text=Logo" alt="Placeholder Logo" className="h-16 w-16 rounded-full object-cover" />
                    )}
                  </div>
                  {/* The upload button is hidden since we are using the Google avatar */}
                </div>
              </div>

              {/* Name (Auto-Saved) */}
              <div className="rounded-lg bg-[#3D2A4F] p-4 shadow-lg">
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  placeholder="My Community"
                  className="mt-1 w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9b59b6]"
                />
              </div>

              {/* Description (Auto-Saved) */}
              <div className="rounded-lg bg-[#3D2A4F] p-4 shadow-lg">
                <label className="mb-1 block text-sm font-medium">Description</label>
                <textarea
                  rows={3}
                  value={communityDescription}
                  onChange={(e) => setCommunityDescription(e.target.value)}
                  placeholder="This is a community for amazing people who want to grow their business..."
                  className="mt-1 w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9b59b6]"
                />
              </div>

              {/* Features & Perks */}
              <FeaturesAndPerks
                features={features}
                onAddFeature={handleAddFeature}
                onEditFeature={handleEditFeature}
                onCancelEdit={handleCancelEdit}
                onChange={handleChange}
                onSaveFeature={handleSaveFeature}
                onDeleteFeature={handleDeleteFeature}
              />
            </div>

            {/* RIGHT COLUMN: Preview Section */}
            <div className="rounded-lg bg-[#3D2A4F] p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">Preview</h3>
              <div className="mb-6 flex items-center space-x-8">
                <button
                  className={`flex items-center space-x-1 border-b-2 pb-1 text-sm font-medium ${
                    previewMode === "mobile" ? "border-[#9b59b6] text-white" : "border-transparent text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setPreviewMode("mobile")}
                >
                  <DevicePhoneMobileIcon className="h-4 w-4" />
                  <span>Mobile</span>
                </button>
                <button
                  className={`flex items-center space-x-1 border-b-2 pb-1 text-sm font-medium ${
                    previewMode === "desktop" ? "border-[#9b59b6] text-white" : "border-transparent text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setPreviewMode("desktop")}
                >
                  <ComputerDesktopIcon className="h-4 w-4" />
                  <span>Desktop</span>
                </button>
              </div>
              <div className={`mx-auto ${previewMode === "mobile" ? "max-w-sm" : "max-w-md"}`}>
                <div className="rounded-lg border border-white/20 bg-[#3D2A4F] p-6 shadow-md">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-gray-300">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar Preview" className="h-20 w-20 rounded-full object-cover" />
                      ) : (
                        <img src="https://via.placeholder.com/80?text=Logo" alt="Placeholder Logo Preview" className="h-20 w-20 rounded-full object-cover" />
                      )}
                    </div>
                  </div>
                  <h4 className="mb-2 text-center text-xl font-semibold">{communityName}</h4>
                  <p className="mb-4 text-center text-sm text-gray-300">{communityDescription}</p>
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
        </main>
      </div>
      {showShareModal && user && <ShareModal user={user} onClose={() => setShowShareModal(false)} />}
    </div>
  );
};

export default Dashboard;

/* -------------------------------------------------------------------------- */
/*  PROFILE MENU COMPONENT */
/* -------------------------------------------------------------------------- */
interface ProfileMenuProps {
  user: User;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center focus:outline-none">
        {user.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
            {user.displayName ? user.displayName[0] : "U"}
          </div>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg z-50">
          <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            Profile
          </Link>
          <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            Settings
          </Link>
          <button onClick={() => signOut(auth)} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  FEATURES & PERKS (EDITABLE) COMPONENT */
/* -------------------------------------------------------------------------- */
interface FeaturesAndPerksProps {
  features: Feature[];
  onAddFeature: () => void;
  onEditFeature: (id: number) => void;
  onCancelEdit: (id: number) => void;
  onChange: (id: number, field: "title" | "description" | "icon", value: string) => void;
  onSaveFeature: (id: number) => void;
  onDeleteFeature: (id: number) => void;
}

function FeaturesAndPerks({
  features,
  onAddFeature,
  onEditFeature,
  onCancelEdit,
  onChange,
  onSaveFeature,
  onDeleteFeature,
}: FeaturesAndPerksProps) {
  return (
    <div className="rounded-lg bg-[#3D2A4F] p-4 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">Features &amp; Perks</label>
        <button onClick={onAddFeature} className="rounded border border-white/20 bg-transparent px-3 py-1 text-sm font-medium transition hover:bg-white/10">
          Add feature
        </button>
      </div>
      <div className="space-y-3">
        {features.map((feature) => (
          <EditableFeatureCard
            key={feature.id}
            feature={feature}
            onEdit={onEditFeature}
            onDelete={onDeleteFeature}
            onChange={onChange}
            onSave={onSaveFeature}
            onCancel={onCancelEdit}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  EDITABLE FEATURE CARD COMPONENT */
/* -------------------------------------------------------------------------- */
function EditableFeatureCard({
  feature,
  onEdit,
  onDelete,
  onChange,
  onSave,
  onCancel,
}: {
  feature: Feature;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: "title" | "description" | "icon", value: string) => void;
  onSave: (id: number) => void;
  onCancel: (id: number) => void;
}) {
  if (feature.isEditing) {
    return (
      <div className="flex flex-col space-y-2 rounded border border-white/20 bg-[#3D2A4F] p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <select
            className="rounded border border-white/20 bg-transparent px-2 py-1 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9b59b6]"
            value={feature.icon}
            onChange={(e) => onChange(feature.id, "icon", e.target.value)}
          >
            {ICON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            className="flex-1 rounded border border-white/20 bg-transparent px-3 py-1 text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9b59b6]"
            value={feature.title}
            onChange={(e) => onChange(feature.id, "title", e.target.value)}
          />
        </div>
        <textarea
          rows={2}
          className="w-full rounded border border-white/20 bg-transparent px-3 py-1 text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9b59b6]"
          value={feature.description}
          onChange={(e) => onChange(feature.id, "description", e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <button onClick={() => onSave(feature.id)} className="rounded bg-[#9b59b6] px-3 py-1 text-sm font-medium transition hover:bg-[#8e44ad]">
            Save
          </button>
          <button onClick={() => onCancel(feature.id)} className="rounded border border-white/20 bg-transparent px-3 py-1 text-sm font-medium transition hover:bg-white/10">
            Cancel
          </button>
          <button onClick={() => onDelete(feature.id)} className="ml-auto text-sm text-red-400 hover:text-red-300">
            Delete
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start space-x-3 rounded border border-white/20 bg-[#3D2A4F] px-4 py-3 shadow-sm">
      <div className="mt-1">{getIconComponent(feature.icon)}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{feature.title}</p>
        <p className="text-xs text-gray-300">{feature.description}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(feature.id)} className="text-sm text-gray-300 hover:text-white">
          Edit
        </button>
        <button onClick={() => onDelete(feature.id)} className="text-sm text-red-400 hover:text-red-300">
          Delete
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  PREVIEW FEATURES COMPONENT */
/* -------------------------------------------------------------------------- */
function PreviewFeatures({ features }: { features: Feature[] }) {
  return (
    <div className="mt-6">
      <h4 className="mb-2 text-lg font-semibold">Features &amp; Perks</h4>
      <div className="space-y-3">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-start space-x-3 rounded border border-white/20 bg-[#3D2A4F] px-4 py-3 shadow-sm">
            <div className="mt-1">{getIconComponent(feature.icon)}</div>
            <div>
              <p className="text-sm font-medium">{feature.title}</p>
              <p className="text-xs text-gray-300">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  NAV ITEMS COMPONENTS */
/* -------------------------------------------------------------------------- */
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function NavItem({ icon, label, href, active = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 rounded px-3 py-2 text-sm font-medium transition ${
        active ? "bg-[#3D2A4F] text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface NavItemProProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  proLabel?: string;
}

function NavItemPro({ icon, label, href, proLabel }: NavItemProProps) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className="mb-1 flex items-center space-x-2 rounded px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
      >
        {icon}
        <span>{label}</span>
      </Link>
      {proLabel && (
        <div className="absolute right-3 top-2">
          <span className="rounded bg-[#9b59b6] px-1.5 py-0.5 text-xs font-semibold text-white">{proLabel}</span>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SHARE MODAL COMPONENT */
/* -------------------------------------------------------------------------- */
interface ShareModalProps {
  user: User;
  onClose: () => void;
}

const ShareModal: FC<ShareModalProps> = ({ user, onClose }) => {
  // Create a slug from the user's display name (remove spaces)
  const displayNameSlug = user.displayName ? user.displayName.replace(/\s+/g, "") : "user";
  const personalLink = `http://localhost:3000/preview?uid=${user.uid}&name=${displayNameSlug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(personalLink);
    alert("Link has been copied!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-sm rounded bg-white p-6 text-gray-800">
        <button onClick={onClose} className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
          ✕
        </button>
        <h2 className="mb-1 text-lg font-semibold text-gray-900">Share your Subpace link</h2>
        <p className="mb-4 text-sm text-gray-600">
          Get more members in your community by sharing your link everywhere.
        </p>
        <div className="flex items-center justify-between rounded border border-gray-200 px-3 py-2">
          <span className="truncate font-medium text-purple-700">{personalLink}</span>
          <button onClick={copyLink} className="ml-2 rounded bg-purple-600 px-3 py-1 text-sm font-medium text-white hover:bg-purple-700">
            Copy
          </button>
        </div>
        <p className="mt-6 mb-2 text-sm font-semibold text-gray-800">Next steps:</p>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <span>•</span>
            <span>Add Subpace to your Instagram bio</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>•</span>
            <span>Share Subpace on LinkedIn</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>•</span>
            <span>Add Subpace to your YouTube channel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
