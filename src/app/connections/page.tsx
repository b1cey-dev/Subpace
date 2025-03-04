"use client";
import React, { useState } from "react";
import {
  Squares2X2Icon,
  LinkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/*  CONNECTIONS PAGE
/* -------------------------------------------------------------------------- */
export default function ConnectionsPage() {
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);

  // Discord multi-step flow
  // 0 = not open, 1 = step1, 2 = step2
  const [discordStep, setDiscordStep] = useState(0);

  const handleCloseAllModals = () => {
    setIsPlatformModalOpen(false);
    setDiscordStep(0);
  };

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
            {/* Mark "Connections" as active */}
            <NavItem icon={<LinkIcon className="h-5 w-5" />} label="Connections" active />
            <NavItem icon={<CurrencyDollarIcon className="h-5 w-5" />} label="Pricing" />
            <NavItem icon={<ChartBarIcon className="h-5 w-5" />} label="Analytics" />
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
          <h1 className="mb-2 text-2xl font-semibold">Connections</h1>
          <p className="mb-6 text-sm text-gray-300">
            Connect Discord, Slack, Telegram, or WhatsApp.
            <br />
            Need help? Book a 15-minute discovery call.
          </p>
          <button
            onClick={() => setIsPlatformModalOpen(true)}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Connect platform
          </button>
        </main>
      </div>

      {/* 1) CONNECT PLATFORM MODAL */}
      {isPlatformModalOpen && (
        <ConnectPlatformModal
          onClose={handleCloseAllModals}
          onSelectDiscord={() => {
            // close platform modal, open Discord step 1
            setIsPlatformModalOpen(false);
            setDiscordStep(1);
          }}
        />
      )}

      {/* 2) DISCORD STEP 1 MODAL */}
      {discordStep === 1 && (
        <DiscordStep1Modal
          onClose={handleCloseAllModals}
          onHaveServer={() => {
            // proceed to step 2
            setDiscordStep(2);
          }}
        />
      )}

      {/* 3) DISCORD STEP 2 MODAL */}
      {discordStep === 2 && (
        <DiscordStep2Modal
          onClose={handleCloseAllModals}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MODAL: CONNECT PLATFORM
/* -------------------------------------------------------------------------- */
function ConnectPlatformModal({
  onClose,
  onSelectDiscord,
}: {
  onClose: () => void;
  onSelectDiscord: () => void;
}) {
  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      {/* White popup card */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[400px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 text-black shadow-lg">
        {/* Close button (X) */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        <h2 className="mb-1 text-xl font-semibold">Connect platform</h2>
        <p className="mb-6 text-sm text-gray-600">
          Connect the platform where you&apos;ll host your community 🚀
        </p>

        {/* Platforms Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Discord */}
          <PlatformButton
            label="Discord"
            bgColor="#5865F2"
            onClick={onSelectDiscord}
          />
          {/* Slack (Coming Soon) */}
          <PlatformButton label="Slack" bgColor="#4A154B" comingSoon />
          {/* WhatsApp (Coming Soon) */}
          <PlatformButton label="WhatsApp" bgColor="#25D366" comingSoon />
          {/* Telegram (Coming Soon) */}
          <PlatformButton label="Telegram" bgColor="#229ED9" comingSoon />
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  MODAL: DISCORD STEP 1
/* -------------------------------------------------------------------------- */
function DiscordStep1Modal({
  onClose,
  onHaveServer,
}: {
  onClose: () => void;
  onHaveServer: () => void;
}) {
  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      {/* White popup card */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[400px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 text-black shadow-lg">
        {/* Close button (X) */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        <h2 className="mb-1 text-xl font-semibold">Connect Discord</h2>
        <p className="mb-6 text-sm text-gray-600">Step 1: Create a Discord server</p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            className="flex-1 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            onClick={() => {
              alert("Create a server flow goes here!");
              // Possibly go straight to step 2 or close, up to you
            }}
          >
            Create a server now
          </button>
          <button
            className="flex-1 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            onClick={onHaveServer}
          >
            I have a server
          </button>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  MODAL: DISCORD STEP 2
/* -------------------------------------------------------------------------- */
function DiscordStep2Modal({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      {/* White popup card */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[400px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 text-black shadow-lg">
        {/* Close button (X) */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        <h2 className="mb-1 text-xl font-semibold">Add name Bot</h2>
        <p className="mb-6 text-sm text-gray-600">Step 2: Connect the name bot to your server</p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            className="flex-1 rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            onClick={() => {
              alert("Connect subbb bot flow goes here!");
              onClose();
            }}
          >
            Connect name bot
          </button>
          <button
            className="flex-1 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  PLATFORM BUTTON
/* -------------------------------------------------------------------------- */
function PlatformButton({
  label,
  bgColor,
  onClick,
  comingSoon,
}: {
  label: string;
  bgColor: string;
  onClick?: () => void;
  comingSoon?: boolean;
}) {
  return (
    <div
      onClick={comingSoon ? undefined : onClick}
      style={{ backgroundColor: bgColor }}
      className={`relative flex h-16 cursor-pointer items-center justify-center rounded text-white ${
        comingSoon ? "opacity-70" : "hover:opacity-90"
      }`}
    >
      <span className="font-medium">{label}</span>
      {comingSoon && (
        <span className="absolute top-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
          Coming soon
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SIDEBAR NAV ITEMS
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
          : "text-gray-300 hover:bg-white/10 hover:text-white" // Inactive
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
