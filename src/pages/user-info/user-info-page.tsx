import { USER_INFO_LAYOUT_CLASSES } from '@/lib/constants'
import { OnboardingHeader } from '@/shared/onboarding-header/onboarding-header'
import { UserInfoForm } from './user-info-form'
import { UserInfoProvider } from './user-info-provider'

export const UserInfoPage = () => (
  <div className={USER_INFO_LAYOUT_CLASSES.container}>
    <OnboardingHeader currentStep={2} />
    <div className={USER_INFO_LAYOUT_CLASSES.content}>
      <div className={USER_INFO_LAYOUT_CLASSES.formWrapper}>
        <UserInfoProvider>
          <UserInfoForm />
        </UserInfoProvider>
      </div>
    </div>
  </div>
)
