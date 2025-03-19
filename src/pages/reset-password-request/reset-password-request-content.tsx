import { Button } from '@/ui/button'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ResetPasswordRequestContent = () => {
  return (
    <div className='grid gap-4'>
      <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-200 text-green-700'>
        <Check className='size-5' />
      </div>

      <p className='text-muted-foreground text-xs text-center'>
        Didn't receive an email? Check your spam folder or try again with a
        different email.
      </p>

      <Button
        variant='outline'
        className='w-full'
        asChild
      >
        <Link to='/forgot-password'>Try again</Link>
      </Button>
    </div>
  )
}
