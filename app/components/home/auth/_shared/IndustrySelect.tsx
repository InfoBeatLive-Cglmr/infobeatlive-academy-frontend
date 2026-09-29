
import React from 'react';

interface IndustrySelectProps {
  value: string;
  onChange: (value: string) => void;
  onOtherChange?: (value: string) => void;
  required?: boolean;
}

const industryOptions = [
  { value: '', label: 'Select Industry' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Logistics & Supply Chain', label: 'Logistics & Supply Chain' },
  { value: 'Retail & E-commerce', label: 'Retail & E-commerce' },
  { value: 'Healthcare & Clinics', label: 'Healthcare & Clinics' },
  { value: 'Education & EdTech', label: 'Education & EdTech' },
  { value: 'Real Estate & Property Management', label: 'Real Estate & Property Management' },
  { value: 'Construction & Engineering', label: 'Construction & Engineering' },
  { value: 'HR & Recruiting', label: 'HR & Recruiting' },
  { value: 'Finance & Accounting Firms', label: 'Finance & Accounting Firms' },
  { value: 'Energy & Utilities', label: 'Energy & Utilities' },
  { value: 'Pharmaceutical & Biotech', label: 'Pharmaceutical & Biotech' },
  { value: 'Hospitality & Hotels', label: 'Hospitality & Hotels' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Agriculture & Farming', label: 'Agriculture & Farming' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Telecommunications', label: 'Telecommunications' },
  { value: 'Media & Advertising Agencies', label: 'Media & Advertising Agencies' },
  { value: 'Legal Services', label: 'Legal Services' },
  { value: 'Nonprofits & NGOs', label: 'Nonprofits & NGOs' },
  { value: 'Government & Public Services', label: 'Government & Public Services' },
  { value: 'Banking & Microfinance Institutions', label: 'Banking & Microfinance Institutions' },
  { value: 'Technology & SaaS Companies', label: 'Technology & SaaS Companies' },
  { value: 'Call Centers & Customer Support Centers', label: 'Call Centers & Customer Support Centers' },
  { value: 'Food & Beverage Industry', label: 'Food & Beverage Industry' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Professional Services', label: 'Professional Services' },
  { value: 'Travel & Tourism', label: 'Travel & Tourism' },
  { value: 'Mining & Metals', label: 'Mining & Metals' },
  { value: 'Environmental Services & Waste Management', label: 'Environmental Services & Waste Management' },
  { value: 'Sports & Entertainment', label: 'Sports & Entertainment' },
  { value: 'Other', label: 'Other' },
];

const IndustrySelect: React.FC<IndustrySelectProps> = ({ value, onChange, onOtherChange, required = false }) => {
  const isOtherSelected = value === 'Other';

  return (
    <div>
      <label htmlFor="industry" className="block text-sm font-medium text-zink-700 mb-2">
        Industry {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id="industry"
        name="industry"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value !== 'Other' && onOtherChange) {
            onOtherChange(''); 
          }
        }}
        className="w-full px-4 py-3 rounded-lg border border-zink-300 bg-zink-50 text-zink-800
                   focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors appearance-none"
        required={required}
      >
        {industryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isOtherSelected && onOtherChange && (
        <input
          type="text"
          id="otherIndustry"
          name="otherIndustry"
          onChange={(e) => onOtherChange(e.target.value)}
          className="w-full px-4 py-3 mt-3 rounded-lg border border-zink-300 bg-zink-50 text-zink-800
                     focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
          placeholder="Please specify your industry"
          required={required}
        />
      )}
    </div>
  );
};

export default IndustrySelect;
