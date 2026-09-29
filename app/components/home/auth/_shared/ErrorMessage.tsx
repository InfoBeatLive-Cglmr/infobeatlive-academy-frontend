import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
