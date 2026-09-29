'use client';
import React, { useState, useEffect } from 'react';
import { XCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export interface AlertMessageProps {
  message: string | null;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void; 
  duration?: number; 
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000, 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          if (onClose) onClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [message, duration, onClose]);

  if (!isVisible || !message) return null;

  let bgColorClass = '';
  let textColorClass = '';
  let icon: React.ReactNode = null;

  switch (type) {
    case 'success':
      bgColorClass = 'bg-green-100 border-green-400';
      textColorClass = 'text-green-800';
      icon = <CheckCircle size={20} className="text-green-600" />;
      break;
    case 'error':
      bgColorClass = 'bg-red-100 border-red-400';
      textColorClass = 'text-red-800';
      icon = <XCircle size={20} className="text-red-600" />;
      break;
    case 'warning':
      bgColorClass = 'bg-yellow-100 border-yellow-400';
      textColorClass = 'text-yellow-800';
      icon = <AlertTriangle size={20} className="text-yellow-600" />;
      break;
    case 'info':
    default:
      bgColorClass = 'bg-blue-100 border-blue-400';
      textColorClass = 'text-blue-800';
      icon = <Info size={20} className="text-blue-600" />;
      break;
  }

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 
                  flex items-center p-4 rounded-lg shadow-lg 
                  border ${bgColorClass} ${textColorClass} 
                  transition-all duration-300 ease-out 
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
                  w-11/12 sm:w-auto max-w-lg`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3">
        {icon}
      </div>
      <span className="text-sm font-medium flex-grow">{message}</span>
      <button
        onClick={() => { setIsVisible(false); if (onClose) onClose(); }}
        className="ml-4 p-1 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-opacity-75"
        aria-label="Close alert"
      >
        <XCircle size={16} className={`${textColorClass.replace('text-', 'text-')}`} />
      </button>
    </div>
  );
};

export default AlertMessage;
