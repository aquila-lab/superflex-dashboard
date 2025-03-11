import { OnboardingHeader } from '@/shared/onboarding-header'
import { UserInfoForm } from './user-info-form'

export const UserInfoPage = () => {
  return (
    <div className='flex flex-col min-h-svh'>
      <OnboardingHeader currentStep='profile-setup' />
      <div className='flex flex-1 items-center justify-center p-4 lg:p-8'>
        <div className='w-full max-w-md'>
          <UserInfoForm />
        </div>
      </div>
    </div>
  )
}
