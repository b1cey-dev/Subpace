"use client";
import { NextPage } from "next";
import Head from "next/head";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  CogIcon,
  LinkIcon,
  TagIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const FormsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Subpace — Application Forms</title>
        <meta
          name="description"
          content="Create, edit, and analyze your application forms."
        />
      </Head>

      {/* Overall page background */}
      <div className="flex min-h-screen bg-[#2E173F] text-white">
      <aside className="flex w-64 flex-col bg-[#3D2A4F]">
  <div className="flex items-center space-x-2 px-4 py-6">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A844E7]">
      <span className="font-bold text-white">HC</span>
    </div>
    <span className="text-xl font-semibold">Subpace</span>
  </div>

  <nav className="mt-4 flex-1 space-y-1 px-2">
    {/* Example links */}
    <a
      href="/dashboard"
      className="flex items-center space-x-2 rounded-md px-3 py-2 text-[#8E7BAA] hover:bg-[#2E173F] hover:text-white"
    >
      <CogIcon className="h-5 w-5" />
      <span>Design</span>
    </a>
    <a
      href="#"
      className="flex items-center space-x-2 rounded-md px-3 py-2 text-[#8E7BAA] hover:bg-[#2E173F] hover:text-white"
    >
      <LinkIcon className="h-5 w-5" />
      <span>Connections</span>
    </a>
    <a
      href="#"
      className="flex items-center space-x-2 rounded-md px-3 py-2 text-[#8E7BAA] hover:bg-[#2E173F] hover:text-white"
    >
      <TagIcon className="h-5 w-5" />
      <span>Pricing</span>
    </a>
    <a
      href="#"
      className="flex items-center space-x-2 rounded-md px-3 py-2 text-[#8E7BAA] hover:bg-[#2E173F] hover:text-white"
    >
      <ChartBarIcon className="h-5 w-5" />
      <span>Analytics</span>
    </a>

    {/* "Pro" badge on the link */}
    <a
      href="#"
      className="flex items-center justify-between rounded-md bg-[#2E173F] px-3 py-2 text-white"
    >
      {/* Left side: icon + label */}
      <div className="flex items-center space-x-2">
        <DocumentTextIcon className="h-5 w-5" />
        <span>Application Forms</span>
      </div>
      {/* Right side: "Pro" pill */}
      <span className="rounded-full bg-[#A844E7] px-2 py-0.5 text-xs font-medium text-white">
        Pro
      </span>
    </a>

    <a
      href="#"
      className="flex items-center space-x-2 rounded-md px-3 py-2 text-[#8E7BAA] hover:bg-[#2E173F] hover:text-white"
    >
      <UserIcon className="h-5 w-5" />
      <span>Users</span>
    </a>
  </nav>
</aside>


        {/* MAIN CONTENT */}
        <main className="flex-1 px-6 py-8">
          {/* PAGE HEADER */}
          <header className="mb-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Application Forms</h1>
              <p className="mt-1 text-[#8E7BAA]">
                Manage your forms — create, edit, and analyze your application forms
              </p>
            </div>
            <button className="flex items-center space-x-2 rounded-md bg-[#A844E7] px-4 py-2 font-medium text-white transition-colors hover:bg-[#8E7BAA]">
              <PlusIcon className="h-5 w-5" />
              <span>Create New Form</span>
            </button>
          </header>

          {/* TABS */}
          <div className="mb-4 flex space-x-6 border-b border-[#4D3A5F] text-sm">
            {/* Active tab: All Forms */}
            <button className="relative pb-2 text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#A844E7]">
              All Forms
            </button>
            {/* Example of additional tabs (inactive):
            <button className="pb-2 text-[#8E7BAA] hover:text-white">
              Drafts
            </button>
            <button className="pb-2 text-[#8E7BAA] hover:text-white">
              Archived
            </button>
            */}
          </div>

          {/* SEARCH + SORT */}
          <div className="mb-4 flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
            {/* Search bar */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search forms..."
                className="w-full rounded-md bg-[#3D2A4F] px-4 py-2 text-sm text-white placeholder-[#8E7BAA] focus:outline-none focus:ring-2 focus:ring-[#A844E7]"
              />
            </div>
            {/* Sort dropdown */}
            <div>
              <label htmlFor="sortBy" className="mr-2 text-sm text-[#8E7BAA]">
                Sort By
              </label>
              <select
                id="sortBy"
                className="rounded-md bg-[#3D2A4F] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#A844E7]"
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>
          </div>

          {/* TABLE CARD */}
          <div className="overflow-hidden rounded-lg bg-[#3D2A4F] p-4 shadow">
            <h2 className="mb-4 text-lg font-semibold">Application Forms</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead className="border-b border-[#4D3A5F] text-sm uppercase text-[#C9C9C9]">
                  <tr>
                    <th className="px-4 py-3">Form Name</th>
                    <th className="px-4 py-3">Questions</th>
                    <th className="px-4 py-3">Submissions</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Updated</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4D3A5F] text-sm">
                  {/* ROW 1 */}
                  <tr>
                    <td className="px-4 py-3">Community Membership</td>
                    <td className="px-4 py-3">5</td>
                    <td className="px-4 py-3">120</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-[#22C55E] bg-opacity-20 px-2 py-1 text-xs font-medium text-[#22C55E]">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">2023-06-15</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-[#A844E7]">
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-red-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* ROW 2 */}
                  <tr>
                    <td className="px-4 py-3">Event Registration</td>
                    <td className="px-4 py-3">8</td>
                    <td className="px-4 py-3">60</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-[#8E7BAA] bg-opacity-20 px-2 py-1 text-xs font-medium text-[#8E7BAA]">
                        Draft
                      </span>
                    </td>
                    <td className="px-4 py-3">2023-06-10</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-[#A844E7]">
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-red-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* ROW 3 */}
                  <tr>
                    <td className="px-4 py-3">Feedback Survey</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3">40</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-[#8E7BAA] bg-opacity-20 px-2 py-1 text-xs font-medium text-[#8E7BAA]">
                        Draft
                      </span>
                    </td>
                    <td className="px-4 py-3">2023-06-08</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-[#A844E7]">
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-red-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* ROW 4 */}
                  <tr>
                    <td className="px-4 py-3">Partner Application</td>
                    <td className="px-4 py-3">7</td>
                    <td className="px-4 py-3">25</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-[#22C55E] bg-opacity-20 px-2 py-1 text-xs font-medium text-[#22C55E]">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">2023-06-05</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-[#A844E7]">
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-red-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* ROW 5 */}
                  <tr>
                    <td className="px-4 py-3">Content Submission</td>
                    <td className="px-4 py-3">7</td>
                    <td className="px-4 py-3">47</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-[#8E7BAA] bg-opacity-20 px-2 py-1 text-xs font-medium text-[#8E7BAA]">
                        Draft
                      </span>
                    </td>
                    <td className="px-4 py-3">2023-05-30</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-[#A844E7]">
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button className="rounded bg-[#4D3A5F] p-2 transition hover:bg-red-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM STATS */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg bg-[#3D2A4F] p-4">
              <p className="text-sm text-[#8E7BAA]">Total Forms</p>
              <p className="mt-1 text-2xl font-semibold">5</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-[#3D2A4F] p-4">
              <p className="text-sm text-[#8E7BAA]">Total Submissions</p>
              <p className="mt-1 text-2xl font-semibold">353</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-[#3D2A4F] p-4">
              <p className="text-sm text-[#8E7BAA]">Active Forms</p>
              <p className="mt-1 text-2xl font-semibold">2</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FormsPage;
