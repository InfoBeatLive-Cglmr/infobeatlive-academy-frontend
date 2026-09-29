'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { XMarkIcon, ChatBubbleLeftRightIcon, ChartBarIcon, 
LifebuoyIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircle, BookCheckIcon, Clock, Contact, GraduationCap, HomeIcon,  
MailIcon,  BookOpen, CheckCircle2, Newspaper, PlusCircleIcon, School, School2, 
BrainCircuit, Building2, 
TrophyIcon} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
//import { useRouter } from 'next/navigation';
//import Cookies from 'js-cookie'; 
import { CubeTransparentIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { UserGroupIcon as User3 } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

  const { theme } = useTheme();
  const pathname = usePathname();

  const newTabLinks = ['/contact', '/', '/feedback', '/support', '/#faq', '/pricing', '/terms-of-service', '/privacy-policy' ];

  const navItems = [

    {
      section: 'Lectures & Research',
      items: [ 
        { name: 'Academy Program', href: '/dashboard/academy/academy-courses', icon: School },
        { name: 'Special Courses', href: '/dashboard/academy/special-courses', icon:  School2  },
        { name: 'Research Center', href: '/dashboard/academy/research-center', icon: BrainCircuit},
        { name: 'Academy Library', href: '/dashboard/academy/academy-library', icon: BookOpen},
      ],
    },

    {
      section: 'Programs & Courses',
      items: [
        { name: 'Study Programs ', href: '/dashboard/academy/study-programs', icon: GraduationCap},
        { name: 'Check Best Fits', href: '/dashboard/academy/check-best-fits', icon: CheckCircle2 },
        { name: 'Timetable System', href: '/dashboard/academy/timetable', icon: Clock },
        { name: 'My Certificates', href: '/dashboard/academy/certificates', icon: TrophyIcon },
      ],
    },

    {
      section: 'Contacts & Supports',
      items: [
        { name: 'Support center', href: '/support', icon:  LifebuoyIcon },
        { name: 'Contact Academy', href: '/contact', icon: MailIcon },
        { name: 'Pricing Systems', href: '/pricing', icon: CurrencyDollarIcon },
        { name: 'Go Landing Page', href: '/', icon: ArrowRightCircle },
      ],
    },

  ];

  return (
    <div className={`  ${theme === 'dark' ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'}`}>
  
     {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-900 bg-opacity-75 w- z-40 xl:hidden"
          onClick={onClose}
        ></div>
      )} 

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-52 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                  xl:translate-x-0 transition-transform duration-300 ease-in-out
                  ${theme === 'dark' ? 'bg-zinc-900 border-r border-zinc-700' : 'bg-white border-r border-zinc-300'}
                  flex flex-col shadow-lg xl:shadow-none`}
      >
        
        <div className={`p-5 flex items-center justify-between
                          ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600'}
                          border-b ${theme === 'dark' ? 'border-zinc-700 ' : 'border-zinc-300'}`}>
          <Link href="/dashboard/main" className="text-lg font-extrabold text-brand-primary">
          <p className='flex flex-row'> <HomeIcon size={26}/>  <span className='ml-2'>InfoBeatLive</span></p> 
          </Link>
         
          <button onClick={onClose} className="xl:hidden p-2 -ml-10
             rounded-md text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600">
             <XMarkIcon className="h-6 w-6" />
          </button>

        </div>

        <nav className={`flex-1 overflow-y-auto p-4 custom-scrollbar
                          ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-3">
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3
                              ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {section.section}
              </h3>
              <ul>
                {section.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  const openInNewTab = newTabLinks.includes(item.href);

                  return (
                    <li key={itemIndex} className="mb-1">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        target={openInNewTab ? "_blank" : undefined}
                        rel={openInNewTab ? "noopener noreferrer" : undefined}
                        className={`flex items-center p-3 py-4 rounded-lg text-sm font-medium transition-colors duration-200
                                   ${isActive
                                      ? `border ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 border-zinc-700' 
                                        : 'text-zinc-700 hover:bg-zinc-100 border-zinc-300'}`
                                      : ` ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-800 border-zinc-700' 
                                        : 'text-zinc-700 hover:bg-zinc-100 border-zinc-300'}`
                                    }`}
                      >
                        <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
