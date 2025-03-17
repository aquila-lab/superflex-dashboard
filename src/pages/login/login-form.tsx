import { useLogin, useGoogleAuth } from '@/lib/hooks'
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

export const LoginForm = ({ className, ...props }: ComponentProps<'form'>) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const { mutate: login, isPending: isLoginPending } = useLogin()
  const { mutate: googleAuth, isPending: isGoogleAuthPending } = useGoogleAuth()

  const handleGoogleAuthCode = useCallback(
    async (code: string) => {
      try {
        await googleAuth({ code })
        toast.success('Logged in with Google successfully')
        navigate('/select-plan', { replace: true })
      } catch (_error) {
        toast.error('Failed to login with Google. Please try again.')
      }
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
    return email.trim() !== '' && password.trim() !== ''
  }, [email, password])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!isFormValid || isLoginPending) {
        return
      }

      try {
        await login(
          { username_or_email: email, password },
          {
            onSuccess: () => {
              toast.success('Logged in successfully')
              setTimeout(() => {
                navigate('/select-plan')
              }, 500)
            },
            onError: () => {
              setPassword('')
              toast.error(
                'Failed to login. Please check your credentials and try again.'
              )
            }
          }
        )
      } catch (_error) {
        setPassword('')
        toast.error(
          'Failed to login. Please check your credentials and try again.'
        )
      }
    },
    [email, password, isFormValid, isLoginPending, login, navigate]
  )

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async codeResponse => {
      if (codeResponse.code) {
        await handleGoogleAuthCode(codeResponse.code)
      }
    },
    onError: () => {
      toast.error('Google login failed. Please try again.')
    }
  })

  const isSubmitting = isLoginPending || isGoogleAuthPending

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Sign in</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your email below to login to your account
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
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
            <Link
              to={'/forgot-password-request'}
              className='ml-auto text-sm leading-none underline-offset-4 hover:underline'
            >
              Forgot your password?
            </Link>
          </div>
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
        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className='flex items-center gap-2'>
              <Loader2 className='size-4 animate-spin' />
              Signing in...
            </span>
          ) : (
            'Login'
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
        Don&apos;t have an account?{' '}
        <Link to='/register'>
          <div className='underline underline-offset-4'>Sign up</div>
        </Link>
      </div>
    </form>
  )
}
