import { CheckCircle, Sparkles } from 'lucide-react'
import { YouTubeVideo } from '@/shared/youtube-video/youtube-video'
import { InfoBox } from '@/shared/onboarding-components/info-box'
import { OnboardingSection } from '@/shared/onboarding-components/onboarding-section'
import { SectionFooter } from '@/shared/onboarding-components/section-footer'
import { SectionIntro } from '@/shared/onboarding-components/section-intro'
import { StepList } from '@/shared/onboarding-components/step-list'
import { FIGMA_CONNECTION_STEPS } from '@/lib/constants'

export const ConnectFigmaSection = ({
  isCompleted,
  onComplete
}: {
  isCompleted: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  return (
    <OnboardingSection>
      <SectionIntro text='Before diving into Superflex, you need to connect your Figma account. This allows Superflex to access your designs and use them as context for AI-powered assistance.' />

      <YouTubeVideo videoId='9Xn9qisQRgM' />

      <InfoBox
        icon={<CheckCircle className='size-5 text-green-600' />}
        title='How to Connect Figma'
      >
        <StepList steps={FIGMA_CONNECTION_STEPS} />
      </InfoBox>

      <InfoBox
        icon={<Sparkles className='size-5 text-green-600' />}
        title="What you'll unlock"
        variant='success'
      >
        <p className='text-sm text-green-700'>
          With Figma connected, you can convert designs directly to code, get
          layout suggestions, and ensure your implementation matches the design
          perfectly.
        </p>
      </InfoBox>

      <SectionFooter
        message='All set? Click the button to complete onboarding! 🚀'
        sectionId='connect-figma'
        isCompleted={isCompleted}
        onComplete={onComplete}
      />
    </OnboardingSection>
  )
}
