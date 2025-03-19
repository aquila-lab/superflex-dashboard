import confetti from 'canvas-confetti'
import { memo, useRef, useMemo, useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { useSuccessContext } from './success-provider'

export const SuccessConfetti = memo(() => {
  const { config } = useSuccessContext()
  const hasTriggeredNotification = useRef(false)
  const particleColors = useMemo(() => ['#10b981', '#3b82f6', '#8b5cf6'], [])

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: particleColors
    })
  }, [particleColors])

  useEffect(() => {
    if (!hasTriggeredNotification.current) {
      toast.success(config.toastMessage)
      triggerConfetti()
      hasTriggeredNotification.current = true
    }
  }, [config.toastMessage, triggerConfetti])

  return null
})
