import { withErrorHandling } from '@/lib/error-handling'
import { useResetPassword } from '@/lib/hooks'
import {
  type FormEvent,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const NewPasswordContext = createContext<
  | {
      password: string
      setPassword: (password: string) => void
      confirmPassword: string
      setConfirmPassword: (confirmPassword: string) => void
      isSubmitting: boolean
      code: string | null
      isValid: boolean
      handleSubmit: (e: FormEvent) => Promise<void>
    }
  | undefined
>(undefined)

export const NewPasswordProvider = ({
  children
}: {
  children: ReactNode
}) => {
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

  const isValid = useMemo(() => {
    return (
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword &&
      !!code
    )
  }, [password, confirmPassword, code])

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

  const value = useMemo(
    () => ({
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      isSubmitting: resetPassword.isPending,
      code,
      isValid,
      handleSubmit
    }),
    [
      password,
      confirmPassword,
      resetPassword.isPending,
      code,
      isValid,
      handleSubmit
    ]
  )

  return (
    <NewPasswordContext.Provider value={value}>
      {children}
    </NewPasswordContext.Provider>
  )
}

export const useNewPasswordContext = () => {
  const context = useContext(NewPasswordContext)

  if (!context) {
    throw new Error(
      'useNewPasswordContext must be used within a NewPasswordProvider'
    )
  }

  return context
}
