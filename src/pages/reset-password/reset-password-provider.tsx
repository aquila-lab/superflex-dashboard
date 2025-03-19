import { withErrorHandling } from '@/lib/error-handling'
import { useRequestPasswordReset } from '@/lib/hooks'
import {
  type FormEvent,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPasswordContext = createContext<
  | {
      email: string
      setEmail: (email: string) => void
      isSubmitting: boolean
      isFormValid: boolean
      handleSubmit: (e: FormEvent) => Promise<void>
    }
  | undefined
>(undefined)

export const ResetPasswordProvider = ({
  children
}: {
  children: ReactNode
}) => {
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

      const handleRequestReset = withErrorHandling(
        async () => {
          const result = await requestPasswordReset.mutateAsync(email)
          return result
        },
        {
          successMessage: 'Password reset email sent',
          onSuccess: () => {
            navigate('/forgot-password-request')
          }
        }
      )

      await handleRequestReset()
    },
    [email, isFormValid, requestPasswordReset, navigate]
  )

  const value = useMemo(
    () => ({
      email,
      setEmail,
      isSubmitting: requestPasswordReset.isPending,
      isFormValid,
      handleSubmit
    }),
    [email, isFormValid, handleSubmit, requestPasswordReset.isPending]
  )

  return (
    <ResetPasswordContext.Provider value={value}>
      {children}
    </ResetPasswordContext.Provider>
  )
}

export const useResetPasswordContext = () => {
  const context = useContext(ResetPasswordContext)

  if (!context) {
    throw new Error(
      'useResetPasswordContext must be used within a ResetPasswordProvider'
    )
  }

  return context
}
