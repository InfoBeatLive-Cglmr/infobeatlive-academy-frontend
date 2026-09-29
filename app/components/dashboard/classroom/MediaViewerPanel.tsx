'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {
  VideoCameraIcon,
  DocumentDuplicateIcon,
  PhotoIcon,
  CodeBracketIcon,
  PlayIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export const MediaViewerPanel: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'video' | 'template' | 'documents' | 'media'>('video');

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
      
      {/* Sub-Header Tabs */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        isDark ? 'bg-zinc-950 border-zinc-700' : 'bg-white border-zinc-300'
      }`}>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'video'
                ? 'bg-emerald-500 text-zinc-950 font-bold'
                : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <VideoCameraIcon className="w-4 h-4" />
            <span>Video Stream</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'documents'
                ? 'bg-emerald-500 text-zinc-950 font-bold'
                : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
            <span>PDF Viewer</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'media'
                ? 'bg-emerald-500 text-zinc-950 font-bold'
                : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <PhotoIcon className="w-4 h-4" />
            <span>Media Viewer</span>
          </button>
        </div>
      </div>

      {/* Main Heavy Content Display Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center items-center">
        
        {/* VIDEO PLAYER TAB */}
        {activeTab === 'video' && (
          <div className="w-full max-w-4xl space-y-4">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-700 
            shadow-2xl flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10" />
              
              {/* Simulated Live Video Player UI */}
              <div className="relative z-20 text-center space-y-3">
                <button className="w-16 h-16 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center 
                mx-auto shadow-2xl hover:scale-105 transition-transform">
                  <PlayIcon className="w-8 h-8 ml-1" />
                </button>
                <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                  • Master Lecture Video Broadcast
                </p>
              </div>

              {/* Live Overlay Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md 
                px-3 py-1.5 rounded-full border border-zinc-700">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">LIVE HD</span>
              </div>
            </div>

          </div>
        )}

        {/* PDF DOCUMENT VIEWER TAB */}
        {activeTab === 'documents' && (
          <div className="w-full h-full max-w-4xl flex flex-col items-center justify-center p-12 text-center space-y-4">
            <DocumentDuplicateIcon className="w-16 h-16 text-emerald-500 animate-bounce" />
            <h3 className="text-lg font-bold">Interactive Academic PDF Viewer</h3>
            <p className="text-xs text-zinc-500 max-w-md">
              Rendering official lecture manual slides and mathematical proofs directly in embedded high-definition canvas.
            </p>
          </div>
        )}

        {/* HEAVY MEDIA TAB */}
        {activeTab === 'media' && (
          <div className="w-full h-full max-w-4xl flex flex-col items-center justify-center p-12 text-center space-y-4">
            <PhotoIcon className="w-16 h-16 text-purple-400" />
            <h3 className="text-lg font-bold">3D Spatial Models & High-Res Schematics</h3>
            <p className="text-xs text-zinc-500 max-w-md">
              GPU-accelerated WebGL assets, cluster topologies, and interactive architectural diagrams.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};