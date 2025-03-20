import { memo } from 'react'
import { useSuccessContext } from './success-provider'

export const SuccessDescription = memo(() => {
  const { config } = useSuccessContext()

  return <p className='text-muted-foreground'>{config.cardDescription}</p>
})
