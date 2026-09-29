import { useState, FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn, FAQS_DATA } from './utils';

export const Faqs: FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Help & Governance
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        {FAQS_DATA.map((faq, idx) => (
          <div key={faq.id} className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
            >
              <span className="text-base font-semibold text-zinc-100">{faq.question}</span>
              <ChevronDown
                className={cn(
                  'w-10 h-10 text-amber-400 transition-transform',
                  openFaqIndex === idx ? 'rotate-180' : ''
                )}
              />
            </button>

            {openFaqIndex === idx && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-900/80 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
