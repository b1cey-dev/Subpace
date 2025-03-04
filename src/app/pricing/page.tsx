"use client";
import React, { FC, useState } from "react";
import {
  Squares2X2Icon,
  LinkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

/* -------------------------------------------------------------------------- */
/*  PRICING PAGE COMPONENT
/* -------------------------------------------------------------------------- */
const PricingPage: FC = () => {
  const [addInitiationFee, setAddInitiationFee] = useState(false);
  const [visible, setVisible] = useState(true);
  const [disableCheckout, setDisableCheckout] = useState(false);

  // Track if "Edit Tier" modal is open
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

      {/* SIDEBAR + MAIN CONTENT WRAPPER (offset for navbar) */}
      <div className="mt-[72px] flex w-full">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#3D2A4F] px-6 py-8 shadow-md border-r border-white/20">
          <nav className="space-y-1">
            <NavItem icon={<Squares2X2Icon className="h-5 w-5" />} label="Dashboard" />
            <NavItem icon={<LinkIcon className="h-5 w-5" />} label="Connections" />
            {/* Mark "Pricing" as active */}
            <NavItem icon={<CurrencyDollarIcon className="h-5 w-5" />} label="Pricing" active />
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
          {/* PAGE HEADING */}
          <h2 className="text-2xl font-semibold mb-2">Pricing Tiers</h2>
          <p className="mb-8 text-sm text-gray-300">
            Add tiers to your Name. You can assign various benefits and roles to each perk.
          </p>

          {/* PRICING CARD */}
          <div className="rounded-lg bg-[#3D2A4F] p-6 shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Membership</h3>
              <p className="text-sm text-gray-300">Free</p>
            </div>

            <div className="space-y-4">
              {/* ADD INITIATION FEE */}
              <ToggleRow
                label="Add initiation fee"
                checked={addInitiationFee}
                onChange={() => setAddInitiationFee(!addInitiationFee)}
              />

              {/* VISIBLE */}
              <ToggleRow
                label="Visible"
                checked={visible}
                onChange={() => setVisible(!visible)}
              />

              {/* EDIT TIER + NO PLATFORM CONNECTED */}
              <div className="flex items-center justify-between">
                <div>
                  <button
                    className="rounded bg-white/10 px-3 py-1 text-sm font-medium hover:bg-white/20"
                    onClick={() => setIsEditModalOpen(true)} // Open the modal
                  >
                    Edit tier
                  </button>
                  <span className="ml-3 text-sm text-gray-400">No platform connected</span>
                </div>
              </div>

              {/* CREATE TIER + DISABLE CHECKOUT */}
              <div className="flex items-center justify-between">
                <button className="rounded bg-[#9b59b6] px-3 py-1 text-sm font-medium transition hover:bg-[#8e44ad]">
                  Create tier
                </button>
                <ToggleRow
                  label="Disable checkout"
                  checked={disableCheckout}
                  onChange={() => setDisableCheckout(!disableCheckout)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Conditionally render the "Edit Tier" modal */}
      {isEditModalOpen && (
        <EditTierModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};

export default PricingPage;

/* -------------------------------------------------------------------------- */
/*  EDIT TIER MODAL
/* -------------------------------------------------------------------------- */
function EditTierModal({ onClose }: { onClose: () => void }) {
  // Local state for the "Application form" toggle
  const [appForm, setAppForm] = useState(false);

  return (
    <>
      {/* Dark overlay: closes modal on click */}
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />

      {/* Centered modal container */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[400px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 text-black shadow-lg">
        {/* Close (X) button */}
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        <h3 className="mb-1 text-xl font-semibold">Membership</h3>
        <p className="mb-3 text-sm text-gray-600">Free</p>

        {/* Application Form Toggle + Pro badge */}
        <div className="mb-4 flex items-center">
          {/* Toggle for "Application form" */}
          <label className="relative inline-flex cursor-pointer items-center mr-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={appForm}
              onChange={() => setAppForm(!appForm)}
            />
            {/* The toggle uses your brand colors */}
            <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9b59b6] peer-checked:after:translate-x-full peer-checked:after:border-white" />
          </label>
          <span className="text-sm font-medium text-gray-800">Application form</span>

          {/* Pro badge (floats to the right) */}
          <span className="ml-auto inline-block rounded bg-[#9b59b6] px-2 py-0.5 text-xs font-semibold text-white">
            Pro
          </span>
        </div>

        {/* Description */}
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          placeholder=""
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#9b59b6]"
        />

        {/* Subscriber gets */}
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Subscriber gets
        </label>
        <p className="mb-4 text-sm text-red-500">No platform connected</p>

        {/* Add a platform connection */}
        <button
          className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          onClick={() => alert("Platform connection flow goes here!")}
        >
          Add a platform connection
        </button>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  REUSABLE NAV ITEM COMPONENTS
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

/* -------------------------------------------------------------------------- */
/*  TOGGLE ROW COMPONENT
/* -------------------------------------------------------------------------- */
function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        {/* The toggle also uses your brand purple */}
        <div className="peer h-5 w-9 rounded-full bg-white/20 after:absolute after:top-0.5 after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#9b59b6] peer-checked:after:translate-x-full peer-checked:after:border-white" />
      </label>
    </div>
  );
}
