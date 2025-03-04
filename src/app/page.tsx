"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// Firebase imports
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0IQTfxVqkTAh8wRm-c4WrX_z2XhaZAVk",
  authDomain: "subpace-2e410.firebaseapp.com",
  projectId: "subpace-2e410",
  storageBucket: "subpace-2e410.firebasestorage.app",
  messagingSenderId: "518089898921",
  appId: "1:518089898921:web:a07b8b542c503219c7a2b8",
  measurementId: "G-Q3WZR3Y1ZY"
};

// Initialize Firebase if it hasn't been initialized already
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// DashboardTabs component to handle tab switching between 3 pages
const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("page1");

  return (
    <div>
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab("page1")}
          className={`px-4 py-2 rounded-full border transition-colors ${
            activeTab === "page1"
              ? "bg-purple-600 text-white"
              : "bg-transparent text-gray-300 hover:bg-purple-700"
          }`}
        >
          Page 1
        </button>
        <button
          onClick={() => setActiveTab("page2")}
          className={`px-4 py-2 rounded-full border transition-colors ${
            activeTab === "page2"
              ? "bg-purple-600 text-white"
              : "bg-transparent text-gray-300 hover:bg-purple-700"
          }`}
        >
          Page 2
        </button>
        <button
          onClick={() => setActiveTab("page3")}
          className={`px-4 py-2 rounded-full border transition-colors ${
            activeTab === "page3"
              ? "bg-purple-600 text-white"
              : "bg-transparent text-gray-300 hover:bg-purple-700"
          }`}
        >
          Page 3
        </button>
      </div>

      <div className="rounded-lg border border-gray-700 bg-[#18181B] p-6">
        {activeTab === "page1" && <div className="text-white">Content for Dashboard Page 1</div>}
        {activeTab === "page2" && <div className="text-white">Content for Dashboard Page 2</div>}
        {activeTab === "page3" && <div className="text-white">Content for Dashboard Page 3</div>}
      </div>
    </div>
  );
};

// Features array
const features = [
  {
    id: "management",
    title: "Automated Member Management",
    description:
      "Seamlessly manage access across all your community platforms with our intelligent automation.",
    iconColor: "text-gray-300",
    image: "/images/management.png",
  },
  {
    id: "payment",
    title: "Integrated Payment Processing",
    description:
      "Accept payments globally with zero platform fees, supporting multiple payment methods and subscription models.",
    iconColor: "text-gray-300",
    image: "/images/payment.png",
  },
  {
    id: "analytics",
    title: "Real-time Analytics Dashboard",
    description:
      "Gain valuable insights into your community’s growth, revenue, and engagement with our comprehensive analytics.",
    iconColor: "text-purple-500",
    image: "/images/analytics.png",
  },
];

