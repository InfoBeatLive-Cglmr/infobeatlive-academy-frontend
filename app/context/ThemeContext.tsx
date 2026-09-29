'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storedTheme = Cookies.get('theme');
    if (storedTheme === 'dark') {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement; 
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    Cookies.set('theme', theme, { expires: 365 }); 
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
