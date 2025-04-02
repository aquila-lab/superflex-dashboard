import { FIGMA_CONNECTION_STEPS } from '@/lib/constants'
import { ExtensionLoginButton } from '@/shared/extension-login-button/extension-login-button'
import { InfoBox } from '@/shared/onboarding-components/info-box'
import { OnboardingSection } from '@/shared/onboarding-components/onboarding-section'
import { SectionFooter } from '@/shared/onboarding-components/section-footer'
import { SectionIntro } from '@/shared/onboarding-components/section-intro'
import { StepList } from '@/shared/onboarding-components/step-list'
import { YouTubeVideo } from '@/shared/youtube-video/youtube-video'
import { AlertCircle, CheckCircle, ExternalLink, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/ui/button'

export const ConnectFigmaSection = ({
  isCompleted,
  onComplete
}: {
  isCompleted: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  const extensionSource = useMemo(() => {
    const registrationSource = localStorage.getItem('registrationSource')
    const loginSource = localStorage.getItem('loginSource')
    return registrationSource || loginSource || ''
  }, [])

  const extensionName = useMemo(() => {
    return extensionSource === 'cursor' ? 'Cursor' : 'VSCode'
  }, [extensionSource])

  const hasExtensionData = useMemo(() => {
    return !!extensionSource
  }, [extensionSource])

  return (
    <OnboardingSection>
      <SectionIntro
        text={`Before diving into Superflex, you need to connect your Figma account. This allows Superflex to access your designs and use them as context for AI-powered assistance. ${hasExtensionData ? `First, you'll need to login to your ${extensionName} extension.` : ''}`}
      />

      <YouTubeVideo videoId='9Xn9qisQRgM' />

      <div className='flex flex-col items-center space-y-4 my-6'>
        <InfoBox
          icon={<ExternalLink className='size-5 text-blue-600' />}
          title='Extension Login Required'
        >
          <p className='text-sm'>
            {hasExtensionData
              ? `You must be logged in to the extension to connect Figma. If you haven\'t already, click the "Login to ${extensionName}" button above to authenticate with your Superflex account. If an error occurs, please try initiating the login process from the extension again.`
              : 'To connect your Figma account, you need to first trigger the login from your VSCode or Cursor extension. Please open your extension and use the login option there to continue.'}
          </p>
          <div className='mt-3'>
            {hasExtensionData ? (
              <ExtensionLoginButton
                variant='outline'
                className='w-full'
              />
            ) : (
              <Button
                variant='outline'
                className='w-full'
                disabled
              >
                Login from Extension First
              </Button>
            )}
          </div>
        </InfoBox>
      </div>

      <InfoBox
        icon={<CheckCircle className='size-5 text-green-600' />}
        title='How to Connect Figma'
      >
        <StepList steps={FIGMA_CONNECTION_STEPS} />
      </InfoBox>

      <InfoBox
        icon={<AlertCircle className='size-5 text-amber-600' />}
        title='Important Note'
        variant='warning'
      >
        <p className='text-sm text-amber-700'>
          {hasExtensionData
            ? `You must be logged in to the extension to connect Figma. If you haven\'t already, click the "Login to ${extensionName}" button above to authenticate with your Superflex account. If an error occurs, please try initiating the login process from the extension again.`
            : "You must initiate the login process from your code editor extension first. Once you've done that, return here to continue connecting your Figma account."}
        </p>
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
        message='Connected Figma? Click to complete this step! 🚀'
        sectionId='connect-figma'
        isCompleted={isCompleted}
        onComplete={onComplete}
      />
    </OnboardingSection>
  )
}
