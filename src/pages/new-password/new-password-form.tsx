import { cn } from '@/lib/utils'
import { useResetPassword } from '@/lib/hooks'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { type FormEvent, useCallback, useEffect, useState } from 'react'
import type { ComponentProps } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { withErrorHandling } from '@/lib/error-handling'

export const NewPasswordForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const navigate = useNavigate()
  const resetPassword = useResetPassword()

  useEffect(() => {
    if (!code) {
      toast.error(
        'Missing password reset code. Please request a new password reset.'
      )
      navigate('/forgot-password')
    }
  }, [code, navigate])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (resetPassword.isPending) {
        return
      }

      if (password.trim() === '' || confirmPassword.trim() === '') {
        toast.error('Please fill in all fields')
        return
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      if (!code) {
        toast.error(
          'Missing password reset code. Please request a new password reset.'
        )
        navigate('/forgot-password')
        return
      }

      const handleResetPassword = withErrorHandling(
        async () => {
          const result = await resetPassword.mutateAsync({
            code,
            new_password: password
          })
          return result
        },
        {
          successMessage: 'Password updated successfully',
          onSuccess: () => {
            navigate('/dashboard')
          }
        }
      )

      await handleResetPassword()
    },
    [password, confirmPassword, resetPassword, code, navigate]
  )

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Set new password</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your new password below
        </p>
      </div>

      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='password'>New Password</Label>
          <Input
            id='password'
            type='password'
            placeholder='********'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={resetPassword.isPending || !code}
          />
        </div>
        <div className='grid gap-3'>
          <Label htmlFor='confirmPassword'>Confirm New Password</Label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='********'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            disabled={resetPassword.isPending || !code}
          />
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={resetPassword.isPending || !code}
        >
          {resetPassword.isPending ? 'Updating password...' : 'Update password'}
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
