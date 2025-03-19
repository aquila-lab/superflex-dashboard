import { DashboardHeader } from '@/shared/dashboard-header/dashboard-header'
import { Footer } from '@/shared/footer/footer'
import { OnboardingForm } from './onboarding-form'
import { OnboardingProvider } from './onboarding-provider'

export const OnboardingPage = () => {
  return (
    <div className='flex flex-col min-h-svh'>
      <DashboardHeader />
      <div className='flex flex-col items-center justify-start p-4 max-w-4xl mx-auto w-full gap-8 pt-8 pb-12'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-2'>Setup Superflex</h1>
          <p className='text-muted-foreground max-w-2xl'>
            Follow these steps to get started with Superflex and supercharge
            your development workflow.
          </p>
        </div>

        <OnboardingProvider>
          <OnboardingForm />
        </OnboardingProvider>
      </div>
      <Footer />
    </div>
  )
}
