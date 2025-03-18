import { DashboardHeader } from '@/shared/dashboard-header/dashboard-header'
import { Footer } from '@/shared/footer/footer'
import { SaveRedirectSource } from '@/shared/save-redirect-source/save-redirect-source'
import { PlanSelectionDrawer } from './plan-selection-drawer'
import { RequestsCard } from './requests-card'
import { SubscriptionCard } from './subscription-card'
import { UserInfoCard } from './user-info-card'

export const DashboardPage = () => {
  return (
    <div className='flex flex-col min-h-svh'>
      <SaveRedirectSource />
      <DashboardHeader />
      <div className='flex-1 p-6 container mx-auto max-w-6xl flex flex-col gap-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Account Settings</h1>
          <p className='text-muted-foreground max-w-2xl'>
            You can manage your account, billing, and team settings here.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 items-start'>
          <div className='flex flex-col gap-6'>
            <UserInfoCard />
            <RequestsCard />
          </div>
          <SubscriptionCard />
        </div>
      </div>
      <Footer />
      <PlanSelectionDrawer />
    </div>
  )
}
