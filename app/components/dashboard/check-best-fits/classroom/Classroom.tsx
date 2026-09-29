'use client';

import React, { useState, useRef } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { StagedQuestion } from './types';

import { LectureHeader } from './LectureHeader';
import { TextualLecturePanel } from './TextualLecturePanel';
import { Sidebar } from './Sidebar';

import { CourseOverviewModal } from './CourseOverviewModal';
import { InLectureQuestionModal } from './InLectureQuestionModal';
import { ResourcesSettingsModal } from './ResourcesSettingsModal';

//we will use: Coqui XTTS v2 (Excellent Native Docker Support)
// And ameboGPT / Amebo Premium Voice (Custom Dockerization Required)

export default function CheckBestFitsLectureRoomPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Resizable Split Panel Width State (Percentage representation for Left Panel on large screens)
  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(25);
  const isDraggingRef = useRef<boolean>(false);

  // Classroom Live Status State
  const [isLectureOngoing, setIsLectureOngoing] = useState<boolean>(true);
  const [stagedQuestion, setStagedQuestion] = useState<StagedQuestion | null>(null);

  // Modal Visibility States
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState<boolean>(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false);

  // Resizable Drag Event Handlers
  const handleMouseDown = () => {
    isDraggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newPercent = (e.clientX / window.innerWidth) * 100;
      if (newPercent > 18 && newPercent < 50) {
        setLeftWidthPercent(newPercent);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={`h-screen flex flex-col overflow-hidden font-sans ${
      isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'
    }`}>
      
      {/* Sticky Top Header Navigation */}
      <LectureHeader
        onOpenOverview={() => setIsOverviewOpen(true)}
        onOpenQuestions={() => setIsQuestionsOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
        isLectureOngoing={isLectureOngoing}
        stagedQuestionsCount={stagedQuestion ? 1 : 0}
      />

      {/* Main Classroom Workspace Container */}
      <div className="flex-1 flex flex-row relative overflow-hidden">
        
        {/* Left Sidebar Panel (Hidden on max-xl screens / visible on lg screens and wider) */}
        <div
          className="hidden lg:block h-full border-r border-zinc-700 overflow-hidden shrink-0 max-xl:hidden"
          ref={(el) => {
            if (el && window.innerWidth >= 1024) {
              el.style.width = `${leftWidthPercent}%`;
            } else if (el) {
              el.style.width = '';
            }
          }}
        >
          <Sidebar />
        </div>

        {/* Resizable Divider Drag Handle (Active only on lg screens and wider) */}
        <div onMouseDown={handleMouseDown}
          className="hidden lg:flex w-2 h-full bg-zinc-800/30 hover:bg-emerald-500/50 
          cursor-col-resize items-center justify-center transition-colors z-20 group shrink-0"
          title="Drag left/right to adjust sidebar width">
          <div className="w-1 h-8 rounded-full bg-zinc-600 group-hover:bg-emerald-400" />
        </div>

        {/* Right Textual Lecture Panel */}
        <div
          className="w-full h-full overflow-hidden flex-1"
          ref={(el) => {
            if (el && window.innerWidth >= 1024) {
              el.style.width = `${100 - leftWidthPercent}%`;
            } else if (el) {
              el.style.width = '100%';
            }
          }}
        >
          <TextualLecturePanel />
        </div>

      </div>

      {/* Interactive Classroom Modals */}
      <CourseOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
      />

      <InLectureQuestionModal
        isOpen={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
        isLectureOngoing={isLectureOngoing}
        stagedQuestion={stagedQuestion}
        onSaveQuestion={(q) => setStagedQuestion(q)}
      />

      <ResourcesSettingsModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />

    </div>
  );
}
