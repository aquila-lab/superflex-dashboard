import { useAuth } from '@/global/hooks/use-auth'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { useGoogleLogin } from '@react-oauth/google'
import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import type { ComponentProps } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const RegisterForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const { register, googleLogin } = useAuth()

  const handleGoogleAuthCode = useCallback(
    async (code: string) => {
      try {
        setIsSubmitting(true)
        const authToken = await googleLogin(code)

        if (authToken) {
          toast.success('Account created with Google successfully')
          navigate('/select-plan', { replace: true })
        }
      } catch (_error) {
        toast.error('Failed to create account with Google. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [googleLogin, navigate]
  )

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      handleGoogleAuthCode(code)
    }
  }, [searchParams, handleGoogleAuthCode])

  const isFormValid = useMemo(() => {
    return (
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword
    )
  }, [email, password, confirmPassword])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!isFormValid || isSubmitting) {
        return
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      try {
        setIsSubmitting(true)

        await register(email, password)

        toast.success('Account created successfully')
        navigate('/select-plan')
      } catch (_error) {
        setPassword('')
        setConfirmPassword('')
        toast.error(
          'Failed to create account. Please try again with a different email.'
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      email,
      password,
      confirmPassword,
      isFormValid,
      isSubmitting,
      register,
      navigate
    ]
  )

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      if (codeResponse.code) {
        await handleGoogleAuthCode(codeResponse.code)
      }
    },
    onError: () => {
      toast.error('Google sign up failed. Please try again.')
    }
  })

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Sign up</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Create an account to get started
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
            disabled={isSubmitting}
          />
        </div>
        <div className='grid gap-3'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            placeholder='********'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className='grid gap-3'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='********'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create an account'}
        </Button>
        <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-background text-muted-foreground relative z-10 px-2'>
            Or continue with
          </span>
        </div>
        <Button
          variant='outline'
          className='w-full'
          type='button'
          disabled={isSubmitting}
          onClick={() => handleGoogleLogin()}
        >
          <Icons.Google /> Google
        </Button>
      </div>
      <div className='text-center text-sm'>
        Already have an account?{' '}
        <Link to='/sign-in'>
          <div className='underline underline-offset-4'>Sign in</div>
        </Link>
      </div>
    </form>
  )
}
