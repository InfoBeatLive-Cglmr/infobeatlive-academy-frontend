'use client'
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { getGoogleOAuthUrl } from '@/app/utils/account/googleAuth';

const GoogleSignIn: React.FC = () => {

  const handleLogin = () => {
  const url = getGoogleOAuthUrl();
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
};

  return (
    <div className='font-bold'>
      <div className='flex justify-center mt-3'>
        <div className='flex flex-col'>
          <div className='border border-zink-700 rounded h-auto w-auto lg:px-5 p-2'>
            <h1 className='flex justify-center text-sm max-sm:text-sm'>or continue with </h1>

            <div className='flex flex-row justify-between'>
              <div className='flex justify-center mb-3 mt-3 text-2xl'>
                <button
                  onClick={handleLogin}
                  type='button'
                  className='flex flex-row bg-white h-9 w-64 pt-2 hover:bg-zink-100
                   border rounded
                  border-zink-300 pb-1 text-center pl-3'>
                  <FaGoogle size={20} className='mr-1  text-red-700' />
                  <span className='text-green-700 text-sm   font-bold'>
                  <span className='text-yellow-700 mx-1'>Continue</span> 
                  <span className='text-red-700 mx-1'>With</span> 
                  <span className='text-blue-700 mx-1'>Your</span> 
                  <span className='text-lime-700 mx-1'>Google</span> 
                  
                  </span>
                </button>
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  );
};

export default GoogleSignIn;
