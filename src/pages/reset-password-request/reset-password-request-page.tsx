import { AuthWallpaper } from '@/shared/auth-wallpaper'
import { Button } from '@/ui/button'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ResetPasswordRequestPage = () => (
  <div className='grid min-h-svh lg:grid-cols-2'>
    <AuthWallpaper />

    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full max-w-xs flex flex-col gap-6'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-200 text-green-700'>
            <Check className='size-5' />
          </div>
          <h1 className='text-2xl font-bold'>Check your email</h1>
          <p className='text-muted-foreground text-sm'>
            We've sent a password reset link to your email address. Please check
            your inbox and follow the instructions.
          </p>
        </div>

        <div className='grid gap-4'>
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

          <div className='text-center text-sm'>
            Remember your password?{' '}
            <Link to='/login'>
              <div className='underline underline-offset-4'>Sign in</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)
