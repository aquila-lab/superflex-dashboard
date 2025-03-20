import { Button } from '@/ui/button'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useSuccessContext } from './success-provider'

export const SuccessButton = memo(() => {
  const { config } = useSuccessContext()

  return (
    <Button asChild>
      <Link to='/'>{config.ctaText}</Link>
    </Button>
  )
})
