
'use client';
import React, { useState, useEffect, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; 
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme } = useTheme();

  return (
 
    <div className={` flex min-h-screen overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 text-zinc-100' 
    : 'bg-white text-zinc-900'}`}>
    
     
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

    
      <div className="flex-1 flex  flex-col overflow-hidden"> 

        <Topbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

     
        <main className={`flex-1 p-0 xl:ml-52 md:p-0 xl:p-0 mt-6 overflow-auto ${theme === 'dark' ? 'bg-zinc-900' 
          : 'bg-white'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
