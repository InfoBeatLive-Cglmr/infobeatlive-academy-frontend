'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  FolderOpenIcon,
  SignalIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface LectureHeaderProps {
  onOpenOverview: () => void;
  onOpenQuestions: () => void;
  onOpenResources: () => void;
  isLectureOngoing: boolean;
  stagedQuestionsCount: number;
}

export const LectureHeader: React.FC<LectureHeaderProps> = ({
  onOpenOverview,
  onOpenQuestions,
  onOpenResources,
  isLectureOngoing,
  stagedQuestionsCount
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-30 px-6 py-3 border-b backdrop-blur-xl transition-colors ${
      isDark ? 'bg-zinc-950/80 border-zinc-700 text-zinc-100' : 'bg-white/80 border-zinc-300 text-zinc-900'
    }`}>
      <div className="flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <SparklesIcon className="w-6 h-6" />
          </div>
          <div className='max-sm:hidden'>
            <div className="flex items-center ">
              <h1 className="text-xs font-extrabold tracking-tight"></h1>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm 
              text-[10px] font-bold uppercase tracking-wider ${
                isLectureOngoing
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                <SignalIcon className="w-3 h-3 animate-pulse" />
                {isLectureOngoing ? 'Live Lecture Ongoing' : 'Lecture Finished'}
              </span>
            </div>
            <p className={`text-xs  ${ isDark ? ' text-zinc-300' : ' text-zinc-600' }`}>InfoBeatLive AI Lecture Room</p>
          </div>
        </div>

        {/* Sticky Action Icons Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Icon 1: Course Overview & Topics */}
          <button
            onClick={onOpenOverview}
            title="Syllabus & Course Structure"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              isDark 
                ? 'bg-zinc-900 border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-800 text-zinc-200' 
                : 'bg-zinc-100 border-zinc-300 hover:border-emerald-500/50 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            <AcademicCapIcon className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Program</span>
          </button>

          {/* Icon 2: Ask Question / Queue */}
          <button
            onClick={onOpenQuestions}
            title="Ask Question During Lecture"
            className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              isDark 
                ? 'bg-zinc-900 border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-800 text-zinc-200' 
                : 'bg-zinc-100 border-zinc-300 hover:border-emerald-500/50 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            <QuestionMarkCircleIcon className="w-4 h-4 text-blue-400" />
            <span className="hidden md:inline">Question</span>
            {stagedQuestionsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                {stagedQuestionsCount}
              </span>
            )}
          </button>

          {/* Icon 3: Downloads & Class Settings */}
          <button
            onClick={onOpenResources}
            title="Handouts & Classroom Settings"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              isDark 
                ? 'bg-zinc-900 border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-800 text-zinc-200' 
                : 'bg-zinc-100 border-zinc-300 hover:border-emerald-500/50 hover:bg-zinc-200 text-zinc-800'
            }`}
          >
            <FolderOpenIcon className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">Resources</span>
          </button>

          <div className="h-4 w-px bg-zinc-700/50 my-auto" />

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-amber-400' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
            }`}
          >
            {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </header>
  );
};