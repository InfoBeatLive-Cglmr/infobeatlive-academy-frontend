import { FC } from 'react';
import { X } from 'lucide-react';
import { StudyPlan } from "./utils";

interface PlanModalProps {
  plan: StudyPlan | null;
  onClose: () => void;
  onEnroll: () => void;
}

export const StudyPlanDetailModal: FC<PlanModalProps> = ({ plan, onClose, onEnroll }) => {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded border border-amber-400/20">
            {plan.category} • {plan.level}
          </span>
          <h2 className="text-2xl font-serif font-bold text-white pt-2">{plan.title}</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">{plan.description}</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between text-zinc-300">
            <span>Faculty Domain:</span>
            <span className="text-amber-400">{plan.faculty}</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Standard Credits:</span>
            <span className="text-amber-400">{plan.credits} Credits</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Active Scholars:</span>
            <span className="text-amber-400">{plan.enrolledCount}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-zinc-400">Core Prerequisite Modules:</h4>
          <div className="space-y-2">
            {plan.modules.map((mod, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center space-x-3">
                <span className="text-xs font-mono text-amber-400">0{idx + 1}.</span>
                <span className="text-xs text-zinc-200">{mod}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-900 flex space-x-3">
          <button
            onClick={() => {
              onClose();
              onEnroll();
            }}
            className="flex-1 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider"
          >
            Enroll In Plan
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};