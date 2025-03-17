import { withErrorHandling } from '@/lib/error-handling'
import { useGoogleAuth, useRegister } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { useGoogleLogin } from '@react-oauth/google'
import { Loader2 } from 'lucide-react'
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
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister()
  const { mutateAsync: googleAuth, isPending: isGoogleAuthPending } =
    useGoogleAuth()

  const handleGoogleAuthCode = useCallback(
    async (code: string) => {
      const handleGoogleAuth = withErrorHandling(
        async (authCode: string) => {
          return await googleAuth({ code: authCode })
        },
        {
          successMessage: 'Account created with Google successfully',
          onSuccess: () => {
            navigate('/select-plan', { replace: true })
          }
        }
      )

      await handleGoogleAuth(code)
    },
    [googleAuth, navigate]
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
      confirmPassword.trim() !== ''
    )
  }, [email, password, confirmPassword])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!isFormValid || isRegisterPending) {
        return
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match, please try again.')
        return
      }

      try {
        await register(
          { email, password, username: email },
          {
            onSuccess: () => {
              toast.success('Account created successfully')
              setTimeout(() => {
                navigate('/select-plan')
              }, 500)
            },
            onError: (error: any) => {
              setPassword('')
              setConfirmPassword('')
              const errorMessage =
                error?.response?.data?.error?.message ||
                'Failed to create account. Please try again with a different email.'
              toast.error(errorMessage)
            }
          }
        )
      } catch (error: any) {
        setPassword('')
        setConfirmPassword('')
        const errorMessage =
          error?.response?.data?.error?.message ||
          'Failed to create account. Please try again with a different email.'
        toast.error(errorMessage)
      }
    },
    [
      email,
      password,
      confirmPassword,
      isFormValid,
      isRegisterPending,
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

  const isSubmitting = isRegisterPending || isGoogleAuthPending

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
          {isSubmitting ? (
            <span className='flex items-center gap-2'>
              <Loader2 className='size-4 animate-spin' />
              Creating account...
            </span>
          ) : (
            'Create an account'
          )}
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
        <Link to='/login'>
          <div className='underline underline-offset-4'>Sign in</div>
        </Link>
      </div>
    </form>
  )
}
