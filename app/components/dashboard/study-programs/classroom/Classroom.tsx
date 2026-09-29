'use client';
import { useState, useRef } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

import { LectureHeader } from './LectureHeader';
import { TextualLecturePanel } from './TextualLecturePanel';
import { Sidebar } from './Sidebar';

import { InLectureQuestionModal } from './InLectureQuestionModal';
import { ResourcesSettingsModal } from './ResourcesSettingsModal';

export interface StagedQuestion {
  text: string;
  audioBlobUrl?: string | null;
  attachedFile?: string | null;
  submittedAt?: string;
}

export default function StudyProgramLectureRoomPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [leftWidthPercent, setLeftWidthPercent] = useState<number>(25);
  const isDraggingRef = useRef<boolean>(false);

  const [isLectureOngoing, setIsLectureOngoing] = useState<boolean>(true);
  const [stagedQuestion, setStagedQuestion] = useState<StagedQuestion | null>(null);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState<boolean>(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false);

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
      isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900' }`}>
      
      <LectureHeader
        onOpenQuestions={() => setIsQuestionsOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
        isLectureOngoing={isLectureOngoing}
        stagedQuestionsCount={stagedQuestion ? 1 : 0}
      />

      <div className="flex-1 flex flex-row relative overflow-hidden">
        
        <div
          className="hidden lg:block h-full border-r border-zinc-700 overflow-hidden shrink-0 max-xl:hidden"
          ref={(el) => { if (el && window.innerWidth >= 1024) {
          el.style.width = `${leftWidthPercent}%`;
          } else if (el) { el.style.width = ''; } }} >
          <Sidebar />
        </div>

        <div onMouseDown={handleMouseDown}
          className="hidden lg:flex w-2 h-full bg-zinc-800/30 hover:bg-emerald-500/50 
          cursor-col-resize items-center justify-center transition-colors z-20 group shrink-0"
          title="Drag left/right to adjust sidebar width">
          <div className="w-1 h-8 rounded-full bg-zinc-600 group-hover:bg-emerald-400" />
        </div>

        <div
          className="w-full h-full overflow-hidden flex-1" ref={(el) => {
            if (el && window.innerWidth >= 1024) {
              el.style.width = `${100 - leftWidthPercent}%`;
            } else if (el) { el.style.width = '100%'; } }}>
          <TextualLecturePanel />
        </div>

      </div>

      <InLectureQuestionModal
        isOpen={isQuestionsOpen}
        onClose={() => setIsQuestionsOpen(false)}
        isLectureOngoing={isLectureOngoing}
        stagedQuestion={stagedQuestion}
        onSaveQuestion={(q) => setStagedQuestion(q)}
      />

      <ResourcesSettingsModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)} />

    </div>
  );
}
