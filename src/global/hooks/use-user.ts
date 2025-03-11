import { useUserStore } from '@/store/user-store'
import { useEffect, useMemo, useRef } from 'react'
import { useApi } from '../providers/api-provider'

export const useUser = () => {
  const { subscription, user } = useUserStore()
  const api = useApi()
  const awaitSubscription = useRef(false)

  useEffect(() => {
    if (user && !subscription && api && !awaitSubscription.current) {
      awaitSubscription.current = true
      api.fetchSubscription().then(() => {
        awaitSubscription.current = false
      })
    }
  }, [user, subscription, api])

  const basicRequestsRemaining = useMemo(() => {
    if (!subscription || !subscription.plan) {
      return 0
    }
    return Math.max(
      0,
      subscription.plan.basic_request_limit - subscription.basic_requests_used
    )
  }, [subscription])

  const premiumRequestsRemaining = useMemo(() => {
    if (!subscription || !subscription.plan) {
      return 0
    }
    return Math.max(
      0,
      subscription.plan.premium_request_limit -
        subscription.premium_requests_used
    )
  }, [subscription])

  const basicRequestsPercentage = useMemo(() => {
    if (
      !subscription ||
      !subscription.plan ||
      subscription.plan.basic_request_limit === 0
    ) {
      return 0
    }
    return Math.min(
      100,
      Math.round(
        (subscription.basic_requests_used /
          subscription.plan.basic_request_limit) *
          100
      )
    )
  }, [subscription])

  const premiumRequestsPercentage = useMemo(() => {
    if (
      !subscription ||
      !subscription.plan ||
      subscription.plan.premium_request_limit === 0
    ) {
      return 0
    }
    return Math.min(
      100,
      Math.round(
        (subscription.premium_requests_used /
          subscription.plan.premium_request_limit) *
          100
      )
    )
  }, [subscription])

  const isActive = useMemo(() => {
    if (!subscription) {
      return false
    }

    if (subscription.plan?.name === 'Free Plan') {
      return true
    }

    if (subscription.end_date) {
      return new Date() < new Date(subscription.end_date)
    }

    return true
  }, [subscription])

  return {
    user,
    subscription,
    basicRequestsRemaining,
    premiumRequestsRemaining,
    basicRequestsPercentage,
    premiumRequestsPercentage,
    isActive
  }
}
