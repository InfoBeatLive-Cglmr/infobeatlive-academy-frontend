// components/common/Button.tsx
'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  const baseClasses = `font-semibold rounded-lg transition-all duration-200 flex items-center justify-center`;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: `bg-brand-primary text-white hover:bg-brand-primary-dark ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
    danger: `bg-red-600 text-white hover:bg-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
    success: `bg-green-600 text-white hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`,
    outline: `${theme === 'dark' ? 'border border-gray-600 text-gray-200 hover:bg-gray-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`,
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
