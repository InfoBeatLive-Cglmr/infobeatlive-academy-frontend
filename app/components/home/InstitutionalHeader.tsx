import { useState, FC } from 'react';
import { ArrowRight, GraduationCap, Menu, X } from 'lucide-react';
import { cn, NavigationTab } from './utils';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const InstitutionalHeader: FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    // { id: 'catalog', label: 'STUDY PROGRAMS' },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'pricing', label: 'PRICING' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'support', label: 'SUPPORT' }
  ];

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#08090D]/90 backdrop-blur-xl border-b border-zinc-800/80 transition-all shadow-xl shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 flex items-center justify-center shadow-lg group-hover:border-amber-500/50 transition-colors">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif tracking-tight text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                  INFOBEATLIVE
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold">
                  ACADEMY
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Higher Institutional Learning
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 font-medium text-xs tracking-wider text-zinc-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'px-3.5 py-2 rounded-lg transition-all',
                  activeTab === item.id
                    ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20 font-semibold'
                    : 'hover:text-zinc-100 hover:bg-zinc-800/50'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-3">

            <a href={'/auth/signin'} target="_blank" rel="noopener noreferrer">
            <button className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white px-4 py-2.5 
            rounded-lg hover:bg-zinc-800/60 transition-all border border-zinc-700"> Sign In </button></a>

            <a href={'/auth/signup'} target="_blank" rel="noopener noreferrer">
            <button className="text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-300 
            via-amber-400 to-amber-500 hover:brightness-110 px-5 py-2.5 rounded-lg shadow-lg shadow-amber-500/10 transition-all 
            flex items-center space-x-2"><span>Get Started Free</span><ArrowRight className="w-3.5 h-3.5" /></button></a>

          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#08090D]/95 backdrop-blur-2xl border-b border-zinc-800 px-4 py-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  activeTab === item.id
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    : 'text-zinc-300 hover:bg-zinc-900'
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-zinc-800 flex flex-col space-y-2">

              {/* <a href={'/sign-in'} target="_blank" rel="noopener noreferrer"></a> */}


              <a href={'/auth/signin'} target="_blank" rel="noopener noreferrer">
              <button className="w-full text-center text-xs uppercase tracking-wider 
              font-semibold py-3 rounded-lg border border-zinc-700 text-zinc-200">  Sign In </button></a>

             <a href={'/auth/signup'} target="_blank" rel="noopener noreferrer">
              <button className="w-full text-center text-xs uppercase tracking-wider font-semibold py-3 rounded-lg 
              bg-amber-400 text-black font-bold" > Get Started Free </button></a>

            </div>
          </div>
        )}
      </header>
      <div className="h-20" />
    </>
  );
};
