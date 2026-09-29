import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
      <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;
