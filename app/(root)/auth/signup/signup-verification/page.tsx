import React, { Suspense } from 'react'
import SignUpVerificationScreen from '@/app/components/home/auth/signup/SignUpVerificationScreen'
import LoadingSpinner from '@/app/components/ui/LoadingSpinner'

const page = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size="large" message="Loading page..." />}>
          <SignUpVerificationScreen />
      </Suspense>
    </div>
  )
}

export default page