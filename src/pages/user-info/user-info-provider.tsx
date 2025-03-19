import { withErrorHandling } from '@/lib/error-handling'
import { useUpdateUser, useUser } from '@/lib/hooks'
import type { ReferralSource, TechnicalLevel } from '@/lib/types'
import posthog from 'posthog-js'
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

const UserInfoContext = createContext<
  | {
      firstName: string
      setFirstName: (value: string) => void
      lastName: string
      setLastName: (value: string) => void
      title: string | undefined
      setTitle: (value: string) => void
      company: string | undefined
      setCompany: (value: string) => void
      technicalLevel: TechnicalLevel | ''
      setTechnicalLevel: (value: TechnicalLevel | '') => void
      referralSource: ReferralSource | ''
      setReferralSource: (value: ReferralSource | '') => void
      isSubmitting: boolean
      handleSubmit: (e: FormEvent) => Promise<void>
    }
  | undefined
>(undefined)

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const updateUser = useUpdateUser()
  const { data: user } = useUser()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [company, setCompany] = useState<string | undefined>(undefined)
  const [technicalLevel, setTechnicalLevel] = useState<TechnicalLevel | ''>('')
  const [referralSource, setReferralSource] = useState<ReferralSource | ''>('')

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      const payload = {
        first_name: firstName,
        last_name: lastName,
        onboarding_step: 2,
        ...(title ? { title } : {}),
        ...(company ? { company } : {}),
        ...(referralSource ? { referral_source: referralSource } : {}),
        ...(technicalLevel ? { technical_level: technicalLevel } : {})
      }

      const updateUserInfo = withErrorHandling(
        async () => {
          const result = await updateUser.mutateAsync(payload)
          return result
        },
        {
          successMessage: 'Your profile information has been saved',
          onSuccess: () => {
            const uniqueID = localStorage.getItem('uniqueID')

            if (uniqueID && user) {
              posthog.identify(uniqueID, {
                userID: user.id,
                email: user.email,
                firstName,
                lastName,
                technicalLevel,
                title,
                company,
                referralSource
              })
            }

            if (user) {
              posthog.capture('referral_source', {
                referralSource,
                userID: user.id
              })
            }

            navigate('/dashboard/onboarding')
          },
          onError: () => {
            setIsSubmitting(false)
          }
        }
      )

      try {
        await updateUserInfo()
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      firstName,
      lastName,
      title,
      company,
      referralSource,
      technicalLevel,
      updateUser,
      user,
      navigate
    ]
  )

  const value = useMemo(
    () => ({
      firstName,
      setFirstName,
      lastName,
      setLastName,
      title,
      setTitle,
      company,
      setCompany,
      technicalLevel,
      setTechnicalLevel,
      referralSource,
      setReferralSource,
      isSubmitting,
      handleSubmit
    }),
    [
      firstName,
      lastName,
      title,
      company,
      technicalLevel,
      referralSource,
      isSubmitting,
      handleSubmit
    ]
  )

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfoContext = () => {
  const context = useContext(UserInfoContext)

  if (!context) {
    throw new Error('useUserInfoContext must be used within a UserInfoProvider')
  }

  return context
}
