'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import { StagedQuestion } from './types';
import {
  XMarkIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  LockClosedIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface InLectureQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLectureOngoing: boolean;
  stagedQuestion: StagedQuestion | null;
  onSaveQuestion: (question: StagedQuestion) => void;
}

export const InLectureQuestionModal: React.FC<InLectureQuestionModalProps> = ({
  isOpen,
  onClose,
  isLectureOngoing,
  stagedQuestion,
  onSaveQuestion
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [text, setText] = useState<string>(stagedQuestion?.text || '');
  const [isRecording, setIsRecording] = useState(false);

  if (!isOpen) return null;

  const handleStageOrSubmit = () => {
    if (!text.trim()) return;
    onSaveQuestion({
      text,
      submittedAt: new Date().toLocaleTimeString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-300 text-zinc-900'
      }`}>
        
        {/* Modal Title */}
        <div className={`p-6 border-b flex items-center justify-between ${
          isDark ? 'border-zinc-700 bg-zinc-900/50' : 'border-zinc-300 bg-zinc-50'
        }`}>
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold">In-Class Question Queue</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl border border-zinc-700 hover:bg-zinc-800">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* Real Classroom Protocol Lock Notice */}
          <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
            isLectureOngoing
              ? 'bg-amber-500 border-amber-500 text-amber-50'
              : 'bg-emerald-600 border-emerald-600 text-emerald-50'
          }`}>
            <div className="flex items-center gap-2 font-bold">
              {isLectureOngoing ? <LockClosedIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
              <span>{isLectureOngoing ? 'Lecture in Progress • Queue Mode' 
              : 'Lecture Completed • Ready for Submission'}</span>
            </div>
            <p className="text-[13px] opacity-80">
              {isLectureOngoing
                ? 'You can draft, record, and stage your question now. It will be dispatched automatically once the lecturer concludes the live stream.'
                : 'The lecture is complete! You can now send your question directly to the professor and AI co-teacher.'}
            </p>
          </div>

          {/* Textarea Input */}
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question regarding microservice consensus or vector searching..."
            className={`w-full p-4 rounded-2xl border text-xs focus:outline-none focus:border-emerald-500 ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'
            }`}
          />

          {/* Audio Recording & Attachment Tools */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-300' 
                    : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                }`}
              >
                <MicrophoneIcon className="w-4 h-4" />
                <span>{isRecording ? 'Recording Voice...' : 'Record Voice'}</span>
              </button>

              <button
                type="button"
                className={`p-2 rounded-xl border ${
                  isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-400' 
                  : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                }`}
              >
                <PaperClipIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Action Trigger */}
            <button
              onClick={handleStageOrSubmit}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg ${
                isLectureOngoing
                  ? 'bg-blue-500 hover:bg-blue-400 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
              }`}
            >
              <PaperAirplaneIcon className="w-4 h-4" />
              <span>{isLectureOngoing ? 'Stage Question' : 'Send Question Now'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};