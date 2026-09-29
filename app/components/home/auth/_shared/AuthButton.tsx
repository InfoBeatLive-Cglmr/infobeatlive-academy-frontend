import React from 'react';
import Button from '../Button';  
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress, disabled = false }) => {
  const isLoading = title.includes('...'); 

  return (
    <Button
      type="submit" 
      variant="gradient"
      className="w-full py-3 text-lg"
      onClick={onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <LoadingSpinner size="small" color="text-white" message={title} />
      ) : (
        title
      )}
    </Button>
  );
};

export default AuthButton;
