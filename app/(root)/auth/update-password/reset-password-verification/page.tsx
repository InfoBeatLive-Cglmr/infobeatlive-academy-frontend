import React, { Suspense } from 'react'
import ResetPasswordVerificationScreen from '@/app/components/home/auth/forgot-password/ResetPasswordVerificationScreen'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'

const page = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size="large" message="Loading page..." />}>
          <ResetPasswordVerificationScreen />
      </Suspense>
    </div>
  )
}

export default page
