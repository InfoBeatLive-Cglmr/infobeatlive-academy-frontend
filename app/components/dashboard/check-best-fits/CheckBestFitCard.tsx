'use client';
import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { CheckBestFit } from './checkingService';
import {
  PlayIcon,
  DocumentTextIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

interface CheckBestFitProps {
  program: CheckBestFit;
}

export const CheckBestFitCard: React.FC<CheckBestFitProps> = ({ program }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* PROGRAM CARD */}
      <div
        className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow ${
          isDark
            ? 'bg-zinc-900/70 border-zinc-700 hover:border-emerald-500/40'
            : 'bg-white border-zinc-300  hover:border-emerald-500/40'
        }`}
      >
        <div>
          {/* BADGES */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border 
            border-emerald-500/20 text-emerald-400 text-[10px] font-bold 
            uppercase tracking-wider flex items-center gap-1">
              {/* <span>{program.countryFlag}</span> */}
              <span>{program.country}</span>
            </span>

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                program.employmentStatus === 'employed'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
              }`}
            >
              {program.employmentStatus.replace('_', ' ')}
            </span>
          </div>

          <h3 className={`text-xs font-black tracking-tight mb-1 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
            {program.title}
          </h3>

          <p className="text-xs font-semibold text-emerald-500 mb-3 flex items-center gap-1.5">
            <BuildingLibraryIcon className="w-4 h-4" />
            {'InfoBeatLive AI Diagnostic Engine'}
            {/* {program.educationLevel} */}
          </p>

          <p className={`text-xs line-clamp-3 mb-6 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {program.description}
          </p>

          {/* PROGRESS & METADATA */}
          <div
            className={`p-3.5 rounded-xl border text-xs space-y-2 mb-6 ${
              isDark ? 'bg-zinc-950/60 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Study Progress:</span>
              <span className="font-bold text-emerald-400">{program.completionPercentage}%</span>
            </div>

            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{ width: `${program.completionPercentage}%` }}
              />
            </div>

            <div
              className={`flex items-center justify-between text-[11px] ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              } pt-1`}
            >
              <span>
                {program.topicsCompleted} / {program.totalTopics} Topics
              </span>
              <span>
                Latest Update: <strong>{program.updatedAt}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* TWO BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/60">
          <button
            type="button"
            className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <PlayIcon className="w-3.5 h-3.5 fill-current" />
            <span>Study</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4 text-emerald-500" />
            <span>{program.language.replace('_', ' ')}</span>
          </button>
        </div>
      </div>
    </>
  );
};
