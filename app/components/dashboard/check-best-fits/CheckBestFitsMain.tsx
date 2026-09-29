'use client';
import { useState, useMemo } from 'react';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import DashboardContent from '@/app/components/dashboard/DashboardContent';
import { useTheme } from '@/app/context/ThemeContext';
import { CheckBestFit } from './checkingService';
import { INITIAL_MOCK_CHECK_BEST_FITS } from './checkingService';
import CheckBestFitsForm from './CheckBestFitsForm';
import { CheckBestFitCard } from './CheckBestFitCard';

import { PlusIcon, MagnifyingGlassIcon, SparklesIcon, BookOpenIcon,
BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon } from 'lucide-react';

export default function  CheckBestFitsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Active Tab State: 'enrolled' or 'enroll_new'
  const [activeTab, setActiveTab] = useState<'enrolled' | 'enroll_new'>('enrolled');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Enrolled Programs Data State
  const [enrolledResearch, setEnrolledResearch] = useState<CheckBestFit []>(INITIAL_MOCK_CHECK_BEST_FITS);

  // Filtered Programs Search
  const filteredPrograms = useMemo(() => {
    if (!searchQuery.trim()) return enrolledResearch;
    const q = searchQuery.toLowerCase();
    return enrolledResearch.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.educationLevel.toLowerCase().includes(q) ||
        (p.employmentStatus && p.employmentStatus.toLowerCase().includes(q))
    );
  }, [enrolledResearch, searchQuery]);

  return (
    <DashboardLayout>
      <DashboardContent
        title=""
        description=""
      >
        <div className="max-w-7xl mx-auto -mt-6  space-y-6">

          {/* PAGE BANNER */} 
          <div
            className={`relative overflow-hidden rounded-2xl p-8 border ${
              isDark
                ? 'bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/30 border-zinc-700'
                : 'bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 border-zinc-300'
            } shadow`}
          >
            <div className="relative z-10 flex flex-col lg:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border 
                border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                  <SparklesIcon className="w-4 h-4" />  InfoBeatLive AI Diagnostic Engine
                </div>
                <h1 className={`text-xl sm:text-3xl tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  Discover Your Optimal Study Path
                </h1>
               
              <div className={`pt-2 flex flex-wrap items-center gap-6 text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-emerald-500" />
                  <span>30-Min Comprehensive Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                  <span>Localized Market Alignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                  <span>Interactive Audio & Text Roadmap</span>
                </div>
              </div>

              </div>

              <button
                type="button"
                onClick={() => setActiveTab('enroll_new')}
                className="shrink-0 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Create New Study Path</span>
              </button>
            </div>
          </div>

          {/* TAB BAR & CONDITIONAL SEARCH BAR */}
          <div className={`flex flex-row flex-wrap md:items-center rounded-xl justify-between gap-4 border 
            ${isDark ? 'border-zinc-700' : 'border-zinc-300'} p-4`}>
            {/* TABS */}
            <div className="flex flex-row flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('enrolled')}
                className={`px-5 py-2.5 rounded-xl text-xs max-sm:w-full font-extrabold transition-all flex items-center gap-2 ${
                  activeTab === 'enrolled'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : isDark ? 'bg-zinc-900 border border-zinc-700  text-zinc-400 hover:text-zinc-200' : 'bg-zinc-100 border border-zinc-300  text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <BookOpenIcon className="w-4 h-4" />
                <span>Discover Study Path Lists ({enrolledResearch.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('enroll_new')}
                className={`px-5  py-2.5 rounded-xl text-xs max-sm:w-full font-extrabold transition-all flex items-center gap-2 ${
                  activeTab === 'enroll_new'
                    ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20'
                    : isDark ? 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-zinc-200' : 'bg-zinc-100 border border-zinc-300 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <PlusIcon className="w-4 h-4" />
                <span>Create New Study Path</span>
              </button>

            </div>

            {/* SEARCH BAR (APPEARS ONLY IN ENROLLED TAB) */}
            {activeTab === 'enrolled' && (
              <div className="relative flex flex-1 w-full md:w-80">
                <MagnifyingGlassIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Books / study here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                    isDark ? 'bg-zinc-900/80 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                />
              </div>
            )}
          </div>

          {/* TAB CONTENT 1: ENROLLED PROGRAMS GRID */}
          {activeTab === 'enrolled' && (
            <div>
              {filteredPrograms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((prog) => (
                    <CheckBestFitCard key={prog.id} program={prog} />
                  ))}
                </div>
              ) : (
                <div className={`p-16 text-center rounded-2xl border
                 ${isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                  <BuildingLibraryIcon className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
                  <h3 className={`text-base font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>No Study Program Found</h3>
                  <p className="text-xs text-zinc-400 mt-1">Try adjusting your search criteria or enroll in a new study track.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'enroll_new' && (
            <CheckBestFitsForm />
          )}

        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}
