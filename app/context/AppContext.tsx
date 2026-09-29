'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
  type: 'academic' | 'payment' | 'assignment';
}

interface AppContextType {
  user: { role: string; name: string };
  setUser: React.Dispatch<React.SetStateAction<{ role: string; name: string }>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Notification[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({ role: 'admin', name: 'Dr. Adeniyi' });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        sidebarOpen,
        setSidebarOpen,
        notifications,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
};