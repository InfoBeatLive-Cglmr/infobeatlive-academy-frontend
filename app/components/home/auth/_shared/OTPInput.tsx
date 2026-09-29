
import React, { ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';

interface OTPInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  disabled?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, setOtp, disabled = false }) => {
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!disabled && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otp.length - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    if (pasteData.length === otp.length && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      
      otpInputRefs.current[otp.length - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between space-x-2 sm:space-x-3 w-full">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { otpInputRefs.current[index] = el; }}
          className="w-10 h-14 sm:w-12 sm:h-16 text-center text-2xl sm:text-3xl font-bold
                     border-2 border-zink-300 rounded-lg focus:border-brand-primary focus:ring-brand-primary
                     bg-zink-50 text-zink-800 transition-colors duration-200 outline-none"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOtpChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default OTPInput;
