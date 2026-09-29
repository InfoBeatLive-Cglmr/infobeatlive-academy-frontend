'use client';

import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react'; 

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-zink-200 rounded-lg mb-4 bg-white shadow-sm">
      <button
        className="flex justify-between items-center w-full p-4 sm:p-5 text-left 
                   font-semibold text-lg sm:text-xl text-zink-800 
                   hover:bg-zink-50 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-5 h-5 sm:w-6 sm:h-6 text-zink-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 sm:p-5 pt-0 text-zink-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
