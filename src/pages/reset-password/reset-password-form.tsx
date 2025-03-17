import { cn } from '@/lib/utils'
import { useRequestPasswordReset } from '@/lib/hooks'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { type FormEvent, useCallback, useMemo, useState } from 'react'
import type { ComponentProps } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const ResetPasswordForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const requestPasswordReset = useRequestPasswordReset()

  const isFormValid = useMemo(() => {
    return email.trim() !== ''
  }, [email])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!isFormValid || requestPasswordReset.isPending) {
        return
      }

      requestPasswordReset.mutate(email, {
        onSuccess: () => {
          toast.success('Password reset email sent')
          navigate('/forgot-password-request')
        },
        onError: () => {
          toast.error('Failed to reset password. Please try again.')
        }
      })
    },
    [email, isFormValid, requestPasswordReset, navigate]
  )

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Forgot your password?</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your email below to reset your password
        </p>
      </div>

      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='youremail@example.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={requestPasswordReset.isPending}
          />
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={requestPasswordReset.isPending}
        >
          {requestPasswordReset.isPending
            ? 'Resetting password...'
            : 'Reset password'}
        </Button>
      </div>
      <div className='text-center text-sm'>
        Remember your password?{' '}
        <Link to='/login'>
          <div className='underline underline-offset-4'>Sign in</div>
        </Link>
      </div>
    </form>
  )
}
