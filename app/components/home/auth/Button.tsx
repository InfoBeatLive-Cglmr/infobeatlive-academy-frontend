
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient'; 
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ease-in-out shadow-lg transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = `bg-blue-600 text-white hover:bg-blue-800 focus:ring-blue-500`;
      break;
    case 'secondary':
      variantStyles = `bg-purple-600 text-white hover:bg-purple-800 focus:ring-purple-500`;
      break;
    case 'outline':
      variantStyles = `bg-transparent border-2 border-black text-black hover:border-white
                       hover:bg-blue-700 hover:text-white focus:ring-blue-500`;
      break;
    case 'gradient': 
      variantStyles = `bg-gradient-to-r from-purple-600 to-indigo-700 text-white
                       hover:from-blue-500 hover:to-purple-600 focus:ring-blue-500`;
      break;
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
