import { memo } from 'react'
import { SuccessCard } from './success-card'
import { SuccessConfetti } from './success-confetti'
import { SuccessHeader } from './success-header'
import { SuccessProvider } from './success-provider'

export const SuccessPage = memo(() => (
  <SuccessProvider>
    <div className='flex min-h-screen flex-col'>
      <SuccessHeader />
      <main className='flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full'>
          <SuccessCard />
        </div>
      </main>
      <SuccessConfetti />
    </div>
  </SuccessProvider>
))
