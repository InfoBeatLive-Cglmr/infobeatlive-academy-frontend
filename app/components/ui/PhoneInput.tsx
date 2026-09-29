'use client';
import React from 'react';
import PhoneInput, { Country, Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Phone } from 'lucide-react';

interface CustomPhoneInputProps {
  value: string | undefined;
  onChange: (value: Value | undefined) => void;
  placeholder?: string;
  defaultCountry?: Country;
  disabled?: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Phone Number",
  defaultCountry = "GB",
  disabled = false,
}) => {
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Phone className="h-5 w-5 text-zink-400" aria-hidden="true" />
      </div>
      <PhoneInput
        international
        defaultCountry={defaultCountry}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="
          flex items-center w-full p-3 pl-10 border border-zink-300 rounded-lg shadow-sm
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
          transition-colors duration-200 bg-white text-zink-800
          [&_.PhoneInputInput]:!border-none [&_.PhoneInputInput]:!ring-0 [&_.PhoneInputInput]:!shadow-none
          [&_.PhoneInputInput]:!p-0 [&_.PhoneInputInput]:!h-auto [&_.PhoneInputInput]:!text-base
          [&_.PhoneInputInput]:!bg-transparent [&_.PhoneInputInput]:!text-zink-800
          [&_.PhoneInputCountryIcon]:!shadow-none [&_.PhoneInputCountryIcon]:!rounded-sm
          [&_.PhoneInputCountrySelect]:!border-none [&_.PhoneInputCountrySelect]:!ring-0 [&_.PhoneInputCountrySelect]:!shadow-none
          [&_.PhoneInputCountrySelect]:!bg-transparent [&_.PhoneInputCountrySelect]:!text-zink-800
          [&_.PhoneInputCountrySelectArrow]:!text-zink-400
        "
        countrySelectProps={{
          className: "country-select-dropdown",
        }}
      />
      <style jsx global>{`
        /* Custom styles to integrate react-phone-number-input with Tailwind */
        .PhoneInput {
          display: flex;
          align-items: center;
          width: 100%;
          border: 1px solid #d1d5db; /* gray-300 */
          border-radius: 0.5rem; /* rounded-lg */
          background-color: #ffffff; /* bg-white */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .PhoneInput:focus-within {
          border-color: #3b82f6; /* blue-500 */
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* ring-2 ring-blue-500 */
        }

        .PhoneInputCountryIcon {
          width: 1.5rem; /* Adjust as needed */
          height: 1.5rem; /* Adjust as needed */
          border-radius: 0.125rem; /* rounded-sm */
          box-shadow: none; /* remove default shadow */
        }

        .PhoneInputCountrySelect {
          padding: 0.5rem;
          background-color: transparent;
          border: none;
          font-size: 1rem;
          color: #1f2937; /* gray-800 */
          -webkit-appearance: none; /* Remove default arrow on select */
          -moz-appearance: none;
          appearance: none;
          cursor: pointer;
        }

        .PhoneInputCountrySelect:focus {
          outline: none;
        }

        .PhoneInputCountrySelectArrow {
          color: #9ca3af; /* gray-400 */
        }

        .PhoneInputInput {
          flex-grow: 1;
          padding: 0.75rem; /* p-3 */
          border: none;
          background-color: transparent;
          font-size: 1rem;
          color: #1f2937; /* gray-800 */
          outline: none;
        }
        .PhoneInputInput:focus {
          outline: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default CustomPhoneInput;
