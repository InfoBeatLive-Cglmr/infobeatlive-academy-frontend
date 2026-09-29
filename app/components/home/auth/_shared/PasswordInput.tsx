import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  required = false,
  placeholder = 'Enter your password',
  autoComplete = 'current-password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-zink-100 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pr-12 rounded-lg border border-zink-700 bg-zink-800 text-zink-100
                   focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-7"
        title={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5 text-zink-400 hover:text-zink-600" />
        ) : (
          <EyeIcon className="h-5 w-5 text-zink-400 hover:text-zink-600" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
