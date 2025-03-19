import { memo } from 'react'
import { useSuccessContext } from './success-provider'

export const SuccessTitle = memo(() => {
  const { config } = useSuccessContext()

  return (
    <h1 className='text-2xl font-bold tracking-tight'>{config.cardTitle}</h1>
  )
})
