'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/app/context/ThemeContext';
import {
  XMarkIcon,
  PaperAirplaneIcon,
  LockClosedIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface InLectureQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLectureOngoing: boolean;
  stagedQuestion: StagedQuestion | null;
  onSaveQuestion: (question: StagedQuestion) => void;
}

export interface StagedQuestion {
  text: string;
  audioBlobUrl?: string | null;
  attachedFile?: string | null;
  submittedAt?: string;
}

const mockSubmitQuestionApi = async (): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1200);
  });
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (stagedQuestion?.text) {
      setText(stagedQuestion.text);
    }
  }, [stagedQuestion]);

  if (!isOpen) return null;

  const handleStageOrSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);

    const payload = {
      text,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      await mockSubmitQuestionApi();
      onSaveQuestion(payload);
      onClose();
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 
    backdrop-blur-md transition-all duration-300">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transform transition-all scale-100 ${
          isDark
            ? 'bg-zinc-950/90 border-zinc-700 text-zinc-100 shadow-zinc-950/50'
            : 'bg-white/95 border-zinc-300 text-zinc-900 shadow-xl'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between ${
            isDark ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-300 bg-zinc-50/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">In-Class Question Queue</h3>
              <p className="text-[12px] font-mono text-zinc-400">Ask your professor AI assist</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? 'border-zinc-700 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100'
                : 'border-zinc-300 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          
          {/* Lecture State Info Badge */}
          <div
            className={`p-4 rounded-2xl border text-xs transition-all flex items-start gap-3 ${
              isLectureOngoing
                ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
            }`}
          >
            <div className="mt-0.5 p-1 rounded-lg bg-current/10">
              {isLectureOngoing ? (
                <LockClosedIcon className="w-4 h-4 text-amber-400" />
              ) : (
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-sm">
                {isLectureOngoing ? 'Lecture Live • Queue Mode Active' : 'Lecture Ended • Ready for Dispatch'}
              </span>
              <p className="text-[12px] font-bold opacity-80 leading-relaxed">
                {isLectureOngoing
                  ? 'Stage your question now. It will automatically submit once the live stream concludes.'
                  : 'Send your query directly to the professor and AI co-teacher now.'}
              </p>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={7}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask a question regarding consensus algorithms, database indexing, or vector search..."
              className={`w-full p-4 text-xs font-medium rounded-2xl border transition-all resize-none focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-700 text-zinc-100 focus:border-emerald-500/50 focus:ring-emerald-500/10 placeholder-zinc-500'
                  : 'bg-zinc-50 border-zinc-300 text-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10 placeholder-zinc-400'
              }`}
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button type="button" disabled={isSubmitting || (!text.trim())}
              onClick={handleStageOrSubmit}
              className={` w-full px-5 py-3 rounded-xl font-bold text-sm flex justify-center
                 items-center gap-2 shadow-lg 
                transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isLectureOngoing
                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-emerald-700/20'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-zinc-950 shadow-emerald-700/20' }`} >
              {isSubmitting ? (
                <>
                  <ArrowPathIcon className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-4 h-4" />
                  <span>{isLectureOngoing ? 'Stage Question' : 'Send Question'}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};






// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useTheme } from '@/app/context/ThemeContext';
// import {
//   XMarkIcon,
//   MicrophoneIcon,
//   PaperClipIcon,
//   PaperAirplaneIcon,
//   LockClosedIcon,
//   CheckCircleIcon,
//   SparklesIcon,
//   StopIcon,
//   TrashIcon,
//   ArrowPathIcon,
//   DocumentIcon,
//   PlayIcon,
//   PauseIcon
// } from '@heroicons/react/24/outline';

// interface InLectureQuestionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   isLectureOngoing: boolean;
//   stagedQuestion: StagedQuestion | null;
//   onSaveQuestion: (question: StagedQuestion) => void;
// }

// interface AttachedFile {
//   id: string;
//   name: string;
//   size: string;
//   progress: number;
//   url?: string;
// }


// export interface StagedQuestion {
//   text: string;
//   audioBlobUrl?: string | null;
//   attachedFile?: string | null;
//   submittedAt?: string;
// }


// // Mock API Call for File Upload
// const mockUploadFileApi = async (file: File, onProgress: (progress: number) => void): Promise<string> => {
//   return new Promise((resolve) => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += 25;
//       onProgress(progress);
//       if (progress >= 100) {
//         clearInterval(interval);
//         resolve(`https://storage.cdn.com/lecture-uploads/${file.name}`);
//       }
//     }, 200);
//   });
// };

// // Mock API Call for Question Submission/Staging
// const mockSubmitQuestionApi = async (payload: any): Promise<{ success: boolean }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ success: true });
//     }, 1200);
//   });
// };

// export const InLectureQuestionModal: React.FC<InLectureQuestionModalProps> = ({
//   isOpen,
//   onClose,
//   isLectureOngoing,
//   stagedQuestion,
//   onSaveQuestion
// }) => {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const [text, setText] = useState<string>(stagedQuestion?.text || '');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Audio Recording States
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
//   const [isPlayingAudio, setIsPlayingAudio] = useState(false);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   // File Upload States
//   const [attachments, setAttachments] = useState<AttachedFile[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Sync state if initial props change
//   useEffect(() => {
//     if (stagedQuestion?.text) {
//       setText(stagedQuestion.text);
//     }
//   }, [stagedQuestion]);

//   // Recording Timer Effect
//   useEffect(() => {
//     if (isRecording) {
//       timerRef.current = setInterval(() => {
//         setRecordingTime((prev) => prev + 1);
//       }, 1000);
//     } else if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isRecording]);

//   if (!isOpen) return null;

//   // Format seconds into MM:SS
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Recording Handlers
//   const handleStartRecording = () => {
//     setAudioBlobUrl(null);
//     setRecordingTime(0);
//     setIsRecording(true);
//   };

//   const handleStopRecording = () => {
//     setIsRecording(false);
//     // Simulate audio blob generated after recording
//     setAudioBlobUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
//   };

//   const handleDiscardAudio = () => {
//     setAudioBlobUrl(null);
//     setRecordingTime(0);
//     setIsPlayingAudio(false);
//   };

//   const togglePlayAudio = () => {
//     if (!audioRef.current) return;
//     if (isPlayingAudio) {
//       audioRef.current.pause();
//       setIsPlayingAudio(false);
//     } else {
//       audioRef.current.play();
//       setIsPlayingAudio(true);
//     }
//   };

//   // File Selection Handler
//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;
    
//     const file = e.target.files[0];
//     const fileId = Math.random().toString(36).substring(7);
//     const newAttachment: AttachedFile = {
//       id: fileId,
//       name: file.name,
//       size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
//       progress: 0
//     };

//     setAttachments((prev) => [...prev, newAttachment]);

//     try {
//       const uploadedUrl = await mockUploadFileApi(file, (progress) => {
//         setAttachments((prev) =>
//           prev.map((item) => (item.id === fileId ? { ...item, progress } : item))
//         );
//       });

//       setAttachments((prev) =>
//         prev.map((item) => (item.id === fileId ? { ...item, url: uploadedUrl } : item))
//       );
//     } catch (error) {
//       console.error('File upload failed', error);
//     }
//   };

//   const handleRemoveAttachment = (id: string) => {
//     setAttachments((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Final Action Handler
//   const handleStageOrSubmit = async () => {
//     if (!text.trim() && !audioBlobUrl && attachments.length === 0) return;

//     setIsSubmitting(true);

//     const payload = {
//       text,
//       audioUrl: audioBlobUrl,
//       attachments: attachments.map((a) => a.url).filter(Boolean),
//       submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };

//     try {
//       await mockSubmitQuestionApi(payload);
//       onSaveQuestion(payload);
//       onClose();
//     } catch (error) {
//       console.error('Submission failed', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 
//     backdrop-blur-md transition-all duration-300">
//       <div
//         className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transform transition-all scale-100 ${
//           isDark
//             ? 'bg-zinc-950/90 border-zinc-700 text-zinc-100 shadow-zinc-950/50'
//             : 'bg-white/95 border-zinc-300 text-zinc-900 shadow-xl'
//         }`}
//       >
//         {/* Modal Header */}
//         <div
//           className={`px-6 py-5 border-b flex items-center justify-between ${
//             isDark ? 'border-zinc-700 bg-zinc-900/40' : 'border-zinc-300 bg-zinc-50/80'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500">
//               <SparklesIcon className="w-5 h-5" />
//             </div>
//             <div>
//               <h3 className="text-base font-bold leading-tight">In-Class Question Queue</h3>
//               <p className="text-[12px] font-mono text-zinc-400">Ask your professor AI assist</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className={`p-2 rounded-xl border transition-all ${
//               isDark
//                 ? 'border-zinc-700 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-100'
//                 : 'border-zinc-300 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'
//             }`}
//           >
//             <XMarkIcon className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Modal Content */}
//         <div className="p-6 space-y-5">
          
//           {/* Lecture State Info Badge */}
//           <div
//             className={`p-4 rounded-2xl border text-xs transition-all flex items-start gap-3 ${
//               isLectureOngoing
//                 ? 'bg-amber-500/10 border-amber-500 text-amber-500'
//                 : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
//             }`}
//           >
//             <div className="mt-0.5 p-1 rounded-lg bg-current/10">
//               {isLectureOngoing ? (
//                 <LockClosedIcon className="w-4 h-4 text-amber-400" />
//               ) : (
//                 <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
//               )}
//             </div>
//             <div className="space-y-0.5">
//               <span className="font-bold text-sm">
//                 {isLectureOngoing ? 'Lecture Live • Queue Mode Active' : 'Lecture Ended • Ready for Dispatch'}
//               </span>
//               <p className="text-[12px] font-bold opacity-80 leading-relaxed">
//                 {isLectureOngoing
//                   ? 'Stage your question now. It will automatically submit once the live stream concludes.'
//                   : 'Send your query directly to the professor and AI co-teacher now.'}
//               </p>
//             </div>
//           </div>

//           {/* Text Input Area */}
//           <div className="relative">
//             <textarea
//               rows={4}
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Ask a question regarding consensus algorithms, database indexing, or vector search..."
//               className={`w-full p-4 text-xs font-medium rounded-2xl border transition-all resize-none focus:outline-none focus:ring-2 ${
//                 isDark
//                   ? 'bg-zinc-900/60 border-zinc-700 text-zinc-100 focus:border-emerald-500/50 focus:ring-emerald-500/10 placeholder-zinc-500'
//                   : 'bg-zinc-50 border-zinc-300 text-zinc-800 focus:border-emerald-500 focus:ring-emerald-500/10 placeholder-zinc-400'
//               }`}
//             />
//             <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-500">
//               {text.length}/500
//             </div>
//           </div>

//           {/* Voice Recording Widget */}
//           {isRecording ? (
//             <div className="p-3.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-center justify-between animate-pulse">
//               <div className="flex items-center gap-3">
//                 <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
//                 <span className="text-xs font-mono font-bold text-rose-400">
//                   Recording... {formatTime(recordingTime)}
//                 </span>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleStopRecording}
//                 className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-rose-600 transition-colors shadow-sm"
//               >
//                 <StopIcon className="w-3.5 h-3.5" /> Stop
//               </button>
//             </div>
//           ) : audioBlobUrl ? (
//             <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
//               isDark ? 'bg-zinc-900/80 border-zinc-700' : 'bg-zinc-100 border-zinc-300'
//             }`}>
//               <audio ref={audioRef} src={audioBlobUrl} onEnded={() => setIsPlayingAudio(false)} className="hidden" />
//               <div className="flex items-center gap-3">
//                 <button
//                   type="button"
//                   onClick={togglePlayAudio}
//                   className="p-2 rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors"
//                 >
//                   {isPlayingAudio ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
//                 </button>
//                 <div>
//                   <span className="text-xs font-bold block">Voice Note Recorded</span>
//                   <span className="text-[10px] font-mono text-zinc-400">{formatTime(recordingTime)}</span>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleDiscardAudio}
//                 className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-transparent 
//                 hover:border-rose-500/20 transition-all"
//               >
//                 <TrashIcon className="w-4 h-4" />
//               </button>
//             </div>
//           ) : null}

//           {/* Attachments List */}
//           {attachments.length > 0 && (
//             <div className="space-y-2">
//               {attachments.map((file) => (
//                 <div
//                   key={file.id}
//                   className={`p-3 rounded-2xl border flex items-center justify-between ${
//                     isDark ? 'bg-zinc-900/50 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
//                     <DocumentIcon className="w-5 h-5 text-emerald-400 shrink-0" />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs font-semibold truncate">{file.name}</p>
//                       <div className="flex items-center gap-2 mt-0.5">
//                         <span className="text-[10px] font-mono text-zinc-400">{file.size}</span>
//                         {file.progress < 100 && (
//                           <div className="flex-1 max-w-[100px] h-1 bg-zinc-700 rounded-full overflow-hidden">
//                             <div
//                               className="h-full bg-emerald-500 transition-all duration-200"
//                               style={{ width: `${file.progress}%` }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveAttachment(file.id)}
//                     className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 transition-colors"
//                   >
//                     <XMarkIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

        
//           <div className="pt-2 flex items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
             
//               {!audioBlobUrl && !isRecording && (
//                 <button
//                   type="button"
//                   onClick={handleStartRecording}
//                   className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
//                     isDark
//                       ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100'
//                       : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200 text-zinc-700'
//                   }`}
//                 >
//                   <MicrophoneIcon className="w-4 h-4 text-emerald-400" />
//                   <span>Record Voice</span>
//                 </button>
//               )}

//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 className={`p-2.5 rounded-xl border transition-all ${
//                   isDark
//                     ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100'
//                     : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200 text-zinc-600'
//                 }`}
//               >
//                 <PaperClipIcon className="w-4 h-4" />
//               </button>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 onChange={handleFileSelect}
//                 className="hidden"
//                 accept="image/*,.pdf,.doc,.docx"
//               />
//             </div>

//             {/* Stage / Send Submit Button */}
//             <button
//               type="button"
//               disabled={isSubmitting || (!text.trim() && !audioBlobUrl && attachments.length === 0)}
//               onClick={handleStageOrSubmit}
//               className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg 
//                 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
//                 isLectureOngoing
//                   ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-blue-500/20'
//                   : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20'
//               }`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <ArrowPathIcon className="w-4 h-4 animate-spin" />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <>
//                   <PaperAirplaneIcon className="w-4 h-4" />
//                   <span>{isLectureOngoing ? 'Stage Question' : 'Send Question'}</span>
//                 </>
//               )}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };
