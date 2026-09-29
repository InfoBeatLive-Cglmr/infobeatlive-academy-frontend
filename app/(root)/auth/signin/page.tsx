// app/auth/signin/page.tsx
'use client';
import React from 'react';
import AuthLayout from '../../../components/home/auth/_shared/AuthLayout';
import SignIn from '@/app/components/home/auth/signin/signin';

const SignInPage: React.FC = () => {
  
  return (
    <AuthLayout title="Welcome Back to InfoBeatLive"  subtitle="" >
        <SignIn  />
    </AuthLayout>
  );
};

export default SignInPage;
