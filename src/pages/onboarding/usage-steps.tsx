import { USAGE_STEPS } from '@/lib/utils'
import { InfoBox } from '@/shared/onboarding-components/info-box'
import { StepList } from '@/shared/onboarding-components/step-list'
import { Rocket } from 'lucide-react'
import { memo } from 'react'

export const UsageSteps = memo(() => {
  return (
    <InfoBox
      icon={<Rocket className='size-5 text-red-300' />}
      title='Using Superflex'
    >
      <StepList steps={USAGE_STEPS} />
    </InfoBox>
  )
})
