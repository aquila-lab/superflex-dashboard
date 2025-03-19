import { memo } from 'react'
import { SuccessButton } from './success-button'
import { SuccessDescription } from './success-description'
import { SuccessIcon } from './success-icon'
import { useSuccessContext } from './success-provider'
import { SuccessTitle } from './success-title'

export const SuccessContent = memo(() => {
  const { config } = useSuccessContext()

  return (
    <div className='max-w-md w-full mx-auto p-4'>
      <div className='flex flex-col items-center justify-center text-center space-y-8'>
        <SuccessIcon>{config.icon}</SuccessIcon>

        <div className='space-y-2'>
          <SuccessTitle />
          <SuccessDescription />
        </div>

        <div className='flex flex-col w-full gap-3'>
          <SuccessButton />
        </div>
      </div>
    </div>
  )
})
