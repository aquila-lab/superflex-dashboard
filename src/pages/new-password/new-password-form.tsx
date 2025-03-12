import { API_BASE_URL } from '@/store/model'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { useAuthStore } from '@/store/auth-store'
import { type FormEvent, useCallback, useEffect, useState } from 'react'
import type { ComponentProps } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const NewPasswordForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const navigate = useNavigate()
  const { setToken } = useAuthStore()

  useEffect(() => {
    if (!code) {
      toast.error(
        'Missing password reset code. Please request a new password reset.'
      )
      navigate('/reset-password')
    }
  }, [code, navigate])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (isSubmitting) {
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
        navigate('/reset-password')
        return
      }

      try {
        setIsSubmitting(true)

        const response = await fetch(
          `${API_BASE_URL}/v1/auth/reset-password-set`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, new_password: password })
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to update password')
        }

        const { token } = await response.json()

        setToken(token)

        toast.success('Password updated successfully')
        navigate('/dashboard')
      } catch (_error) {
        toast.error('Failed to update password. The link may have expired.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [password, confirmPassword, isSubmitting, code, navigate, setToken]
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
            disabled={isSubmitting || !code}
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
            disabled={isSubmitting || !code}
          />
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting || !code}
        >
          {isSubmitting ? 'Updating password...' : 'Update password'}
        </Button>
      </div>

      <div className='text-center text-sm'>
        Remember your password?{' '}
        <Link to='/sign-in'>
          <div className='underline underline-offset-4'>Sign in</div>
        </Link>
      </div>
    </form>
  )
}
