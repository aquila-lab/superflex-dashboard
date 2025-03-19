import { withErrorHandling } from '@/lib/error-handling'
import { useGoogleAuth, useRegister } from '@/lib/hooks'
import { useGoogleLogin } from '@react-oauth/google'
import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { createContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const RegisterContext = createContext<
  | {
      email: string
      setEmail: (email: string) => void
      password: string
      setPassword: (password: string) => void
      confirmPassword: string
      setConfirmPassword: (confirmPassword: string) => void
      isSubmitting: boolean
      isFormValid: boolean
      handleSubmit: (e: FormEvent) => Promise<void>
      handleGoogleLogin: () => void
    }
  | undefined
>(undefined)

export const RegisterProvider = ({
  children
}: {
  children: ReactNode
}) => {
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

  const value = useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      isSubmitting,
      isFormValid,
      handleSubmit,
      handleGoogleLogin: () => handleGoogleLogin()
    }),
    [
      email,
      password,
      confirmPassword,
      isSubmitting,
      isFormValid,
      handleSubmit,
      handleGoogleLogin
    ]
  )

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  )
}

export const useRegisterContext = () => {
  const context = useContext(RegisterContext)
  if (!context) {
    throw new Error('useRegisterContext must be used within a RegisterProvider')
  }
  return context
}
