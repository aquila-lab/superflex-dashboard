import { useUser } from '@/global/hooks/use-user'
import { API_BASE_URL } from '@/lib/constants'
import type { PlanId } from '@/lib/utils'
import { useAuthStore } from '@/store/auth-store'
import { useUserStore } from '@/store/user-store'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const usePlanSelection = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { getAuthHeader } = useAuthStore()
  const { updateUser } = useUserStore()

  const updateOnboardingStep = useCallback(async () => {
    if (!user) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({
          onboarding_step: 1
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update onboarding step')
      }

      updateUser({ onboarding_step: 1 })
      toast.success('Free plan successfully activated!')

      navigate('/user-info')
    } catch (_error) {
      toast.error('Failed to update your profile. Please try again.')
    }
  }, [user, getAuthHeader, updateUser, navigate])

  const getStripeUrl = useCallback(
    (planId: PlanId): string | null => {
      if (!user) {
        return null
      }

      if (import.meta.env.DEV && planId !== 'free') {
        return `https://buy.stripe.com/test_7sI03HdeB15hcX6cN4?client_reference_id=${user.id}&prefilled_email=${user.email}`
      }

      switch (planId) {
        case 'individual_pro_monthly': {
          return `https://buy.stripe.com/eVag2Q3mm1Mm7qEbIZ?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'individual_pro_yearly': {
          return `https://buy.stripe.com/dR6aIw4qq3UufXa3cu?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'team_monthly': {
          return `https://buy.stripe.com/bIYbMAcWW3UufXafZe?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'team_yearly': {
          return `https://buy.stripe.com/fZe3g4aOObmWdP2eVd?client_reference_id=${user.id}&prefilled_email=${user.email}`
        }
        case 'free': {
          return null
        }
        default: {
          return null
        }
      }
    },
    [user]
  )

  const handlePlanSelection = useCallback(
    (planId: PlanId) => {
      if (planId === 'free') {
        updateOnboardingStep()
        return
      }

      sessionStorage.setItem('planId', planId)

      const stripeUrl = getStripeUrl(planId)
      if (stripeUrl) {
        window.location.href = stripeUrl
      }
    },
    [getStripeUrl, updateOnboardingStep]
  )

  return {
    handlePlanSelection
  }
}
