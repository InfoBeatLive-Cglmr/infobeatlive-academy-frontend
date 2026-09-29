
'use client';
import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; 

interface DashboardContentProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ title, description, children }) => {
 
  const { theme } = useTheme();

  return (
    <div className={`p-2 sm:p-6 rounded- overflow-y-auto  h-screen 
                    ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-zinc-200'}`}>
      <h1 className={` sm:text-3xl text-xl font-bold mb-2 ${theme === 'dark' ? 'text-zinc-50' : 'text-text-heading'}`}>
        {title}
      </h1>
      <p className={` sm:text-lg text-sm mb-6 b-6 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}`}>
        {description}
      </p>
      {children || (
        <div className={` p-8 rounded-lg border-2 border-dashed
                        ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-zinc-400' 
                        : 'bg-zinc-100 border-zinc-300 text-zinc-500'} text-center`}> 
          <p>Content for &quot;{title}&quot; will appear here.</p>
          <p className="mt-2 text-sm">This is a placeholder for your dynamic dashboard widgets and data visualizations.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;


