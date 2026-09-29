import {useState, FC } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TUITION_TIERS } from './utils';
import { cn } from './utils';

export const PricingPageView: FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Tuition & Investment
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          Transparent Tuition Plans for Serious Learners
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Invest in rigorous academic progress without hidden fees. All tiers include proctored assessments and complete syllabus access.
        </p>

        {/* Billing Switcher */}
        <div className="inline-flex items-center space-x-3 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
          <button
            onClick={() => setAnnualBilling(true)}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all',
              !annualBilling ? 'bg-zinc-950 text-amber-400 shadow' : 'text-zinc-400'
            )}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnualBilling(false)}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center space-x-1.5',
              annualBilling ? 'bg-zinc-950 text-amber-400 shadow' : 'text-zinc-400'
            )}
          >
            <span>Annual Billing</span>
            <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded uppercase">
              25% Off
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TUITION_TIERS.map((tier) => {
          const price = annualBilling ? tier.monthlyPrice :  tier.annualDiscountPrice;
          return (
            <div
              key={tier.id}
              className={cn(
                'p-8 rounded-3xl bg-zinc-950 border flex flex-col justify-between space-y-8',
                tier.isPopular ? 'border-amber-400 shadow-2xl relative' : 'border-zinc-800'
              )}
            >
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  MOST RECOMMENDED
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-zinc-400 mt-2">{tier.description}</p>
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-bold font-mono text-white">${price}</span>
                  <span className="text-xs font-mono text-zinc-500">/ month</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-[11px] font-mono text-amber-300">
                  Target: {tier.targetAudience}
                </div>

                <ul className="space-y-3 pt-4 border-t border-zinc-900">
                  {tier.features.map((feat, j) => (
                    <li key={j} className="flex items-start space-x-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenAuth}
                className={cn(
                  'w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
                  tier.isPopular
                    ? 'bg-amber-400 text-black hover:bg-amber-300'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700'
                )}
              >
                Enroll Under {tier.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
