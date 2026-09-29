// app/auth/forgot-password/page.tsx
'use client';
import React from 'react';
import AuthLayout from '@/app/components/home/auth/_shared/AuthLayout';
import ForgotPassword from '@/app/components/home/auth/forgot-password/forgotPassword';

const ForgotPasswordPage: React.FC = () => {
 
  return (
    <AuthLayout title="Forgot Your Password?"  subtitle="" >
        <ForgotPassword  />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
