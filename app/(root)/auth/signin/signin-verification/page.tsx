import React, { Suspense } from 'react'
import SignInVerificationScreen from '@/app/components/home/auth/signin/SignInVerificationScreen'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'

const page = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size="large" message="Loading page..." />}>
        <SignInVerificationScreen/>
      </Suspense>
    </div>
  )
}

export default page