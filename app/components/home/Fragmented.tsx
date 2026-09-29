import { FC } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export const FragmentedPageView: FC = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mb-10 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/20">
            Pedagogical Paradigm
          </span>
          <h2 className="text-3xl sm:text-4xl mt-3 font-serif font-bold text-white leading-tight">
            Why Course Marketplaces & AI Tutors Fail Serious Scholars.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Real education requires system-enforced structure, pacing, and academic discipline—not random video browsing or prompt-driven AI chats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 -mt-4 gap-8">
          {/* TRADITIONAL LEARNING PROBLEMS */}
          <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <h3 className="text-lg font-bold text-zinc-400">Course Marketplaces & AI Chatbots</h3>
              <span className="text-xs font-mono text-red-400/90 bg-red-500/10 px-2 py-1 rounded">
                Unstructured & Passive
              </span>
            </div>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Fragmented & Self-Guided:</strong> Leaves the learner asking "what should I study next?" without a verified academic hierarchy.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Passive Completion Tracking:</strong> Progress is measured by ticking boxes or watching videos, not by proving true subject mastery.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Uncontrolled Pacing:</strong> Encourages binge-watching without study discipline, scheduled timetables, or realistic retention intervals.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Isolated Content & Chat Prompts:</strong> Treats learning as isolated Q&amp;A sessions rather than a multi-subject, semester-long curriculum.
                </span>
              </li>
            </ul>
          </div>

          {/* INFOBEATLIVE ACADEMY ADVANTAGE */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-amber-300">InfoBeatLive Academy System</h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                System-Driven Mastery
              </span>
            </div>
            <ul className="space-y-4 text-sm text-zinc-200">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Full Institutional Hierarchy:</strong> Pre-defined academic paths spanning Faculty → Department → Program → Level → Semester → Course.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Automated System Progression:</strong> The platform decides when you are ready to advance from lesson to exam based on continuous assessment.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Enforced Classroom Discipline:</strong> Timed lectures (20–120 min) with dynamic voice instructors, study guides, and daily timetables.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Intelligent Faculty Engine:</strong> An AI system that acts as instructor, proctor, and examiner to deliver an authentic university-grade experience.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

