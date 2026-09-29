import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string; 
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'text-blue-600',
  message,
}) => {
  let spinnerSizeClass = '';
  switch (size) {
    case 'small':
      spinnerSizeClass = 'w-6 h-6';
      break;
    case 'medium':
      spinnerSizeClass = 'w-8 h-8';
      break;
    case 'large':
      spinnerSizeClass = 'w-12 h-12';
      break;
    default:
      spinnerSizeClass = 'w-8 h-8';
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div
        className={`animate-spin rounded-full border-4 border-t-4 
                    border-zink-200 ${color} ${spinnerSizeClass}`}
        style={{ borderTopColor: color.split('-')[1] ? `var(--tw-colors-${color.split('-')[1]}-${color.split('-')[2]})`
         : color }} 
      ></div>
      {message && (
        <p className="mt-3 text-zink-50 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
