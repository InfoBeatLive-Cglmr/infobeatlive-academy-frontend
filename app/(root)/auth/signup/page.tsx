// app/auth/signup/page.tsx
'use client';
import React from 'react';
import AuthLayout from '../../../components/home/auth/_shared/AuthLayout';
import SignUp from '@/app/components/home/auth/signup/signup';

const SignUpPage: React.FC = () => {
 
  return (
    <AuthLayout title="Create Your InfoBeatLive Account" subtitle=" " >
        <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;
