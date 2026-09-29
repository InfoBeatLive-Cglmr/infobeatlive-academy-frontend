// app/auth/reset-password/page.tsx
'use client';
import React from 'react';
import AuthLayout from '../../../components/home/auth/_shared/AuthLayout';
import ResetPasswordForm from '../../../components/home/auth/forgot-password/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
 
  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your new password below."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
