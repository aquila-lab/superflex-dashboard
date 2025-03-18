import { STEPS_DATA } from '@/lib/constants'
import { Step } from './step'

export const OnboardingStepsCompact = ({
  currentStep
}: {
  currentStep: number
}) => {
  return (
    <div className='flex items-center'>
      {STEPS_DATA.map((step, index) => (
        <Step
          key={step.id}
          step={step}
          index={index}
          currentStep={currentStep}
        />
      ))}
    </div>
  )
}
