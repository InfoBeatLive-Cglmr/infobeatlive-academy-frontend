import { FC } from 'react';
import { Check, CheckCircle2, X } from 'lucide-react';

export const CredibilityPageView: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/20">
          Academic Philosophy & Integrity
        </span>
        <h1 className="text-4xl font-serif mt-5 font-bold text-white">
          What InfoBeatLive Academy Is — and Is Not.
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          We maintain explicit boundaries to preserve institutional academic integrity and guarantee structured, measurable educational outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WHAT WE ARE */}
        <div className="p-8 rounded-2xl bg-zinc-950 border border-emerald-500/30 space-y-6">
          <h3 className="text-xl font-serif font-bold text-emerald-400 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>WHAT WE ARE</span>
          </h3>
          <ul className="space-y-4 text-sm text-zinc-300">
            <li className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>
                <strong>Structured Institutional Environment:</strong> Organized strictly across Faculty → Department → Program → Level → Semester → Course hierarchies tailored to country-specific standards.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>
                <strong>System-Driven Academic Progression:</strong> Automated prerequisite checks, continuous assessments, and proctored examinations that strictly enforce mastery before advancing.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>
                <strong>AI Faculty & Automated Instruction:</strong> Interactive voice lectures, dynamic study guides, and daily timetables designed for active, disciplined learning.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>
                <strong>Rigorous Academic Standard:</strong> A complete virtual university architecture built to replace passive video streaming with genuine cognitive synthesis.
              </span>
            </li>
          </ul>
        </div>

        {/* WHAT WE ARE NOT */}
        <div className="p-8 rounded-2xl bg-zinc-950 border border-red-500/30 space-y-6">
          <h3 className="text-xl font-serif font-bold text-red-400 flex items-center space-x-2">
            <X className="w-5 h-5 text-red-400" />
            <span>WHAT WE ARE NOT</span>
          </h3>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li className="flex items-start space-x-3">
              <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>
                <strong>A Casual Course Marketplace:</strong> We do not offer disconnected video playlists, self-paced browsing, or pay-to-win certificates.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>
                <strong>A Unidirectional AI Chatbot:</strong> We are not a prompt-and-answer tool; our AI engines act as structured faculty instructors, proctors, and examiners.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>
                <strong>An Unstructured Learning Tool:</strong> We eliminate random jumping between topics by locking advanced modules until prerequisites and exams are passed.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>
                <strong>A Passive Content Repository:</strong> We do not measure progress through video completion bars, but through evaluated knowledge, timed tests, and practical problem solving.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
