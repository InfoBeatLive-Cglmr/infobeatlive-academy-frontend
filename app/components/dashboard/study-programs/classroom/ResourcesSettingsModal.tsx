'use client';
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { XMarkIcon, ArrowDownTrayIcon, DocumentTextIcon, LifebuoyIcon } from '@heroicons/react/24/outline';

interface ResourcesSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface LectureResource {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'transcript' | 'zip' | 'link';
  icon:any;
  size: string;
  downloadUrl: string;
}

export const MOCK_RESOURCES: LectureResource[] = [
  { id: 'r1', title: 'Generate Lecture Handout (PDF)', type: 'pdf', 
  size: 'Download Lecture Handout', downloadUrl: '#', icon: ArrowDownTrayIcon },

  { id: 'r2', title: 'Generate And Share Public Link', type: 'link', 
  size: 'Share Public Lecture Link', downloadUrl: '#', icon: LifebuoyIcon },
 
];

export const ResourcesSettingsModal: React.FC<ResourcesSettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
      }`}>
        
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
          
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Downloadable Academic Handouts</h4>
            <div className="space-y-2">
              {MOCK_RESOURCES.map((res) => (
                <div
                  key={res.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between
                     ${ isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-50 border-zinc-300' }`}
                >
                  <div>
                    <p className="text-xs font-bold">{res.title}</p>
                    <p className="text-[10px] text-zinc-500 font-mono">{res.type.toUpperCase()} • {res.size}</p>
                  </div>
                  <a
                    href={res.downloadUrl}
                    className={`p-2 rounded-xl border border-emerald-500  
                    ${ isDark ? 'bg-zinc-900 border-zinc-600' : 'bg-zinc-50 border-zinc-400' }
                     transition-colors `}>
                    <LifebuoyIcon className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};