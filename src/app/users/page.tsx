"use client";
import React, { FC, useState } from "react";
import {
  Squares2X2Icon,
  LinkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/*  MOCK DATA & INTERFACES
/* -------------------------------------------------------------------------- */
interface User {
  id: number;
  name: string;
  email: string;
  inviteCode: string;
  signUpDate: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", inviteCode: "INVITE123", signUpDate: "2023-12-01" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", inviteCode: "INVITE123", signUpDate: "2023-12-02" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", inviteCode: "INVITE456", signUpDate: "2023-12-03" },
];

/* -------------------------------------------------------------------------- */
/*  USERS PAGE COMPONENT
/* -------------------------------------------------------------------------- */
const UsersPage: FC = () => {
  const [users] = useState<User[]>(mockUsers);
  const inviteLink = "https://example.com/invite/INVITE123";

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  return (
    <div className="flex min-h-screen bg-[#2E173F] text-white">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-[#3D2A4F] px-8 py-4 shadow-md border-b border-white/20">
        <h2 className="text-2xl font-semibold">My App</h2>
        <div className="flex items-center space-x-4">
          <span className="cursor-pointer text-sm text-gray-300 transition hover:text-white">
            Unpublish
          </span>
          <button className="rounded bg-[#9b59b6] px-4 py-1 text-sm font-medium transition hover:bg-[#8e44ad]">
            Share
          </button>
        </div>
      </header>

      {/* SIDEBAR + MAIN CONTENT WRAPPER (to offset navbar height) */}
      <div className="mt-[72px] flex w-full">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#3D2A4F] px-6 py-8 shadow-md border-r border-white/20">
          <nav className="space-y-1">
            <NavItem icon={<Squares2X2Icon className="h-5 w-5" />} label="Dashboard" />
            <NavItem icon={<LinkIcon className="h-5 w-5" />} label="Connections" />
            <NavItem icon={<CurrencyDollarIcon className="h-5 w-5" />} label="Pricing" />
            <NavItem icon={<ChartBarIcon className="h-5 w-5" />} label="Analytics" />
            <NavItemPro
              icon={<DocumentTextIcon className="h-5 w-5" />}
              label="Application Forms"
              proLabel="Pro"
            />
            {/* Make "Users" active on this page */}
            <NavItem icon={<UsersIcon className="h-5 w-5" />} label="Users" active />
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">
          {/* PAGE TITLE */}
          <h2 className="text-2xl font-semibold mb-8">Users</h2>

          {/* Invite Link Section */}
          <div className="rounded-lg bg-[#3D2A4F] p-4 shadow-lg mb-8">
            <h3 className="text-lg font-semibold mb-2">Your Invite Link</h3>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="flex-1 rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white"
              />
              <button
                onClick={handleCopyInviteLink}
                className="rounded bg-[#9b59b6] px-4 py-2 text-sm font-medium transition hover:bg-[#8e44ad] flex items-center space-x-1"
              >
                <ClipboardIcon className="h-5 w-5" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Users List */}
          <div className="rounded-lg bg-[#3D2A4F] p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Signed Up Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-[#2E173F]">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Invite Code</th>
                    <th className="px-4 py-2 text-left">Sign Up Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-white/20">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.inviteCode}</td>
                      <td className="px-4 py-2">{user.signUpDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UsersPage;

/* -------------------------------------------------------------------------- */
/*  NAV ITEMS COMPONENTS
/* -------------------------------------------------------------------------- */
function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-2 rounded px-3 py-2 text-sm font-medium transition ${
        active
          ? // Active item gets a lighter overlay to stand out
            "bg-white/10 text-white"
          : // Inactive item
            "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function NavItemPro({
  icon,
  label,
  proLabel,
}: {
  icon: React.ReactNode;
  label: string;
  proLabel: string;
}) {
  return (
    <div className="relative group">
      <a
        href="#"
        className="flex items-center space-x-2 rounded px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
      >
        {icon}
        <span>{label}</span>
      </a>
      {/* "Pro" badge */}
      <div className="absolute right-3 top-2">
        <span className="rounded bg-[#9b59b6] px-1.5 py-0.5 text-xs font-semibold text-white">
          {proLabel}
        </span>
      </div>
    </div>
  );
}
