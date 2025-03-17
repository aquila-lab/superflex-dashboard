import { useUrlParamsStorage, useUser } from '@/lib/hooks'
import { Loading } from '@/ui/loading'
import { type ReactNode, useEffect, useState } from 'react'

export const RouterContainer = ({
  children
}: {
  children: ReactNode
}) => {
  useUrlParamsStorage()

  const { isLoading: userLoading } = useUser()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!userLoading) {
      setIsReady(true)
    }
  }, [userLoading])

  if (!isReady) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <Loading size='lg' />
      </div>
    )
  }

  return <>{children}</>
}