// A simple check icon
const CheckIcon = () => (
  <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-7.072 7.071a1 1 0 
         01-1.414 0L3.293 8.793a1 1 0 
         011.414-1.414l4.514 4.514 6.364-6.364a1 1 0 
         011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const Home: NextPage = () => {
  // State for feature selection
  const [activeFeature, setActiveFeature] = useState("management");
  const currentFeature = features.find((f) => f.id === activeFeature);

  // Firebase authentication state
  const [user, setUser] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Sign out handler
  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    setShowMenu(false);
  };

  return (
    <ParallaxProvider>
      <Head>
        <title>Sub[acce</title>
        <meta
          name="description"
          content="Transform your community into a thriving business with automated management and seamless monetization."
        />
      </Head>

      <div className="bg-gradient-to-b from-purple-900 to-black text-white">
        {/* HEADER */}
        <header className="relative z-50 flex items-center justify-between px-8 py-4">
          {/* Logo / Branding */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
              <span className="font-bold text-white">SP</span>
            </div>
            <span className="text-xl font-semibold">Subpace</span>
          </div>

          {/* Nav Links */}
          <nav className="space-x-8">
            <a href="#features" className="transition-colors hover:text-purple-300">
              Features
            </a>
            <a href="support" className="transition-colors hover:text-purple-300">
              Support
            </a>
            <a href="#pricing" className="transition-colors hover:text-purple-300">
              Pricing
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)}>
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth" className="transition-colors hover:text-purple-300">
                  Sign In
                </Link>
                <Link
                  href="/auth/"
                  className="rounded-full bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </header>

        {/* HERO SECTION (with bubbles) */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
          {/* Bubbles */}
          <div className="absolute inset-0 z-0">
            <div className="animate-blob absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-700 opacity-20 mix-blend-multiply blur-xl"></div>
            <div className="animation-delay-2000 animate-blob absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-700 opacity-20 mix-blend-multiply blur-xl"></div>
            <div className="animation-delay-4000 animate-blob absolute bottom-1/2 left-1/3 h-96 w-96 rounded-full bg-purple-700 opacity-20 mix-blend-multiply blur-xl"></div>
          </div>

          {/* HERO CONTENT with Parallax & Framer Motion */}
          <Parallax y={[-20, 20]}>
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Elevate Your Community,
                <br className="hidden md:block" />
                <span className="text-purple-500">Amplify Your Revenue</span>
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-gray-300">
                Name transforms your Discord, WhatsApp, or Slack community into a thriving
                business ecosystem. Automate, monetize, and analyze with unparalleled ease.
              </p>

              {/* Hero Buttons */}
              <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button className="rounded-full bg-purple-600 px-6 py-3 text-lg font-medium transition-colors hover:bg-purple-700">
                  Get started
                </button>
                <button className="inline-flex items-center justify-center rounded-full border border-[#A855F7]/20 bg-[#A855F7]/5 px-6 py-3 text-lg font-medium text-[#D8B4FE] transition-colors hover:bg-[#A855F7]/10">
                  Watch demo
                </button>
              </div>

              {/* Avatar Group */}
              <div className="mt-12 flex justify-center -space-x-4">
                <img
                  src="https://framerusercontent.com/images/XN0YuYNmd7UjrqYHr2IRXa2cpsU.png"
                  alt="User 1"
                  className="inline-block h-12 w-12 rounded-full object-cover ring-2 ring-black"
                />
                <img
                  src="https://framerusercontent.com/images/0knMe2r8BydAvxQmGV4Tj9mBHtQ.png"
                  alt="User 2"
                  className="inline-block h-12 w-12 rounded-full object-cover ring-2 ring-black"
                />
                <img
                  src="https://framerusercontent.com/images/nCISRN9m7kim4RUI2E3nis.jpg?scale-down-to=512"
                  alt="User 3"
                  className="inline-block h-12 w-12 rounded-full object-cover ring-2 ring-black"
                />
                <img
                  src="https://i.imgur.com/95rriLM.png"
                  alt="User 4"
                  className="inline-block h-12 w-12 rounded-full object-cover ring-2 ring-black"
                />
                <img
                  src="https://framerusercontent.com/images/iTkyi6khV2eoAN285pZRr9m6J4.png"
                  alt="User 5"
                  className="inline-block h-12 w-12 rounded-full object-cover ring-2 ring-black"
                />
                <img
                  src="https://framerusercontent.com/images/FXHB9g6Vxv51zxRkSHvfv9XUQ84.png"
                  alt="User 6"
                  className="inline-block h-12 w-12 rounded-full object-cover ring-2 ring-black"
                />
              </div>

              {/* Additional Info */}
              <p className="mt-4 text-sm text-gray-400">Join 1,000+ creators</p>

              {/* Trusted by Industry Leaders */}
              <div className="mt-8">
                <p className="mb-4 text-sm uppercase tracking-wider text-gray-300">
                  Trusted by industry leaders
                </p>
                <div className="flex items-center justify-center space-x-6">
                  <img
                    src="https://i.imgur.com/ju25I3S.png"
                    alt="Discord"
                    className="h-8 w-auto"
                  />
                  <img
                    src="https://i.imgur.com/8ScvdYv.png"
                    alt="Slack"
                    className="h-8 w-auto"
                  />
                  <img
                    src="https://i.imgur.com/LP0ikIn.png"
                    alt="WhatsApp"
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </motion.div>
          </Parallax>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="px-4 py-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            Powerful Features
          </h2>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* LEFT COLUMN: Clickable bullets (tabs) */}
            <div className="flex flex-col justify-center space-y-6 text-left">
              {features.map((feature) => {
                const isActive = feature.id === activeFeature;
                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`flex cursor-pointer items-start space-x-3 rounded-md p-4 transition-colors ${
                      isActive
                        ? "bg-[#1a1a1f] border-l-4 border-purple-500"
                        : "hover:bg-[#1a1a1f]"
                    }`}
                  >
                    <div
                      className={`mt-1 ${feature.iconColor} ${
                        isActive ? "text-purple-500" : ""
                      }`}
                    >
                      <CheckIcon />
                    </div>
                    <div>
                      <h3
                        className={`mb-1 text-lg font-semibold ${
                          isActive ? "text-purple-400" : "text-white"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Feature image */}
            <div className="flex items-center justify-center">
              {currentFeature && (
                <img
                  src={currentFeature.image}
                  alt={currentFeature.title}
                  className="w-full max-w-3xl rounded-lg object-cover"
                />
              )}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="px-4 py-20 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">Free, forever.</h2>
          <p className="mb-10 text-gray-400">Optional upgrade for additional features</p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <div className="flex flex-col justify-between rounded-lg bg-[#000000] p-8 text-left">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white">Free</h3>
                <p className="text-3xl font-bold text-white">$0</p>
                <ul className="mt-4 space-y-2 text-[#71717A]">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited members
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Connect WhatsApp, Discord &amp; Slack
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Accept Payments
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    No Platform Fees
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Analytics
                  </li>
                </ul>
              </div>
              <button className="mt-6 w-full rounded-full bg-white py-3 font-medium text-black transition hover:opacity-90">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="relative flex flex-col justify-between rounded-lg bg-[#F3E8FF] p-8 text-left text-black">
              <span className="absolute right-4 top-4 rounded bg-[#9333EA] px-2 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
              <div>
                <h3 className="mb-1 text-xl font-semibold">Pro</h3>
                <p className="mb-2 text-sm text-[#71717A]">A plan for growing communities</p>
                <p className="text-3xl font-bold">$29</p>
                <ul className="mt-4 space-y-2 text-[#71717A]">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Free +
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Application Forms
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Accept credit cards &amp; forms
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-[#9333EA]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Zapier integration
                  </li>
                </ul>
              </div>
              <button className="mt-6 w-full rounded-full bg-[#9333EA] py-3 font-medium text-white transition hover:opacity-90">
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-black px-4 py-20 text-center">
          <h2 className="mb-1 text-3xl font-bold text-white md:text-4xl">FAQs answered</h2>
          <p className="mb-10 text-gray-400">Everything you need to know about HiveCord</p>
          <div className="mx-auto max-w-2xl space-y-4 text-left">
            <details className="group border-b border-gray-700 py-4">
              <summary className="cursor-pointer list-none font-medium text-gray-200">
                How does it work?
              </summary>
              <p className="group-open:animate-fadeIn mt-2 text-sm text-gray-400">
                Our platform integrates seamlessly with Discord, WhatsApp, and Slack, automating
                member onboarding, payments, and analytics.
              </p>
            </details>
            <details className="group border-b border-gray-700 py-4">
              <summary className="cursor-pointer list-none font-medium text-gray-200">
                What happens if someone stops paying?
              </summary>
              <p className="group-open:animate-fadeIn mt-2 text-sm text-gray-400">
                If a member cancels or misses a payment, our system automatically revokes their
                access based on your chosen grace period.
              </p>
            </details>
            <details className="group border-b border-gray-700 py-4">
              <summary className="cursor-pointer list-none font-medium text-gray-200">
                How fast / easy is it to set up?
              </summary>
              <p className="group-open:animate-fadeIn mt-2 text-sm text-gray-400">
                You can get started in minutes by connecting your platform and configuring your
                pricing tiers. Our UI guides you every step of the way.
              </p>
            </details>
            <details className="group border-b border-gray-700 py-4">
              <summary className="cursor-pointer list-none font-medium text-gray-200">
                Can I add free trials, lifetime access, free tiers, and form submissions?
              </summary>
              <p className="group-open:animate-fadeIn mt-2 text-sm text-gray-400">
                Absolutely! We offer flexible monetization options, including free trials,
                lifetime passes, and even application forms for membership approvals.
              </p>
            </details>
            <details className="group border-b border-gray-700 py-4">
              <summary className="cursor-pointer list-none font-medium text-gray-200">
                How do my users cancel their subscription?
              </summary>
              <p className="group-open:animate-fadeIn mt-2 text-sm text-gray-400">
                Users can cancel directly from their account dashboard or by contacting support.
                Our system will automatically remove their access when the billing cycle ends.
              </p>
            </details>
            <details className="group border-b border-gray-700 py-4">
              <summary className="cursor-pointer list-none font-medium text-gray-200">
                How do my users and I get paid?
              </summary>
              <p className="group-open:animate-fadeIn mt-2 text-sm text-gray-400">
                We support multiple payment gateways. Funds go directly to your connected account,
                and you can track all transactions in real-time within your dashboard.
              </p>
            </details>
          </div>
          <div className="mt-8">
            <p className="mb-4 text-sm text-gray-300">Still have questions?</p>
            <button className="rounded-full bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700">
              Contact Support
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black px-8 py-12 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-4">
            {/* Brand + Tagline */}
            <div>
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                  <span className="font-bold text-white">NA</span>
                </div>
                <span className="text-xl font-semibold">Name</span>
              </div>
              <p className="mt-2 max-w-xs text-[#A1A1AA]">
                Transform your community into a thriving business with automated member management
                and seamless monetization.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                    alt="Twitter"
                    className="h-5 w-5 invert"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733609.png"
                    alt="GitHub"
                    className="h-5 w-5 invert"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                    alt="LinkedIn"
                    className="h-5 w-5 invert"
                  />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Product</h4>
              <ul className="space-y-2 text-[#A1A1AA]">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-[#A1A1AA]">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-[#A1A1AA]">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="mt-8 flex flex-col items-center justify-between border-t border-[#27272A] pt-4 sm:flex-row">
            <p className="text-sm text-[#A1A1AA]">© 2023 Name. All rights reserved.</p>
            <div className="mt-2 space-x-4 text-sm text-[#A1A1AA] sm:mt-0">
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Cookies
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ParallaxProvider>
  );
};

export default Home;
