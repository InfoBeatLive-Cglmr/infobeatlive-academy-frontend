import { FC } from 'react';
import { PROCESS_STEPS } from "./utils";

export const HowItWorksPageView: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/20">
          Methodological System
        </span>
        <h1 className="text-4xl font-serif font-bold text-white mt-5">
          How InfoBeatLive Academy Enforces Mastery
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          An end-to-end, system-governed academic pipeline designed to take students from enrollment through interactive lectures, continuous assessment, and proctored examinations to certified graduation.
        </p>
      </div>

      <div className="relative border-l border-zinc-800 ml-4 md:ml-32 space-y-12">
        {PROCESS_STEPS.map((step, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12 group">
            <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-zinc-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 text-xs font-mono font-bold shadow-lg">
              {step.stepNumber}
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-amber-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                  {step.subtitle}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  Artifact: {step.outputArtifact}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
