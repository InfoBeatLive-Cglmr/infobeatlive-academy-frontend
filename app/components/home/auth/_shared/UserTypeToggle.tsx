import React from 'react';

interface UserTypeToggleProps {
  currentUserType: 'individual' | 'organization';
  onToggle: (type: 'individual' | 'organization') => void;
}

const UserTypeToggle: React.FC<UserTypeToggleProps> = ({ currentUserType, onToggle }) => {
  return (
    <div className="flex justify-center mb-8 text-black">
      <div className="inline-flex rounded-full bg-zink-300 p-1 shadow-inner">
        <button
          onClick={() => onToggle('individual')}
          className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300
                      ${currentUserType === 'individual' ? 'bg-zink-900  text-white shadow-md' 
                        : 'text-zink-950  hover:bg-zink-200'}`}
        >
          Individual
        </button>
        <button
          onClick={() => onToggle('organization')}
          className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300
                      ${currentUserType === 'organization' ? 'bg-zink-900 text-white  shadow-md'
                         : 'text-zink-950 hover:bg-zink-200'}`}
        >
          Organization
        </button>
      </div>
    </div>
  );
};

export default UserTypeToggle;
