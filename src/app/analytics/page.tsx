"use client";
import React from "react";
import {
  Squares2X2Icon,
  LinkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowPathIcon, // for "Win Back" if you like
} from "@heroicons/react/24/outline";

const AnalyticsPage = () => {
  return (
    <div className="flex min-h-screen bg-[#2E173F] text-white">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-[#3D2A4F] px-8 py-4 shadow-md border-b border-white/20">
        <h2 className="text-2xl font-semibold">Subpace</h2>
        <div className="flex items-center space-x-4">
          <span className="cursor-pointer text-sm text-gray-300 transition hover:text-white">
            Unpublish
          </span>
          <button className="rounded bg-[#9b59b6] px-4 py-1 text-sm font-medium transition hover:bg-[#8e44ad]">
            Share
          </button>
        </div>
      </header>

      {/* SIDEBAR + MAIN CONTENT WRAPPER (offset for navbar) */}
      <div className="mt-[72px] flex w-full">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#3D2A4F] px-6 py-8 shadow-md border-r border-white/20">
          <nav className="space-y-1">
            <NavItem icon={<Squares2X2Icon className="h-5 w-5" />} label="Dashboard" />
            <NavItem icon={<LinkIcon className="h-5 w-5" />} label="Connections" />
            <NavItem icon={<CurrencyDollarIcon className="h-5 w-5" />} label="Pricing" />
            {/* Mark "Analytics" as active */}
            <NavItem icon={<ChartBarIcon className="h-5 w-5" />} label="Analytics" active />
            <NavItemPro
              icon={<DocumentTextIcon className="h-5 w-5" />}
              label="Application Forms"
              proLabel="Pro"
            />
            <NavItem icon={<UsersIcon className="h-5 w-5" />} label="Users" />
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">
          {/* PAGE TITLE & SUBTITLE */}
          <h1 className="text-2xl font-semibold mb-1">Analytics</h1>
          <p className="text-gray-300 mb-8">
            Here’s your analytics over the past 30 days
          </p>

          {/* TOP STATS GRID */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
            <StatBox
              icon={<CurrencyDollarIcon className="h-6 w-6 text-[#9b59b6]" />}
              title="Past 30 Days Revenue"
              value="$0.00 USD"
            />
            <StatBox
              icon={<UsersIcon className="h-6 w-6 text-[#9b59b6]" />}
              title="Active Subscribers"
              value="0"
            />
            <StatBox
              icon={<ChartBarIcon className="h-6 w-6 text-[#9b59b6]" />}
              title="MRR"
              value="$0.00 USD"
            />
            <StatBox
              icon={<ArrowPathIcon className="h-6 w-6 text-[#9b59b6]" />}
              title="Subscribers To Win Back"
              value="Coming soon"
            />
          </div>

          {/* BOTTOM PANELS */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Panel title="Overview">
              {/* Add your chart or overview data here */}
            </Panel>
            <Panel title="Recent Transactions">
              <p className="text-sm text-gray-300">You have no recent transactions</p>
            </Panel>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;

/* -------------------------------------------------------------------------- */
/*  NAV ITEMS
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
          ? "bg-white/10 text-white" // Active item
          : "text-gray-300 hover:bg-white/10 hover:text-white"
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
      <div className="absolute right-3 top-2">
        <span className="rounded bg-[#9b59b6] px-1.5 py-0.5 text-xs font-semibold text-white">
          {proLabel}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  STAT BOX COMPONENT
/* -------------------------------------------------------------------------- */
function StatBox({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-[#3D2A4F] p-4 shadow flex items-center space-x-3">
      {/* Icon */}
      <div className="flex-shrink-0">{icon}</div>
      {/* Text */}
      <div>
        <p className="text-sm text-gray-300">{title}</p>
        <p className="mt-1 text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  PANEL COMPONENT
/* -------------------------------------------------------------------------- */
function Panel({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-[#3D2A4F] p-4 shadow">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
