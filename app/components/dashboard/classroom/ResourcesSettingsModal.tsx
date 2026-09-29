'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { MOCK_RESOURCES } from './mockLectureData';
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  Cog6ToothIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface ResourcesSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourcesSettingsModal: React.FC<ResourcesSettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [autoCaptions, setAutoCaptions] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isDark ? 'border-zinc-700 bg-zinc-900/50' : 'border-zinc-300 bg-zinc-50'
        }`}>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold">Lecture Resources & Controls</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-zinc-700 hover:bg-zinc-800">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Downloadable Handouts & Transcripts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Downloadable Academic Handouts</h4>
            <div className="space-y-2">
              {MOCK_RESOURCES.map((res) => (
                <div
                  key={res.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                    isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{res.title}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{res.type.toUpperCase()} • {res.size}</p>
                  </div>
                  <a
                    href={res.downloadUrl}
                    className="p-2 rounded-xl border border-emerald-500 text-emerald-400 
                    hover:bg-emerald-500 hover:text-zinc-950 transition-colors"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Classroom Preferences & Toggles */}
          <div className="space-y-3 pt-4 border-t border-zinc-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Cog6ToothIcon className="w-4 h-4" /> Classroom Audio & Media Settings
            </h4>

            <div className="space-y-3">
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
              }`}>
                <div className="flex items-center gap-3">
                  {isAudioMuted ? (
                    <SpeakerXMarkIcon className="w-5 h-5 text-rose-400" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5 text-emerald-400" />
                  )}
                  <div>
                    <p className="text-xs font-bold">Mute Classroom Audio</p>
                    <p className="text-[10px] text-zinc-500">Toggle live lecture audio output during reading mode</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAudioMuted}
                  onChange={(e) => setIsAudioMuted(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};