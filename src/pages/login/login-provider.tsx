import { withErrorHandling } from '@/lib/error-handling'
import {
  useGoogleAuth,
  useLogin,
  useSourceDetection,
  useExtensionOnboardingCompletion
} from '@/lib/hooks'
import { trackConversion } from '@/lib/utils'
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

const LoginContext = createContext<
  | {
      email: string
      setEmail: (email: string) => void
      password: string
      setPassword: (password: string) => void
      isSubmitting: boolean
      isFormValid: boolean
      handleSubmit: (e: FormEvent) => Promise<void>
      handleGoogleLogin: () => void
    }
  | undefined
>(undefined)

export const LoginProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams()
  const [loginSource, setLoginSource] = useState<string>('')
  const { detectSource } = useSourceDetection()
  const { completeOnboardingForExtensionUser } =
    useExtensionOnboardingCompletion()

  const navigate = useNavigate()
  const { mutateAsync: login, isPending: isLoginPending } = useLogin()
  const { mutateAsync: googleAuth, isPending: isGoogleAuthPending } =
    useGoogleAuth()

  const handleGoogleAuthCode = useCallback(
    async (code: string) => {
      const handleGoogleAuth = withErrorHandling(
        async (authCode: string) => {
          return await googleAuth({ code: authCode })
        },
        {
          successMessage: 'Logged in with Google successfully',
          onSuccess: async () => {
            if (loginSource) {
              trackConversion.userLogin(loginSource)
            }

            await completeOnboardingForExtensionUser()

            navigate('/select-plan', { replace: true })
          }
        }
      )

      await handleGoogleAuth(code)
    },
    [googleAuth, navigate, loginSource, completeOnboardingForExtensionUser]
  )

  useEffect(() => {
    const detectLoginSource = () => {
      const detectedSource = detectSource()

      if (detectedSource) {
        setLoginSource(detectedSource)
        localStorage.setItem('loginSource', detectedSource)
        trackConversion.loginPageVisitWithSource(detectedSource)
      } else {
        trackConversion.loginPageVisit()
      }
    }

    detectLoginSource()

    const code = searchParams.get('code')
    if (code) {
      handleGoogleAuthCode(code)
    }
  }, [searchParams, handleGoogleAuthCode, detectSource])

  const isFormValid = useMemo(() => {
    return email.trim() !== '' && password.trim() !== ''
  }, [email, password])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!isFormValid || isLoginPending) {
        return
      }

      await login(
        { username_or_email: email, password },
        {
          onSuccess: async () => {
            if (loginSource) {
              trackConversion.userLogin(loginSource)
            }

            await completeOnboardingForExtensionUser()

            toast.success('Logged in successfully')
            setTimeout(() => {
              navigate('/select-plan')
            }, 500)
          },
          onError: (error: any) => {
            setPassword('')
            const errorMessage =
              error?.response?.data?.error?.message ||
              'Failed to login. Please check your credentials and try again.'
            toast.error(errorMessage)
          }
        }
      )
    },
    [
      email,
      password,
      isFormValid,
      isLoginPending,
      login,
      navigate,
      loginSource,
      completeOnboardingForExtensionUser
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
      toast.error('Google login failed. Please try again.')
    }
  })

  const isSubmitting = isLoginPending || isGoogleAuthPending

  const value = useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword,
      isSubmitting,
      isFormValid,
      handleSubmit,
      handleGoogleLogin: () => handleGoogleLogin()
    }),
    [
      email,
      password,
      isSubmitting,
      isFormValid,
      handleSubmit,
      handleGoogleLogin
    ]
  )

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}

export const useLoginContext = () => {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider')
  }
  return context
}
