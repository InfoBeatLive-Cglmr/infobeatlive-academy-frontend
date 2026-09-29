// app/auth/signup/page.tsx
'use client';
import React from 'react';
import AuthLayout from '../../../components/home/auth/_shared/AuthLayout';
import Redeem from '@/app/components/home/auth/signup/redeem';

const SignUpPage: React.FC = () => {
 
  return (
    <AuthLayout title="Claim Your Life Time Deal" subtitle="please provide your and details and your
     redemption code below to claim your life time deal immediately." >
        <Redeem />
    </AuthLayout>
  );
};

export default SignUpPage;
