import {  FC } from 'react';
import { GraduationCap } from 'lucide-react';
import { NavigationTab } from './utils';


export const InstitutionalFooter: FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif font-bold text-lg text-white">INFOBEATLIVE ACADEMY</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Standardized higher academic learning platform offering structured curricula across K-12 advanced STEM, undergraduate honors, doctoral foundations, and senior professional engineering.
            </p>
            <p className="text-xs font-mono -mt-3 text-yellow-50">
              Contact: academy@infobeatlive.com 
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">Navigational Paths</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-white">Study Plans Catalog</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="hover:text-white">8-Step Methodology</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">View Pricing & Plans</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Go-Back to Home Page</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">Integrity & Research</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => onNavigate('credibility')} className="hover:text-white">Academic Philosophy</button></li>
              <li><button onClick={() => onNavigate('support')} className="hover:text-white">Our Support Center</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Admissions Query</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Go-Back to Dashbaord</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">Legal & Governance</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#privacy" className="hover:text-white">Academic Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms of Accreditation</a></li>
              <li><a href="#sign-in" className="hover:text-white">Sign Into Dashbaord</a></li>
              <li><a href="#sign-up" className="hover:text-white">Create New Account</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col mb-5 sm:flex-row justify-between items-center text-xs font-mono text-zinc-500">
          <p>© 2026 InfoBeatLive. All Rights Reserved.</p>
          <p>Cryptographically Signed Transcripts</p>
        </div>
      </div>
    </footer>
  );
};