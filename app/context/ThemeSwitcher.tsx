
'use client'; 
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid'; 

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="flex items-center space-x-2 p-1.5 bg-zink-200 rounded-full shadow-inner-md
                    border border-zink-300"> 
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-all duration-300 ease-in-out
          ${currentTheme === 'light' ? 'bg-white text-blue-600 shadow-md' : 'text-zink-600 hover:bg-zink-100'}`}
        aria-label="Switch to light mode"
        title="Light Mode"
      >
        <SunIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-all duration-300 ease-in-out
          ${currentTheme === 'dark' ? 'bg-zink-800 text-purple-400 shadow-md' : 'text-zink-600 hover:bg-zink-100'}`}
        aria-label="Switch to dark mode"
        title="Dark Mode"
      >
        <MoonIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-all duration-300 ease-in-out
          ${theme === 'system' ? 'bg-zink-300 text-green-600 shadow-md' : 'text-zink-600 hover:bg-zink-100'}`}
        aria-label="Switch to system preference"
        title="System Theme"
      >
        <ComputerDesktopIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
