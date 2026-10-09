'use client'
import { useEffect, useState } from "react";
import { NavigationTab, StudyPlan } from "@/app/components/home/utils";
import { InstitutionalHeader } from "@/app/components/home/InstitutionalHeader";
import { HomePageView } from "@/app/components/home/HomePage";
import { StudyPlanDetailModal } from "@/app/components/home/StudyPlan";
import { AuthModal } from "@/app/components/home/AuthModal";
import { InstitutionalFooter } from "@/app/components/home/Footer";
import { CatalogPageView } from "@/app/components/home/Catalog";
import { HowItWorksPageView } from "@/app/components/home/HowItWorks";
import { PricingPageView } from "@/app/components/home/Pricing";
import { CredibilityPageView } from "@/app/components/home/Credibility";
import { SupportPageView } from "@/app/components/home/Support";
import { ContactPageView } from "@/app/components/home/ContactPageView";
import { Faqs } from "@/app/components/home/Faqs";
import {  CircleDollarSign, Globe, HomeIcon, LucideIcon, Mail, UsersIcon } from "lucide-react";

type TabId =
  | 'home'
  | 'what-we-do'
  | 'how-it-works'
  | 'services'
  | 'process'
  | 'catalog'
  | 'pricing'
  | 'credibility'
  | 'journal'
  | 'support'
  | 'contact'
  | 'faqs'
  | 'testimonials';

type NavItem = {
  id: TabId;
  icon: LucideIcon;
  label: string;
  href: string;
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('support');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<StudyPlan | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const navItems: NavItem[] = [
    { id: 'home', icon: HomeIcon, label: 'Home', href: '#' },
    { id: 'catalog', icon:  Globe, label: 'Catalog', href: '#' },
    { id: 'contact', icon:  UsersIcon, label: 'Contact', href: '#' },
    { id: 'pricing', icon: CircleDollarSign, label: 'Pricing', href: '#' },
    { id: 'support', icon: Mail, label: 'Support', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#08090D] text-zinc-100 font-sans antialiased selection:bg-amber-400/20 selection:text-amber-300 relative overflow-x-hidden">
    
      <div className="h-1 w-full bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0" />

      <InstitutionalHeader activeTab={activeTab} setActiveTab={setActiveTab} 
      onOpenAuth={() => setAuthModalOpen(true)} />

      <main className="min-h-[calc(100vh-80px)]">

        {activeTab === 'home' && (  <HomePageView onNavigate={setActiveTab} onOpenAuth={() => setAuthModalOpen(true)}  /> )} 
        {activeTab === 'catalog' && ( <CatalogPageView onSelectPlan={(plan) => setSelectedPlanDetail(plan)} />)}
        {activeTab === 'how-it-works' && <HowItWorksPageView /> }
        {activeTab === 'pricing' && ( <PricingPageView onOpenAuth={() => setAuthModalOpen(true)} /> )}
        {activeTab === 'credibility' &&  <CredibilityPageView /> }
        {activeTab === 'contact' && <ContactPageView /> }
        {activeTab === 'support' && <SupportPageView /> }

      </main>

      <Faqs /> 
      <StudyPlanDetailModal  plan={selectedPlanDetail} onClose={() => setSelectedPlanDetail(null)} onEnroll={() => setAuthModalOpen(true)}/>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <InstitutionalFooter onNavigate={setActiveTab} />

       <div className="fixed bottom-0 left-0 right-0 bg-neutral-950 backdrop-neutral-xl  border-t-4 px-6 py-3 flex 
      justify-between items-center rounded-t-2xl border-white md:hidden z-50">
        
        {navItems.map((item) => ( <button   key={item.id} onClick={() => { setActiveTab(item.id);  }}
        className={`flex flex-col items-center gap-1 ${ activeTab === item.id ? 'text-amber-600' : 'text-white' }`} >
        <span className="flex flex-col items-center gap-1"> <item.icon size={22} />
        <span className="text-[10px] font-bold uppercase tracking-wider"> {item.label} </span></span> </button> ))}

      </div>

    </div>
  );
}