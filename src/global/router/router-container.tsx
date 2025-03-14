import { useAuth } from '@/global/hooks/use-auth'
import { useUrlParamsStorage } from '@/shared/hooks/use-url-params-storage'
import { useUserStore } from '@/store/user-store'
import { Loading } from '@/ui/loading'
import { useEffect, useState } from 'react'

interface RouterContainerProps {
  children: React.ReactNode
}

export const RouterContainer = ({ children }: RouterContainerProps) => {
  useUrlParamsStorage()

  const { isLoading: authLoading, token } = useAuth()
  const { isLoading: userLoading } = useUserStore()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!token) {
        setIsReady(true)
        return
      }

      if (!userLoading) {
        setIsReady(true)
      }
    }
  }, [authLoading, userLoading, token])

  if (!isReady) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <Loading size='lg' />
      </div>
    )
  }

  return <>{children}</>
}
