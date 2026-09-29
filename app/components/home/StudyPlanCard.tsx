import {  FC } from 'react';
import { ChevronRight, Star} from 'lucide-react';
import { StudyPlan } from './utils';

interface PlanCardProps {
  plan: StudyPlan;
  onSelect: (plan: StudyPlan) => void;
}

export const StudyPlanCard: FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-amber-500/50 transition-all p-6 flex flex-col justify-between space-y-6 group shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded border border-amber-400/20 font-semibold">
            {plan.category}
          </span>
          <span className="text-xs font-mono text-zinc-400 flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{plan.rating}</span>
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
          {plan.title}
        </h3>

        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
          {plan.description}
        </p>

        <div className="pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-400 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-zinc-500">Faculty:</span>
            <span className="text-zinc-300">{plan.faculty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Duration:</span>
            <span className="text-zinc-300">{plan.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Courses / Credits:</span>
            <span className="text-zinc-300">
              {plan.coursesCount} Courses ({plan.credits} Credits)
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onSelect(plan)}
        className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition-all flex items-center justify-center space-x-2 group-hover:border-amber-500/40"
      >
        <span>View Full Syllabus</span>
        <ChevronRight className="w-4 h-4 text-amber-400" />
      </button>
    </div>
  );
};