'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/app/context/ThemeContext';

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  label,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opt.sublabel && opt.sublabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
          disabled
            ? isDark
              ? 'opacity-50 cursor-not-allowed bg-zinc-900/40 border-zinc-800/60'
              : 'opacity-50 cursor-not-allowed bg-zinc-100 border-zinc-200'
            : isOpen
            ? 'border-emerald-500 ring-1 ring-emerald-500 ' + (isDark ? 'bg-zinc-900' : 'bg-white')
            : isDark
            ? 'bg-zinc-900/60 border-zinc-700 hover:border-zinc-700 text-zinc-100'
            : 'bg-zinc-50 border-zinc-300 hover:border-zinc-300 text-zinc-900'
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {selectedOption?.icon && <span className="text-xl">{selectedOption.icon}</span>}
          <div className="truncate">
            <span
              className={
                selectedOption
                  ? isDark
                    ? 'text-zinc-100 font-medium text-sm'
                    : 'text-zinc-900 font-medium text-sm'
                  : 'text-zinc-500 text-sm'
              }
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            {selectedOption?.sublabel && (
              <span className={`block text-xs truncate ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {selectedOption.sublabel}
              </span>
            )}
          </div>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-full rounded-xl border shadow-2xl overflow-hidden backdrop-blur-xl ${
            isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'
          }`}
        >
          <div
            className={`p-2 border-b flex items-center gap-2 ${
              isDark ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-100 bg-zinc-50'
            }`}
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-zinc-400 ml-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className={`w-full bg-transparent px-2 py-1.5 text-xs focus:outline-none ${
                isDark ? 'text-zinc-100 placeholder-zinc-500' : 'text-zinc-900 placeholder-zinc-400'
              }`}
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-xs text-zinc-500 text-center">No matching options found.</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                        : isDark
                        ? 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {option.icon && <span>{option.icon}</span>}
                      <div className="truncate">
                        <div>{option.label}</div>
                        {option.sublabel && (
                          <div className={`text-[10px] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {option.sublabel}
                          </div>
                        )}
                      </div>
                    </div>
                    {isSelected && <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

