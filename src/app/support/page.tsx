"use client";

import type { NextPage } from "next";
import Head from "next/head";
import {
  BookOpenIcon,
  LightBulbIcon,
  PlayIcon,
  MicrophoneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PhoneIcon,
  VideoCameraIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const SupportPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Supace — Support & Resources</title>
        <meta
          name="description"
          content="Everything you need to succeed with HiredCard. Find answers, explore resources, and get in touch with our team."
        />
      </Head>

      {/* Page Background */}
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
        {/* HEADER */}
        <header className="flex items-center justify-between px-8 py-4">
          {/* Logo / Branding */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
              <span className="font-bold text-white">HC</span>
            </div>
            <span className="text-xl font-semibold">HiredCard</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden space-x-8 md:block">
            <a href="#features" className="transition-colors hover:text-purple-300">
              Features
            </a>
            <a href="#how" className="transition-colors hover:text-purple-300">
              How it Works
            </a>
            <a href="/support" className="transition-colors hover:text-purple-300">
              Support
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="transition-colors hover:text-purple-300">
              Sign In
            </button>
            <button className="rounded-full bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-700">
              Get Started
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <main className="flex flex-col items-center justify-center px-4 py-24 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            Support &amp; Resources
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-gray-300">
            Everything you need to succeed with HiredCard. Find answers, explore resources, and get in touch with our team.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button className="rounded-full bg-purple-600 px-6 py-3 text-lg font-medium transition-colors hover:bg-purple-700">
              Get Support
            </button>
            <button
              className="rounded-full border px-6 py-3 text-lg font-medium transition-colors"
              style={{
                borderColor: "#A855F7",
                backgroundColor: "#A855F7" + "1A", // 10% opacity
                color: "#A855F7",
              }}
            >
              Explore Resources
            </button>
          </div>
        </main>

        {/* RESOURCES SECTION */}
        <section className="px-4 py-20">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Resources
          </h2>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1: Documentation */}
            <div className="rounded-lg bg-[#18181B] p-6 border border-[#27272A]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Documentation
              </h3>
              <p className="mb-6 text-gray-300">
                Comprehensive guides and API references for seamless integration.
              </p>
              <a href="#" className="font-medium text-purple-300 hover:underline">
                Explore &rarr;
              </a>
            </div>

            {/* Card 2: Tutorials */}
            <div className="rounded-lg bg-[#18181B] p-6 border border-[#27272A]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                <LightBulbIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Tutorials
              </h3>
              <p className="mb-6 text-gray-300">
                Step-by-step tutorials to help you master HiredCard features.
              </p>
              <a href="#" className="font-medium text-purple-300 hover:underline">
                Explore &rarr;
              </a>
            </div>

            {/* Card 3: Video Guides */}
            <div className="rounded-lg bg-[#18181B] p-6 border border-[#27272A]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                <PlayIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Video Guides
              </h3>
              <p className="mb-6 text-gray-300">
                Visual walkthroughs of key HiredCard functionalities.
              </p>
              <a href="#" className="font-medium text-purple-300 hover:underline">
                Explore &rarr;
              </a>
            </div>

            {/* Card 4: Webinars */}
            <div className="rounded-lg bg-[#18181B] p-6 border border-[#27272A]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                <MicrophoneIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Webinars
              </h3>
              <p className="mb-6 text-gray-300">
                Live and recorded sessions with HiredCard experts.
              </p>
              <a href="#" className="font-medium text-purple-300 hover:underline">
                Explore &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* GET IN TOUCH SECTION */}
        <section className="relative px-4 py-20">
          {/* 
            If you want a fancy purple glow or radial background behind the section,
            you can absolutely position a div with a gradient or a blur. 
            For simplicity, we’ll just add a subtle gradient:
          */}
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.2),_transparent_70%)]"
          />
          <div className="mx-auto flex max-w-6xl flex-col justify-between space-y-8 md:flex-row md:space-y-0">
            {/* Contact Info */}
            <div className="md:w-1/2">
              <h2 className="mb-6 text-3xl font-bold text-white">Get in Touch</h2>
              <p className="mb-8 text-gray-300">
                We&apos;re here to help. Reach out to us through any of these channels:
              </p>

              <div className="mb-6 flex items-center space-x-4">
                <PhoneIcon className="h-6 w-6 text-purple-400" />
                <span className="text-gray-200">(305) 123-4567</span>
              </div>
              <div className="mb-6 flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H8m8 4H8m8-8H8m13-2.5a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 011 5.5v-1A2.5 2.5 0 013.5 2h15A2.5 2.5 0 0121 4.5v1z"
                  />
                </svg>
                <span className="text-gray-200">support@hiredcard.com</span>
              </div>
              <div className="mb-6 flex items-center space-x-4">
                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-purple-400" />
                <span className="text-gray-200">
                  Live Chat (Mon-Fri: 9am-5pm EST)
                </span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-lg bg-[#18181B] p-6 shadow-lg md:w-1/2 md:ml-8 border border-[#27272A]">
              <h3 className="mb-4 text-2xl font-semibold text-white">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-[#3F3F46] bg-[#27272A] px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-[#3F3F46] bg-[#27272A] px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1 text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-md border border-[#3F3F46] bg-[#27272A] px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SupportPage;
